import { ImageResponse } from "next/og";
import { getPost } from "@/lib/posts";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Xark Tech journal";

/** Mirrors the work/[slug] card so shared links read as one family. Posts have
 *  no cover art, so the dek carries the card instead of an image. */
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = getPost((await params).slug);

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
            Journal — {post?.displayDate ?? ""}
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
              fontSize: post && post.title.length > 34 ? 64 : 82,
              fontWeight: 800,
              letterSpacing: -3,
              lineHeight: 1.05,
            }}
          >
            {post?.title ?? "Xark Tech journal"}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: "#6b6a63",
              marginTop: 22,
              maxWidth: 900,
              lineHeight: 1.3,
            }}
          >
            {post?.dek ?? ""}
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
          {post?.readingTime ?? ""} read — xarktech.com
        </div>
      </div>
    ),
    { ...size },
  );
}
