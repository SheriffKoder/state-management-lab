/**
 * Public store API for Stage 1 — store setup.
 */

export { rootReducer, incrementDemoCount } from "./rootReducer";
export { store } from "./store";
export { useAppDispatch, useAppSelector } from "./hooks";
export { StoreProvider } from "./store-provider";
export type { AppDispatch, AppStore, RootState } from "./store";
