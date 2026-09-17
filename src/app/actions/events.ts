"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { torontoInputToIso } from "@/lib/format";
import { getAuthenticatedAdmin } from "@/lib/supabase/server";
import type { ActionState } from "@/lib/types";

function readEventFields(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const tag = String(formData.get("tag") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const startsAtInput = String(formData.get("starts_at") ?? "").trim();
  const endsAtInput = String(formData.get("ends_at") ?? "").trim();

  if (!title || !description || !tag || !location || !startsAtInput) {
    return { error: "Please fill in every required field." };
  }

  const starts_at = torontoInputToIso(startsAtInput);
  const ends_at = endsAtInput ? torontoInputToIso(endsAtInput) : null;

  if (ends_at && new Date(ends_at) <= new Date(starts_at)) {
    return { error: "End time must be after the start time." };
  }

  return {
    values: { title, description, tag, location, starts_at, ends_at },
  };
}

export async function createEvent(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const { supabase, user } = await getAuthenticatedAdmin();
  if (!supabase || !user) {
    return { error: "You must be signed in as an admin." };
  }

  const parsed = readEventFields(formData);
  if ("error" in parsed) {
    return { error: parsed.error };
  }

  const { error } = await supabase.from("events").insert(parsed.values);
  if (error) {
    return { error: "Could not create the event." };
  }

  revalidatePath("/");
  revalidatePath("/events");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateEvent(id: string, _prev: ActionState, formData: FormData): Promise<ActionState> {
  const { supabase, user } = await getAuthenticatedAdmin();
  if (!supabase || !user) {
    return { error: "You must be signed in as an admin." };
  }

  const parsed = readEventFields(formData);
  if ("error" in parsed) {
    return { error: parsed.error };
  }

  const { error } = await supabase.from("events").update(parsed.values).eq("id", id);
  if (error) {
    return { error: "Could not update the event." };
  }

  revalidatePath("/");
  revalidatePath("/events");
  revalidatePath("/admin");
  revalidatePath(`/admin/events/${id}`);
  redirect(`/admin/events/${id}`);
}

export async function deleteEvent(id: string) {
  const { supabase, user } = await getAuthenticatedAdmin();
  if (!supabase || !user) {
    redirect("/admin/login");
  }

  await supabase.from("events").delete().eq("id", id);
  revalidatePath("/");
  revalidatePath("/events");
  revalidatePath("/admin");
  redirect("/admin");
}
