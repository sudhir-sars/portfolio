// convex/clickEvents.ts
import { mutation } from "./_generated/server";
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

    if (!link || !link.active) return null;

    await ctx.db.insert("clickEvents", {
      linkId: link._id,
      ...clickData,
    });

    return link.destination;
  },
});
