import { EventCard } from "@/components/EventCard";
import { listEvents } from "@/lib/events";
import { isPastEvent } from "@/lib/format";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const metadata = {
  title: "Events | CAGH UTM",
};

export default async function EventsPage() {
  const events = await listEvents();
  const upcoming = events.filter((event) => !isPastEvent(event.starts_at, event.ends_at));
  const past = events.filter((event) => isPastEvent(event.starts_at, event.ends_at));

  return (
    <>
      <section className="bg-gradient-to-br from-uoft-ice to-uoft-pale pt-40 pb-24">
        <div className="container-shell">
          <h1 className="display max-w-4xl text-uoft-navy">Events</h1>
          <p className="body-lg mt-7 max-w-2xl">
            Our Events! Sign up with your name and email, no account needed.
          </p>
        </div>
      </section>
      <section className="section-pad">
        <div className="container-shell">
          {!isSupabaseConfigured() ? (
            <p className="rounded-[2rem] border border-slate-200 bg-white p-8 text-slate-600">
              Events will appear here once Supabase is connected.
            </p>
          ) : upcoming.length === 0 && past.length === 0 ? (
            <p className="rounded-[2rem] border border-slate-200 bg-white p-8 text-slate-600">
              No events are posted yet. Check back soon.
            </p>
          ) : (
            <>
              {upcoming.length > 0 ? (
                <div className="grid gap-6 lg:grid-cols-3">
                  {upcoming.map((event) => (
                    <EventCard key={event.id} event={event} showSignup />
                  ))}
                </div>
              ) : (
                <p className="rounded-[2rem] border border-slate-200 bg-white p-8 text-slate-600">
                  No upcoming events right now.
                </p>
              )}
              {past.length > 0 ? (
                <div className="mt-20">
                  <div className="eyebrow">Past events</div>
                  <h2 className="h2 mt-4 text-uoft-navy">Recently hosted</h2>
                  <div className="mt-12 grid gap-6 lg:grid-cols-3">
                    {past.map((event) => (
                      <EventCard key={event.id} event={event} showSignup />
                    ))}
                  </div>
                </div>
              ) : null}
            </>
          )}
        </div>
      </section>
    </>
  );
}
