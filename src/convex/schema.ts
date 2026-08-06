import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// The auth library defines the `users` table too; we extend it inline so we
// can add domain fields (role, bio, province, skills, onboarding flag) while
// keeping every field the auth library expects.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { users: _authUsers, ...restAuthTables } = authTables;

const schema = defineSchema(
  {
    ...restAuthTables,

    // ---------------------------------------------------------------------
    // Users (extended from the auth library definition)
    // ---------------------------------------------------------------------
    users: defineTable({
      name: v.optional(v.string()),
      image: v.optional(v.string()),
      email: v.optional(v.string()),
      emailVerificationTime: v.optional(v.number()),
      phone: v.optional(v.string()),
      phoneVerificationTime: v.optional(v.number()),
      isAnonymous: v.optional(v.boolean()),
      // Domain fields
      role: v.optional(v.union(v.literal("user"), v.literal("admin"))),
      bio: v.optional(v.string()),
      occupation: v.optional(v.string()),
      provinceId: v.optional(v.id("provinces")),
      skills: v.optional(v.array(v.string())),
      isOnboarded: v.optional(v.boolean()),
    })
      .index("email", ["email"])
      .index("phone", ["phone"])
      .index("provinceId", ["provinceId"]),

    // ---------------------------------------------------------------------
    // Reference data
    // ---------------------------------------------------------------------
    provinces: defineTable({
      code: v.string(),
      name: v.string(),
      region: v.optional(v.string()),
    }).index("by_code", ["code"]),

    categories: defineTable({
      name: v.string(),
      slug: v.string(),
      description: v.optional(v.string()),
    }).index("by_slug", ["slug"]),

    // ---------------------------------------------------------------------
    // Communities
    // ---------------------------------------------------------------------
    communities: defineTable({
      name: v.string(),
      slug: v.string(),
      description: v.optional(v.string()),
      provinceId: v.optional(v.id("provinces")),
      categoryId: v.optional(v.id("categories")),
      createdBy: v.id("users"),
      imageUrl: v.optional(v.string()),
      isFeatured: v.optional(v.boolean()),
    })
      .index("by_createdBy", ["createdBy"])
      .index("by_slug", ["slug"])
      .index("by_categoryId", ["categoryId"])
      .searchIndex("search_name", {
        searchField: "name",
        filterFields: [],
      }),

    communityMembers: defineTable({
      communityId: v.id("communities"),
      userId: v.id("users"),
      role: v.union(
        v.literal("admin"),
        v.literal("moderator"),
        v.literal("member"),
      ),
    })
      .index("by_communityId", ["communityId"])
      .index("by_userId", ["userId"])
      .index("by_community_user", ["communityId", "userId"]),

    // ---------------------------------------------------------------------
    // Projects
    // ---------------------------------------------------------------------
    projects: defineTable({
      title: v.string(),
      slug: v.string(),
      description: v.optional(v.string()),
      communityId: v.optional(v.id("communities")),
      categoryId: v.optional(v.id("categories")),
      provinceId: v.optional(v.id("provinces")),
      status: v.union(
        v.literal("draft"),
        v.literal("active"),
        v.literal("completed"),
        v.literal("archived"),
      ),
      createdBy: v.id("users"),
      imageUrl: v.optional(v.string()),
      startDate: v.optional(v.number()),
      endDate: v.optional(v.number()),
      tags: v.optional(v.array(v.string())),
    })
      .index("by_createdBy", ["createdBy"])
      .index("by_communityId", ["communityId"])
      .index("by_status", ["status"])
      .index("by_slug", ["slug"])
      .searchIndex("search_title", {
        searchField: "title",
        filterFields: ["status"],
      }),

    projectMembers: defineTable({
      projectId: v.id("projects"),
      userId: v.id("users"),
      role: v.union(
        v.literal("owner"),
        v.literal("contributor"),
        v.literal("viewer"),
      ),
    })
      .index("by_projectId", ["projectId"])
      .index("by_userId", ["userId"])
      .index("by_project_user", ["projectId", "userId"]),

    // ---------------------------------------------------------------------
    // Events
    // ---------------------------------------------------------------------
    events: defineTable({
      title: v.string(),
      description: v.optional(v.string()),
      projectId: v.optional(v.id("projects")),
      communityId: v.optional(v.id("communities")),
      categoryId: v.optional(v.id("categories")),
      location: v.optional(v.string()),
      startTime: v.number(),
      endTime: v.optional(v.number()),
      capacity: v.optional(v.number()),
      status: v.union(
        v.literal("upcoming"),
        v.literal("ongoing"),
        v.literal("ended"),
        v.literal("cancelled"),
      ),
      createdBy: v.id("users"),
      imageUrl: v.optional(v.string()),
    })
      .index("by_startTime", ["startTime"])
      .index("by_createdBy", ["createdBy"])
      .index("by_communityId", ["communityId"])
      .index("by_projectId", ["projectId"])
      .searchIndex("search_title", {
        searchField: "title",
        filterFields: [],
      }),

    eventAttendees: defineTable({
      eventId: v.id("events"),
      userId: v.id("users"),
      status: v.union(
        v.literal("going"),
        v.literal("interested"),
        v.literal("cancelled"),
      ),
    })
      .index("by_eventId", ["eventId"])
      .index("by_userId", ["userId"])
      .index("by_event_user", ["eventId", "userId"]),

    // ---------------------------------------------------------------------
    // Needs & volunteers
    // ---------------------------------------------------------------------
    needs: defineTable({
      projectId: v.id("projects"),
      title: v.string(),
      description: v.optional(v.string()),
      categoryId: v.optional(v.id("categories")),
      quantity: v.optional(v.number()),
      status: v.union(
        v.literal("open"),
        v.literal("in_progress"),
        v.literal("fulfilled"),
        v.literal("closed"),
      ),
      createdBy: v.id("users"),
      skillsRequired: v.optional(v.array(v.string())),
    })
      .index("by_projectId", ["projectId"])
      .index("by_status", ["status"])
      .index("by_createdBy", ["createdBy"]),

    volunteers: defineTable({
      userId: v.id("users"),
      projectId: v.optional(v.id("projects")),
      needId: v.optional(v.id("needs")),
      status: v.union(
        v.literal("pending"),
        v.literal("accepted"),
        v.literal("declined"),
        v.literal("completed"),
      ),
      message: v.optional(v.string()),
      skills: v.optional(v.array(v.string())),
    })
      .index("by_userId", ["userId"])
      .index("by_projectId", ["projectId"])
      .index("by_needId", ["needId"])
      .index("by_status", ["status"]),

    // ---------------------------------------------------------------------
    // Notifications & onboarding
    // ---------------------------------------------------------------------
    notifications: defineTable({
      userId: v.id("users"),
      type: v.string(),
      title: v.string(),
      body: v.optional(v.string()),
      link: v.optional(v.string()),
      read: v.boolean(),
    })
      .index("by_userId", ["userId"])
      .index("by_user_read", ["userId", "read"]),

    onboarding: defineTable({
      userId: v.id("users"),
      step: v.number(),
      completed: v.boolean(),
      data: v.optional(v.any()),
    })
      .index("by_userId", ["userId"])
      .index("by_user_completed", ["userId", "completed"]),
  },
  { schemaValidation: false },
);

export default schema;
