"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "./Reveal";
import type { Project } from "@/lib/projects";

export default function WorkTile({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Inner cover drifts slower than the frame → parallax depth
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <Reveal delay={(index % 2) * 0.08} className={index % 2 === 1 ? "md:mt-24" : ""}>
      <Link href={`/work/${project.slug}`} className="group block" data-hover>
        <div
          ref={ref}
          className="relative aspect-[4/5] overflow-hidden rounded-sm transition-[clip-path] duration-500 ease-out [clip-path:inset(0_0_0_0)] group-hover:[clip-path:inset(2.5%_2.5%_2.5%_2.5%)]"
        >
          <motion.div
            className="absolute inset-[-10%] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            style={{ y }}
          >
            {project.cover}
          </motion.div>
          {/* Always visible, not hover-only: the concept framing has to reach
              readers who never hover, including every touch device. */}
          <span className="eyebrow absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-1.5 text-ink/70">
            Concept
          </span>
          <span className="eyebrow absolute right-4 top-4 rounded-full bg-paper/90 px-3 py-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Read the case →
          </span>
        </div>
        <div className="mt-4 flex items-baseline justify-between hairline-b pb-4">
          <div>
            <h3 className="display-tight text-xl md:text-2xl">{project.name}</h3>
            <p className="mt-1 text-sm text-ink/60">{project.category}</p>
          </div>
          <span className="font-mono text-xs text-ink/50">{project.year}</span>
        </div>
      </Link>
    </Reveal>
  );
}
