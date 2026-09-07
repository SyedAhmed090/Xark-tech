import { ImageResponse } from "next/og";
import { getService } from "@/lib/services";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Xark Tech service";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const service = getService((await params).slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#2016e8",
          color: "#f7f6f2",
          padding: 64,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 800, letterSpacing: -1 }}>
            XARK<span style={{ fontSize: 18, marginLeft: 4 }}>®</span>
          </div>
          <div style={{ display: "flex", fontSize: 20, color: "rgba(247,246,242,0.6)", textTransform: "uppercase", letterSpacing: 3 }}>
            Service
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 800, letterSpacing: -3, textTransform: "uppercase", lineHeight: 1 }}>
            {service?.name ?? "Xark Tech"}
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "rgba(247,246,242,0.75)", marginTop: 22, fontStyle: "italic" }}>
            {service?.tagline ?? ""}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
