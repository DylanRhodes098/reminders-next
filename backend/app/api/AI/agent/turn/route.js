import "../../../../../../models/index.js";

import { NextResponse } from "next/server";
import { agentTurnRequest } from "../../../../../../validation/AI/agent/turn/validation.js";
import { runAgentTurn } from "../../../../../../lib/AI/agentRunner.js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const body = await req.json();

    const parsed = agentTurnRequest.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", message: parsed.error.format() },
        { status: 400 }
      );
    }

    const {
      agentId,
      runId,
      userText,
      systemPrompt,
      maxIterations,
      llmClientConfigId,
    } = parsed.data;

    // Tools & executors are intentionally injected server-side later.
    const result = await runAgentTurn({
      agentId,
      runId,
      userText,
      ...(systemPrompt ? { systemPrompt } : {}),
      ...(typeof maxIterations === "number" ? { maxIterations } : {}),
      ...(llmClientConfigId ? { llmClientConfigId } : {}),
      tools: [],
      toolExecutors: {},
    });

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    const msg =
      process.env.NODE_ENV === "development"
        ? err?.parent?.sqlMessage || err?.message
        : "Error running agent turn";
    return NextResponse.json(
      { error: "Error running agent turn", message: msg },
      { status: 500 }
    );
  }
}

