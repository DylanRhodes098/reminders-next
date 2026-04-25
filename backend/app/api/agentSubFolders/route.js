import { NextResponse } from "next/server";
import {
  agentSubFolderCreate,
  agentSubFolderDelete,
} from "../../../validation/agentSubFolder.js";

import AgentSubFolder from "../../../models/SaaS/ui/agentSubFolder.js";

export const runtime = "nodejs";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const agentFolderId = searchParams.get("agentFolderId");
    const id = searchParams.get("id");

    const queryOptions = {};

    if (id) {
      const subFolder = await AgentSubFolder.findByPk(id);
      if (!subFolder) {
        return NextResponse.json(
          { error: "Agent sub folder not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(subFolder, { status: 200 });
    }

    if (agentFolderId) {
      queryOptions.where = { agentFolderId };
    }

    const rows = await AgentSubFolder.findAll(queryOptions);

    return NextResponse.json(rows, { status: 200 });
  } catch (err) {
    console.error("GET failed:", err);
    const msg =
      process.env.NODE_ENV === "development"
        ? err.parent?.sqlMessage || err.message
        : "Error retrieving agent sub folders";
    return NextResponse.json(
      { error: "Error retrieving agent sub folders", message: msg },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Received agent sub folder creation request:", body);
    const parsed = agentSubFolderCreate.safeParse(body);

    if (!parsed.success) {
      console.error("Validation failed:", parsed.error.format());
      console.error("Validation errors:", parsed.error.errors);
      return NextResponse.json(
        {
          error: "Validation failed",
          message: parsed.error.format(),
          details: parsed.error.errors,
        },
        { status: 400 }
      );
    }

    const { name, agentFolderId, agentId } = parsed.data;
    const created = await AgentSubFolder.create({
      name,
      // Sequelize + MySQL: explicit null for optional FK (avoid undefined vs NOT NULL)
      agentFolderId: agentFolderId ?? null,
      agentId: agentId ?? null,
    });

    return NextResponse.json(created, { status: 200 });
  } catch (err) {
    console.error("Error creating agent sub folder:", err);
    const msg =
      process.env.NODE_ENV === "development"
        ? err.parent?.sqlMessage || err.message
        : "Error retrieving";
    return NextResponse.json(
      { error: "failed creating", message: msg },
      { status: 400 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const parsed = agentSubFolderDelete.safeParse({ id });

    if (!parsed.success) {
      console.error("Delete validation failed:", parsed.error.format());
      return NextResponse.json(
        {
          error: "Validation failed",
          message: parsed.error.format(),
          details: parsed.error.errors,
        },
        { status: 400 }
      );
    }

    const row = await AgentSubFolder.findByPk(parsed.data.id);

    if (!row) {
      return NextResponse.json(
        { error: "Agent sub folder not found" },
        { status: 404 }
      );
    }

    await row.destroy();

    return NextResponse.json(
      { message: "Agent sub folder deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error deleting agent sub folder:", err);
    const msg =
      process.env.NODE_ENV === "development"
        ? err.parent?.sqlMessage || err.message
        : "Error deleting agent sub folder";

    return NextResponse.json(
      { error: "Failed deleting agent sub folder", message: msg },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
