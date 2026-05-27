/**
 * @file learning/redux/01-store-setup/ui/store-setup-demo.tsx
 * Minimal client demo proving Stage 1 store wiring works end-to-end.
 */

"use client";

import { Button } from "@/components/ui/button";
import {
  useAppDispatch,
  useAppSelector,
} from "@/learning/redux/01-store-setup/store/hooks";
import { incrementDemoCount } from "@/learning/redux/01-store-setup/store/rootReducer";

/**
 * Reads from and dispatches to the Stage 1 store.
 * Intentionally small — real slices start in Stage 2.
 */
export function StoreSetupDemo() {
  const dispatch = useAppDispatch();
  const { ready, count } = useAppSelector((state) => state._placeholder);

  return (
    <div className="flex flex-col gap-6 rounded-md border border-foreground/10 p-6">
      <p className="text-xs uppercase tracking-wide text-foreground/50">
        Stage 1 — store wiring only
      </p>

      <dl className="grid gap-3 text-sm">
        <div className="flex items-center gap-4">
          <dt className="text-foreground/60">Store ready</dt>
          <dd className="font-medium">{ready ? "true" : "false"}</dd>
        </div>
        <div className="flex items-center gap-4">
          <dt className="text-foreground/60">Demo count</dt>
          <dd className="font-medium">{count}</dd>
        </div>
      </dl>

      <Button
        type="button"
        variant="outline"
        onClick={() => dispatch(incrementDemoCount())}
      >
        Increment demo count
      </Button>
    </div>
  );
}
