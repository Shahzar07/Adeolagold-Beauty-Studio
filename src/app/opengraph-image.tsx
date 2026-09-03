import { ImageResponse } from "next/og";
import { design } from "@/lib/design";

export const alt = design.seo.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Brand-consistent social card, generated at build time. */
export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: design.colors.ink,
          padding: "72px 80px",
          color: "#FFFFFF",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 44, height: 1, background: design.colors.gold }} />
          <div
            style={{
              fontSize: 20,
              letterSpacing: 10,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.62)",
            }}
          >
            Adeolagold Beauty Studio
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ fontSize: 104, lineHeight: 1, letterSpacing: -3 }}>
            The art of beautiful hair.
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.5,
              color: "rgba(255,255,255,0.6)",
              maxWidth: 780,
            }}
          >
            Luxury wigs, premium human hair and expert beauty services.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: design.colors.goldLight,
          }}
        >
          <div>Shop hair</div>
          <div>Book an appointment</div>
        </div>
      </div>
    ),
    size,
  );
}
