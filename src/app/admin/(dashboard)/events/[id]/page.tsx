import Link from "next/link";
import { notFound } from "next/navigation";
import { listEventSignups } from "@/lib/admin-events";
import { getEventById } from "@/lib/events";
import { DeleteEventButton } from "@/components/DeleteEventButton";
import { formatEventRange } from "@/lib/format";

export const metadata = {
  title: "Event sign-ups | CAGH UTM",
};

export default async function AdminEventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getEventById(id);
  if (!event) notFound();

  const signups = await listEventSignups(id);

  return (
    <section className="bg-gradient-to-br from-uoft-ice to-white pt-40 pb-24">
      <div className="container-shell">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <div className="eyebrow">{event.tag}</div>
            <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-uoft-navy">{event.title}</h1>
            <p className="mt-4 text-slate-600">{formatEventRange(event.starts_at, event.ends_at)} · {event.location}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={`/admin/events/${event.id}/edit`} className="btn-navy">Edit</Link>
            <DeleteEventButton eventId={event.id} title={event.title} />
          </div>
        </div>
        <p className="mt-8 max-w-3xl leading-7 text-slate-600">{event.description}</p>
        <h2 className="mt-14 text-2xl font-bold text-uoft-navy">Sign-ups ({signups.length})</h2>
        {signups.length === 0 ? (
          <p className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-8 text-slate-600">No students have signed up yet.</p>
        ) : (
          <div className="mt-6 overflow-x-auto rounded-[2rem] border border-slate-200 bg-white">
            <table className="w-full text-left">
              <thead className="bg-uoft-ice text-sm uppercase tracking-[.12em] text-uoft-navy">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Signed up</th>
                </tr>
              </thead>
              <tbody>
                {signups.map((signup) => (
                  <tr key={signup.id} className="border-t border-slate-100">
                    <td className="px-6 py-4 font-semibold text-uoft-navy">{signup.name}</td>
                    <td className="px-6 py-4 text-slate-600">{signup.email}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {new Date(signup.created_at).toLocaleString("en-CA", { timeZone: "America/Toronto" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
