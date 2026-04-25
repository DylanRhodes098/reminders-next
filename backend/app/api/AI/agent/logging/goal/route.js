import "../../../../../../models/index.js";

import { NextResponse } from "next/server";
import Goal from "../../../../../../models/AI/agent/goal.js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const row = await Goal.findByPk(id);
      if (!row) {
        return NextResponse.json({ error: "Goal not found" }, { status: 404 });
      }
      return NextResponse.json(row, { status: 200 });
    }

    const rows = await Goal.findAll();
    return NextResponse.json(rows, { status: 200 });
  } catch (err) {
    const msg =
      process.env.NODE_ENV === "development"
        ? err?.parent?.sqlMessage || err?.message
        : "Error retrieving goals";
    return NextResponse.json(
      { error: "Error retrieving goals", message: msg },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const created = await Goal.create(body);
    return NextResponse.json(created, { status: 200 });
  } catch (err) {
    const msg =
      process.env.NODE_ENV === "development"
        ? err?.parent?.sqlMessage || err?.message
        : "Error creating goal";
    return NextResponse.json(
      { error: "Error creating goal", message: msg },
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

    const [affectedCount] = await Goal.update(updates, { where: { id } });
    if (affectedCount === 0) {
      return NextResponse.json({ error: "Goal not found" }, { status: 404 });
    }

    const updated = await Goal.findByPk(id);
    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    const msg =
      process.env.NODE_ENV === "development"
        ? err?.parent?.sqlMessage || err?.message
        : "Error updating goal";
    return NextResponse.json(
      { error: "Error updating goal", message: msg },
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

    const row = await Goal.findByPk(id);
    if (!row) {
      return NextResponse.json({ error: "Goal not found" }, { status: 404 });
    }

    await row.destroy();
    return NextResponse.json({ message: "Goal deleted" }, { status: 200 });
  } catch (err) {
    const msg =
      process.env.NODE_ENV === "development"
        ? err?.parent?.sqlMessage || err?.message
        : "Error deleting goal";
    return NextResponse.json(
      { error: "Error deleting goal", message: msg },
      { status: 500 }
    );
  }
}

