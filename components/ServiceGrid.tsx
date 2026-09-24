import Link from "next/link";
import ServiceIcon from "./ServiceIcon";
import Section from "./Section";
import { SERVICES } from "@/lib/services";

/**
 * A price list, not a card grid.
 *
 * Seven cards in a three-column grid was the same shape as the bundles
 * directly above it — two rows of white rectangles doing different jobs and
 * looking identical — and it squeezed seven items into the middle of the
 * screen while leaving the sides empty. A row per service reads the way
 * somebody comparing quotes actually reads: name, what it is, what it costs,
 * how long, next. It is dense, it uses the whole width, and it looks nothing
 * like the block above it.
 */
export default function ServiceGrid() {
  return (
    <Section size="sm" className="bg-paper">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="eyebrow text-brand">What we do</p>
          <h2 className="display display-section mt-4">
            Seven things, all priced on the page
          </h2>
        </div>
        <Link
          href="/packages"
          className="inline-block py-1.5 text-sm font-semibold text-brand underline-offset-4 hover:underline"
        >
          Compare every package &rarr;
        </Link>
      </div>

      <ul className="mt-10 border-t border-[color:var(--color-line)]">
        {SERVICES.map((service) => (
          <li key={service.slug}>
            <Link
              href={`/services/${service.slug}`}
              className="group grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-1 border-b border-[color:var(--color-line)] py-5 transition-colors hover:bg-surface md:grid-cols-[2.5rem_18rem_1fr_11rem_8rem] md:gap-x-8 md:py-6"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-tint text-brand">
                <ServiceIcon slug={service.slug} />
              </span>

              <h3 className="display-tight text-lg transition-colors group-hover:text-brand md:text-xl">
                {service.name}
              </h3>

              {/* The tagline drops out below md — at that width the row has
                  room for the name and the price and nothing else useful. */}
              <p className="col-span-2 hidden text-sm leading-relaxed text-muted md:col-span-1 md:block">
                {service.tagline}
              </p>

              <span className="price col-start-2 whitespace-nowrap text-xl text-brand md:col-start-auto md:text-right md:text-2xl">
                {service.price}
              </span>

              <span className="col-start-2 text-xs text-muted md:col-start-auto md:text-right">
                {service.duration}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
