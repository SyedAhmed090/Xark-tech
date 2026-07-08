"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";

/* Each route mounts its own fresh Lenis instance (SmoothScroll wraps every
   page individually), which can race Next's native scroll-to-top or start
   from a stale position — forcing an immediate scrollTo(0) on every path
   change is what actually guarantees new pages open at the top. */
export default function ScrollReset() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [pathname, lenis]);

  return null;
}
