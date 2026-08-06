import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";

import { mutation, query } from "./_generated/server";

export const list = query({
  args: {
    categoryId: v.optional(v.id("categories")),
    provinceId: v.optional(v.id("provinces")),
    featured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const communities = args.categoryId
      ? await ctx.db
          .query("communities")
          .withIndex("by_categoryId", (q) => q.eq("categoryId", args.categoryId))
          .order("asc")
          .collect()
      : await ctx.db.query("communities").order("asc").collect();
    return communities.filter((c) => {
      if (args.provinceId && c.provinceId !== args.provinceId) return false;
      if (args.featured !== undefined && !!c.isFeatured !== args.featured)
        return false;
      return true;
    });
  },
});

export const get = query({
  args: { communityId: v.id("communities") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.communityId);
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("communities")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    provinceId: v.optional(v.id("provinces")),
    categoryId: v.optional(v.id("categories")),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Not authenticated");
    }
    const communityId = await ctx.db.insert("communities", {
      ...args,
      createdBy: userId,
      isFeatured: false,
    });
    // The creator becomes the community admin.
    await ctx.db.insert("communityMembers", {
      communityId,
      userId,
      role: "admin",
    });
    return communityId;
  },
});

export const update = mutation({
  args: {
    communityId: v.id("communities"),
    name: v.optional(v.string()),
    slug: v.optional(v.string()),
    description: v.optional(v.string()),
    provinceId: v.optional(v.id("provinces")),
    categoryId: v.optional(v.id("categories")),
    imageUrl: v.optional(v.string()),
    isFeatured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Not authenticated");
    }
    const community = await ctx.db.get(args.communityId);
    if (!community) {
      throw new Error("Community not found");
    }
    const membership = await ctx.db
      .query("communityMembers")
      .withIndex("by_community_user", (q) =>
        q.eq("communityId", args.communityId).eq("userId", userId),
      )
      .first();
    const isAdmin =
      community.createdBy === userId ||
      membership?.role === "admin" ||
      membership?.role === "moderator";
    if (!isAdmin) {
      throw new Error("Only community admins can update this community");
    }
    const { communityId, ...patch } = args;
    await ctx.db.patch(communityId, patch);
    return communityId;
  },
});

export const remove = mutation({
  args: { communityId: v.id("communities") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Not authenticated");
    }
    const community = await ctx.db.get(args.communityId);
    if (!community) {
      throw new Error("Community not found");
    }
    if (community.createdBy !== userId) {
      throw new Error("Only the creator can delete this community");
    }
    await ctx.db.delete(args.communityId);
    // Clean up memberships.
    const members = await ctx.db
      .query("communityMembers")
      .withIndex("by_communityId", (q) => q.eq("communityId", args.communityId))
      .collect();
    for (const member of members) {
      await ctx.db.delete(member._id);
    }
  },
});

// ---------------------------------------------------------------------------
// Membership
// ---------------------------------------------------------------------------

export const listMembers = query({
  args: { communityId: v.id("communities") },
  handler: async (ctx, args) => {
    const members = await ctx.db
      .query("communityMembers")
      .withIndex("by_communityId", (q) => q.eq("communityId", args.communityId))
      .collect();
    return Promise.all(
      members.map(async (m) => {
        const user = await ctx.db.get(m.userId);
        return { ...m, user };
      }),
    );
  },
});

export const join = mutation({
  args: { communityId: v.id("communities") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Not authenticated");
    }
    const existing = await ctx.db
      .query("communityMembers")
      .withIndex("by_community_user", (q) =>
        q.eq("communityId", args.communityId).eq("userId", userId),
      )
      .first();
    if (existing) {
      return existing._id;
    }
    return await ctx.db.insert("communityMembers", {
      communityId: args.communityId,
      userId,
      role: "member",
    });
  },
});

export const leave = mutation({
  args: { communityId: v.id("communities") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Not authenticated");
    }
    const membership = await ctx.db
      .query("communityMembers")
      .withIndex("by_community_user", (q) =>
        q.eq("communityId", args.communityId).eq("userId", userId),
      )
      .first();
    if (membership) {
      await ctx.db.delete(membership._id);
    }
  },
});

export const myMemberships = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return [];
    }
    const memberships = await ctx.db
      .query("communityMembers")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();
    return Promise.all(
      memberships.map(async (m) => {
        const community = await ctx.db.get(m.communityId);
        return { ...m, community };
      }),
    );
  },
});
