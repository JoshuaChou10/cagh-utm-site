import Link from "next/link";
import { ArrowRight, Globe2, GraduationCap, Users, Sparkles, MoveUpRight } from "lucide-react";
import { EventPhoto } from "@/components/EventPhoto";
import { GlobeClient } from "@/components/GlobeClient";
import { events } from "@/lib/content";


export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-uoft-ice to-uoft-pale pt-28">
        <div className="absolute inset-0 bg-dot-grid [background-size:28px_28px] opacity-40" />
        <div className="container-shell relative grid min-h-[760px] items-center gap-8 py-16 lg:grid-cols-[1.08fr_.92fr]">
          <div className="z-10">
            <div className="eyebrow">Canadian Association for Global Health · UTM</div>
            <h1 className="display mt-5 max-w-4xl text-uoft-blue">A New Chapter For Global Health</h1>
            <p className="body-lg mt-7 max-w-2xl">We are a student-led organization at the University of Toronto Mississauga advancing global health equity through advocacy and education.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/get-involved" className="inline-flex items-center gap-2 rounded-full bg-uoft-blue px-6 py-4 font-semibold text-white transition hover:-translate-y-1 hover:bg-uoft-sky">Join CAGH UTM <ArrowRight size={18}/></Link>
              <Link href="/events" className="inline-flex items-center gap-2 rounded-full border border-uoft-navy/15 bg-white/70 px-6 py-4 font-semibold text-uoft-navy backdrop-blur transition hover:bg-white">Explore events <MoveUpRight size={17}/></Link>
            </div>
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium text-slate-500">
              <span>Community</span><span>Research</span><span>Mentorship</span><span>Policy</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-16 rounded-full bg-sky-300/20 blur-3xl" />
            <GlobeClient />
            <div className="absolute bottom-16 left-3 rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-xs shadow-soft backdrop-blur-xl">
              <div className="font-bold text-uoft-navy">UTM · Mississauga</div>
              <div className="mt-1 text-slate-500">One campus. A global network.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-shell grid items-center gap-14 lg:grid-cols-2">
          <div>
            <div className="eyebrow">Who we are</div>
            <h2 className="h2 mt-4 text-uoft-blue">A student community for global health at UTM.</h2>
            <p className="body-lg mt-7">CAGH UTM is the University of Toronto Mississauga student chapter of the Canadian Association for Global Health. We bring students together across disciplines to learn, connect and act on health challenges that cross borders.</p>
            <Link href="/about" className="mt-8 inline-flex items-center gap-2 font-bold text-uoft-navy">About us <ArrowRight size={17}/></Link>
          </div>
          <EventPhoto label="CAGH UTM community / event photo" />
        </div>
      </section>

      <section className="section-pad bg-uoft-ice">
        <div className="container-shell">
          <div className="max-w-3xl"><div className="eyebrow">What we do</div><h2 className="h2 mt-4 text-uoft-blue">Connect. Learn. Act.</h2></div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              [Users, "Connect", "Meet students, researchers, speakers and professionals working across global health."],
              [GraduationCap, "Learn", "Attend panels, workshops, research talks and career conversations."],
              [Sparkles, "Act", "Turn awareness into projects, advocacy, mentorship and meaningful involvement."],
            ].map(([Icon, title, text]: any) => <div key={title} className="rounded-[2rem] border border-blue-900/10 bg-white p-8 shadow-[0_10px_40px_rgba(0,42,92,.05)]"><Icon className="text-uoft-blue"/><h3 className="mt-14 text-3xl font-bold text-uoft-navy">{title}</h3><p className="mt-4 leading-7 text-slate-600">{text}</p></div>)}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-shell">
          <div className="flex flex-wrap items-end justify-between gap-6"><div><div className="eyebrow">Up next</div><h2 className="h2 mt-4 text-uoft-blue">Events worth showing up for.</h2></div><Link href="/events" className="font-bold text-uoft-blue">View all events →</Link></div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {events.map((event, i) => <article key={event.title} className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white"><div className={`h-48 photo-placeholder ${i===1 ? "[filter:hue-rotate(12deg)]" : ""}`}/><div className="p-7"><div className="flex justify-between text-xs font-bold uppercase tracking-[.14em] text-uoft-blue"><span>{event.tag}</span><span>{event.date}</span></div><h3 className="mt-5 text-2xl font-bold text-uoft-blue">{event.title}</h3><p className="mt-3 leading-7 text-slate-600">{event.description}</p><div className="mt-6 text-sm font-semibold text-slate-500">{event.location}</div></div></article>)}
          </div>
        </div>
      </section>

      <section className="section-pad bg-uoft-navy text-white">
        <div className="container-shell grid items-center gap-12 lg:grid-cols-2">
          <div><div className="eyebrow !text-sky-300">Mentorship</div><h2 className="h2 mt-4">Learn from people already shaping global health.</h2><p className="mt-7 max-w-xl text-lg leading-8 text-blue-100/80">Find guidance, perspective and community through CAGH UTM mentorship. Connect with mentors and peers who can help you navigate research, careers and opportunities.</p><Link href="/mentorship" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-4 font-bold text-uoft-navy">Explore mentorship <ArrowRight size={17}/></Link></div>
          <EventPhoto label="Mentorship / networking event photo" />
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-shell">
          <div className="eyebrow">Get involved</div><h2 className="h2 mt-4 max-w-4xl text-uoft-blue">Choose how you want to be part of CAGH UTM.</h2>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {[
              ["Become a general member", "Join the community and stay connected to events and opportunities."],
              ["Apply for the executive team", "Help lead programming, outreach, partnerships and chapter growth."],
              ["Join the mentorship program", "Build meaningful connections with mentors and mentees."],
            ].map(([title, text]) => <Link href="/get-involved" key={title} className="group rounded-[2rem] bg-uoft-pale p-8 transition hover:-translate-y-1 hover:shadow-soft"><Globe2 className="text-uoft-blue"/><h3 className="mt-12 text-2xl font-bold text-uoft-navy">{title}</h3><p className="mt-4 leading-7 text-slate-600">{text}</p><div className="mt-8 font-bold text-uoft-navy">Learn more <span className="inline-block transition group-hover:translate-x-1">→</span></div></Link>)}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-28 text-white">
        <div className="photo-placeholder absolute inset-0 rounded-none" />
        <div className="absolute inset-0 bg-uoft-navy/55" />
        <div className="container-shell relative text-center"><div className="eyebrow !text-sky-200">CAGH UTM</div><h2 className="mx-auto mt-4 max-w-4xl text-5xl font-bold leading-[.98] tracking-[-.04em] md:text-7xl">Be part of the conversation shaping global health.</h2><Link href="/get-involved" className="mt-9 inline-flex rounded-full bg-white px-7 py-4 font-bold text-uoft-navy">Join CAGH UTM</Link></div>
      </section>
    </>
  );
}
