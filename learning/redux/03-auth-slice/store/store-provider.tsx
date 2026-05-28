/**
 * @file learning/redux/03-auth-slice/store/store-provider.tsx
 * Client-only Redux Provider for the Stage 3 learning route.
 */

"use client";

import { Provider } from "react-redux";

import { store } from "./store";

interface StoreProviderProps {
  children: React.ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
