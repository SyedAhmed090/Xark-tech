import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Section from "@/components/Section";
import Footer from "@/components/Footer";
import { PackagesSection } from "@/components/Packages";
import { Reveal } from "@/components/Reveal";
import { Tick } from "@/components/Hero";
import JsonLd from "@/components/JsonLd";
import FAQ from "@/components/FAQ";
import { SERVICE_FAQS } from "@/lib/service-faqs";
import {
  SERVICES,
  getService,
  type Package,
  type Service,
} from "@/lib/services";
import { ORG_REF, breadcrumbs, pageMeta, pageUrl } from "@/lib/site";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return pageMeta({
    title: service.name,
    description: `${service.tagline} ${service.duration}, ${service.price.toLowerCase()}.`,
    path: `/services/${service.slug}`,
  });
}

/**
 * A bare `price` on an Offer reads as a one-time charge. Retainers must use a
 * UnitPriceSpecification with a billing period, or search engines advertise a
 * monthly fee as if it were the total project cost.
 *
 * Reads `priceUsd` and `interval` off the package rather than parsing the
 * display string: the string is written for humans ("$99", "From $3,499",
 * "$199 / month") and any parser over it fails silently — dropping the price
 * from the Offer entirely, which is worse than no schema at all.
 */
function offerPricing(pkg: Package) {
  if (pkg.interval !== "month") {
    return { price: pkg.priceUsd, priceCurrency: "USD" };
  }
  return {
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: pkg.priceUsd,
      priceCurrency: "USD",
      unitText: "MONTH",
      billingDuration: 1,
      billingIncrement: 1,
    },
  };
}

/**
 * Generated from the array the page renders, never written separately.
 * FAQ schema that does not match the visible page is treated as untrustworthy,
 * and the only reliable way to keep them identical is to have one source.
 */
function faqSchema(items: { q: string; a: string }[], url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
    publisher: ORG_REF,
  };
}

function serviceSchema(service: Service) {
  const prices = service.packages.map((p) => p.priceUsd);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: pageUrl(`/services/${service.slug}`),
    serviceType: service.name,
    provider: ORG_REF,
    areaServed: { "@type": "Country", name: "United States" },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: Math.min(...prices),
      highPrice: Math.max(...prices),
      offerCount: service.packages.length,
      // Makes the retainer case explicit at the aggregate level too.
      ...(service.packages.some((p) => p.interval === "month")
        ? { description: `${service.name} is billed monthly, cancel anytime.` }
        : {}),
      offers: service.packages.map((pkg) => ({
        "@type": "Offer",
        name: `${service.name} — ${pkg.name}`,
        description: pkg.summary,
        ...offerPricing(pkg),
        url: pageUrl(`/services/${service.slug}`),
        availability: "https://schema.org/InStock",
      })),
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const service = getService((await params).slug);
  if (!service) notFound();

  const faqs = SERVICE_FAQS[service.slug] ?? [];
  const others = SERVICES.filter((s) => s.slug !== service.slug);

  return (
    <>
      <JsonLd data={serviceSchema(service)} />
      {faqs.length > 0 && (
        <JsonLd
          data={faqSchema(faqs, pageUrl(`/services/${service.slug}`))}
        />
      )}
      <JsonLd
        data={breadcrumbs([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.name, path: `/services/${service.slug}` },
        ])}
      />
      <Nav />
      <main id="main" className="pt-32">
        <Section size="none" inner="max-w-[84rem] grid gap-10 md:grid-cols-[2fr_1fr] md:gap-8">
          <Reveal>
            <p className="eyebrow mb-4 text-brand">Service</p>
            <h1 className="display text-[clamp(2.25rem,6.5vw,4.5rem)]">
              {service.name}
            </h1>
            <p className="mt-5 max-w-2xl text-xl leading-relaxed text-muted md:text-2xl">
              {service.tagline}
            </p>
            <p className="mt-6 max-w-2xl leading-relaxed text-ink/70">
              {service.description}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="md:pt-24">
            <div className="hairline-t">
              <div className="flex items-baseline justify-between py-4 hairline-b">
                <span className="eyebrow text-ink/50">Turnaround</span>
                <span className="font-mono text-sm">{service.duration}</span>
              </div>
              <div className="flex items-baseline justify-between py-4 hairline-b">
                <span className="eyebrow text-ink/50">Starts at</span>
                <span className="font-mono text-sm">{service.price}</span>
              </div>
              <div className="flex items-baseline justify-between py-4 hairline-b">
                <span className="eyebrow text-ink/50">Packages</span>
                <span className="font-mono text-sm">{service.packages.length}</span>
              </div>
            </div>
          </Reveal>
        </Section>

        <Section inner="max-w-[84rem] grid gap-16 md:grid-cols-2 md:gap-20">
          <Reveal>
            <h2 className="eyebrow mb-8 text-brand">What you get</h2>
            <ul className="hairline-t">
              {service.deliverables.map((d) => (
                <li
                  key={d}
                  className="flex items-baseline gap-4 py-4 hairline-b"
                >
                  <Tick />
                  <span className="font-medium">{d}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="eyebrow mb-8 text-brand">How it runs</h2>
            <div className="flex flex-col gap-8">
              {service.rhythm.map((step) => (
                <div key={step.title}>
                  <h3 className="font-mono text-sm text-brand">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink/70">
                    {step.detail}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </Section>

        <PackagesSection
          packages={service.packages}
          serviceName={service.name}
          serviceSlug={service.slug}
        />

        {faqs.length > 0 && (
          <FAQ
            items={faqs}
            eyebrow="Questions"
            heading={`${service.name}: the questions people ask first.`}
          />
        )}

        <Section className="bg-ink text-paper">
          <Reveal>
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col gap-8 md:flex-row md:gap-20">
                <div>
                  <p className="eyebrow text-paper/50">Turnaround</p>
                  <p className="display mt-2 text-3xl md:text-4xl">
                    {service.duration}
                  </p>
                </div>
                <div>
                  <p className="eyebrow text-paper/50">Starts at</p>
                  <p className="display mt-2 text-3xl md:text-4xl">
                    {service.price}
                  </p>
                </div>
              </div>
                <Link
                  href="/contact"
                  className="eyebrow inline-block rounded-full bg-paper px-8 py-4 text-ink transition-colors hover:bg-brand hover:text-paper"
                >
                  Start a conversation →
                </Link>
            </div>
          </Reveal>
        </Section>

        <Section size="none" className="pb-16 md:pb-24">
          <Reveal>
            <p className="eyebrow mb-6 text-ink/50">Other services</p>
            <ul className="flex flex-wrap gap-3">
              {others.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="eyebrow inline-block rounded-full border border-ink/20 px-4 py-2 text-ink/70 transition-colors hover:border-brand hover:text-brand"
                  >
                    {s.name} →
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </Section>

        <Footer />
      </main>
    </>
  );
}
