"use client";

import { useActionState } from "react";
import { signUpForEvent } from "@/app/actions/signups";

export function EventSignupForm({ eventId }: { eventId: string }) {
  const [state, action, pending] = useActionState(signUpForEvent, null);

  return (
    <form action={action} className="relative mt-6 grid gap-3">
      <input type="hidden" name="event_id" value={eventId} />
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor={`company-${eventId}`}>Company</label>
        <input id={`company-${eventId}`} name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <label className="field-label" htmlFor={`name-${eventId}`}>Name</label>
      <input
        id={`name-${eventId}`}
        name="name"
        required
        minLength={2}
        autoComplete="name"
        className="field-input"
        placeholder="Your name"
      />
      <label className="field-label" htmlFor={`email-${eventId}`}>Email</label>
      <input
        id={`email-${eventId}`}
        name="email"
        type="email"
        required
        autoComplete="email"
        className="field-input"
        placeholder="you@mail.utoronto.ca"
      />
      {state?.error ? <p className="text-sm font-semibold text-red-600" role="alert">{state.error}</p> : null}
      {state?.success ? <p className="text-sm font-semibold text-emerald-700" role="status">{state.success}</p> : null}
      <button className="btn-gold mt-1" type="submit" disabled={pending}>
        {pending ? "Signing up..." : "Sign up"}
      </button>
    </form>
  );
}
