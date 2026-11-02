import { ImageResponse } from "next/og";

export const alt = "Clarota Tattoo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: 1200,
        height: 630,
        display: "flex",
        backgroundColor: "#0a0a0a",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow top-left */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124,58,237,0.28) 0%, transparent 60%)",
          top: -300,
          left: -200,
          display: "flex",
        }}
      />

      {/* Glow bottom-right */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(168,85,247,0.18) 0%, transparent 65%)",
          bottom: -200,
          right: -100,
          display: "flex",
        }}
      />

      {/* Left accent bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 6,
          background: "linear-gradient(to bottom, #7c3aed, #a855f7, #4c1d95)",
          display: "flex",
        }}
      />

      {/* Giant decorative "C" in background */}
      <div
        style={{
          position: "absolute",
          right: -40,
          top: -60,
          fontSize: 700,
          fontWeight: 900,
          fontStyle: "italic",
          fontFamily: "Georgia, serif",
          color: "rgba(124,58,237,0.07)",
          lineHeight: 1,
          display: "flex",
          userSelect: "none",
        }}
      >
        C
      </div>

      {/* Horizontal thin lines decoration */}
      <div
        style={{
          position: "absolute",
          right: 80,
          bottom: 80,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {[1, 0.6, 0.3].map((opacity, i) => (
          <div
            key={i}
            style={{
              width: 120 - i * 30,
              height: 1,
              backgroundColor: `rgba(168,85,247,${opacity * 0.4})`,
              display: "flex",
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: 90,
          paddingRight: 60,
          paddingTop: 70,
          paddingBottom: 70,
          gap: 0,
          flex: 1,
        }}
      >
        {/* Location tag */}
        <div
          style={{
            display: "flex",
            color: "#7c3aed",
            fontSize: 16,
            letterSpacing: 8,
            marginBottom: 20,
            fontFamily: "sans-serif",
            fontWeight: 600,
          }}
        >
          FORTALEZA, CE
        </div>

        {/* Name + dot */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 0,
            lineHeight: 0.9,
          }}
        >
          <span
            style={{
              fontSize: 148,
              fontWeight: 900,
              fontStyle: "italic",
              fontFamily: "Georgia, serif",
              color: "#e8e0f0",
              letterSpacing: -5,
            }}
          >
            CLAROTA
          </span>
          <span
            style={{
              fontSize: 148,
              fontWeight: 900,
              fontStyle: "italic",
              fontFamily: "Georgia, serif",
              color: "#a855f7",
            }}
          >
            .
          </span>
        </div>

        {/* Divider */}
        <div
          style={{
            width: 260,
            height: 2,
            background: "linear-gradient(to right, #7c3aed, transparent)",
            marginTop: 30,
            marginBottom: 30,
            display: "flex",
          }}
        />

        {/* Subtitle pills row */}
        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
          }}
        >
          {["Tatuadora", "Trash Tattoo", "Blackwork", "Geek"].map(
            (label, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  paddingLeft: 18,
                  paddingRight: 18,
                  paddingTop: 8,
                  paddingBottom: 8,
                  borderRadius: 999,
                  border: `1px solid ${i === 0 ? "rgba(168,85,247,0.5)" : "rgba(124,58,237,0.3)"}`,
                  backgroundColor:
                    i === 0 ? "rgba(124,58,237,0.15)" : "transparent",
                  color: i === 0 ? "#a855f7" : "#6b7280",
                  fontSize: 18,
                  fontFamily: "sans-serif",
                  letterSpacing: 3,
                  fontWeight: 600,
                }}
              >
                {label.toUpperCase()}
              </div>
            ),
          )}
        </div>
      </div>
    </div>,
    size,
  );
}
