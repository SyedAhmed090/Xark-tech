"use client";

import { Reveal } from "./Reveal";

const STEPS = [
  {
    number: "01",
    name: "Listen",
    detail:
      "Two weeks inside your world — stakeholder interviews, customer calls, and a hard look at the market. We don’t sketch until we understand.",
  },
  {
    number: "02",
    name: "Define",
    detail:
      "Strategy on one page: positioning, the design principles that will govern every decision, and a scope we’ll actually hit.",
  },
  {
    number: "03",
    name: "Design",
    detail:
      "Weekly working sessions, real prototypes over static decks. You see momentum every Friday, not a big reveal at the end.",
  },
  {
    number: "04",
    name: "Ship",
    detail:
      "We stay through launch — production-ready builds, QA, and a design system your team can run without us.",
  },
];

export default function Process() {
  return (
    <section id="process" className="px-5 py-24 md:px-10 md:py-36">
      <div className="grid gap-12 md:grid-cols-[1fr_2fr] md:gap-20">
        <div className="md:sticky md:top-28 md:self-start">
          <Reveal>
            <p className="eyebrow mb-4 text-klein">How we work</p>
            <h2 className="display-tight text-4xl md:text-5xl">
              A four-step process with no mystery in it.
            </h2>
            <p className="mt-6 max-w-sm text-ink/70">
              Most agency processes are theater. Ours is four steps because
              that’s how many it takes — each one with a deliverable you can
              hold.
            </p>
          </Reveal>
        </div>

        <div className="hairline-t">
          {STEPS.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.05}>
              <div className="grid grid-cols-[auto_1fr] gap-6 py-10 hairline-b md:gap-12">
                <span className="font-mono text-sm text-klein">{step.number}</span>
                <div>
                  <h3 className="display-tight text-3xl md:text-4xl">
                    {step.name}
                  </h3>
                  <p className="mt-4 max-w-lg leading-relaxed text-ink/70">
                    {step.detail}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
