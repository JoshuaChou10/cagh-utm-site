"use client";

import { useActionState } from "react";
import { isoToDatetimeLocal } from "@/lib/format";
import type { ActionState, EventRecord } from "@/lib/types";

type AdminEventFormProps = {
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
  event?: EventRecord;
  submitLabel: string;
};

export function AdminEventForm({ action, event, submitLabel }: AdminEventFormProps) {
  const [state, formAction, pending] = useActionState(action, null);

  return (
    <form action={formAction} className="grid gap-5">
      <div>
        <label className="field-label" htmlFor="title">Title</label>
        <input id="title" name="title" required defaultValue={event?.title} className="field-input" />
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="tag">Tag</label>
          <input id="tag" name="tag" required defaultValue={event?.tag ?? "Event"} className="field-input" placeholder="Career, Panel, Workshop" />
        </div>
        <div>
          <label className="field-label" htmlFor="location">Location</label>
          <input id="location" name="location" required defaultValue={event?.location} className="field-input" />
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="starts_at">Starts</label>
          <input
            id="starts_at"
            name="starts_at"
            type="datetime-local"
            required
            defaultValue={event ? isoToDatetimeLocal(event.starts_at) : ""}
            className="field-input"
          />
        </div>
        <div>
          <label className="field-label" htmlFor="ends_at">Ends (optional)</label>
          <input
            id="ends_at"
            name="ends_at"
            type="datetime-local"
            defaultValue={event?.ends_at ? isoToDatetimeLocal(event.ends_at) : ""}
            className="field-input"
          />
        </div>
      </div>
      <div>
        <label className="field-label" htmlFor="description">Description</label>
        <textarea id="description" name="description" required defaultValue={event?.description} className="field-textarea" />
      </div>
      {state?.error ? <p className="text-sm font-semibold text-red-600" role="alert">{state.error}</p> : null}
      <button className="btn-navy w-fit" type="submit" disabled={pending}>
        {pending ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
