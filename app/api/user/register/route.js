// Import tools //
import { NextResponse } from "next/server";
import { userCreate } from "../../../../validation/user";
import User from "../../../../models/user.js";

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

const beforeCount = await User.count();
console.log("[POST /api/user/register] BEFORE count:", beforeCount, "DB:", sequelize.config?.database, sequelize.config?.host, sequelize.config?.port);

const userRegister = await User.create({
    full_name,
    email: email.trim().toLowerCase(),
    password
    });

const afterCount = await User.count();
console.log("[POST /api/user/register] AFTER count:", afterCount);

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