"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getServiceSupabase } from "@/lib/supabase/service";
import type { ActionState } from "@/lib/types";

export async function setAdminPassword(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  if (password !== confirm) {
    return { error: "Passwords do not match." };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return { error: "Admin sign-in is not configured yet." };
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email) {
    return { error: "This invite link is invalid or has expired. Ask an admin to send a new one." };
  }

  const service = getServiceSupabase();
  if (service) {
    await service.from("admins").upsert({
      user_id: user.id,
      email: user.email.toLowerCase(),
    });
  }

  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    return { error: error.message };
  }

  redirect("/admin");
}
