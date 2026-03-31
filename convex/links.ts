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

    return link.destination;
  },
});

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("links").order("desc").collect();
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    return await ctx.db
      .query("links")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();
  },
});

export const create = mutation({
  args: {
    slug: v.string(),
    destination: v.string(),
    label: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("links")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();

    if (existing) {
      throw new Error(`Slug "${args.slug}" is already taken`);
    }

    return await ctx.db.insert("links", {
      ...args,
      createdAt: Date.now(),
      totalClicks: 0,
    });
  },
});

export const remove = mutation({
  args: { id: v.id("links") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
  },
});
