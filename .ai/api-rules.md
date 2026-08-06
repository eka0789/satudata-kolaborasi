# API Rules

## Purpose

This document defines the API standards for this project.

Every generated API must follow these rules.

The primary goals are:

- Consistency
- Simplicity
- Scalability
- Type Safety
- Security
- Maintainability

Do not generate APIs that violate these standards.

---

# API Style

Always use REST API.

Use nouns instead of verbs.

Good

GET /users

GET /users/:id

POST /users

PATCH /users/:id

DELETE /users/:id

Bad

GET /getUsers

POST /createUser

POST /deleteUser

---

# URL Convention

Use lowercase.

Use kebab-case.

Good

/user-profiles

/incoming-mails

/outgoing-mails

Bad

/UserProfile

/getUsers

---

# Versioning

Always prefix with version.

Example

/api/v1/users

/api/v1/auth

/api/v1/dashboard

---

# Request

Validate every request using Zod.

Never trust client input.

Validate

- body
- params
- query
- headers (when needed)

Reject invalid requests immediately.

---

# Response Format

Always return JSON.

Standard Response

{
  "success": true,
  "message": "Users retrieved successfully.",
  "data": {},
  "meta": {}
}

Error Response

{
  "success": false,
  "message": "Validation failed.",
  "errors": [],
  "meta": {}
}

Never return raw database objects without formatting.

---

# HTTP Status Codes

Always use proper status codes.

200 OK

201 Created

204 No Content

400 Bad Request

401 Unauthorized

403 Forbidden

404 Not Found

409 Conflict

422 Unprocessable Entity

500 Internal Server Error

Never return 200 for failed operations.

---

# CRUD Convention

GET

List resources

GET /users

GET

Single resource

GET /users/:id

POST

Create resource

PATCH

Update partially

DELETE

Soft delete

Never hard delete unless explicitly required.

---

# Pagination

Every list endpoint must support pagination.

Query

?page=1

?pageSize=20

Response

meta

{
    "page":1,
    "pageSize":20,
    "total":100,
    "totalPages":5
}

Never return thousands of records.

---

# Sorting

Support sorting.

Example

?sort=name

?sort=-created_at

Ascending

sort=name

Descending

sort=-name

---

# Filtering

Support filtering.

Example

?status=active

?department=finance

?role=admin

Multiple filters are allowed.

---

# Searching

Support search.

Example

?q=john

Search should be case insensitive whenever possible.

---

# Validation

Always validate using Zod.

Never manually validate.

Validation belongs close to the feature.

Example

features/users/schema

---

# Authentication

Always protect private endpoints.

Use Supabase JWT.

Public routes

/login

/register

/health

Protected routes

/users

/profile

/settings

/admin

---

# Authorization

Support RBAC.

Never hardcode permissions.

Permission names

users.read

users.create

users.update

users.delete

roles.manage

settings.manage

Always check permission before executing business logic.

---

# Error Handling

Never expose stack traces.

Never expose SQL.

Never expose secrets.

Use centralized error handling.

Return friendly messages.

Log detailed errors internally.

---

# Logging

Log

Authentication

Create

Update

Delete

Permission Changes

Unexpected Errors

Do not log passwords.

Do not log access tokens.

---

# Database

Always use Drizzle ORM.

Never use raw SQL unless necessary.

Always parameterize queries.

Use transactions for multiple operations.

---

# Soft Delete

Use deleted_at.

Never remove records permanently unless requested.

Exclude deleted records by default.

---

# Audit Fields

Every business table includes

created_at

updated_at

deleted_at

created_by

updated_by

---

# Id Convention

Use UUID.

Never use incremental integer IDs.

---

# Naming

Routes

Plural nouns

/users

/departments

/permissions

Functions

camelCase

Types

PascalCase

Files

kebab-case

---

# Feature Structure

Example

features/

    users/

        routes.ts

        service.ts

        schema.ts

        types.ts

        mapper.ts

        index.ts

Do not organize by controllers.

Do not organize by repositories.

Organize by feature.

---

# Business Logic

Keep route handlers thin.

Route

↓

Validation

↓

Business Logic

↓

Database

Business rules must never be duplicated.

---

# Performance

Only select required columns.

Avoid SELECT *.

Use indexes.

Paginate large datasets.

Avoid N+1 queries.

---

# Documentation

Every endpoint must include

Purpose

Authentication

Request Example

Response Example

Error Responses

Query Parameters

Path Parameters

---

# OpenAPI

Generate OpenAPI documentation for every endpoint.

Include

Description

Parameters

Request Body

Responses

Examples

---

# AI Instructions

Whenever generating an API:

1. Explain the endpoint.

2. Explain authentication requirements.

3. Generate folder structure.

4. Generate Zod schema.

5. Generate route.

6. Generate service.

7. Generate database query.

8. Generate OpenAPI documentation.

9. Generate usage example.

10. Ensure production-ready quality.

Never generate incomplete APIs.

Never leave TODO comments.

Never generate placeholder code.

Always generate runnable code.