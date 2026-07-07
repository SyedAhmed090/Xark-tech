import ContactForm from "./ContactForm";
import { LineReveal, Reveal } from "./Reveal";

export default function CTA() {
  return (
    <section
      id="contact"
      className="bg-klein px-5 py-28 text-paper md:px-10 md:py-40"
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
          <ContactForm theme="klein" />
        </Reveal>

        <Reveal delay={0.3}>
          <div className="flex h-full flex-col justify-between gap-10">
            <p className="max-w-xs text-sm leading-relaxed text-paper/70">
              Booking new engagements for Q4 2026. Tell us what you’re building
              — we reply within two business days. Prefer email? Write to us
              directly:
            </p>
            <a
              href="mailto:hello@xark.tech"
              className="font-serif italic text-3xl transition-opacity hover:opacity-70 md:text-5xl"
              data-hover
            >
              hello@xark.tech
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
