import Link from "next/link";
import { EventPhoto } from "@/components/EventPhoto";

export default function MentorshipPage() {
  return <>
    <section className="bg-uoft-ice pt-40 pb-24 text-white"><div className="container-shell"><h1 className="display max-w-5xl text-uoft-blue">Mentorship</h1><p className="mt-7 max-w-3xl text-xl leading-8 text-uoft-navy">CAGH UTM mentorship is designed to connect students with guidance, community and pathways in global health.</p></div></section>
    <section className="section-pad"><div className="container-shell grid items-center gap-14 lg:grid-cols-2"><div><div className="eyebrow">For mentees</div><h2 className="mt-4 text-4xl font-bold text-uoft-navy">Become a Mentee</h2><p className="body-lg mt-6">Build a relationship with someone who can offer insight on academics, research, careers, applications and the many routes into global health.</p></div><EventPhoto label="Mentorship conversation / mixer"/></div></section>
    <section className="section-pad bg-uoft-ice"><div className="container-shell grid gap-8 md:grid-cols-3">{[["1","Apply","Tell us what you want to learn and where you want to grow."],["2","Match","We connect participants based on interests, goals and availability."],["3","Connect","Meet regularly, ask questions and build a relationship over time."]].map(([n,t,d])=><div key={n} className="rounded-[2rem] bg-white p-8"><div className="text-5xl font-bold text-sky-300">{n}</div><h3 className="mt-8 text-2xl font-bold text-uoft-navy">{t}</h3><p className="mt-3 leading-7 text-slate-600">{d}</p></div>)}</div></section>
    <section className="section-pad text-center"><div className="container-shell"><h2 className="h2 mx-auto max-w-4xl text-uoft-navy">Ready to join the mentorship program?</h2><Link href="/get-involved" className="mt-8 inline-flex rounded-full bg-uoft-navy px-7 py-4 font-bold text-white">View application details</Link></div></section>
  </>;
}
