import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Section from "@/components/Section";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { ENTRY_PRICE, SERVICES } from "@/lib/services";
import { PROJECTS } from "@/lib/projects";
import { ORG_REF, absoluteUrl, breadcrumbs, pageMeta, pageUrl } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Services",
  description:
    "Logos, websites, online stores, video, website care, local SEO and social media — seven services for small businesses, every one priced on the page.",
  path: "/services",
});

/** A hub page needs its own list schema — the org's offer catalog describes
 *  the business, this describes the page a crawler is actually looking at. */
const LIST_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Services — Xark Tech",
  url: pageUrl("/services"),
  isPartOf: ORG_REF,
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: SERVICES.length,
    itemListElement: SERVICES.map((service, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: service.name,
      url: pageUrl(`/services/${service.slug}`),
    })),
  },
};

export default function ServicesIndex() {
  return (
    <>
      <JsonLd data={LIST_SCHEMA} />
      <JsonLd
        data={breadcrumbs([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <Nav />
      <main id="main" className="pt-32">
        <Section size="none" inner="max-w-6xl grid gap-10 md:grid-cols-[2fr_1fr] md:gap-8">
          <Reveal>
            <p className="eyebrow mb-4 text-brand">Services</p>
            <h1 className="display text-[clamp(2.25rem,6.5vw,4.5rem)]">
              Everything a small business{" "}
              <span className="accent-word">actually needs</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Seven services, every one with its price on the page. Most people
              start with a logo or a website and add the monthly pieces once
              there is something worth promoting — and we will tell you when
              that is, rather than selling it up front.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="md:pt-24">
            <div className="hairline-t">
              <div className="flex items-baseline justify-between py-4 hairline-b">
                <span className="eyebrow text-ink/50">Services</span>
                <span className="font-mono text-sm">{SERVICES.length}</span>
              </div>
              <div className="flex items-baseline justify-between py-4 hairline-b">
                <span className="eyebrow text-ink/50">Entry point</span>
                <span className="font-mono text-sm">{ENTRY_PRICE}</span>
              </div>
              <div className="flex items-baseline justify-between py-4 hairline-b">
                <span className="eyebrow text-ink/50">Cases shown</span>
                <span className="font-mono text-sm">{PROJECTS.length}</span>
              </div>
            </div>
          </Reveal>
        </Section>

        <Section>
          <h2 className="sr-only">All services</h2>
          <ul className="hairline-t">
            {SERVICES.map((service, i) => (
              <Reveal key={service.slug} delay={i * 0.06}>
                <li className="hairline-b">
                  <Link
                    href={`/services/${service.slug}`}
                    className="group grid gap-4 py-8 md:grid-cols-[auto_1fr_auto] md:items-baseline md:gap-10"
                  >
                    <span className="font-mono text-sm text-brand">
                      0{i + 1}
                    </span>
                    <span>
                      <h3 className="display-tight text-2xl transition-colors group-hover:text-brand md:text-4xl">
                        {service.name}
                      </h3>
                      <span className="mt-3 block max-w-xl text-lg text-ink/70">
                        {service.tagline}
                      </span>
                      <span className="mt-4 block max-w-2xl text-sm leading-relaxed text-ink/60">
                        {service.deliverables.slice(0, 4).join(" · ")}
                      </span>
                    </span>
                    <span className="flex shrink-0 flex-col md:items-end">
                      <span className="font-mono text-sm">{service.price}</span>
                      <span className="mt-1 font-mono text-xs text-ink/50">
                        {service.duration}
                      </span>
                    </span>
                  </Link>
                </li>
              </Reveal>
            ))}
          </ul>
        </Section>

        <Section className="bg-ink text-paper">
          <Reveal>
            <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow text-paper/50">Pricing</p>
                <h2 className="display-tight mt-4 max-w-2xl text-3xl md:text-4xl">
                  Every price is on one page.
                </h2>
                <p className="mt-6 max-w-xl leading-relaxed text-paper/70">
                  No quotes, no discovery call before you can see a number, and
                  no price that moves once we know what you can afford. Pick a
                  package, fill in the brief, and work starts.
                </p>
              </div>
                <Link
                  href="/packages"
                  className="eyebrow inline-block shrink-0 rounded-full bg-paper px-8 py-4 text-ink transition-colors hover:bg-brand hover:text-paper"
                >
                  See packages &amp; pricing →
                </Link>
            </div>
          </Reveal>
        </Section>

        <Footer />
      </main>
    </>
  );
}
