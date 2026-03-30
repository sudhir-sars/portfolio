import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  links: defineTable({
    slug: v.string(),
    destination: v.string(),
    label: v.optional(v.string()),
    active: v.boolean(),
    createdAt: v.number(),
  }).index("by_slug", ["slug"]),
});
