import type { Metadata } from "next";
import { pageMeta } from "@/lib/site";
import Link from "next/link";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import BookingLink from "@/components/BookingLink";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = pageMeta({
  title: "Contact",
  description:
    "Tell us what you're building. Xark Tech replies within two business days — currently booking Q4 2026 engagements.",
  path: "/contact",
});

const NEXT_STEPS = [
  {
    title: "Within two days",
    detail: "A reply from a founder — not a form letter, not a sales rep.",
  },
  {
    title: "Within a week",
    detail: "A 30-minute intro call to hear the problem in your words.",
  },
  {
    title: "Within two weeks",
    detail: "A scoped proposal with a number and a start date, if we're a fit.",
  },
];

export default function ContactPage() {
  return (
    <SmoothScroll>
      <Cursor />
      <Nav />
      <main id="main" className="pt-32">
        <header className="px-5 md:px-10">
          <Reveal>
            <p className="eyebrow mb-4 text-klein">Contact</p>
            <h1 className="display text-[clamp(2.75rem,11vw,10rem)]">
              Say <span className="accent-word">hello</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70">
              Booking new engagements for Q4 2026. A few lines about what
              you’re building is all it takes to start.
            </p>
          </Reveal>
        </header>

        <div className="grid gap-16 px-5 py-20 md:grid-cols-2 md:gap-20 md:px-10 md:py-28">
          <Reveal>
            <ContactForm theme="paper" />
          </Reveal>

          <Reveal delay={0.15}>
            <div className="flex flex-col gap-12">
              <BookingLink />
              <div>
                <p className="eyebrow mb-4 text-klein">Prefer email?</p>
                <a
                  href="mailto:hello@xarktech.com"
                  className="font-serif italic text-3xl text-ink transition-colors hover:text-klein md:text-4xl"
                  data-hover
                >
                  hello@xarktech.com
                </a>
              </div>

              <div>
                <p className="eyebrow mb-6 text-klein">What happens next</p>
                <div className="hairline-t">
                  {NEXT_STEPS.map((step) => (
                    <div key={step.title} className="py-5 hairline-b">
                      <h2 className="font-mono text-sm text-klein">
                        {step.title}
                      </h2>
                      <p className="mt-2 text-ink/70">{step.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="eyebrow mb-4 text-klein">Wondering about cost?</p>
                <p className="max-w-sm text-sm leading-relaxed text-ink/60">
                  Straight answers on pricing, timelines, and who does the work
                  are on the{" "}
                  <Link
                    href="/#faq"
                    className="underline decoration-klein underline-offset-4 transition-colors hover:text-klein"
                  >
                    homepage FAQ
                  </Link>
                  .
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <Footer />
      </main>
    </SmoothScroll>
  );
}
