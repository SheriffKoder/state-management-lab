/**
 * @file app/learning/redux/04-async-thunks/layout.tsx
 * Route-scoped Redux Provider for the Stage 4 learning iteration.
 */

import { StoreProvider } from "@/learning/redux/04-async-thunks/store/store-provider";

export default function AsyncThunksLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <StoreProvider>{children}</StoreProvider>;
}
