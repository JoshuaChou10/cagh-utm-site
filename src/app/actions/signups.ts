"use server";

import { revalidatePath } from "next/cache";
import { sendSignupConfirmation } from "@/lib/email";
import { isPastEvent } from "@/lib/format";
import { getPublicSupabase } from "@/lib/supabase/public";
import type { ActionState } from "@/lib/types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function signUpForEvent(_prev: ActionState, formData: FormData): Promise<ActionState> {
  if (String(formData.get("company") ?? "").trim()) {
    return { success: "You're signed up. Check your email for the event details." };
  }

  const eventId = String(formData.get("event_id") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  if (!eventId) {
    return { error: "This event could not be found." };
  }

  if (name.length < 2) {
    return { error: "Please enter your full name." };
  }

  if (!EMAIL_PATTERN.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  const supabase = getPublicSupabase();
  if (!supabase) {
    return { error: "Event sign-up is not available yet." };
  }

  const { data: event, error: eventError } = await supabase
    .from("events")
    .select("id, title, description, tag, location, starts_at, ends_at, created_at, updated_at")
    .eq("id", eventId)
    .maybeSingle();

  if (eventError || !event) {
    return { error: "This event could not be found." };
  }

  if (isPastEvent(event.starts_at, event.ends_at)) {
    return { error: "This event has already ended." };
  }

  const { error: signupError } = await supabase.from("event_signups").insert({
    event_id: event.id,
    name,
    email,
  });

  if (signupError) {
    if (signupError.code === "23505") {
      return { error: "You're already signed up for this event." };
    }
    return { error: "Could not complete your sign-up. Please try again." };
  }

  const emailResult = await sendSignupConfirmation({ name, email, event });
  revalidatePath("/admin");
  revalidatePath(`/admin/events/${event.id}`);

  if (!emailResult.sent) {
    return {
      success: "You're signed up. We could not send a confirmation email, but your spot is saved.",
    };
  }

  return { success: "You're signed up. Check your email for the event details." };
}
