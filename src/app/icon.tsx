import { ImageResponse } from "next/og";
import { design } from "@/lib/design";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Monogram favicon — the wordmark's initial on the brand's espresso ground. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: design.colors.ink,
          color: design.colors.goldLight,
          fontSize: 22,
          letterSpacing: -1,
        }}
      >
        A
      </div>
    ),
    size,
  );
}
