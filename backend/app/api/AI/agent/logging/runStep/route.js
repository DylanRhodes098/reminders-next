import "../../../../../../models/index.js";

import { NextResponse } from "next/server";
import RunStep from "../../../../../../models/AI/communication/runStep.js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const runId = searchParams.get("runId");

    if (id) {
      const row = await RunStep.findByPk(id);
      if (!row) {
        return NextResponse.json(
          { error: "RunStep not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(row, { status: 200 });
    }

    const where = {};
    if (runId) where.runId = runId;

    const rows = await RunStep.findAll(Object.keys(where).length ? { where } : {});
    return NextResponse.json(rows, { status: 200 });
  } catch (err) {
    const msg =
      process.env.NODE_ENV === "development"
        ? err?.parent?.sqlMessage || err?.message
        : "Error retrieving run steps";
    return NextResponse.json(
      { error: "Error retrieving run steps", message: msg },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const created = await RunStep.create(body);
    return NextResponse.json(created, { status: 200 });
  } catch (err) {
    const msg =
      process.env.NODE_ENV === "development"
        ? err?.parent?.sqlMessage || err?.message
        : "Error creating run step";
    return NextResponse.json(
      { error: "Error creating run step", message: msg },
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

    const [affectedCount] = await RunStep.update(updates, { where: { id } });
    if (affectedCount === 0) {
      return NextResponse.json(
        { error: "RunStep not found" },
        { status: 404 }
      );
    }

    const updated = await RunStep.findByPk(id);
    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    const msg =
      process.env.NODE_ENV === "development"
        ? err?.parent?.sqlMessage || err?.message
        : "Error updating run step";
    return NextResponse.json(
      { error: "Error updating run step", message: msg },
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

    const row = await RunStep.findByPk(id);
    if (!row) {
      return NextResponse.json(
        { error: "RunStep not found" },
        { status: 404 }
      );
    }

    await row.destroy();
    return NextResponse.json({ message: "RunStep deleted" }, { status: 200 });
  } catch (err) {
    const msg =
      process.env.NODE_ENV === "development"
        ? err?.parent?.sqlMessage || err?.message
        : "Error deleting run step";
    return NextResponse.json(
      { error: "Error deleting run step", message: msg },
      { status: 500 }
    );
  }
}

