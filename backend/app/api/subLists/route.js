// Import libraries //


// Import tools //
import { NextResponse } from "next/server";
import { subListsCreate } from "../../../validation/subList";


// Import model files //

import SubLists from "../../../models/subLists";

// Define node runtime //
export const runtime = 'nodejs';

// Create a get route to retrieve all profiles //
export async function GET(req) {
    try {
    const { searchParams } = new URL(req.url);
    const folderId = searchParams.get('folderId');
    const id = searchParams.get('id');
    
    const queryOptions = {};
    
    // If id is provided, get single subList by id
    if (id) {
      const subList = await SubLists.findByPk(id);
      if (!subList) {
        return NextResponse.json({ error: "SubList not found" }, { status: 404 });
      }
      return NextResponse.json(subList, {status:200});
    }
    
    // Filter by folderId if provided
    if (folderId) {
      queryOptions.where = { folderId };
    }
    
    const subLists = await SubLists.findAll(queryOptions);

    return NextResponse.json(subLists, {status:200});
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
    const parsed = subListsCreate.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json({ error: "Missing fields", message: parsed.error.format() }, { status: 400 });
      }
         
      const createSubLists = await SubLists.create(parsed.data);
        
        return NextResponse.json(createSubLists, { status: 200 });

    } catch (err) {
        const msg =
        process.env.NODE_ENV === "development"
          ? err.parent?.sqlMessage || err.message
          : "Error retrieving";
        return NextResponse.json(msg, { error: "failed creating" }, { status: 400 });
    }
}

export const dynamic = "force-dynamic"