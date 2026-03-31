"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";

interface Props {
  slug: string;
}

export function LinkDetail({ slug }: Props) {
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

  if (link === undefined || clicks === undefined) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="h-5 w-24 bg-gray-100 rounded animate-pulse mb-6" />
        <div className="h-64 bg-gray-100 rounded-xl animate-pulse" />
      </div>
    );
  }

  if (link === null) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-8">
        <Link href="/links" className="text-sm text-gray-400 hover:text-gray-900 transition-colors">
          ← All links
        </Link>
        <p className="mt-8 text-sm text-gray-400">Link not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <Link
        href="/links"
        className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-900 transition-colors mb-6"
      >
        ← All links
      </Link>

      {/* Header */}
      <div className="mb-6">
      
        {link.label && <p className="text-sm text-gray-500 mt-1">{link.label}</p>}
        <a
          href={link.destination}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-500 hover:underline mt-0.5 inline-block"
        >
          {link.destination}
        </a>
      </div>

      {/* Clicks table */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Click events</p>
          <span className="text-xs font-mono text-gray-400">{clicks.length} total</span>
        </div>

        {clicks.length === 0 ? (
          <p className="text-sm text-gray-400 py-10 text-center">No clicks yet</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-2.5 text-xs font-medium text-gray-400 uppercase tracking-wide">Time</th>
                <th className="text-left px-4 py-2.5 text-xs font-medium text-gray-400 uppercase tracking-wide">Country</th>
                <th className="text-left px-4 py-2.5 text-xs font-medium text-gray-400 uppercase tracking-wide">City</th>
                <th className="text-left px-4 py-2.5 text-xs font-medium text-gray-400 uppercase tracking-wide">Device</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {clicks.map((click) => (
                <tr key={click._id}>
                  <td className="px-4 py-2.5 font-mono text-xs text-gray-400">{timeAgo(click.clickedAt)}</td>
                  <td className="px-4 py-2.5 text-gray-600">{click.country ?? "—"}</td>
                  <td className="px-4 py-2.5 text-gray-600">{click.city ?? "—"}</td>
                  <td className="px-4 py-2.5 text-gray-600">{click.userAgent ? parseDevice(click.userAgent) : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}