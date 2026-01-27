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
        console.error("Validation failed:", JSON.stringify(parsed.error.format(), null, 2));
        console.error("Validation errors:", parsed.error.errors);
        return NextResponse.json({ 
          error: "Date is in the passed", 
          message: parsed.error.format(),
          details: parsed.error.errors 
        }, { status: 400 });
      }
      
      // Prepare data for creation - exclude undefined/null date_of_reminder
      const createData = {
        note: parsed.data.note,
        reminderFolderId: parsed.data.reminderFolderId,
        subListId: parsed.data.subListId,
      };
      
      // Only include date_of_reminder if it's actually provided and valid
      if (parsed.data.date_of_reminder !== undefined && parsed.data.date_of_reminder !== null) {
        // Ensure it's a valid Date object or ISO string
        if (parsed.data.date_of_reminder instanceof Date) {
          createData.date_of_reminder = parsed.data.date_of_reminder;
        } else if (typeof parsed.data.date_of_reminder === 'string') {
          createData.date_of_reminder = new Date(parsed.data.date_of_reminder);
        } else {
          createData.date_of_reminder = parsed.data.date_of_reminder;
        }
      }
      
      console.log("Creating reminder with data:", createData);
         
      // Sequelize will automatically handle createdAt and updatedAt with timestamps: true
      const createReminder = await Reminders.create(createData);
      
      console.log("Reminder created successfully:", createReminder.toJSON());
        
        return NextResponse.json(createReminder, { status: 200 });

        
    } catch (err) {
        console.error("Error creating reminder:", err);
        console.error("Error details:", err.parent?.sqlMessage || err.message);
        const msg =
        process.env.NODE_ENV === "development"
          ? err.parent?.sqlMessage || err.message
          : "Error retrieving";
        return NextResponse.json({ error: "failed creating", message: msg }, { status: 400 });
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