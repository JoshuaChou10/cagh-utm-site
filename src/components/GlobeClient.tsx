"use client";

import dynamic from "next/dynamic";

const Globe = dynamic(() => import("./Globe").then((mod) => mod.Globe), {
  ssr: false,
  loading: () => <div className="h-[420px] w-full animate-pulse rounded-full bg-sky-100/50 md:h-[560px]" />,
});

export function GlobeClient() {
  return <Globe />;
}
