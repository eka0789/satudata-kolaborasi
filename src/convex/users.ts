import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";

import { mutation, query } from "./_generated/server";

/**
 * Returns the currently signed-in user document, or `null` when signed out.
 * This is the single source of truth for the frontend `useAuth` hook.
 */
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }
    return await ctx.db.get(userId);
  },
});

export const getUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.userId);
  },
});

/** Update the current user's public profile fields. */
export const updateProfile = mutation({
  args: {
    name: v.optional(v.string()),
    bio: v.optional(v.string()),
    occupation: v.optional(v.string()),
    provinceId: v.optional(v.id("provinces")),
    skills: v.optional(v.array(v.string())),
    image: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Not authenticated");
    }
    const patch: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(args)) {
      if (value !== undefined) {
        patch[key] = value;
      }
    }
    if (Object.keys(patch).length === 0) {
      return null;
    }
    return await ctx.db.patch(userId, patch);
  },
});
