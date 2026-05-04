import { createChatReply } from "../../../../lib/openai.js"
import { NextResponse } from "next/server";

export async function POST(req) {
    const body = await req.json();

    const message = body.message || "Say hello";

    const reply = await createChatReply(message);

    return NextResponse.json({ reply }, { status: 200 });
  }

  export const dynamic = "force-dynamic";