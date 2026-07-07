import { ImageResponse } from "next/og";
import { getProject } from "@/lib/projects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Xark Tech case study";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const project = getProject((await params).slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#101012",
          color: "#f7f6f2",
          padding: 64,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 800, letterSpacing: -1 }}>
            XARK<span style={{ color: "#2016e8", fontSize: 18, marginLeft: 4 }}>®</span>
          </div>
          <div style={{ display: "flex", fontSize: 20, color: "#a9a79c", textTransform: "uppercase", letterSpacing: 3 }}>
            Case study — {project?.year ?? ""}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", width: 120, height: 10, background: project?.tint ?? "#2016e8", marginBottom: 28 }} />
          <div style={{ display: "flex", fontSize: 110, fontWeight: 800, letterSpacing: -4, textTransform: "uppercase", lineHeight: 1 }}>
            {project?.name ?? "Xark Tech"}
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#a9a79c", marginTop: 20 }}>
            {project?.category ?? ""}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
