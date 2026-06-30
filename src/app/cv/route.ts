import { NextResponse } from "next/server";
import { RESUME_URL } from "@/components/landing/story/sections/resume/resume";

// Server-only short link: /cv → the canonical résumé URL.
export function GET() {
  return NextResponse.redirect(RESUME_URL, 307);
}
