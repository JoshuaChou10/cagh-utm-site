import { AdminEventForm } from "@/components/AdminEventForm";
import { createEvent } from "@/app/actions/events";

export const metadata = {
  title: "New event | CAGH UTM",
};

export default function NewEventPage() {
  return (
    <section className="bg-gradient-to-br from-uoft-ice to-white pt-40 pb-24">
      <div className="container-shell max-w-3xl">
        <div className="eyebrow">Admin</div>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-uoft-navy">Create event</h1>
        <div className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-8">
          <AdminEventForm action={createEvent} submitLabel="Publish event" />
        </div>
      </div>
    </section>
  );
}
