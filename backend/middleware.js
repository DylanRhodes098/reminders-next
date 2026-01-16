import { NextResponse } from "next/server";

export function middleware(req) {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    const res = new NextResponse(null, { status: 200 });
    res.headers.set("Access-Control-Allow-Origin", "http://localhost:5173");
    res.headers.set(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,DELETE,OPTIONS"
    );
    res.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    res.headers.set("Access-Control-Allow-Credentials", "true");
    return res;
  }

  const res = NextResponse.next();

  res.headers.set("Access-Control-Allow-Origin", "http://localhost:5173");
  res.headers.set(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS"
  );
  res.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  res.headers.set("Access-Control-Allow-Credentials", "true");

  return res;
}

export const config = {
  matcher: "/api/:path*",
};
