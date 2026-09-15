import { team } from "@/lib/content";
import { EventPhoto } from "@/components/EventPhoto";

export default function TeamPage() {
  return <>
    <section className="bg-uoft-ice pt-40 pb-24"><div className="container-shell"><div className="eyebrow">Team</div><h1 className="h2 mt-4 max-w-4xl text-uoft-navy">The people behind CAGH UTM.</h1><p className="body-lg mt-7 max-w-2xl">Students building programs, partnerships and experiences that make global health more accessible at UTM.</p></div></section>
    <section className="section-pad"><div className="container-shell"><EventPhoto label="CAGH UTM executive team group photo"/><div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">{team.map((m,i)=><article key={i}><div className="aspect-[4/5] rounded-[1.6rem] bg-gradient-to-br from-uoft-pale to-sky-200"/><div className="mt-5"><h2 className="text-xl font-bold text-uoft-navy">{m.name}</h2><div className="mt-1 font-semibold text-uoft-blue">{m.role}</div><div className="mt-1 text-sm text-slate-500">{m.program}</div></div></article>)}</div></div></section>
  </>;
}
