import OpenAI from "openai";

import AgentRun from "../../models/AI/agent/agentRun.js";
import Message from "../../models/AI/agent/message.js";
import Prompt from "../../models/AI/communication/prompt.js";
import ToolCall from "../../models/AI/tools/toolCall.js";
import ToolResult from "../../models/AI/tools/toolResult.js";
import UsageMetrics from "../../models/AI/llm/usageMetrics.js";
import LLMClientConfig from "../../models/AI/llm/llmClientConfig.js";

function nowMs() {
  return Date.now();
}

function safeJsonParse(maybeJson, fallback = undefined) {
  try {
    if (typeof maybeJson !== "string") return fallback;
    return JSON.parse(maybeJson);
  } catch {
    return fallback;
  }
}

function toOpenAITools(tools = []) {
  return tools.map((t) => ({
    type: "function",
    function: {
      name: t.name,
      description: t.description,
      parameters: t.parameters ?? { type: "object", properties: {} },
    },
  }));
}

function toOpenAIMessages(messages = []) {
  // Message rows are stored as {role, content, metadata}
  // OpenAI expects: {role, content} plus tool-specific fields in some cases.
  return messages.map((m) => {
    const base = { role: m.role, content: m.content };

    // If we stored tool call request/response in metadata, expand it for OpenAI.
    const md = m.metadata || {};
    if (m.role === "assistant" && md.tool_calls) {
      return { ...base, tool_calls: md.tool_calls };
    }
    if (m.role === "tool" && md.tool_call_id) {
      return { ...base, tool_call_id: md.tool_call_id };
    }
    return base;
  });
}

/**
 * Tool executor signature:
 * (args: object, ctx: { agentId, runId, userText, memory }) => Promise<any>
 */

/**
 * Runs ONE user turn, potentially looping through tool calls until the LLM
 * returns a final assistant message or maxIterations is reached.
 *
 * This file is intentionally "backend-only orchestration":
 * - Reads/writes: AgentRun, Message, Prompt, ToolCall, ToolResult, UsageMetrics, Memory
 * - Calls OpenAI chat completions
 * - Executes tools using `toolExecutors` (injected by the API route)
 */
