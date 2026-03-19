import { useEffect, useRef, useState } from "react";

// ── Data ───────────────────────────────────────────────────────────────────
const pills = [
  { rowId: 0, label: "ATS 94%",  color: "blue"   },
  { rowId: 1, label: "Ready",    color: "green"  },
  { rowId: 2, label: "Draft",    color: "amber"  },
  { rowId: 3, label: "Reviewed", color: "purple" },
  { rowId: 4, label: "Updated",  color: "blue"   },
];

const pillColors: Record<string, { bg: string; text: string; dot: string; border: string }> = {
  blue:   { bg: "rgba(59,130,246,0.12)",  text: "#60a5fa", dot: "#60a5fa", border: "rgba(96,165,250,0.25)" },
  green:  { bg: "rgba(34,197,94,0.12)",   text: "#4ade80", dot: "#4ade80", border: "rgba(74,222,128,0.25)" },
  amber:  { bg: "rgba(251,191,36,0.12)",  text: "#fbbf24", dot: "#fbbf24", border: "rgba(251,191,36,0.25)" },
  purple: { bg: "rgba(167,139,250,0.12)", text: "#a78bfa", dot: "#a78bfa", border: "rgba(167,139,250,0.25)" },
};

const LOGOS = {
  google: "/Landscape-Component/google-color-svgrepo-com.svg",
  amazon: "/Landscape-Component/amazon-color-svgrepo-com.svg",
  meta:   "/Landscape-Component/meta-svgrepo-com.svg",
} as const;

const resumeRows = [
  { label: "SDE I · Google tailored",  logo: "google" as const },
  { label: "SWE I · Amazon tailored",  logo: "amazon" as const },
  { label: "Data Analyst · Meta",       logo: "meta"   as const },
];

const noteRows = [
  { label: "Impact bullets review.pdf" },
  { label: "Project framing guide.pdf" },
];

// ── Icons ──────────────────────────────────────────────────────────────────
function FileIcon({ color = "rgba(255,255,255,0.4)" }: { color?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
      <rect x="3" y="2" width="10" height="12" rx="1.5" stroke={color} strokeWidth="1.3" />
      <path d="M6 6h4M6 9h3" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────
function Pill({ label, color, visible }: { label: string; color: string; visible: boolean }) {
  const c = pillColors[color];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      fontSize: 10, padding: "3px 7px", borderRadius: 99,
      background: c.bg, color: c.text, border: `1px solid ${c.border}`,
      whiteSpace: "nowrap", marginLeft: "auto", flexShrink: 0,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateX(0) scale(1)" : "translateX(6px) scale(0.95)",
      transition: "opacity 0.28s ease, transform 0.28s ease",
      pointerEvents: "none",
    }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: c.dot, flexShrink: 0 }} />
      {label}
    </span>
  );
}

