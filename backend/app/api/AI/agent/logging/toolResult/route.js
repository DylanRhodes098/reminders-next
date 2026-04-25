import "../../../../../../models/index.js";

import { NextResponse } from "next/server";
import ToolResult from "../../../../../../models/AI/tools/toolResult.js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const toolCallId = searchParams.get("toolCallId");

    if (id) {
      const row = await ToolResult.findByPk(id);
      if (!row) {
        return NextResponse.json(
          { error: "ToolResult not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(row, { status: 200 });
    }

    const where = {};
    if (toolCallId) where.toolCallId = toolCallId;

    const rows = await ToolResult.findAll(Object.keys(where).length ? { where } : {});
    return NextResponse.json(rows, { status: 200 });
  } catch (err) {
    const msg =
      process.env.NODE_ENV === "development"
        ? err?.parent?.sqlMessage || err?.message
        : "Error retrieving tool results";
    return NextResponse.json(
      { error: "Error retrieving tool results", message: msg },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const created = await ToolResult.create(body);
    return NextResponse.json(created, { status: 200 });
  } catch (err) {
    const msg =
      process.env.NODE_ENV === "development"
        ? err?.parent?.sqlMessage || err?.message
        : "Error creating tool result";
    return NextResponse.json(
      { error: "Error creating tool result", message: msg },
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

    const [affectedCount] = await ToolResult.update(updates, { where: { id } });
    if (affectedCount === 0) {
      return NextResponse.json(
        { error: "ToolResult not found" },
        { status: 404 }
      );
    }

    const updated = await ToolResult.findByPk(id);
    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    const msg =
      process.env.NODE_ENV === "development"
        ? err?.parent?.sqlMessage || err?.message
        : "Error updating tool result";
    return NextResponse.json(
      { error: "Error updating tool result", message: msg },
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

    const row = await ToolResult.findByPk(id);
    if (!row) {
      return NextResponse.json(
        { error: "ToolResult not found" },
        { status: 404 }
      );
    }

    await row.destroy();
    return NextResponse.json({ message: "ToolResult deleted" }, { status: 200 });
  } catch (err) {
    const msg =
      process.env.NODE_ENV === "development"
        ? err?.parent?.sqlMessage || err?.message
        : "Error deleting tool result";
    return NextResponse.json(
      { error: "Error deleting tool result", message: msg },
      { status: 500 }
    );
  }
}

