import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";

import { mutation, query } from "./_generated/server";

export const list = query({
  args: {
    status: v.optional(
      v.union(
        v.literal("upcoming"),
        v.literal("ongoing"),
        v.literal("ended"),
        v.literal("cancelled"),
      ),
    ),
    communityId: v.optional(v.id("communities")),
    projectId: v.optional(v.id("projects")),
    categoryId: v.optional(v.id("categories")),
  },
  handler: async (ctx, args) => {
    let events = await ctx.db.query("events").order("desc").collect();
    if (args.status) {
      events = events.filter((e) => e.status === args.status);
    }
    if (args.communityId) {
      events = events.filter((e) => e.communityId === args.communityId);
    }
    if (args.projectId) {
      events = events.filter((e) => e.projectId === args.projectId);
    }
    if (args.categoryId) {
      events = events.filter((e) => e.categoryId === args.categoryId);
    }
    return events;
  },
});

export const get = query({
  args: { eventId: v.id("events") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.eventId);
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    projectId: v.optional(v.id("projects")),
    communityId: v.optional(v.id("communities")),
    categoryId: v.optional(v.id("categories")),
    location: v.optional(v.string()),
    startTime: v.number(),
    endTime: v.optional(v.number()),
    capacity: v.optional(v.number()),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Not authenticated");
    }
    return await ctx.db.insert("events", {
      ...args,
      status: "upcoming",
      createdBy: userId,
    });
  },
});

export const update = mutation({
  args: {
    eventId: v.id("events"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    projectId: v.optional(v.id("projects")),
    communityId: v.optional(v.id("communities")),
    categoryId: v.optional(v.id("categories")),
    location: v.optional(v.string()),
    startTime: v.optional(v.number()),
    endTime: v.optional(v.number()),
    capacity: v.optional(v.number()),
    status: v.optional(
      v.union(
        v.literal("upcoming"),
        v.literal("ongoing"),
        v.literal("ended"),
        v.literal("cancelled"),
      ),
    ),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Not authenticated");
    }
    const event = await ctx.db.get(args.eventId);
    if (!event) {
      throw new Error("Event not found");
    }
    if (event.createdBy !== userId) {
      throw new Error("Only the organizer can edit this event");
    }
    const { eventId, ...patch } = args;
    await ctx.db.patch(eventId, patch);
    return eventId;
  },
});

export const remove = mutation({
  args: { eventId: v.id("events") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Not authenticated");
    }
    const event = await ctx.db.get(args.eventId);
    if (!event) {
      throw new Error("Event not found");
    }
    if (event.createdBy !== userId) {
      throw new Error("Only the organizer can delete this event");
    }
    await ctx.db.delete(args.eventId);
  },
});

// ---------------------------------------------------------------------------
// Attendees
// ---------------------------------------------------------------------------

export const listAttendees = query({
  args: { eventId: v.id("events") },
  handler: async (ctx, args) => {
    const attendees = await ctx.db
      .query("eventAttendees")
      .withIndex("by_eventId", (q) => q.eq("eventId", args.eventId))
      .collect();
    return Promise.all(
      attendees.map(async (a) => {
        const user = await ctx.db.get(a.userId);
        return { ...a, user };
      }),
    );
  },
});

export const rsvp = mutation({
  args: {
    eventId: v.id("events"),
    status: v.union(
      v.literal("going"),
      v.literal("interested"),
      v.literal("cancelled"),
    ),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Not authenticated");
    }
    const existing = await ctx.db
      .query("eventAttendees")
      .withIndex("by_event_user", (q) =>
        q.eq("eventId", args.eventId).eq("userId", userId),
      )
      .first();
    if (existing) {
      if (args.status === "cancelled") {
        await ctx.db.delete(existing._id);
        return null;
      }
      await ctx.db.patch(existing._id, { status: args.status });
      return existing._id;
    }
    if (args.status === "cancelled") {
      return null;
    }
    return await ctx.db.insert("eventAttendees", {
      eventId: args.eventId,
      userId,
      status: args.status,
    });
  },
});

export const myEvents = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return [];
    }
    const attendees = await ctx.db
      .query("eventAttendees")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();
    return Promise.all(
      attendees.map(async (a) => {
        const event = await ctx.db.get(a.eventId);
        return { ...a, event };
      }),
    );
  },
});
