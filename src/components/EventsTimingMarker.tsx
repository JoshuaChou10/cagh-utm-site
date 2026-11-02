
"use client";

import { useEffect, useRef } from "react";

type Props = {
  phase: "shell" | "content";
};

export function EventsTimingMarker({ phase }: Props) {
  const measured = useRef(false);

  useEffect(() => {
    if (measured.current) return;

    const start = performance.getEntriesByName(
      "events-nav-start",
      "mark"
    ).at(-1);

    if (!start) return;

    let frame1 = 0;
    let frame2 = 0;

    // Approximate visibility by waiting for
    // two animation-frame callbacks after mount.
    frame1 = requestAnimationFrame(() => {
      frame2 = requestAnimationFrame(() => {
        if (measured.current) return;

        // Prevent recording an unrelated navigation.
        if (window.location.pathname !== "/events") {
          return;
        }

        measured.current = true;

        const endName = `events-${phase}-ready`;
        const measureName = `events-click-to-${phase}`;

        performance.mark(endName);

        const measurement = performance.measure(
    measureName,
    {
        start: start.startTime,
        end: performance.now(),
    }
    );

        console.log(
          `[Performance] ${measureName}: ` +
          `${measurement.duration.toFixed(2)} ms`
        );
      });
    });

    return () => {
      cancelAnimationFrame(frame1);
      cancelAnimationFrame(frame2);
    };
  }, [phase]);

  return null;
}
