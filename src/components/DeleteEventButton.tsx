"use client";

import { deleteEvent } from "@/app/actions/events";

export function DeleteEventButton({ eventId, title }: { eventId: string; title: string }) {
  return (
    <form
      action={deleteEvent.bind(null, eventId)}
      onSubmit={(event) => {
        if (!window.confirm(`Delete “${title}”? This also removes all student sign-ups.`)) {
          event.preventDefault();
        }
      }}
    >
      <button type="submit" className="rounded-full border border-red-200 px-4 py-2 text-sm font-bold text-red-700 hover:bg-red-50">
        Delete
      </button>
    </form>
  );
}
