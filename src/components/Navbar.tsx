"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const nav = [
  ["Home", "/"],
  ["Events", "/events"],
  ["Mentorship", "/mentorship"],
  ["Team", "/team"],
  ["Get Involved", "/get-involved"],
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/50 bg-white/80 backdrop-blur-xl">
      <div className="container-shell flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3 font-bold text-uoft-navy" aria-label="CAGH UTM home">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-uoft-navy text-sm text-white">C</div>
          <div className="leading-tight">
            <div className="text-base">CAGH UTM</div>
            <div className="text-[10px] uppercase tracking-[.18em] text-slate-500">Global Health</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-700 lg:flex">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="link-underline">{label}</Link>
          ))}
        </nav>

        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t bg-white lg:hidden">
          <nav className="container-shell flex flex-col py-5">
            {nav.map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)} className="border-b py-4 font-semibold">{label}</Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
