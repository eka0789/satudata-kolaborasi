# API Rules

## Purpose

This document defines the API standards for this project.

Every generated function must follow these rules.

The primary goals are:

- Consistency
- Simplicity
- Scalability
- Type Safety
- Security
- Maintainability

Do not generate functions that violate these standards.

---

# API Style

Convex exposes data via **functions** (queries, mutations, actions) — not REST endpoints.

Functions are referenced by their path string, e.g. `api.projects.list`, `api.projects.create`.

There is no URL versioning; types are enforced end-to-end by Convex.

Use nouns for table names and verbs for the operation as the function name.

Good

`projects.list`

`projects.get`

`projects.getBySlug`

`projects.create`

`projects.update`

`projects.remove`

Bad

`getProjects`

`createProjectData`

`projectStuff`

---

# Function Types

Queries — read-only, for displaying data in the UI.

Mutations — write operations (create/update/remove).

Actions — for external side effects (file storage, third-party APIs).

Always pick the narrowest type that fits.

---

# Validation

Validate every argument using `v.object({ ... })`.

Never trust client input.

Validate all fields:

- body arguments
- ids (`v.id("table")`)
- enums (`v.union(v.literal("active"), ...)`)
- optional values (`v.optional(...)`)

Reject invalid requests immediately (Convex validates before the function runs).

---

# Response Format

Return typed values directly — Convex serializes them for the client.

Never return unformatted internal data.

For mutations that change one record, return the updated/created document id or the document.

---

# Errors

Throw `ConvexError` for expected business errors with a safe, user-friendly message.

Never expose stack traces.

Never expose internal details.

Handle unexpected errors in `try/catch` and log them; rethrow `ConvexError` for the client.

---

# CRUD Convention

Query `list` — return multiple records (with optional filters/pagination).

Query `get` — return a single record by id.

Query `getBySlug` — return a single record by unique slug.

Mutation `create` — insert a record.

Mutation `update` — patch fields.

Mutation `remove` — soft delete (set `deletedAt`).

Never hard delete unless explicitly required.

---

# Pagination

Every list query must support pagination for large datasets.

Use Convex `paginate` (cursor-based) or `ctx.db.query(...).take(limit)` with offset.

Never return thousands of records.

---

# Sorting

Support sorting by indexed fields.

Use `.order("asc" | "desc")` on an indexed field.

Good

`ctx.db.query("projects").order("desc")`

---

# Filtering

Support filtering by indexed fields.

Example

`{ status: "active", categoryId, provinceId }`

Filter in the query where possible; filter in memory only for small, non-indexed cases.

---

# Searching

Support search using `searchIndex` when available.

Example

`ctx.db.query("communities").withSearchIndex("search_name", q => q.search("name", query))`

---

# Authentication

Always protect private functions.

Use `getAuthUserId(ctx)` from `@convex-dev/auth/server`.

Public functions

`projects.list`

`communities.get`

Protected functions

`projects.create`

`users.update`

`users.getCurrentUser`

---

# Authorization

Support RBAC.

Check the user's `role` or membership (e.g. `communityMembers`, `projectMembers`) before executing business logic.

Never hardcode permissions.

---

# Error Handling

Never expose stack traces.

Never expose secrets.

Throw `ConvexError` with friendly messages.

Log detailed errors internally.

---

# Logging

Log

- Authentication failures
- Create
- Update
- Remove
- Permission failures
- Unexpected errors

Do not log passwords.

Do not log access tokens.

---

# Database

Always use `ctx.db` — never raw external SQL.

Use `ctx.db.insert`, `ctx.db.patch`, `ctx.db.delete`, `ctx.db.get`, `ctx.db.query`.

Use `ctx.db` within a function for multiple related operations (Convex functions are transactional).

---

# Soft Delete

Use `deletedAt` (number, epoch ms).

Never remove records permanently unless requested.

Exclude deleted records by default in every query.

---

# Audit Fields

Every business table includes

- `createdBy` (`v.id("users")`)
- `deletedAt` (`v.optional(v.number())`)

Convex provides `_creationTime` automatically (creation timestamp).

---

# Id Convention

Use Convex `Id` (`v.id("table")`).

Never use incremental integer IDs.

---

# Naming

Tables — plural camelCase

`users`

`projects`

`communityMembers`

Functions — camelCase verbs

`list`

`getBySlug`

`create`

`update`

Types — PascalCase

Files — kebab-case

---

# Feature Structure

Example

src/convex/

    projects.ts

    communities.ts

    users.ts

    schema.ts

Do not organize by controllers.

Do not organize by repositories.

Organize by feature.

---

# Business Logic

Keep functions focused.

Validation

↓

Authorization

↓

Business Logic

↓

Database

Business rules must never be duplicated.

---

# Performance

Use indexes for queries.

Avoid loading entire tables when a filter or index suffices.

Paginate large datasets.

Avoid N+1 queries — batch with `Promise.all` where appropriate.

---

# Documentation

Every function must be clearly named and follow the conventions above so its purpose, auth requirements, args, and return type are self-evident.

Keep functions small and well-named; add JSDoc only when the intent is not obvious.

---

# AI Instructions

Whenever generating a Convex function:

1. Explain the function's purpose.

2. Explain authentication requirements.

3. Generate the arg validator (`v.object`).

4. Generate the query/mutation with `ctx.db`.

5. Ensure authorization checks.

6. Ensure soft-delete filtering.

7. Ensure production-ready quality.

Never generate incomplete functions.

Never leave TODO comments.

Never generate placeholder code.

Always generate runnable code.
