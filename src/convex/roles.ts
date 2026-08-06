import { getAuthUserId } from "@convex-dev/auth/server";

import { type QueryCtx } from "./_generated/server";

export const ROLES = {
  USER: "user",
  ADMIN: "admin",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

/**
 * Returns the role of the currently signed-in user, or `null` when signed out.
 */
export async function getCurrentUserRole(
  ctx: QueryCtx,
): Promise<Role | null> {
  const userId = await getAuthUserId(ctx);
  if (userId === null) {
    return null;
  }
  const user = await ctx.db.get(userId);
  return user?.role ?? null;
}

/**
 * Throws unless the signed-in user is a platform admin.
 */
export async function requireAdmin(ctx: QueryCtx): Promise<void> {
  const role = await getCurrentUserRole(ctx);
  if (role !== ROLES.ADMIN) {
    throw new Error("Requires admin privileges");
  }
}
