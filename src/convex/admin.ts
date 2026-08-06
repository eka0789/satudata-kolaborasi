import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { ROLES, requireAdmin } from "./roles";

/** Platform-wide admin overview. */
export const getOverview = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    const [users, communities, projects, events, needs] = await Promise.all([
      ctx.db.query("users").collect(),
      ctx.db.query("communities").collect(),
      ctx.db.query("projects").collect(),
      ctx.db.query("events").collect(),
      ctx.db.query("needs").collect(),
    ]);
    return {
      userCount: users.length,
      communityCount: communities.length,
      projectCount: projects.length,
      eventCount: events.length,
      needCount: needs.length,
    };
  },
});

/** Promote or demote a user's platform role. */
export const setUserRole = mutation({
  args: {
    userId: v.id("users"),
    role: v.union(v.literal("user"), v.literal("admin")),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const user = await ctx.db.get(args.userId);
    if (!user) {
      throw new Error("User not found");
    }
    await ctx.db.patch(args.userId, { role: args.role });
  },
});

/** Delete a user account and their owned resources. */
export const deleteUser = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const user = await ctx.db.get(args.userId);
    if (!user) {
      throw new Error("User not found");
    }
    if (user.role === ROLES.ADMIN) {
      throw new Error("Cannot delete an admin account");
    }
    await ctx.db.delete(args.userId);
  },
});

/** Guard used by non-admin modules; keeps a single source of truth. */
export const currentRole = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }
    const user = await ctx.db.get(userId);
    return user?.role ?? null;
  },
});
