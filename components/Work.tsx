"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "./Reveal";

type Project = {
  name: string;
  category: string;
  year: string;
  cover: React.ReactNode;
};

/* Abstract editorial covers — pure CSS/SVG so nothing depends on stock imagery */
function CoverMeridian() {
  return (
    <div className="grain relative h-full w-full bg-ink">
      <div className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-klein blur-[1px]" />
      <div className="absolute left-1/2 top-1/2 h-[46%] w-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink" />
      <span className="display absolute bottom-5 left-5 text-paper text-2xl">M.</span>
    </div>
  );
}

function CoverLoop() {
  return (
    <div className="grain relative h-full w-full bg-tint">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="absolute rounded-full border-[3px] border-klein"
          style={{
            inset: `${12 + i * 9}%`,
            opacity: 1 - i * 0.18,
          }}
        />
      ))}
      <span className="display absolute bottom-5 left-5 text-ink text-2xl">LOOP</span>
    </div>
  );
}

function CoverForma() {
  return (
    <div className="grain relative h-full w-full bg-stone/40">
      <div className="absolute left-[12%] top-[14%] h-[72%] w-[30%] bg-ink" />
      <div className="absolute left-[48%] top-[30%] h-[56%] w-[16%] bg-klein" />
      <div className="absolute left-[70%] top-[14%] h-[40%] w-[18%] bg-paper" />
      <span className="display absolute bottom-5 left-5 text-ink text-2xl">FORMA</span>
    </div>
  );
}

function CoverAtlas() {
  return (
    <div className="grain relative h-full w-full bg-klein">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute h-px w-full bg-paper/50"
          style={{ top: `${18 + i * 12}%`, transform: `rotate(${-4 + i * 1.6}deg)` }}
        />
      ))}
      <div className="absolute right-[16%] top-[24%] h-4 w-4 rounded-full bg-paper" />
      <span className="display absolute bottom-5 left-5 text-paper text-2xl">ATLAS</span>
    </div>
  );
}

const PROJECTS: Project[] = [
  { name: "Meridian", category: "Fintech — brand & platform", year: "2025", cover: <CoverMeridian /> },
  { name: "Loop Health", category: "Healthcare — patient app", year: "2025", cover: <CoverLoop /> },
  { name: "Forma Studio", category: "Architecture — portfolio site", year: "2024", cover: <CoverForma /> },
  { name: "Atlas Freight", category: "Logistics — product design", year: "2024", cover: <CoverAtlas /> },
];

function WorkTile({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Inner cover drifts slower than the frame → parallax depth
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <Reveal delay={(index % 2) * 0.08} className={index % 2 === 1 ? "md:mt-24" : ""}>
      <a href="#contact" className="group block" data-hover>
        <div
          ref={ref}
          className="relative aspect-[4/5] overflow-hidden rounded-sm"
        >
          <motion.div
            className="absolute inset-[-10%] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            style={{ y }}
          >
            {project.cover}
          </motion.div>
          <span className="eyebrow absolute right-4 top-4 rounded-full bg-paper/90 px-3 py-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            View case →
          </span>
        </div>
        <div className="mt-4 flex items-baseline justify-between hairline-b pb-4">
          <div>
            <h3 className="display-tight text-xl md:text-2xl">{project.name}</h3>
            <p className="mt-1 text-sm text-ink/60">{project.category}</p>
          </div>
          <span className="font-mono text-xs text-ink/50">{project.year}</span>
        </div>
      </a>
    </Reveal>
  );
}

export default function Work() {
  return (
    <section id="work" className="px-5 py-24 md:px-10 md:py-36">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-4 text-klein">Selected work</p>
            <h2 className="display-tight max-w-2xl text-4xl md:text-6xl">
              Recent projects, 2024–2026
            </h2>
          </div>
          <p className="max-w-xs text-sm text-ink/60">
            A sample of engagements — full case studies shared on request.
          </p>
        </div>
      </Reveal>

      <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-x-10 md:gap-y-20">
        {PROJECTS.map((project, i) => (
          <WorkTile key={project.name} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
