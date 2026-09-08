import { ImageResponse } from "next/og";
import { design } from "@/lib/design";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          background: design.colors.background,
          color: design.colors.goldLight,
        }}
      >
        <div style={{ fontSize: 96, letterSpacing: -4, lineHeight: 1 }}>A</div>
        <div style={{ width: 40, height: 2, background: design.colors.gold }} />
      </div>
    ),
    size,
  );
}
