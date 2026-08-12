import type { ReactNode } from "react";
import Image from "next/image";

/* Product photography — each demo build (app/demo/[slug], screenshotted via
   scripts/screenshot-portfolio.mjs) composited onto a real device-in-scene
   photo via Higgsfield, using the screenshot as a reference so the on-screen
   UI text stays legible instead of being redrawn as gibberish. */

function PhotoCover({ slug, alt }: { slug: string; alt: string }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Covers render full-width on mobile and half-width in the two-column
          grid above md. Without sizes, Next assumes 100vw at every breakpoint
          and ships desktop-weight images to phones. */}
      <Image
        src={`/portfolio/${slug}-photo.jpg`}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />
    </div>
  );
}

/* Process artifacts — one distinct visual family per project, not a
   reskinned shared template. Each still runs lo-fi → system → shipped. */

function Caption({ children, light }: { children: ReactNode; light?: boolean }) {
  return (
    <span
      className={`absolute bottom-4 right-5 font-mono text-[10px] uppercase tracking-widest ${
        light ? "text-paper/40" : "text-ink/40"
      }`}
    >
      {children}
    </span>
  );
}

/* Meridian — dashboard sketch, component grid, shipped cash/forecast views */
function MeridianWireframe() {
  return (
    <div className="grain relative h-full w-full bg-paper p-[6%]">
      <div className="h-full w-full rounded border border-dashed border-ink/25 p-[5%]">
        <div className="mb-[5%] h-3 w-1/3 rounded-sm border border-ink/25" />
        <div className="flex h-[55%] gap-[4%]">
          <div className="h-full w-2/3 rounded-sm border border-ink/25" />
          <div className="flex h-full w-1/3 flex-col gap-[8%]">
            <div className="h-1/3 rounded-sm border border-ink/25" />
            <div className="h-1/3 rounded-sm border-2 border-klein" />
            <div className="h-1/3 rounded-sm border border-ink/25" />
          </div>
        </div>
        <div className="mt-[5%] h-2 w-1/2 rounded-sm border border-ink/25" />
        <div className="mt-[3%] h-2 w-2/5 rounded-sm border border-ink/25" />
      </div>
      <Caption>Lo-fi — round 2</Caption>
    </div>
  );
}

function MeridianSystem() {
  return (
    <div className="grain relative h-full w-full bg-ink p-[7%]">
      <div className="grid h-full w-full grid-cols-4 gap-[4%]">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-center rounded bg-paper/10"
            style={i === 2 ? { background: "#2016e8" } : undefined}
          >
            {i % 3 === 0 && <div className="h-1/4 w-1/2 rounded-full bg-paper/60" />}
            {i % 3 === 1 && <div className="h-1/3 w-1/3 rounded-full border-2 border-paper/60" />}
            {i % 3 === 2 && <div className="h-1/4 w-2/3 rounded-sm bg-paper/40" />}
          </div>
        ))}
      </div>
      <Caption light>Component library — v1</Caption>
    </div>
  );
}

/* Loop Health — phone-frame prototype, touch-sized card list, shipped app trio */
function LoopWireframe() {
  return (
    <div className="grain relative flex h-full w-full items-center justify-center bg-paper p-[6%]">
      <div className="flex h-full flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-ink/30 px-[6%] py-[5%]" style={{ aspectRatio: "9/16" }}>
        <div className="mb-auto h-1.5 w-1/4 rounded-full border border-ink/25" />
        <div className="h-[38%] w-full rounded-2xl border-2 border-[#0f8a5f]" />
        <div className="mt-[8%] h-2 w-3/4 rounded-sm border border-ink/25" />
        <div className="mt-[6%] h-2 w-1/2 rounded-sm border border-ink/25" />
      </div>
      <Caption>Paper prototype — patient sessions</Caption>
    </div>
  );
}

function LoopSystem() {
  return (
    <div className="grain relative flex h-full w-full items-center justify-center bg-ink p-[7%]">
      <div className="flex h-full w-[46%] flex-col justify-center gap-[6%]" style={{ aspectRatio: "9/16" }}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center gap-[6%] rounded-xl p-[6%]"
            style={{ background: i === 0 ? "#0f8a5f" : "rgba(247,246,242,0.08)" }}
          >
            <div className="h-6 w-6 shrink-0 rounded-full bg-paper/70" />
            <div className="h-2 w-full rounded bg-paper/40" />
          </div>
        ))}
      </div>
      <Caption light>Touch-sized components — v1</Caption>
    </div>
  );
}

