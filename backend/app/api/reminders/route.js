// Import libraries //


// Import tools //
import { NextResponse } from "next/server";
import { remindersCreate, remindersDelete, remindersUpdate } from "../../../validation/reminders";


// Import model files //

import Reminders from "../../../models/reminders";

// Define node runtime //
export const runtime = 'nodejs';

// Create a get route to retrieve all profiles //
export async function GET(req) {
    try {
    const { searchParams } = new URL(req.url);
    const subListId = searchParams.get('subListId');
    console.log("GET reminders request - subListId:", subListId);
    
    const queryOptions = {};
    
    // Filter by subListId if provided
    if (subListId) {
      queryOptions.where = { subListId };
    }
    
    const reminders = await Reminders.findAll(queryOptions);
    console.log("Found reminders:", reminders.length);

    return NextResponse.json(reminders, {status:200});
    } catch (err) {
        console.error("GET reminders failed:", err);
        const msg =
          process.env.NODE_ENV === "development"
            ? err.parent?.sqlMessage || err.message
            : "Error retrieving";
        return NextResponse.json({ error: "Error retrieving reminders", message: msg }, { status: 500 });
    }
}


// Create a post route to create a profile //
export async function POST(req) {
    try {
    const body = await req.json();

    console.log("POST /reminders body keys:", Object.keys(body));
    console.log("POST /reminders body:", body);
    
    const parsed = remindersCreate.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json({ error: "Missing fields", message: parsed.error.format() }, { status: 400 });
      }
         
      const createReminder = await Reminders.create(parsed.data, {
        fields: ["note", "reminderFolderId", "subListId", "date_of_reminder"], // whitelist
      });
        
        return NextResponse.json(createReminder, { status: 200 });

        
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
      const parsed = remindersUpdate.safeParse(body);
  
      if (!parsed.success) {
        return NextResponse.json(
          { error: "Missing/invalid fields", details: parsed.error.format() },
          { status: 400 }
        );
      }
  
      const { id, note, date_of_reminder } = parsed.data;
  
      if (!id) {
        return NextResponse.json({ error: "Missing id" }, { status: 400 });
      }
  
      // Only update allowed fields
      const updateValues = {};
      if (note !== undefined) updateValues.note = note;
      if (date_of_reminder !== undefined) updateValues.date_of_reminder = date_of_reminder;
  
      const [affectedCount] = await Reminders.update(updateValues, {
        where: { id },
      });
  
      if (affectedCount === 0) {
        return NextResponse.json({ error: "Reminder not found" }, { status: 404 });
      }
  
      const updated = await Reminders.findByPk(id);
  
      return NextResponse.json(updated, { status: 200 });
    } catch (err) {
      const msg =
        process.env.NODE_ENV === "development"
          ? err?.parent?.sqlMessage || err?.message
          : "Error updating reminder";
  
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
  
      const parsed = remindersDelete.safeParse({ id });
  
      if (!parsed.success) {
        return NextResponse.json(
          { error: "Missing/invalid id", details: parsed.error.format() },
          { status: 400 }
        );
      }
  
      const deletedCount = await Reminders.destroy({
        where: { id: parsed.data.id },
      });
  
      if (deletedCount === 0) {
        return NextResponse.json({ error: "Reminder not found" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Deleted", id: parsed.data.id }, { status: 200 });
    } catch (err) {
      const msg =
        process.env.NODE_ENV === "development"
          ? err?.parent?.sqlMessage || err?.message
          : "Error deleting reminder";
  
      return NextResponse.json({ error: "failed deleting", message: msg }, { status: 500 });
    }
  }
  
  

export const dynamic = "force-dynamic"