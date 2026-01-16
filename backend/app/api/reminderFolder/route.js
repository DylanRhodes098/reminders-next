// Import libraries //


// Import tools //
import { NextResponse } from "next/server";
import { reminderFolderCreate, reminderFolderUpdate, reminderFolderDelete } from "../../../validation/reminderFolder";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../../lib/db.js";


// Import model files //

import ReminderFolder from "../../../models/reminderFolder";

// Define node runtime //
export const runtime = 'nodejs';

// Create a get route to retrieve all reminder folders //
export async function GET(req) {
    try {
    const { searchParams } = new URL(req.url);
    const subListId = searchParams.get('subListId');
    
    const queryOptions = {};
    
    // Filter by subListId if provided
    if (subListId) {
      queryOptions.where = { subListId };
    }
    
    const reminderFolders = await ReminderFolder.findAll(queryOptions);

    return NextResponse.json(reminderFolders, {status:200});
    } catch (err) {
        console.error("GET failed:", err);
        const msg =
          process.env.NODE_ENV === "development"
            ? err.parent?.sqlMessage || err.message
            : "Error retrieving groups";
        return NextResponse.json(msg, { error: "Error retrieving reminder folders" }, { status: 500 });
    }
}


// Create a post route to create a reminder folder //
export async function POST(req) {
    try {
    // Extract userId from JWT token
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.substring(7); // Remove "Bearer " prefix
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (jwtError) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userId = decoded.id;
    if (!userId) {
      return NextResponse.json({ error: "User ID not found in token" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = reminderFolderCreate.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json({ error: "Missing fields", message: parsed.error.format() }, { status: 400 });
      }
         
      // Add userId to the reminder folder data
      const reminderFolderData = {
        ...parsed.data,
        userId: userId
      };
      
      const createReminderFolder = await ReminderFolder.create(reminderFolderData);
        
        return NextResponse.json(createReminderFolder, { status: 200 });

    } catch (err) {
        const msg =
        process.env.NODE_ENV === "development"
          ? err.parent?.sqlMessage || err.message
          : "Error retrieving";
        return NextResponse.json(msg, { error: "failed creating" }, { status: 400 });
    }
}

export async function PUT(req) {
    try {
      const body = await req.json();
      const parsed = reminderFolderUpdate.safeParse(body);
  
      if (!parsed.success) {
        return NextResponse.json(
          { error: "Missing/invalid fields", details: parsed.error.format() },
          { status: 400 }
        );
      }
  
      const { id, name, subListId } = parsed.data;
  
      if (!id) {
        return NextResponse.json({ error: "Missing id" }, { status: 400 });
      }
  
      // Only update allowed fields
      const updateValues = {};
      if (name !== undefined) updateValues.name = name;
      if (subListId !== undefined) updateValues.subListId = subListId;
  
      const [affectedCount] = await ReminderFolder.update(updateValues, {
        where: { id },
      });
  
      if (affectedCount === 0) {
        return NextResponse.json({ error: "not found" }, { status: 404 });
      }
  
      const updated = await ReminderFolder.findByPk(id);
  
      return NextResponse.json(updated, { status: 200 });
    } catch (err) {
      const msg =
        process.env.NODE_ENV === "development"
          ? err?.parent?.sqlMessage || err?.message
          : "Error updating reminder folder";
  
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
  
      // Validate input
      const parsed = reminderFolderDelete.safeParse({ id });
  
      if (!parsed.success) {
        return NextResponse.json(
          {
            error: "Validation failed",
            details: parsed.error.format(),
          },
          { status: 400 }
        );
      }
  
      // Check reminder folder exists
      const reminderFolder = await ReminderFolder.findByPk(parsed.data.id);
  
      if (!reminderFolder) {
        return NextResponse.json(
          { error: "Reminder folder not found" },
          { status: 404 }
        );
      }
  
      // Delete reminder folder
      await reminderFolder.destroy();
  
      return NextResponse.json(
        { message: "Reminder folder deleted successfully" },
        { status: 200 }
      );
  
    } catch (err) {
      console.error("Error deleting reminder folder:", err);
  
      const msg =
        process.env.NODE_ENV === "development"
          ? err?.parent?.sqlMessage || err?.message
          : "Error deleting reminder folder";
  
      return NextResponse.json(
        { error: "Failed deleting reminder folder", message: msg },
        { status: 500 }
      );
    }
  }

export const dynamic = "force-dynamic"
