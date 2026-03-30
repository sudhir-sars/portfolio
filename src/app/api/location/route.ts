import { geolocation } from "@vercel/functions";
import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  const geo = geolocation(req);
  return NextResponse.json(geo);
}
