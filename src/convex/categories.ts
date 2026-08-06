import { v } from "convex/values";

import { internalMutation, internalQuery, query } from "./_generated/server";

/** Server-only: used by the seed action. */
export const seedInsert = internalMutation({
  args: {
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("categories", args);
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("categories").order("asc").collect();
  },
});

export const get = query({
  args: { categoryId: v.id("categories") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.categoryId);
  },
});

/** Server-only: used by the seed action. */
export const getBySlug = internalQuery({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("categories")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});
