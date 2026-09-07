"use client";

import { ReactLenis } from "lenis/react";
import ScrollReset from "./ScrollReset";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis root options={{ duration: 1.15, smoothWheel: true }}>
      <ScrollReset />
      {children}
    </ReactLenis>
  );
}
