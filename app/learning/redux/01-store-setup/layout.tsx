/**
 * @file app/learning/redux/01-store-setup/layout.tsx
 * Route-scoped Redux Provider for the Stage 1 learning iteration.
 */

import { StoreProvider } from "@/learning/redux/01-store-setup/store/store-provider";

export default function StoreSetupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <StoreProvider>{children}</StoreProvider>;
}
