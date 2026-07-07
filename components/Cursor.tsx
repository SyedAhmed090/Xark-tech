"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 450, damping: 40 });
  const springY = useSpring(y, { stiffness: 450, damping: 40 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const motionOk = !window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    if (!fine || !motionOk) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    let wasHovering = false;
    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const now = Boolean(target?.closest("a, button, [data-hover]"));
      if (now !== wasHovering) {
        wasHovering = now;
        setHovering(now);
      }
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full border border-klein mix-blend-multiply"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: hovering ? 56 : 14,
        height: hovering ? 56 : 14,
        opacity: visible ? 1 : 0,
        backgroundColor: hovering ? "rgba(32,22,232,0.12)" : "#2016e8",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      aria-hidden
    />
  );
}
