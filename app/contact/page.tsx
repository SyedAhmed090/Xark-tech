import type { Metadata } from "next";
import { pageMeta, SITE } from "@/lib/site";
import Link from "next/link";
import Nav from "@/components/Nav";
import Section from "@/components/Section";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import BookingLink from "@/components/BookingLink";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = pageMeta({
  title: "Contact",
  description:
    "Tell us what you need. Xark Tech replies within one business day with a price and a delivery date. No sales call required.",
  path: "/contact",
});

/**
 * These used to describe a studio sales cycle — a founder reply, an intro
 * call, a scoped proposal two weeks out. On a site that publishes its prices
 * and starts work from a brief, that promised a slower, vaguer process than
 * the one a visitor can already see on the pricing page.
 */
const NEXT_STEPS = [
  {
    title: "Within one business day",
    detail:
      "A reply with a price and a delivery date — or the one or two questions we need answered before we can give you either.",
  },
  {
    title: "No sales call",
    detail:
      "Not unless you want one. Most projects start from a written brief, which is faster for you and gives the designer more to work from.",
  },
  {
    title: "Nothing charged yet",
    detail:
      "Payment comes after the scope and the date are agreed in writing. Getting a number from us costs nothing.",
  },
];

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main id="main" className="pt-32">
        <Section size="none">
          <Reveal>
            <p className="eyebrow mb-4 text-brand">Contact</p>
            <h1 className="display text-[clamp(2.25rem,6.5vw,4.5rem)]">
              Say <span className="accent-word">hello</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              A few lines about what you need is all it takes. If you already
              know which package you want,{" "}
              <Link href="/brief" className="text-brand underline underline-offset-4">
                fill in the brief instead
              </Link>{" "}
              and we&rsquo;ll get straight to work.
            </p>
          </Reveal>
        </Section>

        <div className="grid gap-16 px-5 py-20 md:grid-cols-2 md:gap-20 md:px-10 md:py-28">
          <Reveal>
            <ContactForm theme="paper" />
          </Reveal>

          <Reveal delay={0.15}>
            <div className="flex flex-col gap-12">
              <BookingLink />
              <div>
                <p className="eyebrow mb-4 text-brand">Prefer email?</p>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-3xl text-ink transition-colors hover:text-brand md:text-4xl"
                >
                  {SITE.email}
                </a>
              </div>

              <div>
                <p className="eyebrow mb-4 text-brand">Our location</p>
                {/* street and postalCode are null until launch — see the
                    TODO markers in lib/site.ts. Rendering them unconditionally
                    printed blank lines into the address. */}
                <address className="text-2xl not-italic leading-snug text-ink md:text-3xl">
                  {SITE.address.street && (
                    <span className="block">{SITE.address.street}</span>
                  )}
                  <span className="block">
                    {SITE.address.locality}, {SITE.address.region}
                    {SITE.address.postalCode ? ` ${SITE.address.postalCode}` : ""}
                  </span>
                </address>
              </div>

              <div>
                <p className="eyebrow mb-6 text-brand">What happens next</p>
                <div className="hairline-t">
                  {NEXT_STEPS.map((step) => (
                    <div key={step.title} className="py-5 hairline-b">
                      <h2 className="font-mono text-sm text-brand">
                        {step.title}
                      </h2>
                      <p className="mt-2 text-muted">{step.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="eyebrow mb-4 text-brand">Wondering about cost?</p>
                <p className="max-w-sm text-sm leading-relaxed text-ink/60">
                  Straight answers on pricing, timelines, and who does the work
                  are on the{" "}
                  <Link
                    href="/#faq"
                    className="underline decoration-brand underline-offset-4 transition-colors hover:text-brand"
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
    </>
  );
}
