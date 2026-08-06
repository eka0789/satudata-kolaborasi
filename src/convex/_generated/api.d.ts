/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type { ApiFromModules, FilterApi, FunctionReference } from "convex/server";
import type * as admin from "../admin.js";
import type * as ai from "../ai.js";
import type * as auth from "../auth.js";
import type * as categories from "../categories.js";
import type * as communities from "../communities.js";
import type * as dashboard from "../dashboard.js";
import type * as events from "../events.js";
import type * as http from "../http.js";
import type * as needs from "../needs.js";
import type * as notifications from "../notifications.js";
import type * as onboarding from "../onboarding.js";
import type * as projects from "../projects.js";
import type * as provinces from "../provinces.js";
import type * as roles from "../roles.js";
import type * as search from "../search.js";
import type * as seed from "../seed.js";
import type * as stats from "../stats.js";
import type * as users from "../users.js";
import type * as volunteers from "../volunteers.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  admin: typeof admin,
  ai: typeof ai,
  auth: typeof auth,
  categories: typeof categories,
  communities: typeof communities,
  dashboard: typeof dashboard,
  events: typeof events,
  http: typeof http,
  needs: typeof needs,
  notifications: typeof notifications,
  onboarding: typeof onboarding,
  projects: typeof projects,
  provinces: typeof provinces,
  roles: typeof roles,
  search: typeof search,
  seed: typeof seed,
  stats: typeof stats,
  users: typeof users,
  volunteers: typeof volunteers,
}>;
export declare const api: FilterApi<typeof fullApi, FunctionReference<any, "public">>;
export declare const internal: FilterApi<typeof fullApi, FunctionReference<any, "internal">>;
