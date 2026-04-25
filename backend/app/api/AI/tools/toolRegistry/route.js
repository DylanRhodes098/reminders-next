import "../../../../../models/index.js";

import { NextResponse } from "next/server";
import ToolRegistry from "../../../../../models/AI/tools/toolRegistry.js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const name = searchParams.get("name");

    if (id) {
      const row = await ToolRegistry.findByPk(id);
      if (!row) {
        return NextResponse.json(
          { error: "ToolRegistry not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(row, { status: 200 });
    }

    const where = {};
    if (name) where.name = name;

    const rows = await ToolRegistry.findAll(
      Object.keys(where).length ? { where } : {}
    );
    return NextResponse.json(rows, { status: 200 });
  } catch (err) {
    const msg =
      process.env.NODE_ENV === "development"
        ? err?.parent?.sqlMessage || err?.message
        : "Error retrieving tool registries";
    return NextResponse.json(
      { error: "Error retrieving tool registries", message: msg },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const created = await ToolRegistry.create(body);
    return NextResponse.json(created, { status: 200 });
  } catch (err) {
    const msg =
      process.env.NODE_ENV === "development"
        ? err?.parent?.sqlMessage || err?.message
        : "Error creating tool registry";
    return NextResponse.json(
      { error: "Error creating tool registry", message: msg },
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

    const [affectedCount] = await ToolRegistry.update(updates, {
      where: { id },
    });
    if (affectedCount === 0) {
      return NextResponse.json(
        { error: "ToolRegistry not found" },
        { status: 404 }
      );
    }

    const updated = await ToolRegistry.findByPk(id);
    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    const msg =
      process.env.NODE_ENV === "development"
        ? err?.parent?.sqlMessage || err?.message
        : "Error updating tool registry";
    return NextResponse.json(
      { error: "Error updating tool registry", message: msg },
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

    const row = await ToolRegistry.findByPk(id);
    if (!row) {
      return NextResponse.json(
        { error: "ToolRegistry not found" },
        { status: 404 }
      );
    }

    await row.destroy();
    return NextResponse.json(
      { message: "ToolRegistry deleted" },
      { status: 200 }
    );
  } catch (err) {
    const msg =
      process.env.NODE_ENV === "development"
        ? err?.parent?.sqlMessage || err?.message
        : "Error deleting tool registry";
    return NextResponse.json(
      { error: "Error deleting tool registry", message: msg },
      { status: 500 }
    );
  }
}

