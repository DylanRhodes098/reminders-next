import { NextResponse } from "next/server";
import { userDelete } from "../../../../../validation/user";
import { User } from "../../../../../models/user";

export async function DELETE(req, {params} ) {
  try {
  
    const parsed = userDelete.safeParse({ id: (await params).id });
    if (!parsed.success) {
      return NextResponse.json({ error: "Missing user id", message:parsed.error.format() }, { status: 400 });
    }

    const { id }= parsed.data;

    const deleted = await User.destroy({ where: { id } });

    if (deleted === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully", id }, { status: 200 });
  } catch (err) {
    const msg =
      process.env.NODE_ENV === "development"
        ? err.parent?.sqlMessage || err.message
        : "Failed deleting user";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}


// export force dynamic //
export const dynamic = "force-dynamic";
