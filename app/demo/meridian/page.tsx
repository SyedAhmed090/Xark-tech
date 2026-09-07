import type { Metadata } from "next";
import { noindexPage } from "@/lib/site";

/** Interactive prop for the case study — deliberately kept out of search. */
export const metadata: Metadata = noindexPage("/demo/meridian");

/* Screenshot target for the Meridian case study — not a real route in the
   marketing site (excluded via robots.ts). Renders a full desktop dashboard
   at fixed scale so Playwright can capture it as a product shot. */

const NAV = [
  { label: "Cash", active: false },
  { label: "Forecast", active: false },
  { label: "Approvals", active: true },
  { label: "Reports", active: false },
];

const APPROVALS = [
  { vendor: "Northwind Logistics", amount: "$84,200.00", due: "Today", status: "Needs review" },
  { vendor: "Alta Cloud Services", amount: "$12,450.00", due: "Today", status: "Needs review" },
  { vendor: "Berkshire Payroll Co.", amount: "$318,900.00", due: "Tomorrow", status: "Scheduled" },
  { vendor: "Fenwick & Rae LLP", amount: "$6,020.00", due: "Tomorrow", status: "Scheduled" },
  { vendor: "Cobalt Materials", amount: "$41,760.00", due: "Mar 12", status: "Draft" },
];

const CASH_BARS = [42, 55, 48, 70, 63, 90, 78, 66, 82, 74, 95, 88];
const MONTHS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

export default function MeridianDemo() {
  return (
    <div className="flex h-[1000px] w-[1600px] bg-paper font-sans text-ink">
      <aside className="flex w-64 shrink-0 flex-col bg-ink px-6 py-8 text-paper">
        <div className="mb-12 flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-klein" />
          <span className="font-mono text-sm tracking-wide">MERIDIAN</span>
        </div>
        <nav className="flex flex-col gap-1">
          {NAV.map((item) => (
            <div
              key={item.label}
              className={`rounded-md px-4 py-3 text-sm ${
                item.active ? "bg-klein text-paper" : "text-paper/50"
              }`}
            >
              {item.label}
            </div>
          ))}
        </nav>
        <div className="mt-auto rounded-lg bg-paper/10 p-4">
          <p className="text-xs text-paper/50">Entity</p>
          <p className="mt-1 text-sm">Meridian Treasury — Ops LLC</p>
        </div>
      </aside>

      <main className="flex-1 px-14 py-10">
        <header className="mb-10 flex items-center justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-ink/40">
              Approvals
            </p>
            <h1 className="mt-2 text-3xl font-medium">Pending this week</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-full border border-ink/15 px-4 py-2 text-sm text-ink/60">
              Q1 · Ops entity
            </div>
            <div className="h-10 w-10 rounded-full bg-tint" />
          </div>
        </header>

        <div className="mb-10 grid grid-cols-3 gap-6">
          <div className="rounded-xl border border-ink/10 bg-white p-6 shadow-sm">
            <p className="text-xs text-ink/50">Cash position</p>
            <p className="mt-2 text-3xl font-medium">$14.2M</p>
            <p className="mt-1 text-xs text-[#0f8a5f]">+4.1% vs last week</p>
          </div>
          <div className="rounded-xl border border-ink/10 bg-white p-6 shadow-sm">
            <p className="text-xs text-ink/50">Pending approvals</p>
            <p className="mt-2 text-3xl font-medium">$463.3K</p>
            <p className="mt-1 text-xs text-ink/40">5 items awaiting sign-off</p>
          </div>
          <div className="rounded-xl bg-klein p-6 text-paper shadow-sm">
            <p className="text-xs text-paper/60">90-day forecast</p>
            <p className="mt-2 text-3xl font-medium">$18.6M</p>
            <p className="mt-1 text-xs text-paper/60">Confidence: high</p>
          </div>
        </div>

        <div className="mb-10 rounded-xl border border-ink/10 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm font-medium">Cash flow, trailing 12 months</p>
            <p className="font-mono text-xs text-ink/40">USD, millions</p>
          </div>
          <div className="flex h-40 items-end gap-3">
            {CASH_BARS.map((h, i) => (
              <div
                key={i}
                className={`flex-1 rounded-t ${i === 10 ? "bg-klein" : "bg-ink/15"}`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="mt-2 flex gap-3">
            {MONTHS.map((m) => (
              <span key={m} className="flex-1 text-center font-mono text-[10px] text-ink/30">
                {m}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-ink/10 bg-white shadow-sm">
          <div className="grid grid-cols-[1fr_140px_100px_140px] gap-4 border-b border-ink/10 px-6 py-4 font-mono text-[11px] uppercase tracking-wider text-ink/40">
            <span>Vendor</span>
            <span>Amount</span>
            <span>Due</span>
            <span>Status</span>
          </div>
          {APPROVALS.map((row) => (
            <div
              key={row.vendor}
              className="grid grid-cols-[1fr_140px_100px_140px] items-center gap-4 border-b border-ink/5 px-6 py-4 last:border-0"
            >
              <span className="text-sm">{row.vendor}</span>
              <span className="font-mono text-sm">{row.amount}</span>
              <span className="text-sm text-ink/50">{row.due}</span>
              <span
                className={`w-fit rounded-full px-3 py-1 text-xs ${
                  row.status === "Needs review"
                    ? "bg-klein/10 text-klein"
                    : row.status === "Scheduled"
                      ? "bg-[#0f8a5f]/10 text-[#0f8a5f]"
                      : "bg-ink/5 text-ink/40"
                }`}
              >
                {row.status}
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
