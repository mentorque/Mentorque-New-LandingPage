import { useState, useEffect } from "react";

function useCountUp(end: number, duration: number, decimals = 0) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 2);
      const current = easeOut * end;
      setValue(
        decimals > 0
          ? Math.round(current * Math.pow(10, decimals)) / Math.pow(10, decimals)
          : Math.round(current)
      );
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, decimals]);
  return value;
}

type SegmentDef = { w: string; active: boolean };

function SegTrack({ segments }: { segments: SegmentDef[] }) {
  return (
    <div style={{ display: "flex", gap: 2, height: 5, borderRadius: 3, overflow: "hidden", marginTop: 6 }}>
      {segments.map((s, i) => (
        <div
          key={i}
          style={{
            width: s.w,
            flexShrink: 0,
            borderRadius: 2,
            background: s.active ? "#3b82f6" : "rgba(255,255,255,0.09)",
          }}
        />
      ))}
    </div>
  );
}

function Tag({ label, color }: { label: string; color: "blue" | "amber" }) {
  const bg   = color === "blue"  ? "rgba(59,130,246,0.18)" : "rgba(251,191,36,0.15)";
  const text = color === "blue"  ? "#60a5fa"               : "#fbbf24";
  return (
    <span style={{
      fontSize: 9,
      fontWeight: 600,
      letterSpacing: "0.04em",
      background: bg,
      color: text,
      borderRadius: 4,
      padding: "2px 6px",
      flexShrink: 0,
    }}>
      {label}
    </span>
  );
}

function InsightRow({
  tag, tagColor, label, segments,
}: {
  tag: string;
  tagColor: "blue" | "amber";
  label: string;
  segments: SegmentDef[];
}) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      border: "0.5px solid rgba(255,255,255,0.07)",
      borderRadius: 10,
      padding: "9px 10px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <Tag label={tag} color={tagColor} />
        <span style={{ fontSize: 10.5, color: "rgba(255,255,255,0.55)", lineHeight: 1.3 }}>
          {label}
        </span>
      </div>
      <SegTrack segments={segments} />
    </div>
  );
}

export default function MockupCard2CallbackMobile() {
  const multiplier = useCountUp(3.1, 900, 1);
  const percent    = useCountUp(210, 900, 0);

  return (
    <div style={{
      width: "100%",
      maxWidth: 380,
      margin: "0 auto",
      borderRadius: 18,
      overflow: "hidden",
      border: "0.5px solid rgba(255,255,255,0.08)",
      background: "rgba(12,12,16,0.97)",
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      padding: "14px 14px 16px",
      boxSizing: "border-box",
    }}>

      {/* Filter pills */}
      <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
        <div style={{
          fontSize: 10,
          color: "#60a5fa",
          background: "rgba(59,130,246,0.14)",
          border: "0.5px solid rgba(59,130,246,0.3)",
          borderRadius: 20,
          padding: "4px 10px",
          fontWeight: 500,
        }}>
          Callback Rate (Last 30d) ▾
        </div>
        <div style={{
          fontSize: 10,
          color: "rgba(255,255,255,0.4)",
          background: "rgba(255,255,255,0.05)",
          border: "0.5px solid rgba(255,255,255,0.09)",
          borderRadius: 20,
          padding: "4px 10px",
        }}>
          Applications ▾
        </div>
        <div style={{
          fontSize: 10,
          color: "rgba(255,255,255,0.3)",
          marginLeft: "auto",
          alignSelf: "center",
        }}>
          + Generate insights
        </div>
      </div>

      {/* Headline */}
      <div style={{
        fontSize: 11,
        color: "rgba(255,255,255,0.38)",
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        marginBottom: 4,
      }}>
        Callback rate improvement
      </div>

      {/* Big number */}
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
        <span style={{
          fontSize: 38,
          fontWeight: 700,
          color: "#fff",
          letterSpacing: "-0.02em",
          lineHeight: 1,
        }}>
          {multiplier}×
        </span>
        <span style={{
          fontSize: 15,
          fontWeight: 600,
          color: "#4ade80",
          letterSpacing: "-0.01em",
        }}>
          ↑ {percent}%
        </span>
      </div>

      {/* Subline */}
      <div style={{
        fontSize: 10,
        color: "rgba(255,255,255,0.28)",
        marginBottom: 14,
      }}>
        vs. before Mentorque · 47 applications tracked
      </div>

      {/* Insight rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        <InsightRow
          tag="Resume"
          tagColor="blue"
          label="Impact phrasing rewrite"
          segments={[
            { w: "14%", active: true  },
            { w: "8%",  active: true  },
            { w: "22%", active: true  },
            { w: "5%",  active: false },
            { w: "30%", active: true  },
            { w: "21%", active: false },
          ]}
        />
        <InsightRow
          tag="Outreach"
          tagColor="amber"
          label="Decision-maker direct contact"
          segments={[
            { w: "6%",  active: false },
            { w: "18%", active: true  },
            { w: "10%", active: false },
            { w: "28%", active: true  },
            { w: "38%", active: false },
          ]}
        />
        <InsightRow
          tag="Tailoring"
          tagColor="blue"
          label="AI keyword match per JD"
          segments={[
            { w: "35%", active: true  },
            { w: "4%",  active: false },
            { w: "20%", active: true  },
            { w: "15%", active: true  },
            { w: "26%", active: false },
          ]}
        />
      </div>
    </div>
  );
}