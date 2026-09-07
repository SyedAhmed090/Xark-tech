import type { Metadata } from "next";
import Link from "next/link";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Magnetic from "@/components/Magnetic";
import JsonLd from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { SERVICES } from "@/lib/services";
import { PROJECTS } from "@/lib/projects";
import { ORG_REF, absoluteUrl, breadcrumbs, pageMeta } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Services",
  description:
    "Brand identity, product design, web design & build, and motion & 3D — the four things Xark Tech does for B2B software teams, and what each engagement involves.",
  path: "/services",
});

/** A hub page needs its own list schema — the org's offer catalog describes
 *  the business, this describes the page a crawler is actually looking at. */
const LIST_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Services — Xark Tech",
  url: absoluteUrl("/services"),
  isPartOf: ORG_REF,
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: SERVICES.length,
    itemListElement: SERVICES.map((service, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: service.name,
      url: absoluteUrl(`/services/${service.slug}`),
    })),
  },
};

export default function ServicesIndex() {
  return (
    <SmoothScroll>
      <JsonLd data={LIST_SCHEMA} />
      <JsonLd
        data={breadcrumbs([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <Cursor />
      <Nav />
      <main id="main" className="pt-32">
        <header className="grid gap-10 px-5 md:grid-cols-[2fr_1fr] md:gap-8 md:px-10">
          <Reveal>
            <p className="eyebrow mb-4 text-klein">Services</p>
            <h1 className="display text-[clamp(2.25rem,9vw,9rem)]">
              Four things,
              <br />
              <span className="accent-word">done properly</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70">
              We don&rsquo;t have a capabilities deck with twenty logos on it.
              These are the four disciplines we actually staff with senior
              people, and they&rsquo;re usually combined — brand and site
              together, or product design running alongside a system rebuild.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="md:pt-24">
            <div className="hairline-t">
              <div className="flex items-baseline justify-between py-4 hairline-b">
                <span className="eyebrow text-ink/50">Disciplines</span>
                <span className="font-mono text-sm">{SERVICES.length}</span>
              </div>
              <div className="flex items-baseline justify-between py-4 hairline-b">
                <span className="eyebrow text-ink/50">Entry point</span>
                <span className="font-mono text-sm">$20k</span>
              </div>
              <div className="flex items-baseline justify-between py-4 hairline-b">
                <span className="eyebrow text-ink/50">Cases shown</span>
                <span className="font-mono text-sm">{PROJECTS.length}</span>
              </div>
            </div>
          </Reveal>
        </header>

        <section className="px-5 py-20 md:px-10 md:py-28">
          <h2 className="sr-only">All services</h2>
          <ul className="hairline-t">
            {SERVICES.map((service, i) => (
              <Reveal key={service.slug} delay={i * 0.06}>
                <li className="hairline-b">
                  <Link
                    href={`/services/${service.slug}`}
                    className="group grid gap-4 py-8 md:grid-cols-[auto_1fr_auto] md:items-baseline md:gap-10"
                    data-hover
                  >
                    <span className="font-mono text-sm text-klein">
                      0{i + 1}
                    </span>
                    <span>
                      <h3 className="display-tight text-2xl transition-colors group-hover:text-klein md:text-4xl">
                        {service.name}
                      </h3>
                      <span className="mt-3 block max-w-xl font-serif italic text-lg text-ink/70">
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
        </section>

        <section className="bg-ink px-5 py-20 text-paper md:px-10 md:py-28">
          <Reveal>
            <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow text-paper/50">Pricing</p>
                <h2 className="display-tight mt-4 max-w-2xl text-3xl md:text-5xl">
                  Every service has three package tiers.
                </h2>
                <p className="mt-6 max-w-xl leading-relaxed text-paper/70">
                  Scoped start, the engagement most clients pick, or a
                  partnership for teams who need us standing by. All the numbers
                  are on one page.
                </p>
              </div>
              <Magnetic>
                <Link
                  href="/packages"
                  className="eyebrow inline-block shrink-0 rounded-full bg-paper px-8 py-4 text-ink transition-colors hover:bg-klein hover:text-paper"
                  data-hover
                >
                  See packages &amp; pricing →
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </section>

        <Footer />
      </main>
    </SmoothScroll>
  );
}
