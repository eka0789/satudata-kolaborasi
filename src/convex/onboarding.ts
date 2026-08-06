import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";

import { mutation, query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }
    return await ctx.db
      .query("onboarding")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();
  },
});

export const update = mutation({
  args: {
    step: v.optional(v.number()),
    completed: v.optional(v.boolean()),
    data: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Not authenticated");
    }
    const existing = await ctx.db
      .query("onboarding")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();
    if (existing) {
      await ctx.db.patch(existing._id, args);
      return existing._id;
    }
    return await ctx.db.insert("onboarding", {
      userId,
      step: args.step ?? 1,
      completed: args.completed ?? false,
      data: args.data,
    });
  },
});

/** Marks onboarding complete and flips the user's isOnboarded flag. */
export const complete = mutation({
  args: { data: v.optional(v.any()) },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Not authenticated");
    }
    const existing = await ctx.db
      .query("onboarding")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();
    const recordId = existing
      ? existing._id
      : await ctx.db.insert("onboarding", {
          userId,
          step: 1,
          completed: true,
          data: args.data,
        });
    if (existing) {
      await ctx.db.patch(recordId, { completed: true, data: args.data });
    }
    await ctx.db.patch(userId, { isOnboarded: true });
    return recordId;
  },
});
