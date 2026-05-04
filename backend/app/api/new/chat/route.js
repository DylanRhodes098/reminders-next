import "../../../../models/new/index.js";

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { z } from "zod";

import {
    AgentConfigModel as AgentConfig,
    AgentStepModel as AgentStep,
    InputModel as Input,
    UserRequestModel as UserRequest,
    LlmResponseModel as LlmResponse,
} from "../../../../models/new/index.js";
import { JWT_SECRET } from "../../../../lib/db.js";
import { createChatReply } from "../../../../lib/openai.js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const chatCreate = z.object({
  agentConfigId: z.string().uuid(),
  message: z.string().min(1, "Message required"),
  iteration: z.number().int().nonnegative().optional(),
});

export async function POST(req) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.substring(7);

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userId = decoded?.id;
    if (!userId) {
      return NextResponse.json(
        { error: "User ID not found in token" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const parsed = chatCreate.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Missing/invalid fields", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { agentConfigId, message, iteration } = parsed.data;

    const agentConfig = await AgentConfig.findByPk(agentConfigId);
    if (!agentConfig) {
      return NextResponse.json({ error: "Agent config not found" }, { status: 404 });
    }

    const assistantText = await createChatReply(message);

    if (!assistantText) {
      return NextResponse.json(
        { error: "OpenAI returned an empty response" },
        { status: 502 }
      );
    }

    const created = await AgentStep.sequelize.transaction(async (transaction) => {
      const step = await AgentStep.create(
        { iteration: iteration ?? 0 },
        { transaction }
      );

      const input = await Input.create(
        { agentStepId: step.id },
        { transaction }
      );

      const requestNode = await UserRequest.create(
        {
          agentConfigId,
          inputId: input.id,
        },
        { transaction }
      );

      const requestMessage = await UserRequest.sequelize.models
        .AgentConfigPromptCommunicationMessages.create(
          {
            role: "user",
            content: message,
            userRequestId: requestNode.id,
          },
          { transaction }
        );

      const llmResponse = await LlmResponse.create(
        { agentStepId: step.id },
        { transaction }
      );

      const responseMessage = await UserRequest.sequelize.models
        .AgentConfigPromptCommunicationMessages.create(
          {
            role: "assistant",
            content: assistantText,
            llmResponseId: llmResponse.id,
          },
          { transaction }
        );

      return {
        step,
        input,
        requestNode,
        requestMessage,
        llmResponse,
        responseMessage,
        reply: assistantText,
      };
    });

    return NextResponse.json(
      {
        success: true,
        agentConfigId,
        userId,
        stepId: created.step.id,
        inputId: created.input.id,
        requestId: created.requestNode.id,
        llmResponseId: created.llmResponse.id,
        reply: created.reply,
      },
      { status: 200 }
    );
  } catch (err) {
    const msg =
      process.env.NODE_ENV === "development"
        ? err?.parent?.sqlMessage || err?.message
        : "Error running chat step";

    return NextResponse.json(
      { error: "failed chat step", message: msg },
      { status: 400 }
    );
  }
}
