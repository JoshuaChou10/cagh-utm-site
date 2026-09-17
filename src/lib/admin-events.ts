import { getAuthenticatedAdmin } from "@/lib/supabase/server";
import type { EventRecord, EventSignup, EventWithSignupCount } from "@/lib/types";

export async function listAdminEvents(): Promise<EventWithSignupCount[]> {
  const { supabase, user } = await getAuthenticatedAdmin();
  if (!supabase || !user) return [];

  const { data, error } = await supabase
    .from("events")
    .select("id, title, description, tag, location, starts_at, ends_at, created_at, updated_at, event_signups(count)")
    .order("starts_at", { ascending: false });

  if (error || !data) return [];

  return data.map((event) => {
    const signupRel = event.event_signups as { count: number }[] | null;
    const rest = {
      id: event.id,
      title: event.title,
      description: event.description,
      tag: event.tag,
      location: event.location,
      starts_at: event.starts_at,
      ends_at: event.ends_at,
      created_at: event.created_at,
      updated_at: event.updated_at,
    } satisfies EventRecord;

    return {
      ...rest,
      signup_count: signupRel?.[0]?.count ?? 0,
    };
  });
}

export async function listEventSignups(eventId: string): Promise<EventSignup[]> {
  const { supabase, user } = await getAuthenticatedAdmin();
  if (!supabase || !user) return [];

  const { data, error } = await supabase
    .from("event_signups")
    .select("id, event_id, name, email, created_at")
    .eq("event_id", eventId)
    .order("created_at", { ascending: true });

  if (error || !data) return [];
  return data;
}
