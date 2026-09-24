import { Tick } from "./Hero";
import Section from "./Section";

/**
 * The single most persuasive block on the site, because it is the one claim a
 * visitor can verify before buying.
 *
 * Cheap logo services advertise a low headline price and ship a low-resolution
 * raster file, then charge again for the vector artwork a printer, sign-maker
 * or app store actually requires. Naming a competitor would be both petty and
 * legally awkward, so the comparison is framed against the category — anyone
 * who has been through it recognises the pattern immediately.
 */
const ROWS: { label: string; typical: string; ours: string }[] = [
  {
    label: "Vector files (AI, EPS, SVG, PDF)",
    typical: "Costs extra, or a higher tier",
    ours: "Included on every package",
  },
  {
    label: "Ownership",
    typical: "Often a paid upgrade",
    ours: "Yours outright, always",
  },
  {
    label: "Our name on your site",
    typical: "Fee to remove it",
    ours: "Never added",
  },
  {
    label: "Revisions",
    typical: "“Unlimited”, capped in the contract",
    ours: "The number on the package, honoured",
  },
  {
    label: "Delivery date",
    typical: "Given after you pay",
    ours: "Given before you pay",
  },
];

export default function WhatYouGet() {
  return (
    <Section className="bg-ink text-paper" inner="max-w-4xl">
        <div className="max-w-2xl">
          <p className="eyebrow text-brand">The difference</p>
          <h2 className="display-tight mt-4 text-3xl md:text-4xl">
            A $99 logo you can actually use
          </h2>
          <p className="mt-4 leading-relaxed text-paper/70">
            Most budget logo services hand over a JPEG and charge again for the
            files your printer will accept. Ours includes the full vector set
            at every price, including the cheapest one.
          </p>
        </div>

        <div className="card mt-10 overflow-hidden text-ink">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">
              What a typical budget logo service includes, compared with every
              Xark Tech package
            </caption>
            <thead>
              <tr className="border-b border-[color:var(--color-line)] bg-tint/60">
                <th scope="col" className="px-4 py-3 font-semibold md:px-6">
                  <span className="sr-only">Feature</span>
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 font-semibold text-muted md:px-6"
                >
                  Typical budget service
                </th>
                <th scope="col" className="px-4 py-3 font-semibold md:px-6">
                  Every Xark Tech package
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr
                  key={row.label}
                  className="border-b border-[color:var(--color-line)] last:border-0"
                >
                  <th
                    scope="row"
                    className="px-4 py-4 text-left font-semibold md:px-6"
                  >
                    {row.label}
                  </th>
                  <td className="px-4 py-4 text-muted md:px-6">
                    {row.typical}
                  </td>
                  <td className="px-4 py-4 md:px-6">
                    <span className="flex items-start gap-2">
                      <span className="mt-0.5">
                        <Tick />
                      </span>
                      <span className="font-medium">{row.ours}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </Section>
  );
}
