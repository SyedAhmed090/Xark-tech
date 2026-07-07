import type { ReactNode } from "react";

/* Abstract product-shot covers — pure CSS so nothing depends on stock imagery.
   Each project gets a distinct motif: dashboard, phone app, blocks, route map. */

function CoverMeridian() {
  return (
    <div className="grain relative h-full w-full overflow-hidden bg-ink">
      <div className="absolute left-[10%] top-[12%] h-[86%] w-[84%] rounded-lg bg-paper p-[5%] shadow-2xl">
        <div className="mb-[6%] flex items-center gap-[3%]">
          <div className="h-3 w-3 rounded-full bg-klein" />
          <div className="h-2 w-1/4 rounded bg-ink/15" />
        </div>
        <div className="mb-[8%] h-3 w-2/5 rounded bg-ink/80" />
        <div className="flex h-[40%] items-end gap-[4%]">
          {[35, 55, 45, 70, 60, 90, 78].map((h, i) => (
            <div
              key={i}
              className={`w-full rounded-t ${i === 5 ? "bg-klein" : "bg-ink/15"}`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="mt-[7%] flex gap-[4%]">
          <div className="h-2 w-1/3 rounded bg-ink/15" />
          <div className="h-2 w-1/5 rounded bg-klein/40" />
        </div>
      </div>
    </div>
  );
}

function CoverLoop() {
  return (
    <div className="grain relative h-full w-full overflow-hidden bg-tint">
      <div className="absolute left-1/2 top-[10%] h-[95%] w-[52%] -translate-x-1/2 rounded-[2rem] bg-paper p-[4%] shadow-2xl">
        <div className="mx-auto mb-[8%] h-1.5 w-1/3 rounded-full bg-ink/15" />
        <div className="mb-[8%] h-[18%] rounded-xl bg-klein p-[8%]">
          <div className="h-2 w-1/2 rounded bg-paper/70" />
          <div className="mt-[6%] h-3 w-3/4 rounded bg-paper" />
        </div>
        {[0, 1, 2].map((i) => (
          <div key={i} className="mb-[6%] flex items-center gap-[6%]">
            <div className="h-8 w-8 shrink-0 rounded-full bg-tint" />
            <div className="w-full">
              <div className="h-2 w-3/4 rounded bg-ink/20" />
              <div className="mt-[4%] h-2 w-1/2 rounded bg-ink/10" />
            </div>
          </div>
        ))}
        <div className="absolute bottom-[6%] right-[8%] h-10 w-10 rounded-full bg-klein" />
      </div>
    </div>
  );
}

function CoverForma() {
  return (
    <div className="grain relative h-full w-full overflow-hidden bg-stone/40">
      <div className="absolute left-[12%] top-[14%] h-[72%] w-[30%] bg-ink" />
      <div className="absolute left-[48%] top-[30%] h-[56%] w-[16%] bg-klein" />
      <div className="absolute left-[70%] top-[14%] h-[40%] w-[18%] bg-paper" />
    </div>
  );
}

function CoverAtlas() {
  return (
    <div className="grain relative h-full w-full overflow-hidden bg-klein">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 125"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M-5 95 C 25 80, 40 90, 55 62 S 80 35, 108 28"
          fill="none"
          stroke="#f7f6f2"
          strokeWidth="0.8"
          strokeDasharray="3 2.5"
        />
        <path
          d="M-5 110 C 30 105, 55 95, 105 85"
          fill="none"
          stroke="#f7f6f2"
          strokeOpacity="0.35"
          strokeWidth="0.5"
        />
        <path
          d="M-5 40 C 30 45, 60 30, 105 42"
          fill="none"
          stroke="#f7f6f2"
          strokeOpacity="0.35"
          strokeWidth="0.5"
        />
      </svg>
      <div className="absolute right-[24%] top-[24%] h-4 w-4 rounded-full bg-paper" />
      <div className="absolute right-[10%] top-[32%] rounded bg-paper px-3 py-1.5 font-mono text-[10px] text-ink shadow-lg">
        ETA 14:02 · ON TIME
      </div>
    </div>
  );
}

/* Process artifacts — shared panel types, tinted per project */

function Wireframe({ tint = "#2016e8" }: { tint?: string }) {
  return (
    <div className="grain relative h-full w-full bg-paper p-[6%]">
      <div className="h-full w-full rounded border border-dashed border-ink/25 p-[5%]">
        <div className="mb-[5%] h-3 w-1/3 rounded-sm border border-ink/25" />
        <div className="flex h-[55%] gap-[4%]">
          <div className="h-full w-2/3 rounded-sm border border-ink/25" />
          <div className="flex h-full w-1/3 flex-col gap-[8%]">
            <div className="h-1/3 rounded-sm border border-ink/25" />
            <div className="h-1/3 rounded-sm" style={{ border: `1.5px solid ${tint}` }} />
            <div className="h-1/3 rounded-sm border border-ink/25" />
          </div>
        </div>
        <div className="mt-[5%] h-2 w-1/2 rounded-sm border border-ink/25" />
        <div className="mt-[3%] h-2 w-2/5 rounded-sm border border-ink/25" />
      </div>
      <span className="absolute bottom-4 right-5 font-mono text-[10px] uppercase tracking-widest text-ink/40">
        Lo-fi — round 2
      </span>
    </div>
  );
}

function SystemGrid({ tint = "#2016e8" }: { tint?: string }) {
  return (
    <div className="grain relative h-full w-full bg-ink p-[7%]">
      <div className="grid h-full w-full grid-cols-4 gap-[4%]">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-center rounded bg-paper/10"
            style={i === 2 ? { background: tint } : undefined}
          >
            {i % 3 === 0 && <div className="h-1/4 w-1/2 rounded-full bg-paper/60" />}
            {i % 3 === 1 && <div className="h-1/3 w-1/3 rounded-full border-2 border-paper/60" />}
            {i % 3 === 2 && <div className="h-1/4 w-2/3 rounded-sm bg-paper/40" />}
          </div>
        ))}
      </div>
      <span className="absolute bottom-4 right-5 font-mono text-[10px] uppercase tracking-widest text-paper/40">
        Component library — v1
      </span>
    </div>
  );
}

function Screens({ tint = "#2016e8" }: { tint?: string }) {
  return (
    <div className="grain relative flex h-full w-full items-center justify-center gap-[5%] bg-tint px-[8%]">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="h-[76%] w-1/4 rounded-xl bg-paper p-[2%] shadow-xl"
          style={{ transform: `translateY(${(i - 1) * 6}%)` }}
        >
          <div
            className="mb-[8%] h-[22%] rounded-lg"
            style={{ background: i === 1 ? tint : "rgba(16,16,18,0.12)" }}
          />
          {[...Array(3)].map((_, j) => (
            <div key={j} className="mb-[7%] h-[7%] rounded bg-ink/10" />
          ))}
        </div>
      ))}
      <span className="absolute bottom-4 right-5 font-mono text-[10px] uppercase tracking-widest text-ink/40">
        Shipped screens
      </span>
    </div>
  );
}

