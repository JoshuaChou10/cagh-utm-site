import { cache } from "react";
import { getPublicSupabase } from "@/lib/supabase/public";
import type { EventRecord } from "@/lib/types";

const EVENT_COLUMNS = "id, title, description, tag, location, starts_at, ends_at, created_at, updated_at";

function nowIso() {
  return new Date().toISOString();
}

function upcomingOrPast(now: string, upcoming: boolean) {
  const comparison = upcoming ? "gte" : "lt";
  return `ends_at.${comparison}."${now}",and(ends_at.is.null,starts_at.${comparison}."${now}")`;
}

export const listUpcomingEvents = cache(async (limit?: number): Promise<EventRecord[]> => {
  const supabase = getPublicSupabase();
  if (!supabase) return [];

  let query = supabase
    .from("events")
    .select(EVENT_COLUMNS)
    .or(upcomingOrPast(nowIso(), true))
    .order("starts_at", { ascending: true });

  if (limit !== undefined) {
    query = query.limit(limit);
  }

  const { data, error } = await query;
  if (error || !data) return [];
  return data;
});

export const listPastEvents = cache(async (): Promise<EventRecord[]> => {
  const supabase = getPublicSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("events")
    .select(EVENT_COLUMNS)
    .or(upcomingOrPast(nowIso(), false))
    .order("starts_at", { ascending: true });

  if (error || !data) return [];
  return data;
});

export const getEventById = cache(async (id: string): Promise<EventRecord | null> => {
  const supabase = getPublicSupabase();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("events")
    .select(EVENT_COLUMNS)
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;
  return data;
});
