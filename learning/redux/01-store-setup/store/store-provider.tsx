/**
 * @file learning/redux/01-store-setup/store/store-provider.tsx
 * Client-only Redux Provider for the Stage 1 learning route.
 */

"use client";

import { Provider } from "react-redux";

import { store } from "./store";

/**
 * Props for {@link StoreProvider}.
 */
interface StoreProviderProps {
  /** React subtree that needs access to the Stage 1 Redux store. */
  children: React.ReactNode;
}

/**
 * Makes the Stage 1 store available to client components below this boundary.
 * Must stay behind `"use client"` — do not import into server components.
 */
export function StoreProvider({ children }: StoreProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
