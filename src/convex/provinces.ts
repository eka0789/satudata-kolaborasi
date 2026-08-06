import { v } from "convex/values";

import { internalMutation, internalQuery, query } from "./_generated/server";

/** Server-only: used by the seed action. */
export const seedInsert = internalMutation({
  args: { code: v.string(), name: v.string(), region: v.optional(v.string()) },
  handler: async (ctx, args) => {
    return await ctx.db.insert("provinces", args);
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("provinces").order("asc").collect();
  },
});

export const get = query({
  args: { provinceId: v.id("provinces") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.provinceId);
  },
});

/** Server-only: used by the seed action. */
export const getByCode = internalQuery({
  args: { code: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("provinces")
      .withIndex("by_code", (q) => q.eq("code", args.code))
      .first();
  },
});
