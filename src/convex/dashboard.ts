import { getAuthUserId } from "@convex-dev/auth/server";

import { query } from "./_generated/server";

/**
 * Aggregated data for the authenticated dashboard: the signed-in user plus
 * their communities, projects, events, and notification count.
 */
export const getDashboard = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }
    const user = await ctx.db.get(userId);

    const memberships = await ctx.db
      .query("communityMembers")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();
    const communities = (
      await Promise.all(
        memberships.map((m) => ctx.db.get(m.communityId)),
      )
    ).filter((c) => c !== null);

    const projectMemberships = await ctx.db
      .query("projectMembers")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();
    const projects = (
      await Promise.all(
        projectMemberships.map((m) => ctx.db.get(m.projectId)),
      )
    ).filter((p) => p !== null);

    const attendees = await ctx.db
      .query("eventAttendees")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();
    const events = (
      await Promise.all(attendees.map((a) => ctx.db.get(a.eventId)))
    ).filter((e) => e !== null);

    const unread = await ctx.db
      .query("notifications")
      .withIndex("by_user_read", (q) =>
        q.eq("userId", userId).eq("read", false),
      )
      .collect();

    return {
      user,
      communities,
      projects,
      events,
      unreadCount: unread.length,
    };
  },
});
