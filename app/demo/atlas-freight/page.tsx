/* Screenshot target for the Atlas Freight case study — a dense,
   keyboard-first dispatch board for expert users, not a demo audience. */

const LOADS = [
  { id: "AF-4021", driver: "R. Osei", route: "DFW → OKC", eta: "14:02", status: "On time" },
  { id: "AF-4022", driver: "M. Cruz", route: "DFW → HOU", eta: "15:40", status: "On time" },
  { id: "AF-4023", driver: "K. Ibrahim", route: "DFW → LIT", eta: "13:10", status: "Delayed" },
  { id: "AF-4024", driver: "S. Novak", route: "DFW → SAT", eta: "16:55", status: "On time" },
  { id: "AF-4025", driver: "J. Park", route: "DFW → ELP", eta: "18:20", status: "Empty miles" },
];

const STATUS_STYLE: Record<string, string> = {
  "On time": "bg-[#0f8a5f]/10 text-[#0f8a5f]",
  Delayed: "bg-[#c2410c]/10 text-[#c2410c]",
  "Empty miles": "bg-ink/5 text-ink/40",
};

export default function AtlasFreightDemo() {
  return (
    <div className="flex h-[1000px] w-[1600px] bg-ink font-sans text-paper">
      <main className="flex-1 px-10 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-paper/40">
              Dispatch — DFW hub
            </p>
            <h1 className="mt-2 text-2xl font-medium">Today&apos;s exceptions</h1>
          </div>
          <div className="rounded-full bg-[#c2410c] px-4 py-2 font-mono text-xs">
            1 delayed · 1 empty leg
          </div>
        </div>

        <div className="rounded-lg bg-paper/[0.04]">
          <div className="grid grid-cols-[110px_140px_1fr_90px_140px] gap-4 border-b border-paper/10 px-5 py-3 font-mono text-[11px] uppercase tracking-wider text-paper/40">
            <span>Load</span>
            <span>Driver</span>
            <span>Route</span>
            <span>ETA</span>
            <span>Status</span>
          </div>
          {LOADS.map((row) => (
            <div
              key={row.id}
              className="grid grid-cols-[110px_140px_1fr_90px_140px] items-center gap-4 border-b border-paper/5 px-5 py-3.5 font-mono text-sm last:border-0"
            >
              <span className="text-paper/70">{row.id}</span>
              <span>{row.driver}</span>
              <span className="text-paper/70">{row.route}</span>
              <span className="text-paper/70">{row.eta}</span>
              <span className={`w-fit rounded-full px-3 py-1 text-xs ${STATUS_STYLE[row.status]}`}>
                {row.status}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-lg bg-paper/[0.04] p-5">
          <svg className="h-40 w-full" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden>
            <path
              d="M2 34 C 20 26, 34 30, 45 16 S 68 6, 98 3"
              fill="none"
              stroke="#c2410c"
              strokeWidth="0.6"
              strokeDasharray="2 2"
            />
            <path
              d="M2 20 C 25 24, 50 12, 98 18"
              fill="none"
              stroke="#f7f6f2"
              strokeOpacity="0.25"
              strokeWidth="0.5"
            />
            <circle cx="45" cy="16" r="1.6" fill="#c2410c" />
          </svg>
        </div>
      </main>

      <aside className="w-72 shrink-0 border-l border-paper/10 px-6 py-8">
        <p className="mb-5 font-mono text-xs uppercase tracking-widest text-paper/40">
          Driver hours
        </p>
        <div className="flex flex-col gap-4">
          {["R. Osei", "M. Cruz", "K. Ibrahim", "S. Novak"].map((name, i) => (
            <div key={name}>
              <div className="mb-1.5 flex justify-between text-sm">
                <span>{name}</span>
                <span className="text-paper/40">{[6.5, 4.2, 9.8, 3.1][i]}h</span>
              </div>
              <div className="h-1.5 rounded-full bg-paper/10">
                <div
                  className={`h-1.5 rounded-full ${
                    [6.5, 4.2, 9.8, 3.1][i] > 8 ? "bg-[#c2410c]" : "bg-[#0f8a5f]"
                  }`}
                  style={{ width: `${([6.5, 4.2, 9.8, 3.1][i] / 11) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
