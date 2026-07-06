"use client";

import { useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Magnetic from "./Magnetic";
import { INTRO_SEEN_KEY } from "./Preloader";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

function HeroLine({
  children,
  index,
  baseDelay,
}: {
  children: React.ReactNode;
  index: number;
  baseDelay: number;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: "112%" }}
        animate={{ y: 0 }}
        transition={{
          delay: baseDelay + index * 0.12,
          duration: 1,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* Static stand-in for the WebGL X when the visitor prefers reduced motion */
function StaticX() {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
      <path
        d="M22 22 L78 78 M78 22 L22 78"
        stroke="#2016e8"
        strokeWidth="14"
        strokeLinecap="round"
        opacity="0.25"
      />
    </svg>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const canvasY = useTransform(scrollYProgress, [0, 1], [0, 160]);

  // Hero lines wait for the preloader on the first visit only; on repeat
  // page loads this session the preloader is skipped, so start almost at once.
  const baseDelay = useMemo(() => {
    if (typeof window === "undefined") return 2.1;
    return sessionStorage.getItem(INTRO_SEEN_KEY) ? 0.3 : 2.1;
  }, []);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-svh flex-col justify-end overflow-hidden px-5 pb-10 pt-32 md:px-10"
    >
      {/* 3D X mark — floats behind the headline, drifts on scroll */}
      <motion.div
        className="pointer-events-auto absolute inset-x-0 top-16 mx-auto h-[36svh] w-full max-w-[900px] md:-right-[3%] md:left-auto md:top-[8%] md:h-[72svh] md:w-[44vw]"
        style={{ y: canvasY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: baseDelay + 0.5, duration: 1.2 }}
      >
        {reduceMotion ? <StaticX /> : <HeroCanvas />}
      </motion.div>

      <motion.p
        className="eyebrow relative z-10 mb-6 text-ink/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: baseDelay + 0.4, duration: 0.6 }}
      >
        Independent design agency — Austin, TX — Est. 2014
      </motion.p>

      <motion.h1
        className="display relative z-10 text-[clamp(2.5rem,11.5vw,10.5rem)]"
        style={{ y: headlineY }}
      >
        <HeroLine index={0} baseDelay={baseDelay}>
          We make
        </HeroLine>
        <HeroLine index={1} baseDelay={baseDelay}>
          software
        </HeroLine>
        <HeroLine index={2} baseDelay={baseDelay}>
          <span className="accent-word pr-[0.06em]">feel</span> human
        </HeroLine>
      </motion.h1>

      <motion.div
        className="relative z-10 mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: baseDelay + 0.55, duration: 0.8 }}
      >
        <p className="max-w-md text-base leading-relaxed text-ink/70 md:text-lg">
          Xark Tech partners with ambitious teams across the US to design
          brands, products, and websites people remember — and actually enjoy
          using.
        </p>
        <div className="flex items-center gap-4">
          <Magnetic>
            <a
              href="#work"
              className="eyebrow inline-block rounded-full bg-klein px-7 py-4 text-paper transition-colors hover:bg-ink"
            >
              See the work ↓
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              className="eyebrow inline-block rounded-full border border-ink/25 px-7 py-4 transition-colors hover:border-klein hover:text-klein"
            >
              Start a project
            </a>
          </Magnetic>
        </div>
      </motion.div>
    </section>
  );
}
