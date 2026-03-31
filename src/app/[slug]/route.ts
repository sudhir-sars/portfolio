import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { geolocation } from "@vercel/functions";
import { redirect, notFound } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const { country, city } = geolocation(request);
  const userAgent = request.headers.get("user-agent") ?? undefined;

  const destination = await fetchMutation(api.links.recordAndGetDestination, {
    slug,
    clickedAt: Date.now(),
    country: country ?? undefined,
    city: city ?? undefined,
    userAgent,
  });

  if (!destination) {
    notFound();
  }

  redirect(destination);
}
