import Link from "next/link";
import Section from "./Section";
import { SERVICES } from "@/lib/services";

/**
 * Replaces the old Services block, which was a scroll-driven editorial list
 * with the price withheld until the detail page. Here every card leads with
 * what it costs: this visitor is comparing, and hiding the number sends them
 * to a competitor who shows one.
 */
export default function ServiceGrid() {
  return (
    <Section className="bg-surface">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow text-brand">What we do</p>
            <h2 className="display-tight mt-4 text-3xl md:text-4xl">
              Seven things, all priced on the page
            </h2>
          </div>
          <Link
            href="/packages"
            className="text-sm font-semibold text-brand underline-offset-4 hover:underline"
          >
            Compare every package →
          </Link>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="card flex h-full flex-col p-6 transition-colors hover:border-brand"
              >
                <h3 className="display-tight text-lg">{service.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {service.tagline}
                </p>
                <p className="mt-5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="price whitespace-nowrap text-2xl text-brand">
                    {service.price}
                  </span>
                  <span className="text-xs text-muted">{service.duration}</span>
                </p>
              </Link>
            </li>
          ))}
        </ul>
    </Section>
  );
}
