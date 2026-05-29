/**
 * @file learning/redux/04-async-thunks/ui/demo-project-list.tsx
 * Project list — dispatches fetchProjects on mount; loading, error, empty, success.
 */

"use client";

import { useEffect } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import {
  fetchProjects,
  selectIsProjectsLoading,
  selectProjects,
  selectProjectsError,
  selectProjectsStatus,
  useAppDispatch,
  useAppSelector,
} from "@/learning/redux/04-async-thunks/store";

import type { Project } from "@/learning/redux/04-async-thunks/slices/projects";

function DemoSetupInstructions() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-4 rounded-md border border-foreground/10 p-6">
      <p className="text-xs uppercase tracking-wide text-foreground/50">
        Setup required
      </p>
      <h2 className="text-sm font-semibold tracking-tight">
        Supabase is not configured
      </h2>
      <p className="text-sm text-foreground/60">
        Copy <code className="text-foreground/80">.env.example</code> to{" "}
        <code className="text-foreground/80">.env.local</code> and set:
      </p>
      <ul className="list-inside list-disc text-sm text-foreground/60">
        <li>
          <code className="text-foreground/80">NEXT_PUBLIC_SUPABASE_URL</code>
        </li>
        <li>
          <code className="text-foreground/80">
            NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
          </code>
        </li>
      </ul>
      <p className="text-sm text-foreground/60">
        Run the Stage 4 SQL to create{" "}
        <code className="text-foreground/80">demo_projects</code>, then refresh
        this page.
      </p>
    </div>
  );
}

function ProjectRow({ project }: { project: Project }) {
  return (
    <li className="flex items-center justify-between gap-3 border-b border-foreground/10 py-3 last:border-0">
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">{project.name}</p>
        <p className="text-xs text-foreground/50">
          {new Date(project.created_at).toLocaleDateString()}
        </p>
      </div>
      <Badge
        variant={project.status === "active" ? "default" : "secondary"}
        className="shrink-0 capitalize"
      >
        {project.status}
      </Badge>
    </li>
  );
}

function DemoProjectListContent() {
  const dispatch = useAppDispatch();
  const projects = useAppSelector(selectProjects);
  const status = useAppSelector(selectProjectsStatus);
  const error = useAppSelector(selectProjectsError);
  const isLoading = useAppSelector(selectIsProjectsLoading);

  useEffect(() => {
    void dispatch(fetchProjects());
  }, [dispatch]);

  const handleRefetch = () => {
    void dispatch(fetchProjects());
  };

  if (isLoading && status === "loading" && projects.length === 0) {
    return (
      <div className="mx-auto flex w-full max-w-md flex-col items-center gap-3 rounded-md border border-foreground/10 p-8 text-center">
        <p className="text-sm text-foreground/60">Loading projects…</p>
        <p className="text-xs text-foreground/40">
          Watch DevTools for{" "}
          <code className="text-foreground/60">projects/fetchAll/pending</code>
        </p>
      </div>
    );
  }

  if (status === "failed" && error) {
    return (
      <div className="mx-auto flex w-full max-w-md flex-col gap-4 rounded-md border border-destructive/30 bg-destructive/5 p-6">
        <div>
          <p className="text-xs uppercase tracking-wide text-destructive/70">
            Fetch failed
          </p>
          <p className="mt-1 text-sm text-destructive">{error}</p>
        </div>
        <Button type="button" size="sm" variant="outline" onClick={handleRefetch}>
          Retry
        </Button>
      </div>
    );
  }

  if (status === "succeeded" && projects.length === 0) {
    return (
      <div className="mx-auto flex w-full max-w-md flex-col gap-4 rounded-md border border-foreground/10 p-6 text-center">
        <p className="text-sm font-medium">No projects yet</p>
        <p className="text-sm text-foreground/60">
          The fetch succeeded but{" "}
          <code className="text-foreground/80">demo_projects</code> is empty.
        </p>
        <Button type="button" size="sm" variant="outline" onClick={handleRefetch}>
          Refetch
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-4 rounded-md border border-foreground/10 p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-foreground/50">
            Project list
          </p>
          <p className="text-sm text-foreground/60">
            {projects.length} row{projects.length === 1 ? "" : "s"} from
            Supabase
          </p>
        </div>
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={isLoading}
          onClick={handleRefetch}
        >
          {isLoading ? "Refreshing…" : "Refetch"}
        </Button>
      </div>

      <ul>
        {projects.map((project) => (
          <ProjectRow key={project.id} project={project} />
        ))}
      </ul>
    </div>
  );
}

export function DemoProjectList() {
  if (!isSupabaseConfigured()) {
    return <DemoSetupInstructions />;
  }

  return <DemoProjectListContent />;
}
