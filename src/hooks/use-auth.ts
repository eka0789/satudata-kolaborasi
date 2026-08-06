import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth, useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";

/**
 * Single source of truth for auth state on the frontend.
 *
 * Returns the sign-in status, the current user document (from the
 * `users.getCurrentUser` query) and the `signIn` / `signOut` actions.
 *
 * ```ts
 * const { isLoading, isAuthenticated, user, signIn, signOut } = useAuth();
 * ```
 */
export function useAuth() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const { signIn, signOut } = useAuthActions();
  const user = useQuery(api.users.getCurrentUser);

  return { isLoading, isAuthenticated, user, signIn, signOut };
}
