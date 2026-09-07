"use client";

import { motion, useReducedMotion } from "framer-motion";

/* Remounts on every route change → plays an ink wipe + content rise.
   On the first homepage visit it finishes behind the preloader. */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <>{children}</>;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed inset-0 z-[75] bg-ink"
        initial={{ y: "0%" }}
        animate={{ y: "-100%" }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        aria-hidden
      />
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
