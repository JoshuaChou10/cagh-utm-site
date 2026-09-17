import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseConfig } from "@/lib/supabase/env";

export async function createSupabaseServerClient() {
  const config = getSupabaseConfig();
  if (!config) return null;

  const cookieStore = await cookies();

  return createServerClient(config.url, config.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Called from a Server Component where cookies are read-only.
        }
      },
    },
  });
}

export async function getAuthenticatedAdmin() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { supabase: null, user: null };

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { supabase, user: null };

  const { data: admin } = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!admin) return { supabase, user: null };

  return { supabase, user };
}
