import { NextResponse } from "next/server";

export async function GET() {
  // Redirect requests for /favicon.ico to /favicon.png
  const base = process.env.NEXTAUTH_URL || `http://localhost:${process.env.PORT || 3000}`;
  return NextResponse.redirect(new URL("/favicon.png", base), 307);
}


