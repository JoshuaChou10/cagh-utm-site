import { EventSignupForm } from "@/components/EventSignupForm";
import { formatEventDate, isPastEvent } from "@/lib/format";
import type { EventRecord } from "@/lib/types";

export function EventCard({
  event,
  showSignup = false,
  tint = false,
}: {
  event: EventRecord;
  showSignup?: boolean;
  tint?: boolean;
}) {
  const past = isPastEvent(event.starts_at, event.ends_at);

  return (
    <article className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white">
      <div className={`photo-placeholder h-48 ${tint ? "[filter:hue-rotate(12deg)]" : ""}`} />
      <div className="p-7">
        <div className="flex justify-between gap-4 text-xs font-bold uppercase tracking-[.14em] text-uoft-blue">
          <span>{event.tag}</span>
          <span>{formatEventDate(event.starts_at)}</span>
        </div>
        <h2 className="mt-5 text-2xl font-bold text-uoft-navy">{event.title}</h2>
        <p className="mt-3 leading-7 text-slate-600">{event.description}</p>
        <div className="mt-6 text-sm font-semibold text-slate-500">{event.location}</div>
        {showSignup ? (
          past ? (
            <p className="mt-6 text-sm font-semibold text-slate-500">This event has ended.</p>
          ) : (
            <EventSignupForm eventId={event.id} />
          )
        ) : null}
      </div>
    </article>
  );
}
