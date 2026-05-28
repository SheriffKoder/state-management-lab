/**
 * @file learning/redux/03-auth-slice/ui/demo-user-panel.tsx
 * Logged-in identity and logout — visible when authenticated.
 */

"use client";

import { Button } from "@/components/ui/button";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import {
  selectAuthUser,
  selectIsAuthenticated,
  setError,
  setLoading,
  useAppDispatch,
  useAppSelector,
} from "@/learning/redux/03-auth-slice/store";

export function DemoUserPanel() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectAuthUser);

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleLogout = async () => {
    if (!isSupabaseConfigured()) return;

    dispatch(setLoading());
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      dispatch(setError(error.message));
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-sm items-center justify-between gap-4 rounded-md border border-foreground/10 p-4">
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wide text-foreground/50">
          User panel
        </p>
        <p className="truncate text-sm font-medium">{user.email}</p>
      </div>
      <Button type="button" variant="outline" size="sm" onClick={handleLogout}>
        Log out
      </Button>
    </div>
  );
}