function Row({
  logo, label, pillLabel, pillColor, pillVisible,
}: {
  logo?: keyof typeof LOGOS | null;
  label: string;
  pillLabel: string;
  pillColor: string;
  pillVisible: boolean;
}) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      padding: "7px 12px",
      background: pillVisible ? "rgba(255,255,255,0.05)" : "transparent",
      borderRadius: 8,
      transition: "background 0.22s",
    }}>
      {/* icon */}
      <span style={{
        width: 18, height: 18, flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {logo
          ? <img src={LOGOS[logo]} alt="" style={{ width: 16, height: 16, objectFit: "contain" }} />
          : <FileIcon color={pillVisible ? "#60a5fa" : "rgba(255,255,255,0.35)"} />
        }
      </span>
      {/* label */}
      <span style={{
        fontSize: 11, color: pillVisible ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.55)",
        flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        transition: "color 0.22s",
      }}>
        {label}
      </span>
      <Pill label={pillLabel} color={pillColor} visible={pillVisible} />
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────
export default function MockupCard1ResumeMobile() {
  const [activePill, setActivePill] = useState<number>(0);
  const [scoreWidth, setScoreWidth] = useState(0);
  const [scorePct, setScorePct]     = useState(0);
  const indexRef = useRef(0);

  useEffect(() => {
    // score bar
    const t = setTimeout(() => {
      setScoreWidth(82);
      let n = 0;
      const iv = setInterval(() => {
        n = Math.min(n + 2, 82);
        setScorePct(n);
        if (n >= 82) clearInterval(iv);
      }, 35);
      return () => clearInterval(iv);
    }, 900);

    // pill cycling
    const iv = setInterval(() => {
      indexRef.current++;
      setActivePill(indexRef.current % pills.length);
    }, 2000);

    return () => { clearTimeout(t); clearInterval(iv); };
  }, []);

  return (
    <>
      <style>{`
        @keyframes typingBounce {
          0%,60%,100% { transform:translateY(0); opacity:0.45; }
          30% { transform:translateY(-3px); opacity:1; }
        }
      `}</style>

      <div style={{
        width: "100%",
        maxWidth: 390,
        margin: "0 auto",
        borderRadius: 18,
        overflow: "hidden",
        background: "rgba(14,14,18,0.97)",
        border: "1px solid rgba(255,255,255,0.07)",
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
      }}>

        {/* ── Top bar: agent identity ── */}
        <div style={{
          display: "flex", alignItems: "center", gap: 9,
          padding: "12px 14px 10px",
          borderBottom: "0.5px solid rgba(255,255,255,0.07)",
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8, overflow: "hidden", flexShrink: 0,
            background: "rgba(255,255,255,0.08)",
          }}>
            <img src="/mentorque-logo.png" alt="Mentorque"
              style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <span style={{ fontSize: 12.5, color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>Mentorque AI</span>

          {/* nav pills — right side */}
          <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
            {["Resume","Apps","Profile"].map((item, i) => (
              <span key={item} style={{
                fontSize: 9.5, padding: "3px 7px", borderRadius: 6,
                background: i === 0 ? "rgba(59,130,246,0.18)" : "transparent",
                color: i === 0 ? "#60a5fa" : "rgba(255,255,255,0.3)",
                border: i === 0 ? "1px solid rgba(96,165,250,0.25)" : "1px solid transparent",
              }}>{item}</span>
            ))}
          </div>
        </div>

        {/* ── Search bar ── */}
        <div style={{
          margin: "10px 14px 4px",
          background: "rgba(255,255,255,0.05)",
          border: "0.5px solid rgba(255,255,255,0.09)",
          borderRadius: 8,
          padding: "7px 11px",
          display: "flex", alignItems: "center", gap: 7,
        }}>
          <span style={{ fontSize: 11, opacity: 0.35 }}>🔍</span>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.28)" }}>Search resume...</span>
        </div>

        {/* ── Resume versions section ── */}
        <div style={{ padding: "10px 14px 4px" }}>
          <div style={{
            display: "flex", alignItems: "center",
            fontSize: 10, color: "rgba(255,255,255,0.35)",
            fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase",
            marginBottom: 4, padding: "0 2px",
          }}>
            <span>📁</span>
            <span style={{ marginLeft: 5 }}>Resume versions</span>
            <span style={{ marginLeft: "auto", fontSize: 10 }}>∧</span>
          </div>

          {resumeRows.map((row, i) => {
            const pill = pills[i];
            return (
              <Row
                key={i}
                logo={row.logo}
                label={row.label}
                pillLabel={pill.label}
                pillColor={pill.color}
                pillVisible={activePill === i}
              />
            );
          })}
        </div>

        {/* ── Mentor notes section ── */}
        <div style={{ padding: "6px 14px 4px" }}>
          <div style={{
            display: "flex", alignItems: "center",
            fontSize: 10, color: "rgba(255,255,255,0.35)",
            fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase",
            marginBottom: 4, padding: "0 2px",
          }}>
            <span>📁</span>
            <span style={{ marginLeft: 5 }}>Mentor notes</span>
            <span style={{ marginLeft: "auto", fontSize: 10 }}>∧</span>
          </div>

          {noteRows.map((row, i) => {
            const pillIdx = i + 3;
            const pill = pills[pillIdx];
            return (
              <Row
                key={i}
                logo={null}
                label={row.label}
                pillLabel={pill.label}
                pillColor={pill.color}
                pillVisible={activePill === pillIdx}
              />
            );
          })}
        </div>

        {/* ── Score bar ── */}
        <div style={{
          margin: "8px 14px 14px",
          background: "rgba(255,255,255,0.04)",
          border: "0.5px solid rgba(255,255,255,0.08)",
          borderRadius: 10,
          padding: "10px 12px",
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <span style={{ fontSize: 10.5, color: "rgba(255,255,255,0.3)", whiteSpace: "nowrap" }}>Match score</span>
          <div style={{
            flex: 1, height: 3.5,
            background: "rgba(255,255,255,0.07)", borderRadius: 4, overflow: "hidden",
          }}>
            <div style={{
              height: "100%", borderRadius: 4, background: "#3b82f6",
              width: `${scoreWidth}%`,
              transition: "width 1.6s cubic-bezier(0.4,0,0.2,1)",
            }} />
          </div>
          <span style={{ fontSize: 11.5, color: "#60a5fa", fontWeight: 600, minWidth: 28 }}>
            {scorePct}%
          </span>

          {/* ATS badge */}
          <span style={{
            fontSize: 9.5, padding: "3px 7px", borderRadius: 6,
            background: "rgba(59,130,246,0.12)", color: "#60a5fa",
            border: "1px solid rgba(96,165,250,0.22)", whiteSpace: "nowrap",
          }}>High ATS</span>
        </div>

      </div>
    </>
  );
}