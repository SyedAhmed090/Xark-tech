// Static export: metadata routes must opt in explicitly or the build
// aborts with "dynamic not configured". See next.config.ts.
export const dynamic = "force-static";

import { ImageResponse } from "next/og";

// 180×180 is the size iOS actually requests for home-screen bookmarks.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * Mirrors app/icon.svg. Generated rather than checked in as a binary so the
 * mark only has to be maintained in one place — the ✕ and the ink field.
 * No rounded corners: iOS applies its own mask and would clip ours.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#101012",
        }}
      >
        <svg width="180" height="180" viewBox="0 0 64 64">
          <path
            d="M20 20 L44 44 M44 20 L20 44"
            stroke="#2016e8"
            strokeWidth="9"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    { ...size },
  );
}