export type Project = {
  slug: string;
  name: string;
  category: string;
  year: string;
  cover: ReactNode;
  tint: string;
  summary: string;
  services: string[];
  challenge: string;
  approach: string;
  outcome: string;
  stats: { value: string; label: string }[];
  artifacts: { caption: string; panel: ReactNode }[];
};

export const PROJECTS: Project[] = [
  {
    slug: "meridian",
    name: "Meridian",
    category: "Fintech — brand & platform",
    year: "2025",
    cover: <CoverMeridian />,
    summary:
      "A treasury platform for mid-market CFOs that looked like a science project and needed to feel like an institution.",
    services: ["Brand identity", "Product design", "Design system"],
    challenge:
      "Meridian's engineering-led team had built genuinely differentiated treasury tooling, but the product read as a prototype: fourteen shades of gray, three navigation patterns, and a brand that photographed badly next to hundred-year-old banks in procurement decks.",
    approach:
      "We rebuilt the identity around the idea of a fixed reference line — the meridian — and carried it into the product as a single, disciplined layout grid. Ten interface patterns replaced forty screens' worth of one-offs, documented in a Figma-and-code design system the team ships against weekly.",
    outcome:
      "The rebrand launched alongside the redesigned platform in one release. Sales demos now open with the product instead of apologizing for it, and the design system has held through two quarters of feature work without a single new pattern.",
    stats: [
      { value: "+34%", label: "Activation rate after redesign" },
      { value: "10", label: "Interface patterns replacing 40+ screens" },
      { value: "2×", label: "Faster feature delivery against the system" },
    ],
    tint: "#2016e8",
    artifacts: [
      {
        caption: "Early structure: the meridian grid that every screen hangs from.",
        panel: <Wireframe />,
      },
      {
        caption: "Ten patterns, documented in Figma and code, replacing forty screens of one-offs.",
        panel: <SystemGrid />,
      },
      {
        caption: "The shipped platform — cash view, forecasting, and approvals.",
        panel: <Screens />,
      },
    ],
  },
  {
    slug: "loop-health",
    name: "Loop Health",
    category: "Healthcare — patient app",
    year: "2025",
    cover: <CoverLoop />,
    summary:
      "A patient app for a chronic-care clinic network, redesigned around the moments between appointments.",
    services: ["UX research", "Product design", "Motion"],
    challenge:
      "Loop's app was built for the clinic, not the patient: appointment-first navigation, clinical language, and a daily check-in flow that took eleven taps. Patients over 60 — most of the user base — abandoned it within two weeks.",
    approach:
      "We shadowed patients through twelve in-home research sessions, then rebuilt the app around the check-in as the front door: one screen, two taps, type large enough to read without glasses. Micro-animations confirm every action so patients never wonder whether something worked.",
    outcome:
      "Daily check-in completion doubled in the first month after launch, and support calls about the app dropped by half. The clinic network is rolling the design out across all nine locations.",
    stats: [
      { value: "2×", label: "Daily check-in completion" },
      { value: "11 → 2", label: "Taps to complete a check-in" },
      { value: "−52%", label: "App-related support calls" },
    ],
    tint: "#0f8a5f",
    artifacts: [
      {
        caption: "Paper prototypes from twelve in-home research sessions with patients.",
        panel: <Wireframe tint="#0f8a5f" />,
      },
      {
        caption: "A component set sized for readers over sixty — large type, generous targets.",
        panel: <SystemGrid tint="#0f8a5f" />,
      },
      {
        caption: "Check-in, medications, and messages — the three screens patients live in.",
        panel: <Screens tint="#0f8a5f" />,
      },
    ],
  },
  {
    slug: "forma-studio",
    name: "Forma Studio",
    category: "Architecture — portfolio site",
    year: "2024",
    cover: <CoverForma />,
    summary:
      "A portfolio site for an architecture studio whose buildings deserved better than a squarespace template.",
    services: ["Web design", "Development", "Motion & 3D"],
    challenge:
      "Forma's work — quiet, structural, obsessive about light — was trapped in a generic grid template that made every project look the same size. Award juries and prospective clients saw thumbnails, not buildings.",
    approach:
      "We designed the site like one of their buildings: a strict structural grid that individual projects break out of at full bleed. Scroll-driven reveals pace each case study like a walkthrough, and a WebGL light study on the homepage shifts with the visitor's local time of day.",
    outcome:
      "The site launched two weeks before award season. Forma was shortlisted for two national prizes that year, and the partners now send the site link instead of a PDF portfolio.",
    stats: [
      { value: "3.1 min", label: "Average time on case studies" },
      { value: "2", label: "National award shortlists that season" },
      { value: "100", label: "Lighthouse performance score" },
    ],
    tint: "#8a6d3b",
    artifacts: [
      {
        caption: "The structural grid, sketched before any pixels — like one of their buildings.",
        panel: <Wireframe tint="#8a6d3b" />,
      },
      {
        caption: "A restrained component set: type, hairlines, and full-bleed imagery.",
        panel: <SystemGrid tint="#8a6d3b" />,
      },
      {
        caption: "Case study walkthroughs, paced by scroll like a site visit.",
        panel: <Screens tint="#8a6d3b" />,
      },
    ],
  },
  {
    slug: "atlas-freight",
    name: "Atlas Freight",
    category: "Logistics — product design",
    year: "2024",
    cover: <CoverAtlas />,
    summary:
      "A dispatch platform redesigned for the people who actually use it: dispatchers working three screens at 5 a.m.",
    services: ["UX research", "Product design", "Design system"],
    challenge:
      "Atlas's dispatch tool had grown a decade of features with no design oversight. Dispatchers kept paper notes to track what the software couldn't show them, and training a new hire took six weeks.",
    approach:
      "We sat in dispatch centers across three time zones before touching a screen. The redesign put the day's exceptions — late loads, empty miles, driver hours — on one board, with everything else a keystroke away. Dense, keyboard-first, built for expert users rather than demo audiences.",
    outcome:
      "The paper notes disappeared within a month of rollout. New-dispatcher training dropped from six weeks to two, and Atlas's retention team now uses the product as a selling point in renewal conversations.",
    stats: [
      { value: "6 → 2", label: "Weeks to train a new dispatcher" },
      { value: "−18%", label: "Empty miles across the network" },
      { value: "94%", label: "Daily active use among dispatchers" },
    ],
    tint: "#c2410c",
    artifacts: [
      {
        caption: "The exceptions board, sketched with dispatchers across three time zones.",
        panel: <Wireframe tint="#c2410c" />,
      },
      {
        caption: "Dense, keyboard-first components built for expert users, not demos.",
        panel: <SystemGrid tint="#c2410c" />,
      },
      {
        caption: "The day board, load detail, and driver hours — one keystroke apart.",
        panel: <Screens tint="#c2410c" />,
      },
    ],
  },
];

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}
