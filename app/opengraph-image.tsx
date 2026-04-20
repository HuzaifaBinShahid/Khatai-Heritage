import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: 80,
          backgroundColor: "#F5EFE7",
          backgroundImage:
            "radial-gradient(at 20% 20%, rgba(212,175,55,0.35) 0, transparent 50%)," +
            "radial-gradient(at 80% 10%, rgba(146,184,132,0.3) 0, transparent 50%)," +
            "radial-gradient(at 70% 80%, rgba(139,67,72,0.3) 0, transparent 50%)",
          fontFamily: "serif",
          color: "#1F1F1F",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 28,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              display: "flex",
              width: 48,
              height: 4,
              background: "#D4AF37",
            }}
          />
          Homemade · Lahore
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 120,
              lineHeight: 1,
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            {siteConfig.name}
          </div>
          <div style={{ fontSize: 42, color: "#3A3A3A", fontStyle: "italic" }}>
            {siteConfig.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            fontSize: 24,
            color: "#3A3A3A",
          }}
        >
          <span>Cardamom · Almond · Desi ghee · Fresh daily</span>
          <span
            style={{
              padding: "10px 24px",
              background: "#1F1F1F",
              color: "#F5EFE7",
              borderRadius: 999,
              fontSize: 22,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            khataiheritage.com
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
