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
  /** Shown as a badge so the reader is never left guessing whether this
   *  was a paid client engagement. Every project here is self-initiated. */
  kind: string;
  /** The working prototype under app/demo — the actual artifact. */
  demoHref: string;
  cover: ReactNode;
  tint: string;
  summary: string;
  services: string[];
  /** The brief the studio set itself, not a client's reported situation. */
  challenge: string;
  approach: string;
  /** What the prototype demonstrates. Never a business result: these are
   *  concept projects with no deployment, so there is nothing to measure. */
  outcome: string;
  /** Design facts about the artifact, consistent with `approach` above.
   *  Deliberately not outcome metrics — see the note in the README. */
  stats: { value: string; label: string }[];
  artifacts: { caption: string; panel: ReactNode }[];
};

export const PROJECTS: Project[] = [
  {
    slug: "meridian",
    name: "Meridian",
    category: "Fintech — brand & platform",
    year: "2025",
    kind: "Self-initiated concept project",
    demoHref: "/demo/meridian",
    cover: <PhotoCover slug="meridian" alt="Meridian treasury dashboard on a laptop screen" />,
    summary:
      "A treasury platform for mid-market CFOs, designed to read like an institution rather than a science project.",
    services: ["Brand identity", "Product design", "Design system"],
    challenge:
      "The brief we set ourselves: mid-market treasury tools tend to be engineering-led and look it — fourteen shades of gray, three navigation patterns, and a brand that photographs badly next to hundred-year-old banks in a procurement deck. Can a treasury product read as credible without going beige?",
    approach:
      "We built the identity around a fixed reference line — the meridian — and carried it into the product as a single, disciplined layout grid. Ten interface patterns cover the whole surface, documented as a working component set rather than a static mockup.",
    outcome:
      "The result is a prototype you can open and use: cash position, forecasting and approvals, all built against the same ten patterns. It exists to test one idea — that a dense financial interface can also be a calm one.",
    stats: [
      { value: "10", label: "Interface patterns across the product" },
      { value: "1", label: "Layout grid every screen hangs from" },
      { value: "3", label: "Core flows built end to end" },
    ],
    tint: "#2016e8",
    artifacts: [
      {
        caption: "Early structure: the meridian grid that every screen hangs from.",
        panel: <MeridianWireframe />,
      },
      {
        caption: "Ten patterns, documented as a working component set.",
        panel: <MeridianSystem />,
      },
      {
        caption: "The prototype — cash view, forecasting, and approvals.",
        panel: <PhotoCover slug="meridian" alt="Meridian treasury dashboard on a laptop screen" />,
      },
    ],
  },
  {
    slug: "loop-health",
    name: "Loop Health",
    category: "Healthcare — patient app",
    year: "2025",
    kind: "Self-initiated concept project",
    demoHref: "/demo/loop-health",
    cover: <PhotoCover slug="loop-health" alt="Loop Health check-in screen held in hand" />,
    summary:
      "A patient app for chronic care, designed around the moments between appointments.",
    services: ["Product design", "Accessibility", "Motion"],
    challenge:
      "The brief we set ourselves: chronic-care apps are usually built for the clinic rather than the patient — appointment-first navigation, clinical language, and daily check-ins that run to a dozen taps. The people who depend on them most are often over 60. What would the same app look like designed for them first?",
    approach:
      "We rebuilt the app around the check-in as the front door: one screen, two taps, type large enough to read without glasses. Micro-animations confirm every action, so nothing leaves the patient wondering whether it worked.",
    outcome:
      "The prototype is a working app: check-in, medications and messages, sized and paced for readers over sixty. It is a design argument about who an interface should treat as its default user.",
    stats: [
      { value: "2", label: "Taps to complete a daily check-in" },
      { value: "3", label: "Screens the whole app lives in" },
      { value: "1", label: "Front door: the daily check-in" },
    ],
    tint: "#0f8a5f",
    artifacts: [
      {
        caption: "Paper prototypes exploring the check-in as the app's front door.",
        panel: <LoopWireframe />,
      },
      {
        caption: "A component set sized for readers over sixty — large type, generous targets.",
        panel: <LoopSystem />,
      },
      {
        caption: "Check-in, medications, and messages — the three screens the app lives in.",
        panel: <PhotoCover slug="loop-health" alt="Loop Health check-in screen held in hand" />,
      },
    ],
  },
  {
    slug: "forma-studio",
    name: "Forma Studio",
    category: "Architecture — portfolio site",
    year: "2024",
    kind: "Self-initiated concept project",
    demoHref: "/demo/forma-studio",
    cover: <PhotoCover slug="forma-studio" alt="Forma Studio homepage on a laptop in a studio" />,
    summary:
      "A portfolio site for an architecture practice, built like one of its buildings.",
    services: ["Web design", "Development", "Motion & 3D"],
    challenge:
      "The brief we set ourselves: architecture portfolios flatten everything into a uniform grid, so every project reads the same size and the work stops behaving like architecture. Can a website carry structure the way a building does?",
    approach:
      "We designed the site around a strict structural grid that individual projects break out of at full bleed. Scroll-driven reveals pace each case study like a walkthrough, and a WebGL light study on the homepage shifts with the visitor's local time of day.",
    outcome:
      "The prototype is explorable end to end: a structural grid, deliberate full-bleed breakouts, and a light study that tracks the time of day wherever you happen to be sitting.",
    stats: [
      { value: "1", label: "Structural grid, broken deliberately" },
      { value: "WebGL", label: "Light study driven by local time" },
      { value: "Full-bleed", label: "Breakouts for individual projects" },
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
    kind: "Self-initiated concept project",
    demoHref: "/demo/atlas-freight",
    cover: <PhotoCover slug="atlas-freight" alt="Atlas Freight dispatch board on a monitor" />,
    summary:
      "A dispatch platform designed for the people who actually use it: dispatchers working three screens at 5 a.m.",
    services: ["Product design", "Design system", "Interaction"],
    challenge:
      "The brief we set ourselves: dispatch tools accumulate a decade of features with no design oversight, until the people using them keep paper notes to track what the software can't show. What if the day's exceptions were the interface, instead of something you go hunting for?",
    approach:
      "The design puts the day's exceptions — late loads, empty miles, driver hours — on one board, with everything else a keystroke away. Dense, keyboard-first, built for expert users rather than demo audiences.",
    outcome:
      "The prototype is a working dispatch board: exceptions first, keyboard navigation throughout, and detail views one keystroke from the day view. Built for the 5 a.m. shift rather than the sales demo.",
    stats: [
      { value: "3", label: "Exception types on one board" },
      { value: "1", label: "Keystroke from board to detail" },
      { value: "Keyboard", label: "First-class navigation, not an add-on" },
    ],
    tint: "#c2410c",
    artifacts: [
      {
        caption: "The exceptions board, sketched as the primary interface.",
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
