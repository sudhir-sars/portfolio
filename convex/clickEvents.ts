import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const recordAndGetDestination = mutation({
  args: {
    slug: v.string(),
    clickedAt: v.number(),
    userAgent: v.optional(v.string()),
    country: v.optional(v.string()),
    city: v.optional(v.string()),
  },
  handler: async (ctx, { slug, ...clickData }) => {
    const link = await ctx.db
      .query("links")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();

    if (!link) return null;

    await ctx.db.insert("clickEvents", {
      linkId: link._id,
      ...clickData,
    });

    await ctx.db.patch(link._id, {
      totalClicks: link.totalClicks + 1,
      lastClickedAt: clickData.clickedAt,
    });

    return link.destination;
  },
});

export const getByLink = query({
  args: { linkId: v.id("links") },
  handler: async (ctx, { linkId }) => {
    return await ctx.db
      .query("clickEvents")
      .withIndex("by_link", (q) => q.eq("linkId", linkId))
      .order("desc")
      .collect();
  },
});

export const getRecentByLink = query({
  args: { linkId: v.id("links"), limit: v.optional(v.number()) },
  handler: async (ctx, { linkId, limit = 20 }) => {
    return await ctx.db
      .query("clickEvents")
      .withIndex("by_link", (q) => q.eq("linkId", linkId))
      .order("desc")
      .take(limit);
  },
});

export const getCountryStats = query({
  args: { linkId: v.id("links") },
  handler: async (ctx, { linkId }) => {
    const events = await ctx.db
      .query("clickEvents")
      .withIndex("by_link", (q) => q.eq("linkId", linkId))
      .collect();

    const counts: Record<string, number> = {};
    for (const e of events) {
      const key = e.country ?? "Unknown";
      counts[key] = (counts[key] ?? 0) + 1;
    }

    const total = events.length;
    return Object.entries(counts)
      .map(([country, count]) => ({
        country,
        count,
        pct: total > 0 ? Math.round((count / total) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  },
});

export const getDailyStats = query({
  args: { linkId: v.id("links"), days: v.optional(v.number()) },
  handler: async (ctx, { linkId, days = 30 }) => {
    const since = Date.now() - days * 24 * 60 * 60 * 1000;

    const events = await ctx.db
      .query("clickEvents")
      .withIndex("by_link", (q) => q.eq("linkId", linkId))
      .filter((q) => q.gte(q.field("clickedAt"), since))
      .collect();

    const counts: Record<string, number> = {};

    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000);
      const key = d.toISOString().split("T")[0];
      counts[key] = 0;
    }

    for (const e of events) {
      const key = new Date(e.clickedAt).toISOString().split("T")[0];
      if (key in counts) counts[key]++;
    }

    return Object.entries(counts).map(([date, count]) => ({ date, count }));
  },
});
