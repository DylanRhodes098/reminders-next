// Import libraries //


// Import tools //
import { NextResponse } from "next/server";
import { folderCreate, folderUpdate } from "../../../validation/folder";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../../lib/db.js";


// Import model files //

import Folder from "../../../models/folder";
import SubLists from "../../../models/subLists";

// Define node runtime //
export const runtime = 'nodejs';

// Create a get route to retrieve all profiles //
export async function GET(req) {
    try {
    const { searchParams } = new URL(req.url);
    const include = searchParams.get('include');
    
    const queryOptions = {};
    
    // Include sublists if requested
    if (include === 'subLists') {
      queryOptions.include = [{
        model: SubLists,
        as: 'subLists',
        attributes: ['id', 'name', 'folderId', 'createdAt', 'updatedAt']
      }];
    }
    
    const folders = await Folder.findAll(queryOptions);

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
    const parsed = folderCreate.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json({ error: "Missing fields", message: parsed.error.format() }, { status: 400 });
      }
         
      // Add userId to the folder data
      const folderData = {
        ...parsed.data,
        userId: userId
      };
      
      const createFolder = await Folder.create(folderData);
        
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