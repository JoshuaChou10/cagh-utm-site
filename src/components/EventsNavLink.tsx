"use client";

import Link from "next/link";
import type { ReactNode } from "react";

export function EventsNavLink({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href="/events"
      className={className}
      onNavigate={() => {
        performance.clearMarks("events-nav-start");
        performance.mark("events-nav-start");

        console.log("[Performance] Events navigation started");
      }}
    >
      {children}
    </Link>
  );
}