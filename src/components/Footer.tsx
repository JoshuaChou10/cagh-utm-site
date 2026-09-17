"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-uoft-navy py-14 text-white">
      <div className="container-shell grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="text-2xl font-bold">CAGH UTM</div>
          <p className="mt-4 max-w-md text-sm leading-7 text-blue-100/80">
            University of Toronto Mississauga student chapter of the Canadian Association for Global Health.
          </p>
        </div>
        <div className="text-sm">
          <div className="mb-3 font-semibold">Explore</div>
          <div className="grid gap-2 text-blue-100/80">
            <Link href="/about">About</Link><Link href="/events">Events</Link><Link href="/mentorship">Mentorship</Link><Link href="/team">Team</Link>
          </div>
        </div>
        <div className="text-sm">
          <div className="mb-3 font-semibold">Get involved</div>
          <div className="grid gap-2 text-blue-100/80">
            <Link href="/get-involved">General member list</Link><Link href="/get-involved">Executive applications</Link><Link href="/get-involved">Mentorship program</Link>
          </div>
        </div>
      </div>
      <div className="container-shell mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/15 pt-6 text-xs text-blue-100/60">
        <span>© {new Date().getFullYear()} CAGH UTM. Built for the UTM global health community.</span>
        <Link href="/admin/login" className="text-blue-100/50 hover:text-white">Admin</Link>
      </div>
    </footer>
  );
}
