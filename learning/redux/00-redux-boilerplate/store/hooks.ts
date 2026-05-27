/**
 * @file learning/redux/02-ui-slices/store/hooks.ts
 * Typed React-Redux hooks bound to this iteration's store types.
 */

"use client";

import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "./store";

/**
 * Typed dispatch hook for Stage 2 store actions.
 * Use instead of raw `useDispatch` so slice actions stay type-safe.
 */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

/**
 * Typed selector hook for reading Stage 2 root state.
 * Use instead of raw `useSelector` so state shape is checked at compile time.
 */
export const useAppSelector = useSelector.withTypes<RootState>();