/* Forma — architectural elevation sketch, material swatches, full-bleed crops */
function FormaWireframe() {
  return (
    <div className="grain relative h-full w-full bg-paper p-[8%]">
      <div className="flex h-full w-full items-end gap-[3%]">
        {[38, 62, 45, 80, 30].map((h, i) => (
          <div
            key={i}
            className="w-full border border-ink/30"
            style={{ height: `${h}%`, borderColor: i === 3 ? "#8a6d3b" : undefined }}
          />
        ))}
      </div>
      <div className="absolute bottom-[8%] left-[8%] right-[8%] h-px bg-ink/30" />
      <Caption>Elevation study — before any pixels</Caption>
    </div>
  );
}

function FormaSystem() {
  return (
    <div className="grain relative h-full w-full bg-ink p-[8%]">
      <div className="grid h-full w-full grid-cols-5 gap-[4%]">
        {["#8a6d3b", "#a9a79c", "#f7f6f2", "#101012", "#dcd6c8", "#8a6d3b", "#101012", "#f7f6f2", "#a9a79c", "#dcd6c8"].map((c, i) => (
          <div key={i} className="rounded-sm" style={{ background: c, border: c === "#101012" ? "1px solid rgba(247,246,242,0.2)" : undefined }} />
        ))}
      </div>
      <Caption light>Material and type palette</Caption>
    </div>
  );
}

/* Atlas — route-line sketch, dense dispatch board, shipped exception rows */
function AtlasWireframe() {
  return (
    <div className="grain relative h-full w-full bg-paper p-[6%]">
      <svg className="h-full w-full" viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden>
        <path d="M2 50 C 25 40, 40 45, 55 25 S 80 10, 98 5" fill="none" stroke="#101012" strokeOpacity="0.3" strokeWidth="0.6" strokeDasharray="2 2" />
        <circle cx="55" cy="25" r="2" fill="#c2410c" />
      </svg>
      <div className="absolute bottom-[8%] left-[6%] right-[6%] h-2 rounded-sm border border-ink/25" />
      <Caption>Route sketch — three dispatch centers</Caption>
    </div>
  );
}

function AtlasSystem() {
  return (
    <div className="grain relative flex h-full w-full flex-col justify-center gap-[3%] bg-ink p-[7%]">
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center gap-[3%] rounded-sm px-[3%] py-[2%]" style={{ background: i === 2 ? "#c2410c" : "rgba(247,246,242,0.06)" }}>
          <div className="h-2 w-1/12 rounded-sm bg-paper/40" />
          <div className="h-2 w-1/3 rounded-sm bg-paper/40" />
          <div className="ml-auto h-2 w-1/6 rounded-sm bg-paper/30" />
        </div>
      ))}
      <Caption light>Dispatch board — keyboard-first rows</Caption>
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
    cover: <PhotoCover slug="meridian" alt="Meridian treasury dashboard on a laptop screen" />,
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
        panel: <MeridianWireframe />,
      },
      {
        caption: "Ten patterns, documented in Figma and code, replacing forty screens of one-offs.",
        panel: <MeridianSystem />,
      },
      {
        caption: "The shipped platform — cash view, forecasting, and approvals.",
        panel: <PhotoCover slug="meridian" alt="Meridian treasury dashboard on a laptop screen" />,
      },
    ],
  },
  {
    slug: "loop-health",
    name: "Loop Health",
    category: "Healthcare — patient app",
    year: "2025",
    cover: <PhotoCover slug="loop-health" alt="Loop Health check-in screen held in hand" />,
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
        panel: <LoopWireframe />,
      },
      {
        caption: "A component set sized for readers over sixty — large type, generous targets.",
        panel: <LoopSystem />,
      },
      {
        caption: "Check-in, medications, and messages — the three screens patients live in.",
        panel: <PhotoCover slug="loop-health" alt="Loop Health check-in screen held in hand" />,
      },
    ],
  },
  {
    slug: "forma-studio",
    name: "Forma Studio",
    category: "Architecture — portfolio site",
    year: "2024",
    cover: <PhotoCover slug="forma-studio" alt="Forma Studio homepage on a laptop in a studio" />,
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
        panel: <FormaWireframe />,
      },
      {
        caption: "A restrained component set: type, hairlines, and full-bleed imagery.",
        panel: <FormaSystem />,
      },
      {
        caption: "Case study walkthroughs, paced by scroll like a site visit.",
        panel: <PhotoCover slug="forma-studio" alt="Forma Studio homepage on a laptop in a studio" />,
      },
    ],
  },
  {
    slug: "atlas-freight",
    name: "Atlas Freight",
    category: "Logistics — product design",
    year: "2024",
    cover: <PhotoCover slug="atlas-freight" alt="Atlas Freight dispatch board on a monitor" />,
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
        panel: <AtlasWireframe />,
      },
      {
        caption: "Dense, keyboard-first components built for expert users, not demos.",
        panel: <AtlasSystem />,
      },
      {
        caption: "The day board, load detail, and driver hours — one keystroke apart.",
        panel: <PhotoCover slug="atlas-freight" alt="Atlas Freight dispatch board on a monitor" />,
      },
    ],
  },
];

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}
