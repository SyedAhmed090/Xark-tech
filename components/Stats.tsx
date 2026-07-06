"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";
import { Reveal } from "./Reveal";

const STATS = [
  { value: 12, suffix: "", label: "Years independent", sub: "Founded Austin, 2014" },
  { value: 140, suffix: "+", label: "Products shipped", sub: "Across 11 industries" },
  {
    value: 9,
    suffix: "",
    label: "International design awards",
    sub: "Awwwards ×3 · FWA ×2 · CSSDA ×4",
  },
  { value: 96, suffix: "%", label: "Clients who come back", sub: "Or send someone who does" },
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

  return (
    <span ref={ref} className="tabular-nums">
      0{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="bg-ink px-5 py-20 text-paper md:px-10 md:py-28">
      <Reveal>
        <p className="eyebrow mb-14 text-paper/40">The record so far</p>
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
