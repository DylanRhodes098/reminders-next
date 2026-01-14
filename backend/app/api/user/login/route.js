// Import libraries //

// Import tools //
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";

// Import model files //

import User from "../../../../models/user.js";

export const runtime = 'nodejs';

// Create post route to login user //
export async function POST(req) {
    try{
        const { email, password } = await req.json();
        if (!email || !password ) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

const user = await User.findOne({ where: { email: String(email).trim().toLowerCase() },
  });

  const ok = user && await bcrypt.compare(password, user.password)
  if (!ok) {
    return NextResponse.json({ error: "incorrect info" }, { status: 400 });
  }

  const userLogin = await signToken({ id: user.id, email: user.email })

  const res = NextResponse.json(userLogin, { status: 200 });
  res.cookies.set("session", userLogin, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60, // 1h
  });

  return res;

    } catch (err) {
      const msg =
          process.env.NODE_ENV === "development"
            ? err.parent?.sqlMessage || err.message
            : "Error retrieving groups";
        return NextResponse.json({ msg, error: "failed Logging in" }, { status: 400 });
    }
}

export const dynamic = "force-dynamic";