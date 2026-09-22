"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";
import { Reveal } from "./Reveal";

/**
 * These describe how the studio operates and are checkable against the rest of
 * the site (SERVICES, PACKAGE_GROUPS, the FAQ). The previous set — years
 * independent, products shipped, award counts, client return rate — asserted a
 * track record that could not be substantiated, so it was removed rather than
 * restated with different numbers.
 */
const STATS = [
  { value: 4, suffix: "", label: "Disciplines under one roof", sub: "Brand · Product · Web · Motion" },
  { value: 3, suffix: "", label: "Package tiers per service", sub: "Fixed-fee wherever possible" },
  { value: 2, suffix: "", label: "Week working cycles", sub: "A deliverable at every step" },
  { value: 30, suffix: "", label: "Minute intro call", sub: "How every engagement starts" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix]);

  // Server-render the real value so crawlers and no-JS readers see it;
  // the animation overwrites it from 0 once in view.
  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="bg-ink px-5 py-20 text-paper md:px-10 md:py-28">
      <Reveal>
        <p className="eyebrow mb-14 text-paper/40">How we work</p>
      </Reveal>
      <div className="grid gap-12 md:grid-cols-4 md:gap-0 md:divide-x md:divide-paper/15">
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.08} className="md:px-8 md:first:pl-0 md:last:pr-0">
            <p className="display text-6xl text-paper md:text-7xl">
              <Counter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="eyebrow mt-3 text-paper/60">{stat.label}</p>
            <p className="mt-2 font-mono text-[11px] text-paper/35">{stat.sub}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
