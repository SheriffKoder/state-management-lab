/**
 * @file learning/redux/04-async-thunks/slices/projects/projectsThunks.ts
 * Async thunks for projects — Supabase fetch wrapped in createAsyncThunk.
 *
 * Dispatched from demo UI (Step 7). Slice extraReducers (Step 4) handle
 * pending / fulfilled / rejected lifecycle actions.
 */

import { createAsyncThunk } from "@reduxjs/toolkit";

import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

import type { Project } from "./types";

export const fetchProjects = createAsyncThunk<
  Project[],
  void,
  { rejectValue: string }
>("projects/fetchAll", async (_, { rejectWithValue }) => {
  if (!isSupabaseConfigured()) {
    return rejectWithValue(
      "Supabase is not configured — set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local",
    );
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("demo_projects")
    .select("id, name, status, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return rejectWithValue(error.message);
  }

  return data ?? [];
});
