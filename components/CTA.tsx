import ContactForm from "./ContactForm";
import { LineReveal, Reveal } from "./Reveal";
import { SITE } from "@/lib/site";

export default function CTA() {
  return (
    <section
      id="contact"
      className="bg-brand px-5 py-28 text-paper md:px-10 md:py-40"
    >
      <h2 className="display text-[clamp(2.25rem,10.5vw,5rem)] md:text-[clamp(4rem,8.5vw,9rem)]">
        <LineReveal>Let’s make</LineReveal>
        <LineReveal delay={0.1}>
          something <span className="accent-word text-paper">worth</span>
        </LineReveal>
        <LineReveal delay={0.2}>shipping</LineReveal>
      </h2>

      <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-20">
        <Reveal delay={0.2}>
          <ContactForm theme="brand" />
        </Reveal>

        <Reveal delay={0.3}>
          <div className="flex h-full flex-col justify-between gap-10">
            {/* One business day, matching /contact and the brief
                confirmation. These three used to disagree, and the one a
                visitor remembers is whichever we then miss. */}
            <p className="max-w-xs text-sm leading-relaxed text-paper/70">
              Tell us what you need and we reply within one business day with a
              price and a delivery date. Prefer email? Write to us directly:
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="text-3xl transition-opacity hover:opacity-70 md:text-5xl"
            >
              {SITE.email}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
