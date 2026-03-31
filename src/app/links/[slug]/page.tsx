"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { use } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { ArrowLeft, ExternalLink } from "lucide-react";

export default function LinkDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const link = useQuery(api.links.getBySlug, { slug });
  const clicks = useQuery(
    api.clickEvents.getByLink,
    link ? { linkId: link._id } : "skip"
  );

  function timeAgo(ts: number) {
    const d = Date.now() - ts;
    if (d < 60000) return "just now";
    if (d < 3600000) return `${Math.round(d / 60000)}m ago`;
    if (d < 86400000) return `${Math.round(d / 3600000)}h ago`;
    return `${Math.round(d / 86400000)}d ago`;
  }

  function parseDevice(ua: string): string {
    if (/mobile/i.test(ua)) return "Mobile";
    if (/tablet|ipad/i.test(ua)) return "Tablet";
    return "Desktop";
  }

  // 🔄 Loading
  if (link === undefined || clicks === undefined) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-6">
        <div className="h-6 w-32 bg-muted rounded animate-pulse" />
        <div className="h-28 bg-muted rounded-xl animate-pulse" />
        <div className="h-64 bg-muted rounded-xl animate-pulse" />
      </div>
    );
  }

  // ❌ Not found
  if (link === null) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-10">
        <Link
          href="/links"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to links
        </Link>

        <p className="mt-10 text-muted-foreground">Link not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
      
      {/* 🔙 Back */}
      <Link
        href="/links"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to links
      </Link>

      {/* 🧠 Header */}
      <Card>
        <CardContent className="p-6 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                /{link.slug}
              </h1>

              {link.label && (
                <p className="text-sm text-muted-foreground mt-1">
                  {link.label}
                </p>
              )}
            </div>

            <Badge variant="secondary" className="font-mono">
              {link.totalClicks.toLocaleString()} clicks
            </Badge>
          </div>

          <a
            href={link.destination}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-blue-500 hover:underline inline-flex items-center gap-1"
          >
            {link.destination}
            <ExternalLink className="h-3 w-3" />
          </a>
        </CardContent>
      </Card>

      {/* 📊 Clicks */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="px-6 py-4 border-b flex items-center justify-between">
            <p className="text-sm font-medium">Click Events</p>
            <span className="text-xs text-muted-foreground font-mono">
              {clicks.length} total
            </span>
          </div>

          {clicks.length === 0 ? (
            <div className="py-16 text-center text-muted-foreground">
              No clicks yet
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">
                    Time
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">
                    Country
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">
                    City
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">
                    Device
                  </th>
                </tr>
              </thead>

              <tbody>
                {clicks.map((click) => (
                  <tr
                    key={click._id}
                    className="border-b hover:bg-muted/40 transition"
                  >
                    <td className="px-6 py-3 font-mono text-xs text-muted-foreground">
                      {timeAgo(click.clickedAt)}
                    </td>
                    <td className="px-6 py-3">
                      {click.country ?? "—"}
                    </td>
                    <td className="px-6 py-3">
                      {click.city ?? "—"}
                    </td>
                    <td className="px-6 py-3">
                      {click.userAgent
                        ? parseDevice(click.userAgent)
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}