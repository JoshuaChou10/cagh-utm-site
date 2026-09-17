import { notFound } from "next/navigation";
import { AdminEventForm } from "@/components/AdminEventForm";
import { updateEvent } from "@/app/actions/events";
import { getEventById } from "@/lib/events";

export const metadata = {
  title: "Edit event | CAGH UTM",
};

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getEventById(id);
  if (!event) notFound();

  return (
    <section className="bg-gradient-to-br from-uoft-ice to-white pt-40 pb-24">
      <div className="container-shell max-w-3xl">
        <div className="eyebrow">Admin</div>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-uoft-navy">Edit event</h1>
        <div className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-8">
          <AdminEventForm
            action={updateEvent.bind(null, event.id)}
            event={event}
            submitLabel="Save changes"
          />
        </div>
      </div>
    </section>
  );
}
