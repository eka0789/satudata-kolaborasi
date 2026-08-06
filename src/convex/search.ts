import { v } from "convex/values";

import { query } from "./_generated/server";

/**
 * Keyword search across communities, projects, and events. Uses Convex's
 * built-in full-text search over each table's `search` index.
 */
export const searchAll = query({
  args: { query: v.string() },
  handler: async (ctx, args) => {
    const term = args.query.trim();
    if (term.length === 0) {
      return { communities: [], projects: [], events: [] };
    }

    const [communityResults, projectResults, eventResults] =
      await Promise.all([
        ctx.db
          .query("communities")
          .withSearchIndex("search_name", (q) => q.search("name", term))
          .take(10),
        ctx.db
          .query("projects")
          .withSearchIndex("search_title", (q) => q.search("title", term))
          .take(10),
        ctx.db
          .query("events")
          .withSearchIndex("search_title", (q) => q.search("title", term))
          .take(10),
      ]);

    return {
      communities: communityResults,
      projects: projectResults,
      events: eventResults,
    };
  },
});
