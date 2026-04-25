// Import libraries //


// Import tools //
import { NextResponse } from "next/server";
import { listCreate } from "../../../validation/list";


// Import model files //

import List from "../../../models/SaaS/ui/list";



// guarantees this route runs in the Node.js runtime, giving access to Node-only tools and APIs. //
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