"use client";

import { Reveal } from "./Reveal";

const QUOTES = [
  {
    quote:
      "Xark rebuilt our product's entire interface in a quarter. Activation went up 34% and, for the first time, sales demos start with the design.",
    name: "Dana Whitfield",
    role: "CEO, Meridian",
  },
  {
    quote:
      "They argue with you — respectfully, with evidence — and the work is better for it. The rare agency that acts like a co-founder.",
    name: "Marcus Oyelaran",
    role: "VP Product, Atlas Freight",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-tint/60 px-5 py-24 md:px-10 md:py-36">
      <Reveal>
        <p className="eyebrow mb-16 text-klein">What clients say</p>
      </Reveal>
      <div className="flex flex-col gap-20">
        {QUOTES.map((q, i) => (
          <Reveal key={q.name} delay={i * 0.1}>
            <figure className={i % 2 === 1 ? "md:ml-auto md:max-w-3xl" : "md:max-w-3xl"}>
              <blockquote className="font-serif italic text-2xl leading-snug text-ink md:text-4xl">
                “{q.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="h-px w-10 bg-klein" aria-hidden />
                <span className="eyebrow text-ink/70">
                  {q.name} — {q.role}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
