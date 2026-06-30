import { mutation, query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const view = await ctx.db.query("views").first();
    return view?.count ?? 0;
  },
});

export const increment = mutation({
  args: {},
  handler: async (ctx) => {
    const view = await ctx.db.query("views").first();

    if (!view) {
      await ctx.db.insert("views", { count: 1 });
      return 1;
    }

    await ctx.db.patch(view._id, {
      count: view.count + 1,
    });

    return view.count + 1;
  },
});
