/**
 * @file app/learning/redux/02-ui-slices/layout.tsx
 * Route-scoped Redux Provider for the Stage 2 learning iteration.
 */

import { StoreProvider } from "@/learning/redux/02-ui-slices/store/store-provider";

export default function UiSlicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <StoreProvider>{children}</StoreProvider>;
}
