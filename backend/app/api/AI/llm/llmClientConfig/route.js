import "../../../../../models/index.js";

import { NextResponse } from "next/server";
import LLMClientConfig from "../../../../../models/AI/llm/llmClientConfig.js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const provider = searchParams.get("provider");
    const model = searchParams.get("model");

    if (id) {
      const row = await LLMClientConfig.findByPk(id);
      if (!row) {
        return NextResponse.json(
          { error: "LLMClientConfig not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(row, { status: 200 });
    }

    const where = {};
    if (provider) where.provider = provider;
    if (model) where.model = model;

    const rows = await LLMClientConfig.findAll(
      Object.keys(where).length ? { where } : {}
    );
    return NextResponse.json(rows, { status: 200 });
  } catch (err) {
    const msg =
      process.env.NODE_ENV === "development"
        ? err?.parent?.sqlMessage || err?.message
        : "Error retrieving llm configs";
    return NextResponse.json(
      { error: "Error retrieving llm configs", message: msg },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const created = await LLMClientConfig.create(body);
    return NextResponse.json(created, { status: 200 });
  } catch (err) {
    const msg =
      process.env.NODE_ENV === "development"
        ? err?.parent?.sqlMessage || err?.message
        : "Error creating llm config";
    return NextResponse.json(
      { error: "Error creating llm config", message: msg },
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

    const [affectedCount] = await LLMClientConfig.update(updates, {
      where: { id },
    });
    if (affectedCount === 0) {
      return NextResponse.json(
        { error: "LLMClientConfig not found" },
        { status: 404 }
      );
    }

    const updated = await LLMClientConfig.findByPk(id);
    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    const msg =
      process.env.NODE_ENV === "development"
        ? err?.parent?.sqlMessage || err?.message
        : "Error updating llm config";
    return NextResponse.json(
      { error: "Error updating llm config", message: msg },
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

    const row = await LLMClientConfig.findByPk(id);
    if (!row) {
      return NextResponse.json(
        { error: "LLMClientConfig not found" },
        { status: 404 }
      );
    }

    await row.destroy();
    return NextResponse.json(
      { message: "LLMClientConfig deleted" },
      { status: 200 }
    );
  } catch (err) {
    const msg =
      process.env.NODE_ENV === "development"
        ? err?.parent?.sqlMessage || err?.message
        : "Error deleting llm config";
    return NextResponse.json(
      { error: "Error deleting llm config", message: msg },
      { status: 500 }
    );
  }
}

