"use client";

import { useRef } from "react";
import { Reveal } from "./Reveal";
import { motion } from "framer-motion";

const QUOTES = [
  {
    quote:
      "Xark rebuilt our product’s entire interface in a quarter. Activation went up 34% and, for the first time, sales demos start with the design.",
    name: "Dana Whitfield",
    role: "CEO, Meridian",
  },
  {
    quote:
      "They argue with you — respectfully, with evidence — and the work is better for it. The rare agency that acts like a co-founder.",
    name: "Marcus Oyelaran",
    role: "VP Product, Atlas Freight",
  },
  {
    quote:
      "Our patients are in their sixties and seventies. Xark was the only agency that asked to meet them before proposing anything.",
    name: "Dr. Elena Ruiz",
    role: "Chief Medical Officer, Loop Health",
  },
  {
    quote:
      "We’re architects — we notice when a grid is off by a pixel. Their site for us is the most precise thing we didn’t build ourselves.",
    name: "Tomas Lindqvist",
    role: "Partner, Forma Studio",
  },
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="overflow-hidden bg-tint/60 py-24 md:py-36">
      <div className="px-5 md:px-10">
        <Reveal>
          <div className="mb-14 flex items-end justify-between">
            <p className="eyebrow text-klein">What clients say</p>
            <p className="eyebrow hidden text-ink/40 md:block">Drag →</p>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <div ref={containerRef} className="px-5 md:px-10">
          <motion.div
            className="flex cursor-grab gap-6 active:cursor-grabbing"
            drag="x"
            dragConstraints={containerRef}
            dragElastic={0.08}
            whileTap={{ cursor: "grabbing" }}
          >
            {QUOTES.map((q) => (
              <figure
                key={q.name}
                className="w-[82vw] shrink-0 select-none rounded-sm bg-paper p-8 md:w-[560px] md:p-12"
              >
                <blockquote className="font-serif italic text-xl leading-snug text-ink md:text-2xl">
                  “{q.quote}”
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-3">
                  <span className="h-px w-10 bg-klein" aria-hidden />
                  <span className="eyebrow text-ink/70">
                    {q.name} — {q.role}
                  </span>
                </figcaption>
              </figure>
            ))}
          </motion.div>
        </div>
      </Reveal>
    </section>
  );
}
