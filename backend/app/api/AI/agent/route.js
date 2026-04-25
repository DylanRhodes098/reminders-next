import "../../../../models/index.js";

import { NextResponse } from "next/server";
import Agent from "../../../../models/AI/agent/agent.js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const row = await Agent.findByPk(id);
      if (!row) {
        return NextResponse.json({ error: "Agent not found" }, { status: 404 });
      }
      return NextResponse.json(row, { status: 200 });
    }

    const rows = await Agent.findAll();
    return NextResponse.json(rows, { status: 200 });
  } catch (err) {
    const msg =
      process.env.NODE_ENV === "development"
        ? err?.parent?.sqlMessage || err?.message
        : "Error retrieving agents";
    return NextResponse.json(
      { error: "Error retrieving agents", message: msg },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const created = await Agent.create(body);
    return NextResponse.json(created, { status: 200 });
  } catch (err) {
    const msg =
      process.env.NODE_ENV === "development"
        ? err?.parent?.sqlMessage || err?.message
        : "Error creating agent";
    return NextResponse.json(
      { error: "Error creating agent", message: msg },
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

    const [affectedCount] = await Agent.update(updates, { where: { id } });
    if (affectedCount === 0) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    const updated = await Agent.findByPk(id);
    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    const msg =
      process.env.NODE_ENV === "development"
        ? err?.parent?.sqlMessage || err?.message
        : "Error updating agent";
    return NextResponse.json(
      { error: "Error updating agent", message: msg },
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

    const row = await Agent.findByPk(id);
    if (!row) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    await row.destroy();
    return NextResponse.json({ message: "Agent deleted" }, { status: 200 });
  } catch (err) {
    const msg =
      process.env.NODE_ENV === "development"
        ? err?.parent?.sqlMessage || err?.message
        : "Error deleting agent";
    return NextResponse.json(
      { error: "Error deleting agent", message: msg },
      { status: 500 }
    );
  }
}

