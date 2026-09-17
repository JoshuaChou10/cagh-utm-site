import { getAuthenticatedAdmin } from "@/lib/supabase/server";
import type { AdminRecord } from "@/lib/types";

export async function listAdmins(): Promise<AdminRecord[]> {
  const { supabase, user } = await getAuthenticatedAdmin();
  if (!supabase || !user) return [];

  const { data, error } = await supabase
    .from("admins")
    .select("user_id, email, created_at")
    .order("created_at", { ascending: true });

  if (error || !data) return [];
  return data;
}
