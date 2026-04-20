import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

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
          background: "#1F1F1F",
          color: "#D4AF37",
          fontSize: 22,
          fontWeight: 700,
          fontFamily: "serif",
          borderRadius: 6,
        }}
      >
        K
      </div>
    ),
    { ...size },
  );
}
