// Import libraries //


// Import tools //
import { NextResponse } from "next/server";
import { profileCreate } from "../../../validation/profile";


// Import model files //

import Reminders from "../../../models/reminders";

// Define node runtime //
export const runtime = 'nodejs';

// Create a get route to retrieve all profiles //
export async function GET(req) {
    try {
    const reminders = await Reminders.findAll();

    return NextResponse.json(reminders, {status:200});
    } catch (err) {
        console.error("GET failed:", err);
        const msg =
          process.env.NODE_ENV === "development"
            ? err.parent?.sqlMessage || err.message
            : "Error retrieving";
        return NextResponse.json(msg, { error: "Error retrieving folders" }, { status: 500 });
    }
}


// Create a post route to create a profile //
export async function POST(req) {
    try {
    const body = await req.json();
    const parsed = remindersCreate.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json({ error: "Missing fields", message: parsed.error.format() }, { status: 400 });
      }
         
      const createReminder = await Reminders.create(parsed.data);
        
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

export const dynamic = "force-dynamic"