export async function runAgentTurn({
  agentId,
  runId,
  userText,
  tools = [],
  toolExecutors = {},
  systemPrompt = "You are a helpful assistant.",
  maxIterations = 8,
  llmClientConfigId,
}) {
  if (!agentId) throw new Error("runAgentTurn: agentId is required");
  if (!userText || typeof userText !== "string")
    throw new Error("runAgentTurn: userText must be a non-empty string");

  const llmConfig =
    (llmClientConfigId
      ? await LLMClientConfig.findByPk(llmClientConfigId)
      : await LLMClientConfig.findOne()) || null;

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const model =
    llmConfig?.model || process.env.OPENAI_MODEL || "gpt-5-nano";
  const temperature =
    typeof llmConfig?.temperature === "number" ? llmConfig.temperature : 0.2;
  const max_completion_tokens =
    typeof llmConfig?.maxOutputTokens === "number"
      ? llmConfig.maxOutputTokens
      : undefined;

  // 1) AgentRun
  let run = null;
  if (runId) {
    run = await AgentRun.findByPk(runId);
  }
  if (!run) {
    run = await AgentRun.create({
      agentId,
      status: "running",
      startedAt: new Date(),
      iterations: 0,
      input: { userText },
      trace: { createdBy: "agentRunner" },
    });
  } else if (run.status !== "running") {
    await run.update({ status: "running" });
  }

  // 2) Memory (simple: one row per run; you can expand later)
  // Your Memory model currently only has {kind, config}; no runId.
  // For now, we store memory in AgentRun.trace.memory instead of a separate row.
  // If you later add runId to Memory, swap this to DB-backed memory.
  const memory =
    (run.trace && run.trace.memory) || { kind: "base", state: {} };

  // 3) Persist the user's message for this run
  const userMsgRow = await Message.create({
    role: "user",
    content: userText,
    runId: run.id,
    metadata: { agentId },
  });

  // 4) Build messages for the LLM: system + past run messages
  const historyRows = await Message.findAll({
    where: { runId: run.id },
    order: [["createdAt", "ASC"]],
  });

  const llmMessages = [
    { role: "system", content: systemPrompt, metadata: { agentId } },
    // include memory (if present) as a system message chunk
    ...(memory?.summary
      ? [
          {
            role: "system",
            content: `Memory:\n${memory.summary}`,
            metadata: { agentId, kind: "memory" },
          },
        ]
      : []),
    ...historyRows.map((r) => ({
      role: r.role,
      content: r.content,
      metadata: r.metadata,
    })),
  ];

  const openaiTools = toOpenAITools(tools);

  // Log the Prompt row (what we sent)
  const promptRow = await Prompt.create({
    messages: llmMessages.map((m) => ({ role: m.role, content: m.content })),
    tools,
    metadata: { agentId, runId: run.id, model, temperature },
    responseSchema: null,
  });

  const toolCallsCreated = [];
  let assistantText = null;
  let assistantMessageRow = null;
  let totalUsage = {
    promptTokens: 0,
    completionTokens: 0,
    totalTokens: 0,
    estimatedCost: 0,
    llmLatencyMs: 0,
    toolLatencyMs: 0,
    totalLatencyMs: 0,
  };

  const runnerStart = nowMs();

  // 5) Loop: LLM -> toolcalls -> toolresults -> LLM ...
  for (let i = 0; i < maxIterations; i++) {
    const llmStart = nowMs();
    const completion = await openai.chat.completions.create({
      model,
      messages: toOpenAIMessages(llmMessages),
      ...(openaiTools.length ? { tools: openaiTools } : {}),
      ...(typeof temperature === "number" ? { temperature } : {}),
      ...(max_completion_tokens ? { max_completion_tokens } : {}),
    });
    const llmLatencyMs = nowMs() - llmStart;

    const choice = completion.choices?.[0];
    const message = choice?.message;
    const content = message?.content ?? null;
    const toolCalls = message?.tool_calls ?? null;

    const usage = completion.usage || {};
    totalUsage.promptTokens += usage.prompt_tokens || 0;
    totalUsage.completionTokens += usage.completion_tokens || 0;
    totalUsage.totalTokens += usage.total_tokens || 0;
    totalUsage.llmLatencyMs += llmLatencyMs;

    await UsageMetrics.create({
      promptTokens: usage.prompt_tokens || 0,
      completionTokens: usage.completion_tokens || 0,
      totalTokens: usage.total_tokens || 0,
      estimatedCost: 0,
      llmLatencyMs,
      toolLatencyMs: 0,
      totalLatencyMs: llmLatencyMs,
    });

    // Store the assistant message (including tool calls) for replay/debugging
    assistantMessageRow = await Message.create({
      role: "assistant",
      content: content || "",
      runId: run.id,
      metadata: toolCalls ? { tool_calls: toolCalls } : null,
    });

    // If no tool calls, we are done.
    if (!toolCalls || toolCalls.length === 0) {
      assistantText = content || "";
      break;
    }

    // Append assistant tool call message into the in-memory transcript for the next LLM call
    llmMessages.push({
      role: "assistant",
      content: content || "",
      metadata: { tool_calls: toolCalls },
    });

    // Execute each tool call
    for (const tc of toolCalls) {
      if (tc.type !== "function") continue;

      const toolName = tc.function?.name;
      const args = safeJsonParse(tc.function?.arguments, {});

      const toolCallRow = await ToolCall.create({
        toolName,
        arguments: args,
        requestedByMessageId: assistantMessageRow.id,
        status: "running",
        runId: run.id,
      });
      toolCallsCreated.push(toolCallRow);

      const exec = toolExecutors[toolName];
      const toolStart = nowMs();

      let ok = true;
      let data = null;
      let error = null;
      try {
        if (typeof exec !== "function") {
          throw new Error(`No executor registered for tool: ${toolName}`);
        }
        data = await exec(args, {
          agentId,
          runId: run.id,
          userText,
          memory,
        });
      } catch (e) {
        ok = false;
        error = { message: e?.message || String(e) };
      }

      const latencyMs = nowMs() - toolStart;
      totalUsage.toolLatencyMs += latencyMs;

      await ToolResult.create({
        toolCallId: toolCallRow.id,
        ok,
        data,
        error,
        latencyMs,
        completedAt: new Date(),
      });

      await toolCallRow.update({ status: ok ? "completed" : "error" });

      // Also store tool result as a Message row so the next LLM call can see it
      const toolContent = JSON.stringify(ok ? data : { error }, null, 2);
      await Message.create({
        role: "tool",
        content: toolContent,
        toolCallId: toolCallRow.id,
        runId: run.id,
        metadata: { tool_call_id: tc.id || toolCallRow.id, toolName, ok },
      });

      llmMessages.push({
        role: "tool",
        content: toolContent,
        metadata: { tool_call_id: tc.id || toolCallRow.id },
      });
    }

    await run.update({ iterations: (run.iterations || 0) + 1 });
  }

  totalUsage.totalLatencyMs = nowMs() - runnerStart;

  // 6) Update run status + outputs
  await run.update({
    status: "completed",
    endedAt: new Date(),
    output: { assistantText },
    usage: totalUsage,
    trace: {
      ...(run.trace || {}),
      promptId: promptRow.id,
      userMessageId: userMsgRow.id,
      assistantMessageId: assistantMessageRow?.id,
      toolCallIds: toolCallsCreated.map((r) => r.id),
      memory,
    },
  });

  // 7) Return UI-friendly response
  return {
    runId: run.id,
    assistantMessage: assistantText
      ? { role: "assistant", content: assistantText }
      : null,
    toolCalls: toolCallsCreated.map((r) => ({
      id: r.id,
      toolName: r.toolName,
      args: r.arguments,
      status: r.status,
    })),
    usage: {
      model,
      promptTokens: totalUsage.promptTokens,
      completionTokens: totalUsage.completionTokens,
      totalTokens: totalUsage.totalTokens,
      estimatedCost: totalUsage.estimatedCost,
      llmLatencyMs: totalUsage.llmLatencyMs,
      toolLatencyMs: totalUsage.toolLatencyMs,
      totalLatencyMs: totalUsage.totalLatencyMs,
    },
    trace: run.trace,
  };
}

