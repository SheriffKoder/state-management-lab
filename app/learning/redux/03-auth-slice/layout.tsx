/**
 * @file app/learning/redux/03-auth-slice/layout.tsx
 * Route-scoped Redux Provider and Supabase auth listener for Stage 3.
 */

import { AuthListener } from "@/learning/redux/03-auth-slice/slices/auth/auth-listener";
import { StoreProvider } from "@/learning/redux/03-auth-slice/store/store-provider";

export default function AuthSliceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <AuthListener>{children}</AuthListener>
    </StoreProvider>
  );
}
