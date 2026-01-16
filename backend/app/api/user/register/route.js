// Import tools //
import { NextResponse } from "next/server";
import { userCreate } from "../../../../validation/user";
import User from "../../../../models/user.js";
import Folder from "../../../../models/folder.js";
import SubLists from "../../../../models/subLists.js";
import List from "../../../../models/list.js";

export const runtime = 'nodejs';

// Create get route to retrieve all users //
export async function GET() {
    try{
const users = await User.findAll();
if (!users) {
    return NextResponse.json({ error: "can not find users" }, { status: 400 });
}

return NextResponse.json(users);

    } catch (err) {
        return NextResponse.json({ error: "failed retrieving user" }, { status: 400 });
    }
}


// Create post route to register user //
export async function POST(req) {
    try{
const body = await req.json();

const parsed = userCreate.safeParse(body);

if(!parsed.success) {
    return NextResponse.json({ error: "Invalid data fields", message: parsed.error.format() }, { status: 400 });
}

const { full_name, email, password } = parsed.data;

const userRegister = await User.create({
    full_name,
    email: email.trim().toLowerCase(),
    password
    });

// Create default seeder data for the new user
const userId = userRegister.id;

// Create default folders
const workFolder = await Folder.create({
    name: 'Work',
    userId: userId
});

const personalFolder = await Folder.create({
    name: 'Personal',
    userId: userId
});

// Create default sublists
const morningSubList = await SubLists.create({
    name: 'Morning',
    folderId: workFolder.id
});

const eveningSubList = await SubLists.create({
    name: 'Evening',
    folderId: personalFolder.id
});

// Create default lists
await List.create({
    name: 'Daily Tasks',
    folderId: workFolder.id,
    subListId: morningSubList.id
});

await List.create({
    name: 'Fitness',
    folderId: personalFolder.id,
    subListId: eveningSubList.id
});

    return NextResponse.json(userRegister, { status: 200 });

    } catch (err) {
        const msg =
          process.env.NODE_ENV === "development"
            ? err.parent?.sqlMessage || err.message
            : "Error retrieving groups";
        return NextResponse.json(msg, { error: "failed creating user" }, { status: 400 });
    }
}

export const dynamic = "force-dynamic";