import { v } from "convex/values";
import { internalMutation } from "./_generated/server";

/**
 * Persist a contact submission. Internal, only callable from the
 * `contact.send` action after the email has been dispatched.
 */
export const log = internalMutation({
  args: {
    name: v.string(),
    email: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("messages", {
      ...args,
      createdAt: Date.now(),
    });
  },
});
