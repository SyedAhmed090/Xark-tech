"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { PROJECTS } from "@/lib/projects";

const meridian = PROJECTS[0];

export default function FeaturedCase() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // Four full-width panels → pan three panel-widths across the pinned window
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={ref} className="relative h-[400vh] bg-ink" aria-label="Featured case">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div className="flex" style={{ x }}>
          {/* Panel 1 — intro */}
          <div className="flex h-screen w-screen shrink-0 flex-col justify-center px-5 md:px-10">
            <p className="eyebrow mb-6 text-klein">Featured case — keep scrolling →</p>
            <h2 className="display text-[clamp(2.5rem,9vw,9rem)] text-paper">
              Meridian
            </h2>
            <p className="mt-6 max-w-md text-lg text-paper/60">
              A treasury platform that looked like a science project and needed
              to feel like an institution.
            </p>
          </div>

          {/* Panel 2 — the product */}
          <div className="flex h-screen w-screen shrink-0 items-center gap-10 px-5 md:px-10">
            <div className="relative aspect-[4/3] w-full max-w-3xl overflow-hidden rounded-sm">
              {meridian.cover}
            </div>
            <p className="hidden max-w-xs text-paper/60 lg:block">
              Ten interface patterns replaced forty screens’ worth of one-offs
              — documented in a system the team ships against weekly.
            </p>
          </div>

          {/* Panel 3 — the number */}
          <div className="flex h-screen w-screen shrink-0 flex-col justify-center px-5 md:px-10">
            <p className="display text-[clamp(4rem,16vw,16rem)] text-klein">+34%</p>
            <p className="eyebrow mt-4 text-paper/60">
              Activation rate after the redesign
            </p>
          </div>

          {/* Panel 4 — the pull-through */}
          <div className="flex h-screen w-screen shrink-0 flex-col justify-center px-5 md:px-10">
            <blockquote className="max-w-3xl font-serif italic text-2xl leading-snug text-paper md:text-4xl">
              “Sales demos now start with the design.”
            </blockquote>
            <p className="eyebrow mt-6 text-paper/50">Dana Whitfield — CEO, Meridian</p>
            <Link
              href="/work/meridian"
              className="eyebrow mt-12 inline-block w-fit rounded-full bg-paper px-7 py-4 text-ink transition-colors hover:bg-klein hover:text-paper"
              data-hover
            >
              Read the full case →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
