/**
 * Public store API for Stage 2 — UI slices.
 * Slice exports wired in Steps 2–6.
 */

export { rootReducer } from "./rootReducer";
export { store } from "./store";
export { useAppDispatch, useAppSelector } from "./hooks";
export { StoreProvider } from "./store-provider";
export type { AppDispatch, AppStore, RootState } from "./store";
