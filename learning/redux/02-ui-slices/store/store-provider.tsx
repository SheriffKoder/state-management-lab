/**
 * @file learning/redux/02-ui-slices/store/store-provider.tsx
 * Client-only Redux Provider for the Stage 2 learning route.
 */

"use client";

import { Provider } from "react-redux";

import { store } from "./store";

/**
 * Props for {@link StoreProvider}.
 */
interface StoreProviderProps {
  /** React subtree that needs access to the Stage 2 Redux store. */
  children: React.ReactNode;
}

/**
 * Makes the Stage 2 store available to client components below this boundary.
 * Must stay behind `"use client"` — do not import into server components.
 */
export function StoreProvider({ children }: StoreProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
