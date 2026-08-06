import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";

import { mutation, query } from "./_generated/server";

export const listByProject = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    const volunteers = await ctx.db
      .query("volunteers")
      .withIndex("by_projectId", (q) => q.eq("projectId", args.projectId))
      .order("desc")
      .collect();
    return Promise.all(
      volunteers.map(async (vol) => {
        const user = await ctx.db.get(vol.userId);
        return { ...vol, user };
      }),
    );
  },
});

export const listByNeed = query({
  args: { needId: v.id("needs") },
  handler: async (ctx, args) => {
    const volunteers = await ctx.db
      .query("volunteers")
      .withIndex("by_needId", (q) => q.eq("needId", args.needId))
      .order("desc")
      .collect();
    return Promise.all(
      volunteers.map(async (vol) => {
        const user = await ctx.db.get(vol.userId);
        return { ...vol, user };
      }),
    );
  },
});

export const myApplications = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return [];
    }
    return await ctx.db
      .query("volunteers")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});

/** Apply to volunteer for a project need (or the project itself). */
export const apply = mutation({
  args: {
    projectId: v.optional(v.id("projects")),
    needId: v.optional(v.id("needs")),
    message: v.optional(v.string()),
    skills: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Not authenticated");
    }
    if (!args.projectId && !args.needId) {
      throw new Error("Provide a project or a need to volunteer for");
    }
    const existing = await ctx.db
      .query("volunteers")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .filter((q) =>
        args.needId
          ? q.eq(q.field("needId"), args.needId)
          : q.eq(q.field("projectId"), args.projectId),
      )
      .first();
    if (existing) {
      return existing._id;
    }
    return await ctx.db.insert("volunteers", {
      userId,
      projectId: args.projectId,
      needId: args.needId,
      message: args.message,
      skills: args.skills,
      status: "pending",
    });
  },
});

/** Update an application's status (accepted / declined / completed). */
export const updateStatus = mutation({
  args: {
    volunteerId: v.id("volunteers"),
    status: v.union(
      v.literal("pending"),
      v.literal("accepted"),
      v.literal("declined"),
      v.literal("completed"),
    ),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Not authenticated");
    }
    const application = await ctx.db.get(args.volunteerId);
    if (!application) {
      throw new Error("Volunteer application not found");
    }
    // Allow the volunteer to withdraw, and organizers to accept/decline.
    if (application.userId === userId) {
      if (args.status !== "completed" && args.status !== "pending") {
        throw new Error("Volunteers can only mark their application completed");
      }
    } else {
      const project = application.projectId
        ? await ctx.db.get(application.projectId)
        : null;
      if (!project || project.createdBy !== userId) {
        throw new Error("Only the project owner can update this application");
      }
    }
    await ctx.db.patch(args.volunteerId, { status: args.status });
    return args.volunteerId;
  },
});

export const withdraw = mutation({
  args: { volunteerId: v.id("volunteers") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Not authenticated");
    }
    const application = await ctx.db.get(args.volunteerId);
    if (!application) {
      throw new Error("Volunteer application not found");
    }
    if (application.userId !== userId) {
      throw new Error("You can only withdraw your own application");
    }
    await ctx.db.delete(args.volunteerId);
  },
});
