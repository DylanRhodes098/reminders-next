import "../../../models/index.js";

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import AgentFolder from "../../../models/SaaS/ui/agentFolder.js";
import AgentSubFolder from "../../../models/SaaS/ui/agentSubFolder.js";

import {
  agentFolderCreate,
  agentFolderUpdate,
  agentFolderDelete,
} from "../../../validation/agentFolder.js";
import { JWT_SECRET } from "../../../lib/db.js";

export const runtime = "nodejs";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const include = searchParams.get("include");

    const queryOptions = {};

    if (include === "agentSubFolders") {
      queryOptions.include = [
        {
          model: AgentSubFolder,
          as: "agentSubFolders",
          attributes: ["id", "name", "agentFolderId", "createdAt", "updatedAt"],
        },
      ];
    }

    const folders = await AgentFolder.findAll(queryOptions);

    return NextResponse.json(folders, { status: 200 });
  } catch (err) {
    console.error("GET failed:", err);
    const msg =
      process.env.NODE_ENV === "development"
        ? err.parent?.sqlMessage || err.message
        : "Error retrieving agent folders";
    return NextResponse.json(
      { error: "Error retrieving agent folders", message: msg },
      { status: 500 }
    );
  }
}

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
    } catch (jwtError) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userId = decoded.id;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID not found in token" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const parsed = agentFolderCreate.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Missing fields", message: parsed.error.format() },
        { status: 400 }
      );
    }

    const folderData = {
      ...parsed.data,
      userId: userId,
    };

    const createFolder = await AgentFolder.create(folderData);

    return NextResponse.json(createFolder, { status: 200 });
  } catch (err) {
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

export async function PUT(req) {
  try {
    const body = await req.json();
    const parsed = agentFolderUpdate.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Missing/invalid fields", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { id, name } = parsed.data;

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const updateValues = {};
    if (name !== undefined) updateValues.name = name;

    const [affectedCount] = await AgentFolder.update(updateValues, {
      where: { id },
    });

    if (affectedCount === 0) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }

    const updated = await AgentFolder.findByPk(id);

    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    const msg =
      process.env.NODE_ENV === "development"
        ? err?.parent?.sqlMessage || err?.message
        : "Error updating agent folder";

    return NextResponse.json(
      { error: "failed updating", message: msg },
      { status: 400 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const parsed = agentFolderDelete.safeParse({ id });

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: parsed.error.format(),
        },
        { status: 400 }
      );
    }

    const folder = await AgentFolder.findByPk(parsed.data.id);

    if (!folder) {
      return NextResponse.json(
        { error: "Agent folder not found" },
        { status: 404 }
      );
    }

    await AgentSubFolder.destroy({
      where: { agentFolderId: parsed.data.id },
    });

    await folder.destroy();

    return NextResponse.json(
      { message: "Agent folder deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error deleting agent folder:", err);

    const msg =
      process.env.NODE_ENV === "development"
        ? err?.parent?.sqlMessage || err?.message
        : "Error deleting agent folder";

    return NextResponse.json(
      { error: "Failed deleting agent folder", message: msg },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
