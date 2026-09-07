"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { getProject } from "@/lib/projects";
import { Reveal } from "./Reveal";

const meridian = getProject("meridian")!;

function ReadCaseButton() {
  return (
    <Link
      href="/work/meridian"
      className="eyebrow inline-block w-fit rounded-full bg-paper px-7 py-4 text-ink transition-colors hover:bg-klein hover:text-paper"
      data-hover
    >
      Read the full case →
    </Link>
  );
}

/* Desktop: pinned section, four panels pan horizontally with scroll */
function PinnedPanels() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <div ref={ref} className="relative h-[350svh]">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <motion.div className="flex" style={{ x }}>
          <div className="flex h-svh w-screen shrink-0 flex-col justify-center px-10">
            <p className="eyebrow mb-6 text-klein">
              Featured case — keep scrolling →
            </p>
            <h2 className="display text-[clamp(2.5rem,9vw,9rem)] text-paper">
              Meridian
            </h2>
            <p className="mt-6 max-w-md text-lg text-paper/60">
              A treasury platform that looked like a science project and needed
              to feel like an institution.
            </p>
          </div>

          <div className="flex h-svh w-screen shrink-0 items-center gap-10 px-10">
            <div className="relative aspect-[4/3] w-full max-w-3xl overflow-hidden rounded-sm">
              {meridian.cover}
            </div>
            <p className="hidden max-w-xs text-paper/60 lg:block">
              Ten interface patterns replaced forty screens’ worth of one-offs
              — documented in a system the team ships against weekly.
            </p>
          </div>

          <div className="flex h-svh w-screen shrink-0 flex-col justify-center px-10">
            <p className="display text-[clamp(4rem,16vw,16rem)] text-klein">
              +34%
            </p>
            <p className="eyebrow mt-4 text-paper/60">
              Activation rate after the redesign
            </p>
          </div>

          <div className="flex h-svh w-screen shrink-0 flex-col justify-center px-10">
            <blockquote className="max-w-3xl font-serif italic text-2xl leading-snug text-paper md:text-4xl">
              “Sales demos now start with the design.”
            </blockquote>
            <p className="eyebrow mt-6 text-paper/50">
              Dana Whitfield — CEO, Meridian
            </p>
            <div className="mt-12">
              <ReadCaseButton />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* Mobile: same story, stacked vertically — no pinning, no clipped panels */
function StackedPanels() {
  return (
    <div className="flex flex-col gap-16 px-5 py-20">
      <Reveal>
        <p className="eyebrow mb-5 text-klein">Featured case</p>
        <h2 className="display text-[clamp(2.5rem,12vw,5rem)] text-paper">
          Meridian
        </h2>
        <p className="mt-4 text-paper/60">
          A treasury platform that looked like a science project and needed to
          feel like an institution.
        </p>
      </Reveal>
      <Reveal>
        <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
          {meridian.cover}
        </div>
      </Reveal>
      <Reveal>
        <p className="display text-[22vw] text-klein">+34%</p>
        <p className="eyebrow mt-3 text-paper/60">
          Activation rate after the redesign
        </p>
      </Reveal>
      <Reveal>
        <blockquote className="font-serif italic text-2xl leading-snug text-paper">
          “Sales demos now start with the design.”
        </blockquote>
        <p className="eyebrow mt-5 text-paper/50">
          Dana Whitfield — CEO, Meridian
        </p>
        <div className="mt-10">
          <ReadCaseButton />
        </div>
      </Reveal>
    </div>
  );
}

export default function FeaturedCase() {
  return (
    <section className="bg-ink" aria-label="Featured case">
      <div className="hidden md:block">
        <PinnedPanels />
      </div>
      <div className="md:hidden">
        <StackedPanels />
      </div>
    </section>
  );
}
