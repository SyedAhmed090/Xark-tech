// Static export: metadata routes must opt in explicitly or the build
// aborts with "dynamic not configured". See next.config.ts.
export const dynamic = "force-static";

import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Xark Tech — independent design agency for B2B software";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f7f6f2",
          color: "#101012",
          padding: 64,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 34,
              fontWeight: 800,
              letterSpacing: -1,
            }}
          >
            XARK
            <span style={{ color: "#2016e8", fontSize: 18, marginLeft: 4 }}>
              ®
            </span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 20,
              color: "#6b6a63",
              textTransform: "uppercase",
              letterSpacing: 3,
            }}
          >
            Independent design agency
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              width: 120,
              height: 10,
              background: "#2016e8",
              marginBottom: 28,
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 92,
              fontWeight: 800,
              letterSpacing: -4,
              lineHeight: 1,
            }}
          >
            We make software
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 92,
              fontWeight: 800,
              letterSpacing: -4,
              lineHeight: 1,
              color: "#2016e8",
            }}
          >
            feel human.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 20,
            color: "#6b6a63",
            textTransform: "uppercase",
            letterSpacing: 3,
          }}
        >
          Brand · Product · Web · Sheridan, Wyoming
        </div>
      </div>
    ),
    { ...size },
  );
}
