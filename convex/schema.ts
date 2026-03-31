import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  links: defineTable({
    slug: v.string(),
    destination: v.string(),
    label: v.string(),
    createdAt: v.number(),
    totalClicks: v.number(),
    lastClickedAt: v.optional(v.number()),
  }).index("by_slug", ["slug"]),

  clickEvents: defineTable({
    linkId: v.id("links"),
    clickedAt: v.number(),
    userAgent: v.optional(v.string()),
    country: v.optional(v.string()),
    city: v.optional(v.string()),
  })
    .index("by_link", ["linkId"])
    .index("by_clicked_at", ["clickedAt"]),
});
