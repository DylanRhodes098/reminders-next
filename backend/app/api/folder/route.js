// Import libraries //


// Import tools //
import { NextResponse } from "next/server";
import { folderCreate } from "../../../validation/folder";


// Import model files //

import Folder from "../../../models/folder";

// Define node runtime //
export const runtime = 'nodejs';

// Create a get route to retrieve all profiles //
export async function GET(req) {
    try {
    const folders = await Folder.findAll();

    return NextResponse.json(folders, {status:200});
    } catch (err) {
        console.error("GET failed:", err);
        const msg =
          process.env.NODE_ENV === "development"
            ? err.parent?.sqlMessage || err.message
            : "Error retrieving groups";
        return NextResponse.json(msg, { error: "Error retrieving folders" }, { status: 500 });
    }
}


// Create a post route to create a profile //
export async function POST(req) {
    try {
    const body = await req.json();
    const parsed = folderCreate.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json({ error: "Missing fields", message: parsed.error.format() }, { status: 400 });
      }
         
      const createFolder = await Folder.create(parsed.data);
        
        return NextResponse.json(createFolder, { status: 200 });

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
      const parsed = folderUpdate.safeParse(body);
  
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
  
      // Only update allowed fields
      const updateValues = {};
      if (name !== undefined) updateValues.name = name;
  
      const [affectedCount] = await Folder.update(updateValues, {
        where: { id },
      });
  
      if (affectedCount === 0) {
        return NextResponse.json({ error: "not found" }, { status: 404 });
      }
  
      const updated = await Folder.findByPk(id);
  
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