/**
 * @file learning/redux/02-ui-slices/ui/demo-sidebar.tsx
 * Sidebar demo driven by ui/sidebar slice selectors and actions.
 */

"use client";

import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  selectSidebarIsCollapsed,
  selectSidebarIsOpen,
  toggleSidebar,
  toggleSidebarCollapsed,
  useAppDispatch,
  useAppSelector,
} from "@/learning/redux/02-ui-slices/store";

const navItems = ["Projects", "Tasks", "Activity"];

/**
 * Collapsible sidebar panel — mirrors ProjectFlow navigation chrome.
 */
export function DemoSidebar() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectSidebarIsOpen);
  const isCollapsed = useAppSelector(selectSidebarIsCollapsed);

  if (!isOpen) {
    return (
      <div className="flex h-full w-12 shrink-0 items-start border-r border-foreground/10 bg-foreground/[0.02] p-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          aria-label="Open sidebar"
          onClick={() => dispatch(toggleSidebar())}
        >
          <PanelLeftOpen aria-hidden className="size-4" />
        </Button>
      </div>
    );
  }

  return (
    <aside
      className={cn(
        "flex h-full shrink-0 flex-col border-r border-foreground/10 bg-foreground/[0.02] transition-[width] duration-200",
        isCollapsed ? "w-14" : "w-48",
      )}
    >
      <div className="flex items-center justify-between gap-2 border-b border-foreground/10 p-3">
        {!isCollapsed ? (
          <span className="text-xs font-semibold uppercase tracking-wide text-foreground/50">
            ProjectFlow
          </span>
        ) : null}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          aria-label="Close sidebar"
          onClick={() => dispatch(toggleSidebar())}
        >
          <PanelLeftClose aria-hidden className="size-4" />
        </Button>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-2">
        {navItems.map((item) => (
          <div
            key={item}
            className={cn(
              "rounded-md px-2 py-1.5 text-sm text-foreground/70",
              isCollapsed && "truncate text-center text-xs",
            )}
            title={isCollapsed ? item : undefined}
          >
            {isCollapsed ? item.charAt(0) : item}
          </div>
        ))}
      </nav>

      <div className="border-t border-foreground/10 p-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => dispatch(toggleSidebarCollapsed())}
        >
          {isCollapsed ? "Expand" : "Collapse"}
        </Button>
      </div>
    </aside>
  );
}
