import { events } from "@/lib/content";
import { EventPhoto } from "@/components/EventPhoto";

export default function EventsPage() {
  return <>
    <section className="bg-gradient-to-br from-uoft-ice to-uoft-pale pt-40 pb-24"><div className="container-shell"><div className="eyebrow">Events</div><h1 className="h2 mt-4 max-w-4xl text-uoft-navy">Come for the topic. Stay for the people.</h1><p className="body-lg mt-7 max-w-2xl">Panels, workshops, career conversations and community events designed to make global health more tangible.</p></div></section>
    <section className="section-pad"><div className="container-shell"><div className="grid gap-6 lg:grid-cols-3">{events.map((e,i)=><article key={e.title} className="overflow-hidden rounded-[2rem] border border-slate-200"><div className="photo-placeholder h-60"/><div className="p-7"><div className="eyebrow">{e.tag}</div><h2 className="mt-4 text-2xl font-bold text-uoft-navy">{e.title}</h2><p className="mt-4 leading-7 text-slate-600">{e.description}</p><div className="mt-6 flex justify-between text-sm font-semibold text-slate-500"><span>{e.date}</span><span>{e.location}</span></div></div></article>)}</div></div></section>
    <section className="section-pad bg-uoft-ice"><div className="container-shell"><div className="eyebrow">Past events</div><h2 className="h2 mt-4 text-uoft-navy">A chapter you can see yourself in.</h2><div className="mt-12 grid gap-6 md:grid-cols-2"><EventPhoto label="Past event photo #1"/><EventPhoto label="Past event photo #2"/><EventPhoto label="Past event photo #3"/><EventPhoto label="Past event photo #4"/></div></div></section>
  </>;
}
