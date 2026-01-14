// Import tools //
import { NextResponse } from "next/server";
import {userUpdate, userUpdateWithId} from "../../../../../validation/user";

// Import files //
import User from "../../../../../models/user";

// Initiate PUT function to edit user //
export async function PUT(req, {params}) {
    try {
        const {id} = await params;
        const body = await req.json();
        const parsed = userUpdateWithId.safeParse({id, ...body})
      
        if (!parsed.success) {
            return NextResponse.json({ error: "validation failed", message: parsed.error.format() }, { status: 400 });
        }

        const { id: userId, full_name, email, password } = parsed.data;

        const [user] = await User.update({full_name, email, password }, { where: { id: userId }});

        if (user === 0) {
            return NextResponse.json({ error: "can not find user id" }, { status: 400 });
        }
      
          const updatedUser = await User.findByPk(userId);

        return NextResponse.json ({message: "user updated", user: updatedUser }, { status: 200 });

        } catch (err) {
            const msg =
          process.env.NODE_ENV === "development"
            ? err.parent?.sqlMessage || err.message
            : "Error retrieving groups";
            return NextResponse.json({ msg, error: "failed updating user" }, { status: 400 });
        }
    }


// define force dunamic //
export const dynamic = "force-dynamic";