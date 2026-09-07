"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CURSOR_QUERIES = ["(pointer: fine)", "(prefers-reduced-motion: reduce)"];

/** Re-render when either media query flips (e.g. a mouse is plugged in). */
function subscribeToCursorSupport(onChange: () => void) {
  const lists = CURSOR_QUERIES.map((q) => window.matchMedia(q));
  lists.forEach((l) => l.addEventListener("change", onChange));
  return () => lists.forEach((l) => l.removeEventListener("change", onChange));
}

/** The custom cursor is for precise pointers only, and never overrides
 *  reduced-motion. Read during render so we never setState in an effect. */
function getCursorSupported() {
  return (
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** No matchMedia on the server — render nothing and let the client decide. */
function getCursorSupportedOnServer() {
  return false;
}

export default function Cursor() {
  const enabled = useSyncExternalStore(
    subscribeToCursorSupport,
    getCursorSupported,
    getCursorSupportedOnServer,
  );
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 450, damping: 40 });
  const springY = useSpring(y, { stiffness: 450, damping: 40 });

  useEffect(() => {
    if (!enabled) return;

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
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      // mix-blend-difference inverts against whatever is underneath, so a
      // solid white fill stays visible on both paper and ink/klein sections —
      // multiply (the previous approach) went near-invisible on dark bg.
      className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full bg-white mix-blend-difference"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: hovering ? 56 : 14,
        height: hovering ? 56 : 14,
        opacity: visible ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      aria-hidden
    />
  );
}
