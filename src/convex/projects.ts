import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";

import { mutation, query } from "./_generated/server";

export const list = query({
  args: {
    status: v.optional(
      v.union(
        v.literal("draft"),
        v.literal("active"),
        v.literal("completed"),
        v.literal("archived"),
      ),
    ),
    communityId: v.optional(v.id("communities")),
    categoryId: v.optional(v.id("categories")),
    provinceId: v.optional(v.id("provinces")),
  },
  handler: async (ctx, args) => {
    let projects = await ctx.db.query("projects").order("desc").collect();
    if (args.status) {
      projects = projects.filter((p) => p.status === args.status);
    }
    if (args.communityId) {
      projects = projects.filter((p) => p.communityId === args.communityId);
    }
    if (args.categoryId) {
      projects = projects.filter((p) => p.categoryId === args.categoryId);
    }
    if (args.provinceId) {
      projects = projects.filter((p) => p.provinceId === args.provinceId);
    }
    return projects;
  },
});

export const get = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.projectId);
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("projects")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    communityId: v.optional(v.id("communities")),
    categoryId: v.optional(v.id("categories")),
    provinceId: v.optional(v.id("provinces")),
    imageUrl: v.optional(v.string()),
    startDate: v.optional(v.number()),
    endDate: v.optional(v.number()),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Not authenticated");
    }
    const projectId = await ctx.db.insert("projects", {
      ...args,
      status: "draft",
      createdBy: userId,
    });
    // The creator becomes the project owner.
    await ctx.db.insert("projectMembers", {
      projectId,
      userId,
      role: "owner",
    });
    return projectId;
  },
});

export const update = mutation({
  args: {
    projectId: v.id("projects"),
    title: v.optional(v.string()),
    slug: v.optional(v.string()),
    description: v.optional(v.string()),
    communityId: v.optional(v.id("communities")),
    categoryId: v.optional(v.id("categories")),
    provinceId: v.optional(v.id("provinces")),
    status: v.optional(
      v.union(
        v.literal("draft"),
        v.literal("active"),
        v.literal("completed"),
        v.literal("archived"),
      ),
    ),
    imageUrl: v.optional(v.string()),
    startDate: v.optional(v.number()),
    endDate: v.optional(v.number()),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Not authenticated");
    }
    const project = await ctx.db.get(args.projectId);
    if (!project) {
      throw new Error("Project not found");
    }
    const membership = await ctx.db
      .query("projectMembers")
      .withIndex("by_project_user", (q) =>
        q.eq("projectId", args.projectId).eq("userId", userId),
      )
      .first();
    const canEdit =
      project.createdBy === userId ||
      membership?.role === "owner" ||
      membership?.role === "contributor";
    if (!canEdit) {
      throw new Error("You don't have permission to edit this project");
    }
    const { projectId, ...patch } = args;
    await ctx.db.patch(projectId, patch);
    return projectId;
  },
});

export const remove = mutation({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Not authenticated");
    }
    const project = await ctx.db.get(args.projectId);
    if (!project) {
      throw new Error("Project not found");
    }
    if (project.createdBy !== userId) {
      throw new Error("Only the creator can delete this project");
    }
    await ctx.db.delete(args.projectId);
  },
});

// ---------------------------------------------------------------------------
// Membership
// ---------------------------------------------------------------------------

export const listMembers = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    const members = await ctx.db
      .query("projectMembers")
      .withIndex("by_projectId", (q) => q.eq("projectId", args.projectId))
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
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Not authenticated");
    }
    const existing = await ctx.db
      .query("projectMembers")
      .withIndex("by_project_user", (q) =>
        q.eq("projectId", args.projectId).eq("userId", userId),
      )
      .first();
    if (existing) {
      return existing._id;
    }
    return await ctx.db.insert("projectMembers", {
      projectId: args.projectId,
      userId,
      role: "contributor",
    });
  },
});

export const myProjects = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return [];
    }
    const memberships = await ctx.db
      .query("projectMembers")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();
    return Promise.all(
      memberships.map(async (m) => {
        const project = await ctx.db.get(m.projectId);
        return { ...m, project };
      }),
    );
  },
});
