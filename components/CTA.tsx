"use client";

import Magnetic from "./Magnetic";
import { LineReveal, Reveal } from "./Reveal";

export default function CTA() {
  return (
    <section
      id="contact"
      className="bg-klein px-5 py-28 text-paper md:px-10 md:py-44"
    >
      <h2 className="display text-[13vw] md:text-[8.5vw]">
        <LineReveal>Let's make</LineReveal>
        <LineReveal delay={0.1}>
          something{" "}
          <span className="accent-word text-paper">worth</span>
        </LineReveal>
        <LineReveal delay={0.2}>shipping</LineReveal>
      </h2>

      <Reveal delay={0.3}>
        <div className="mt-14 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <Magnetic strength={0.25}>
            <a
              href="mailto:hello@xark.tech"
              className="eyebrow inline-block rounded-full bg-paper px-9 py-5 text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              hello@xark.tech →
            </a>
          </Magnetic>
          <p className="max-w-xs text-sm text-paper/70">
            Booking new engagements for Q4 2026. Tell us what you're building —
            we reply within two business days.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
