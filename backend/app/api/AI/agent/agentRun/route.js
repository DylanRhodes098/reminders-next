import "../../../../../models/index.js";

import { NextResponse } from "next/server";
import AgentRun from "../../../../../models/AI/agent/agentRun.js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const agentId = searchParams.get("agentId");

    if (id) {
      const row = await AgentRun.findByPk(id);
      if (!row) {
        return NextResponse.json(
          { error: "AgentRun not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(row, { status: 200 });
    }

    const where = {};
    if (agentId) where.agentId = agentId;

    const rows = await AgentRun.findAll(Object.keys(where).length ? { where } : {});
    return NextResponse.json(rows, { status: 200 });
  } catch (err) {
    const msg =
      process.env.NODE_ENV === "development"
        ? err?.parent?.sqlMessage || err?.message
        : "Error retrieving agent runs";
    return NextResponse.json(
      { error: "Error retrieving agent runs", message: msg },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const created = await AgentRun.create(body);
    return NextResponse.json(created, { status: 200 });
  } catch (err) {
    const msg =
      process.env.NODE_ENV === "development"
        ? err?.parent?.sqlMessage || err?.message
        : "Error creating agent run";
    return NextResponse.json(
      { error: "Error creating agent run", message: msg },
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

    const [affectedCount] = await AgentRun.update(updates, { where: { id } });
    if (affectedCount === 0) {
      return NextResponse.json(
        { error: "AgentRun not found" },
        { status: 404 }
      );
    }

    const updated = await AgentRun.findByPk(id);
    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    const msg =
      process.env.NODE_ENV === "development"
        ? err?.parent?.sqlMessage || err?.message
        : "Error updating agent run";
    return NextResponse.json(
      { error: "Error updating agent run", message: msg },
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

    const row = await AgentRun.findByPk(id);
    if (!row) {
      return NextResponse.json(
        { error: "AgentRun not found" },
        { status: 404 }
      );
    }

    await row.destroy();
    return NextResponse.json({ message: "AgentRun deleted" }, { status: 200 });
  } catch (err) {
    const msg =
      process.env.NODE_ENV === "development"
        ? err?.parent?.sqlMessage || err?.message
        : "Error deleting agent run";
    return NextResponse.json(
      { error: "Error deleting agent run", message: msg },
      { status: 500 }
    );
  }
}

