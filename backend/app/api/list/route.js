// Import libraries //


// Import tools //
import { NextResponse } from "next/server";
import { profileCreate } from "../../../validation/profile";


// Import model files //

import List from "../../../models/list";

// Define node runtime //
export const runtime = 'nodejs';

// Create a get route to retrieve all profiles //
export async function GET(req) {
    try {
    const list = await List.findAll();

    return NextResponse.json(list, {status:200});
    } catch (err) {
        console.error("GET failed:", err);
        const msg =
          process.env.NODE_ENV === "development"
            ? err.parent?.sqlMessage || err.message
            : "Error retrieving groups";
        return NextResponse.json(msg, { error: "Error retrieving list" }, { status: 500 });
    }
}

export const dynamic = "force-dynamic"