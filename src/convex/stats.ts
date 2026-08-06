import { query } from "./_generated/server";

/** Public platform-wide statistics shown on the landing page. */
export const getPlatformStats = query({
  args: {},
  handler: async (ctx) => {
    const [communities, projects, events, volunteers, provinces] =
      await Promise.all([
        ctx.db.query("communities").collect(),
        ctx.db.query("projects").collect(),
        ctx.db.query("events").collect(),
        ctx.db.query("volunteers").collect(),
        ctx.db.query("provinces").collect(),
      ]);
    const communityCount = communities.length;
    const projectCount = projects.length;
    const eventCount = events.length;
    const volunteerCount = volunteers.length;
    const provinceCount = provinces.length;
    return {
      communities: communityCount,
      projects: projectCount,
      events: eventCount,
      volunteers: volunteerCount,
      provinces: provinceCount,
    };
  },
});

/** Latest active projects and upcoming events for the landing page. */
export const getHighlights = query({
  args: {},
  handler: async (ctx) => {
    const projects = await ctx.db
      .query("projects")
      .withIndex("by_status", (q) => q.eq("status", "active"))
      .order("desc")
      .take(6);
    const events = await ctx.db
      .query("events")
      .withIndex("by_startTime", (q) => q.gt("startTime", Date.now()))
      .order("asc")
      .take(6);
    return { projects, events };
  },
});
