import "../../../../../../models/index.js";

import { NextResponse } from "next/server";
import ToolCall from "../../../../../../models/AI/tools/toolCall.js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const runId = searchParams.get("runId");
    const requestedByMessageId = searchParams.get("requestedByMessageId");
    const toolName = searchParams.get("toolName");

    if (id) {
      const row = await ToolCall.findByPk(id);
      if (!row) {
        return NextResponse.json(
          { error: "ToolCall not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(row, { status: 200 });
    }

    const where = {};
    if (runId) where.runId = runId;
    if (requestedByMessageId) where.requestedByMessageId = requestedByMessageId;
    if (toolName) where.toolName = toolName;

    const rows = await ToolCall.findAll(Object.keys(where).length ? { where } : {});
    return NextResponse.json(rows, { status: 200 });
  } catch (err) {
    const msg =
      process.env.NODE_ENV === "development"
        ? err?.parent?.sqlMessage || err?.message
        : "Error retrieving tool calls";
    return NextResponse.json(
      { error: "Error retrieving tool calls", message: msg },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const created = await ToolCall.create(body);
    return NextResponse.json(created, { status: 200 });
  } catch (err) {
    const msg =
      process.env.NODE_ENV === "development"
        ? err?.parent?.sqlMessage || err?.message
        : "Error creating tool call";
    return NextResponse.json(
      { error: "Error creating tool call", message: msg },
      { status: 400 }
    );
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, ...updates } = body || {};

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const [affectedCount] = await ToolCall.update(updates, { where: { id } });
    if (affectedCount === 0) {
      return NextResponse.json(
        { error: "ToolCall not found" },
        { status: 404 }
      );
    }

    const updated = await ToolCall.findByPk(id);
    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    const msg =
      process.env.NODE_ENV === "development"
        ? err?.parent?.sqlMessage || err?.message
        : "Error updating tool call";
    return NextResponse.json(
      { error: "Error updating tool call", message: msg },
      { status: 400 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const row = await ToolCall.findByPk(id);
    if (!row) {
      return NextResponse.json(
        { error: "ToolCall not found" },
        { status: 404 }
      );
    }

    await row.destroy();
    return NextResponse.json({ message: "ToolCall deleted" }, { status: 200 });
  } catch (err) {
    const msg =
      process.env.NODE_ENV === "development"
        ? err?.parent?.sqlMessage || err?.message
        : "Error deleting tool call";
    return NextResponse.json(
      { error: "Error deleting tool call", message: msg },
      { status: 500 }
    );
  }
}

