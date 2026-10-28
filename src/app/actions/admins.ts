"use server";

import { revalidatePath } from "next/cache";
import { getSiteUrl } from "@/lib/site-url";
import { getAuthenticatedAdmin } from "@/lib/supabase/server";
import { getServiceSupabase } from "@/lib/supabase/service";
import type { ActionState } from "@/lib/types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function findUserIdByEmail(email: string) {
  const service = getServiceSupabase();
  if (!service) return null;

  const { data, error } = await service.auth.admin.listUsers({ page: 1, perPage: 1000 });
  if (error) return null;

  return data.users.find((user) => user.email?.toLowerCase() === email)?.id ?? null;
}

export async function addAdmin(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const { supabase, user } = await getAuthenticatedAdmin();
  if (!supabase || !user) {
    return { error: "You must be signed in as an admin." };
  }

  const service = getServiceSupabase();
  if (!service) {
    return { error: "Add SUPABASE_SERVICE_ROLE_KEY to .env.local to invite admins." };
  }

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!EMAIL_PATTERN.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  const siteUrl = await getSiteUrl();
  const redirectTo = `${siteUrl}/admin/set-password`;

  // Creates the account and a one-time token without sending email.
  // The admin copies the link and gives it to that person directly.
  const { data: invited, error: inviteError } = await service.auth.admin.generateLink({
    type: "invite",
    email,
    options: { redirectTo },
  });

  const tokenHash = invited?.properties?.hashed_token;
  let userId = invited?.user?.id ?? null;

  if (inviteError || !userId || !tokenHash) {
    userId = await findUserIdByEmail(email);
    if (!userId) {
      return { error: inviteError?.message ?? "Could not create the setup link." };
    }

    const { error: insertExistingError } = await service.from("admins").insert({
      user_id: userId,
      email,
    });

    if (insertExistingError?.code === "23505") {
      return { error: "That person already has admin access." };
    }

    if (insertExistingError) {
      return { error: "Could not grant admin access." };
    }

    revalidatePath("/admin/admins");
    return { success: `${email} already had an account. They can sign in at /admin/login.` };
  }

  const { error: insertError } = await service.from("admins").insert({
    user_id: userId,
    email,
  });

  if (insertError && insertError.code !== "23505") {
    return { error: "The account was created, but we could not add them to the admin list." };
  }

  revalidatePath("/admin/admins");
  const inviteLink = `${redirectTo}?token_hash=${encodeURIComponent(tokenHash)}&type=invite`;
  return {
    success: `Setup link ready for ${email}. Send it only to them. It works once.`,
    inviteLink,
  };
}

export async function removeAdmin(userId: string) {
  const { supabase, user } = await getAuthenticatedAdmin();
  if (!supabase || !user) {
    return;
  }

  if (user.id === userId) {
    return;
  }

  const { count } = await supabase
    .from("admins")
    .select("user_id", { count: "exact", head: true });

  if ((count ?? 0) <= 1) {
    return;
  }

  const service = getServiceSupabase();
  if (service) {
    await service.from("admins").delete().eq("user_id", userId);
    await service.auth.admin.deleteUser(userId);
  } else {
    await supabase.from("admins").delete().eq("user_id", userId);
  }

  revalidatePath("/admin/admins");
}
