// app/cv/page.tsx
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { redirect, notFound } from "next/navigation";

export default async function SlugPage() {
  const link = await fetchQuery(api.links.getBySlug, { slug: "cv" });

  if (!link || !link.active) {
    notFound();
  }

  redirect(link.destination);
}