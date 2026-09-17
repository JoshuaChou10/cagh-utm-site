import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseConfig } from "@/lib/supabase/env";

let client: SupabaseClient | null = null;

export function getPublicSupabase() {
  const config = getSupabaseConfig();
  if (!config) return null;

  if (!client) {
    client = createClient(config.url, config.anonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
      global: {
        fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }),
      },
    });
  }

  return client;
}
