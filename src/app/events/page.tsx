
import { Suspense } from "react";
import { EventCard } from "@/components/EventCard";
import { EventsTimingMarker } from "@/components/EventsTimingMarker";
import { listPastEvents, listUpcomingEvents } from "@/lib/events";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const metadata = {
  title: "Events | CAGH UTM",
};

// ============================================
// ASYNC SERVER COMPONENT
// Fetch event data independently of page shell
// ============================================

async function EventsContent() {
  if (!isSupabaseConfigured()) {
    return (
      <>
        <p className="rounded-[2rem] border border-slate-200 bg-white p-8 text-slate-600">
          Events will appear here once Supabase is connected.
        </p>
        <EventsTimingMarker phase="content" />
      </>
    );
  }

  const [upcoming, past] = await Promise.all([
    listUpcomingEvents(),
    listPastEvents(),
  ]);

  if (upcoming.length === 0 && past.length === 0) {
    return (
      <>
        <p className="rounded-[2rem] border border-slate-200 bg-white p-8 text-slate-600">
          No events are posted yet. Check back soon.
        </p>
        <EventsTimingMarker phase="content" />
      </>
    );
  }

  return (
    <>
      {upcoming.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-3">
          {upcoming.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              showSignup
            />
          ))}
        </div>
      ) : (
        <p className="rounded-[2rem] border border-slate-200 bg-white p-8 text-slate-600">
          No upcoming events right now.
        </p>
      )}

      {past.length > 0 && (
        <div className="mt-20">
          <div className="eyebrow">Past events</div>

          <h2 className="h2 mt-4 text-uoft-navy">
            Recently hosted
          </h2>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {past.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                showSignup
              />
            ))}
          </div>
        </div>
      )}

      {/* Actual event content is ready */}
      <EventsTimingMarker phase="content" />
    </>
  );
}

// ============================================
// LOADING SKELETON
// Displayed while Supabase data is loading
// ============================================

function EventsSkeleton() {
  return (
    <div
      className="grid gap-6 lg:grid-cols-3"
      role="status"
      aria-label="Loading events"
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="animate-pulse rounded-[2rem] bg-slate-100 p-6"
        >
          <div className="h-44 rounded-xl bg-slate-200" />
          <div className="mt-5 h-6 w-3/4 rounded bg-slate-200" />
          <div className="mt-3 h-4 w-1/2 rounded bg-slate-200" />
        </div>
      ))}

      <span className="sr-only">
        Loading events...
      </span>
    </div>
  );
}

// ============================================
// MAIN EVENTS PAGE
// Synchronous server component allows streaming
// ============================================

export default function EventsPage() {
  return (
    <>
      {/* Hero section renders independently */}
      <section className="bg-gradient-to-br from-uoft-ice to-uoft-pale pt-40 pb-24">
        <div className="container-shell">
          <h1 className="page-title max-w-4xl text-uoft-navy">
            Events
          </h1>

          <p className="body-lg mt-7 max-w-2xl">
            Our Events! Sign up with your name and email,
            no account needed.
          </p>
        </div>

        {/* Measure initial page shell readiness */}
        <EventsTimingMarker phase="shell" />
      </section>

      {/* Events load independently of hero section */}
      <section className="section-pad">
        <div className="container-shell">
          <Suspense fallback={<EventsSkeleton />}>
            <EventsContent />
          </Suspense>
        </div>
      </section>
    </>
  );
}
