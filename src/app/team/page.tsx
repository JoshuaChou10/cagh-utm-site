import Image from "next/image";
import type { Metadata } from "next";
import { portfolios, president, type TeamPhoto } from "@/lib/content";

export const metadata: Metadata = {
  title: "Team | CAGH UTM",
  description: "Meet the people behind CAGH UTM",
};

function TeamImage({
  photo,
  priority = false,
  sizes,
  inset = false,
}: {
  photo: TeamPhoto;
  priority?: boolean;
  sizes: string;
  inset?: boolean;
}) {
  return (
    <div className={inset ? "overflow-hidden rounded-2xl bg-uoft-ice" : "overflow-hidden rounded-[2rem] bg-uoft-ice shadow-soft"}>
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        priority={priority}
        sizes={sizes}
        className="h-auto w-full"
      />
    </div>
  );
}

export default function TeamPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-uoft-ice to-uoft-pale pt-40 pb-24">
        <div className="container-shell">
          <h1 className="page-title max-w-4xl text-uoft-navy">Our Team</h1>
          <p className="body-lg mt-7 max-w-2xl">
           Meet the CAGH UTM Executives and Coordinators. 
          </p>

          <figure className="mx-auto mt-12 max-w-sm text-center">
            <figcaption className="mb-4">
              <h2 className="text-2xl font-bold tracking-tight text-uoft-navy md:text-2xl">{president.name}</h2>
              <p className="mt-1 text-lg font-semibold tracking-tight text-uoft-blue md:text-xl">{president.role}</p>
            </figcaption>
            <TeamImage photo={president.photo} priority sizes="(min-width: 384px) 384px, 100vw" />
          </figure>
        </div>
      </section>

      {portfolios.map((portfolio, index) => (
        <section
          key={portfolio.id}
          id={portfolio.id}
          className={index % 2 === 0 ? "section-pad bg-white" : "section-pad bg-uoft-ice"}
        >
          <div className="container-shell grid gap-6">
            <div className="grid items-stretch gap-6 lg:grid-cols-2">
              <div className={`flex h-full w-full flex-col rounded-[2rem] border p-6 shadow-sm ${index % 2 === 0 ? "border-slate-200 bg-uoft-ice" : "border-slate-200 bg-white"}`}>
                <h2 className="text-2xl font-bold tracking-tight text-uoft-navy">{portfolio.department}</h2>
                <p className="mt-3 text-base leading-7 text-slate-600">{portfolio.description}</p>
              </div>

              <div className={`flex h-full w-full flex-col items-center gap-5 rounded-[2rem] border p-5 shadow-sm sm:flex-row ${index % 2 === 0 ? "border-slate-200 bg-uoft-ice" : "border-slate-200 bg-white"}`}>
                <div className="w-full max-w-[320px] shrink-0">
                  <TeamImage photo={portfolio.exec} inset sizes="320px" />
                </div>
                <div className="min-w-0 text-center sm:text-left">
                  <h3 className="text-xl font-bold tracking-tight text-uoft-navy md:text-xl">{portfolio.name}</h3>
                  <p className="mt-1 text-sm font-semibold tracking-tight text-uoft-blue md:text-lg">{portfolio.execRole}</p>
                </div>
              </div>
            </div>

            {portfolio.team.map((photo) => (
              <div key={photo.src} className={`mx-auto w-full max-w-2xl rounded-[2rem] border p-5 shadow-sm ${index % 2 === 0 ? "border-slate-200 bg-uoft-ice" : "border-slate-200 bg-white"}`}>
                <TeamImage photo={photo} inset sizes="(min-width: 1024px) 672px, 100vw" />
                <p className="mt-4 text-center text-base leading-7 text-slate-600">
                  <span className="font-semibold text-uoft-navy">Team & Coordinators:</span> {photo.coordinators.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
