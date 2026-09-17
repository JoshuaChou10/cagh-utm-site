import Link from "next/link";
import { listAdminEvents } from "@/lib/admin-events";
import { DeleteEventButton } from "@/components/DeleteEventButton";
import { formatEventDate } from "@/lib/format";

export const metadata = {
  title: "Manage events | CAGH UTM",
};

export default async function AdminEventsPage() {
  const events = await listAdminEvents();

  return (
    <>
      <section className="bg-gradient-to-br from-uoft-ice to-uoft-pale pt-40 pb-16">
        <div className="container-shell flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="eyebrow">Admin</div>
            <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-uoft-navy">Events</h1>
            <p className="mt-4 max-w-xl text-slate-600">Create, edit, and delete events. Students sign up with a name and email — no account needed.</p>
          </div>
          <Link href="/admin/events/new" className="btn-navy">New event</Link>
        </div>
      </section>
      <section className="section-pad pt-12">
        <div className="container-shell">
          {events.length === 0 ? (
            <p className="rounded-[2rem] border border-slate-200 bg-white p-8 text-slate-600">No events yet. Create the first one.</p>
          ) : (
            <div className="overflow-x-auto rounded-[2rem] border border-slate-200 bg-white">
              <table className="w-full text-left">
                <thead className="bg-uoft-ice text-sm uppercase tracking-[.12em] text-uoft-navy">
                  <tr>
                    <th className="px-6 py-4">Event</th>
                    <th className="px-6 py-4">When</th>
                    <th className="px-6 py-4">Sign-ups</th>
                    <th className="px-6 py-4"><span className="sr-only">Actions</span></th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr key={event.id} className="border-t border-slate-100">
                      <td className="px-6 py-5">
                        <div className="font-bold text-uoft-navy">{event.title}</div>
                        <div className="mt-1 text-sm text-slate-500">{event.tag} · {event.location}</div>
                      </td>
                      <td className="px-6 py-5 text-sm text-slate-600">{formatEventDate(event.starts_at)}</td>
                      <td className="px-6 py-5 font-semibold text-uoft-navy">{event.signup_count}</td>
                      <td className="px-6 py-5">
                        <div className="flex flex-wrap justify-end gap-3">
                          <Link href={`/admin/events/${event.id}`} className="text-sm font-bold text-uoft-navy">View</Link>
                          <Link href={`/admin/events/${event.id}/edit`} className="text-sm font-bold text-uoft-blue">Edit</Link>
                          <DeleteEventButton eventId={event.id} title={event.title} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
