import ContactForm from "./ContactForm";
import { LineReveal, Reveal } from "./Reveal";
import Section from "./Section";
import { SITE } from "@/lib/site";

/**
 * The closing band. It used to read "Let's make something worth shipping" set
 * at 9rem — a portfolio line, at a scale nothing else on the page came near,
 * which is what made the bottom of the homepage look like a different site
 * from the top. The headline now states the offer, and the scale matches the
 * h1 it echoes.
 */
export default function CTA() {
  return (
    <Section id="contact" size="lg" className="bg-brand text-paper">
      <h2 className="display text-[clamp(2.25rem,6.5vw,4.5rem)]">
        <LineReveal>Get a price and a</LineReveal>
        <LineReveal delay={0.1}>
          <span className="accent-word text-paper">delivery date</span>
        </LineReveal>
        <LineReveal delay={0.2}>in one business day.</LineReveal>
      </h2>

      <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-20">
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
              className="text-2xl transition-opacity hover:opacity-70 md:text-3xl"
            >
              {SITE.email}
            </a>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
