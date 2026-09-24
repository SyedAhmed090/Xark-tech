import Section from "./Section";

/**
 * What a client-logo row does for an agency, without claiming clients that do
 * not exist.
 *
 * The categories are lifted verbatim from what /studio already says — "we work
 * with trades, shops, clinics, studios and brand-new businesses" — so this
 * adds a surface, not a claim. Do not extend the list without extending that
 * sentence too; a strip naming trades nobody has served is exactly the kind of
 * small lie the rest of this site was rewritten to remove.
 *
 * It sits directly under the hero because the single biggest mismatch on the
 * old site was that a plumber pricing a $399 website saw four B2B software
 * case studies and nothing resembling their own trade.
 */
/* Redrawn once: the first set used a wrench, a medical case and a small
   sprout, and at 20px they read as a squiggle, an "add" button and a broken
   tick. Everything here is now two or three large strokes — anything finer
   disappears at this size. */
const TRADES: { label: string; path: React.ReactNode }[] = [
  {
    // Hard hat.
    label: "Trades",
    path: (
      <>
        <path d="M3 17.5h18" />
        <path d="M6 17.5a6 6 0 0 1 12 0" />
      </>
    ),
  },
  {
    // Storefront, awning over a door.
    label: "Shops",
    path: (
      <>
        <path d="M2.5 9.5 4.4 5a1 1 0 0 1 .92-.6h13.36a1 1 0 0 1 .92.6l1.9 4.5" />
        <path d="M4.5 9.5v10a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-10" />
        <path d="M9.5 20.5V14h5v6.5" />
      </>
    ),
  },
  {
    // Heart, not a plus — a plus at this size reads as "add".
    label: "Clinics",
    path: (
      <path d="M12 20.5C12 20.5 3.5 15.4 3.5 9.75a4.75 4.75 0 0 1 8.5-2.9 4.75 4.75 0 0 1 8.5 2.9c0 5.65-8.5 10.75-8.5 10.75Z" />
    ),
  },
  {
    // Lightbulb.
    label: "Studios",
    path: (
      <>
        <path d="M9 17.5a6 6 0 1 1 6 0v1.25a1.5 1.5 0 0 1-1.5 1.5h-3a1.5 1.5 0 0 1-1.5-1.5V17.5Z" />
        <path d="M9.5 17.5h5" />
      </>
    ),
  },
  {
    // Seedling — bigger leaves than the first attempt, which vanished.
    label: "New businesses",
    path: (
      <>
        <path d="M12 21v-8" />
        <path d="M12 13c0-4.4 2.9-7.3 7.3-7.3C19.3 10.1 16.4 13 12 13Z" />
        <path d="M12 16.5c0-3.3-2.2-5.5-5.5-5.5 0 3.3 2.2 5.5 5.5 5.5Z" />
      </>
    ),
  },
];

export default function TradeStrip() {
  return (
    <Section size="none" className="hairline-t hairline-b py-7">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-10">
        <p className="eyebrow shrink-0 text-muted">Who we work with</p>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 md:flex md:flex-1 md:justify-between md:gap-6">
          {TRADES.map((trade) => (
            <li key={trade.label} className="flex items-center gap-2.5">
              <svg
                viewBox="0 0 24 24"
                width="22"
                height="22"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 text-brand"
              >
                {trade.path}
              </svg>
              <span className="text-sm font-semibold">{trade.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
