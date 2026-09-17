import { ArrowUpRight } from "lucide-react";
import { siteLinks } from "@/lib/content";

const items = [
  ["General member list", "Join the CAGH UTM community and receive chapter updates, events and opportunities.", siteLinks.generalMember, "Join as a general member"],
  ["Executive applications", "Help lead events, outreach, programming, partnerships and the next chapter of CAGH UTM.", siteLinks.executiveApplication, "Apply for the executive team"],
  ["Mentorship program", "Connect with mentors and mentees and build relationships that support your global health journey.", siteLinks.mentorshipApplication, "Open mentorship application"],
];

export default function GetInvolvedPage() {
  return <>
    <section className="bg-gradient-to-br from-uoft-ice to-uoft-pale pt-40 pb-24"><div className="container-shell"><h1 className="display max-w-5xl text-uoft-navy">Get involved</h1><p className="body-lg mt-7 max-w-2xl">Join the chapter, apply to the executive team or take part in mentorship.</p></div></section>
    <section className="section-pad"><div className="container-shell grid gap-6 lg:grid-cols-3">{items.map(([title,text,href,cta])=><article key={title} className="flex min-h-[390px] flex-col rounded-[2rem] border border-slate-200 p-8"><div className="eyebrow">CAGH UTM</div><h2 className="mt-6 text-3xl font-bold text-uoft-navy">{title}</h2><p className="mt-5 leading-7 text-slate-600">{text}</p><a href={href} className="mt-auto inline-flex items-center justify-between rounded-full bg-uoft-navy px-5 py-4 font-bold text-white">{cta}<ArrowUpRight size={17}/></a></article>)}</div></section>
  </>;
}
