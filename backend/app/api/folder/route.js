// - - - // - - - //
// Imports 
// - - - // - - - //

// < - Library Imports - > //
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// < - Model imports - > //
import Folder from "../../../models/SaaS/ui/folder";
import SubLists from "../../../models/SaaS/ui/subLists";

// < - Function imports - > //
import { folderCreate, folderUpdate, folderDelete } from "../../../validation/folder";
import { JWT_SECRET } from "../../../lib/db.js";

// - - - // - - - //
// Node 
// - - - // - - - //

// < - guarantees this route runs in the Node.js runtime, giving access to Node-only tools and APIs - > //
export const runtime = 'nodejs';

// - - - // - - - //
// Routes
// - - - // - - - //

  // »« - »« »« - »« »« - »« //
  // Get route 
  // »« - »« »« - »« »« - »« //
export async function GET(req) {
  

  // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
  // Walk 
  // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
    try {

      // @ - @ @ - @ @ - @ //
      // enter the aiport 
      // @ - @ @ - @ @ - @ //

      // < - Define the frontend url the user repsonded - > //
    const { searchParams } = new URL(req.url);

    // < - Define include to navigate through the url and find the value for key "include" - > //
    const include = searchParams.get('include');
    
    // < - Define an empty object - > //
    const queryOptions = {};
    
    // * * * //
    // if the value in the url is equaivelant to the subList asked by the uber 
    // * * * //
    if (include === 'subLists') {

      // @ - @ @ - @ @ - @ //
      // Collect luggage and passport
      // @ - @ @ - @ @ - @ //

      // < - Give the object a specific request to send to the model file - > //
      queryOptions.include = [{
        model: SubLists,
        as: 'subLists',
        attributes: ['id', 'name', 'folderId', 'createdAt', 'updatedAt']
      }];
    }
    // < - Fetch all folders from the model file using the provided query options - > // 
    const folders = await Folder.findAll(queryOptions);
    
    console.timeEnd("Folder.findAll");

    console.log("GET folders finished", folders.length);
    // < - Return a success message - > //
    return NextResponse.json(folders, {status:200});

    // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
    // Wait 
    // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
    } catch (err) {

      // < - Return error message if data failed security - > //
        console.error("GET failed:", err);
        const msg =
          process.env.NODE_ENV === "development"
            ? err.parent?.sqlMessage || err.message
            : "Error retrieving groups";
        return NextResponse.json(msg, { error: "Error retrieving folders" }, { status: 500 });
    }
}


 // »« - »« »« - »« »« - »« //
  // Post Route 
  // »« - »« »« - »« »« - »« //
export async function POST(req) {

  // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
  // Walk 
  // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
    try {

// @ - @ @ - @ @ - @ //
// enter the aiport 
// @ - @ @ - @ @ - @ //

    // < - Define the authroization value in the header of the JWT - > //
    const authHeader = req.headers.get("authorization");

    // * * * //
    // If there isn't an authroization value or the value doesn't start with Bearer 
    // * * * //
    if (!authHeader || !authHeader.startsWith("Bearer ")) {

      // < - Retur error message - > //
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // < - Remove bearer from authroization value string - > //
    const token = authHeader.substring(7); 

    // < - define decoded - > //
    let decoded;

    // < - Walk - > //
    try {

      // @ - @ @ - @ @ - @ //
      // Passport check (secuirty check the user) 
      // @ - @ @ - @ @ - @ //

      // < - define decoded to verify the new token - > //
      // < - token = header.payload.signature - > //
      // < - verify recomputes the token (signs it again) and checks they match - > //
      // < - If they dont match then it had been tampered with along the way - > //
      decoded = jwt.verify(token, JWT_SECRET);

      // < - Wait - > //
    } catch (jwtError) {

      // < - if there is an error verifiying the token, return an error - > //
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // < - retieve the id from the verified token - > //
    const userId = decoded.id;

    // * * * //
    // if there isnt an id 
    // * * * //
    if (!userId) {

      // < - return an error message - > //
      return NextResponse.json({ error: "User ID not found in token" }, { status: 401 });
    }

    // @ - @ @ - @ @ - @ //
    // Luggage check (secuirty check the data) 
    // @ - @ @ - @ @ - @ //

    // < - retrieve the json in the request - > //
    // < - req.json reads and return the raw json (which is the data the user wants to edit, add or delete) - > //
    const body = await req.json();

    // < - Use zod to security check the data - > //
    // < - Zod returns an object that looks like this = {success: true, data: { X } - > //
    const parsed = folderCreate.safeParse(body);

    // * * * //
    // If security check was unsuccessful 
    // * * * //
    if (!parsed.success) {

        // < - Return an error resoponse - > //
        return NextResponse.json({ error: "Missing fields", message: parsed.error.format() }, { status: 400 });
      }
         
      // @ - @ @ - @ @ - @ //
      // Collect luggage and passport (wrap the user and data into an object) 
      // @ - @ @ - @ @ - @ //

      // < - Create an object - > //
      const folderData = {

        // < - extract the data from the zod object - > //
        ...parsed.data,

        // < - Add the id - > //
        userId: userId
      };

      // @ - @ @ - @ @ - @ //
      // Get on the plane 
      // @ - @ @ - @ @ - @ //
      
      // < - Send the new folder object to the model file - > // 
      const createFolder = await Folder.create(folderData);
        
      // < - Return success message - > // 
        return NextResponse.json(createFolder, { status: 200 });

        // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
        // Wait 
        // ‡ - ‡ ‡ - ‡ ‡ - ‡ //
    } catch (err) {

      // < - Return error message - > //
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

  export async function DELETE(req) {
    try {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");
  
      // Validate input
      const parsed = folderDelete.safeParse({ id });
  
      if (!parsed.success) {
        return NextResponse.json(
          {
            error: "Validation failed",
            details: parsed.error.format(),
          },
          { status: 400 }
        );
      }
  
      // Check folder exists
      const folder = await Folder.findByPk(parsed.data.id);
  
      if (!folder) {
        return NextResponse.json(
          { error: "Folder not found" },
          { status: 404 }
        );
      }
  
      /**
       * IMPORTANT:
       * Delete child sublists first to avoid foreign key constraint errors
       */
      await SubLists.destroy({
        where: { folderId: parsed.data.id },
      });
  
      // Delete folder
      await folder.destroy();
  
      return NextResponse.json(
        { message: "Folder deleted successfully" },
        { status: 200 }
      );
  
    } catch (err) {
      console.error("Error deleting folder:", err);
  
      const msg =
        process.env.NODE_ENV === "development"
          ? err?.parent?.sqlMessage || err?.message
          : "Error deleting folder";
  
      return NextResponse.json(
        { error: "Failed deleting folder", message: msg },
        { status: 500 }
      );
    }
  }

export const dynamic = "force-dynamic"