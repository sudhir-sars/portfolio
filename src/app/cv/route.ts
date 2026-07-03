import { NextResponse } from "next/server";
import { RESUME_URL } from "@/data/resume";

// Server-only short link: /cv → the canonical resume URL.
export function GET() {
  return NextResponse.redirect(RESUME_URL, 307);
}
