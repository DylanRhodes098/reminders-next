import { NextResponse } from "next/server";
import User from "../../../models/user.js";
import sequelize from "../../../lib/db.js";

export const runtime = 'nodejs';

export async function GET() {
    try{
console.log("[GET /api/user] DB:", sequelize.config?.database, sequelize.config?.host, sequelize.config?.port);
const users = await User.findAll();
if (!users) {
    return NextResponse.json({ error: "can not find users" }, { status: 400 });
}

return NextResponse.json(users);

    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: "failed retrieving user" }, { status: 400 });
    }
}

export const dynamic = "force-dynamic";