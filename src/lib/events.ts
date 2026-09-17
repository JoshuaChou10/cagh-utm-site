import { cache } from "react";
import { getPublicSupabase } from "@/lib/supabase/public";
import type { EventRecord } from "@/lib/types";

export const listEvents = cache(async (): Promise<EventRecord[]> => {
  const supabase = getPublicSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("events")
    .select("id, title, description, tag, location, starts_at, ends_at, created_at, updated_at")
    .order("starts_at", { ascending: true });

  if (error || !data) return [];
  return data;
});

export const getEventById = cache(async (id: string): Promise<EventRecord | null> => {
  const supabase = getPublicSupabase();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("events")
    .select("id, title, description, tag, location, starts_at, ends_at, created_at, updated_at")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;
  return data;
});
