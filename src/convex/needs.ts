import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";

import { mutation, query } from "./_generated/server";

export const listByProject = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("needs")
      .withIndex("by_projectId", (q) => q.eq("projectId", args.projectId))
      .order("desc")
      .collect();
  },
});

export const listOpen = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("needs")
      .withIndex("by_status", (q) => q.eq("status", "open"))
      .order("desc")
      .collect();
  },
});

export const get = query({
  args: { needId: v.id("needs") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.needId);
  },
});

export const create = mutation({
  args: {
    projectId: v.id("projects"),
    title: v.string(),
    description: v.optional(v.string()),
    categoryId: v.optional(v.id("categories")),
    quantity: v.optional(v.number()),
    skillsRequired: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Not authenticated");
    }
    return await ctx.db.insert("needs", {
      ...args,
      status: "open",
      createdBy: userId,
    });
  },
});

export const update = mutation({
  args: {
    needId: v.id("needs"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    categoryId: v.optional(v.id("categories")),
    quantity: v.optional(v.number()),
    skillsRequired: v.optional(v.array(v.string())),
    status: v.optional(
      v.union(
        v.literal("open"),
        v.literal("in_progress"),
        v.literal("fulfilled"),
        v.literal("closed"),
      ),
    ),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Not authenticated");
    }
    const need = await ctx.db.get(args.needId);
    if (!need) {
      throw new Error("Need not found");
    }
    if (need.createdBy !== userId) {
      throw new Error("Only the creator can update this need");
    }
    const { needId, ...patch } = args;
    await ctx.db.patch(needId, patch);
    return needId;
  },
});

export const remove = mutation({
  args: { needId: v.id("needs") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Not authenticated");
    }
    const need = await ctx.db.get(args.needId);
    if (!need) {
      throw new Error("Need not found");
    }
    if (need.createdBy !== userId) {
      throw new Error("Only the creator can delete this need");
    }
    await ctx.db.delete(args.needId);
  },
});
