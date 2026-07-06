"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

const ITEMS = [
  "Brand identity",
  "Product design",
  "Web development",
  "Motion & 3D",
  "Design systems",
];

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

function Row() {
  return (
    <div className="flex shrink-0 items-center">
      {ITEMS.map((item) => (
        <span key={item} className="flex items-center">
          <span className="display px-6 py-4 text-3xl text-paper md:text-5xl">
            {item}
          </span>
          <span className="font-serif italic text-2xl text-paper/60 md:text-4xl">
            ✕
          </span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  const reduceMotion = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  // Scrolling fast multiplies the drift speed — the strip feels alive
  const velocityFactor = useTransform(smoothVelocity, [-2000, 0, 2000], [-4, 1, 4], {
    clamp: false,
  });
  const directionRef = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduceMotion) return;
    const factor = velocityFactor.get();
    if (factor < 0) directionRef.current = -1;
    else if (factor > 0) directionRef.current = 1;
    const moveBy =
      directionRef.current * 2.2 * (delta / 1000) * Math.abs(factor || 1);
    baseX.set(baseX.get() + moveBy);
  });

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  return (
    <div className="overflow-hidden bg-klein" aria-hidden>
      <motion.div className="flex w-max" style={{ x }}>
        <Row />
        <Row />
      </motion.div>
    </div>
  );
}
