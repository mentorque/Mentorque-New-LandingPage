import { useState, useEffect } from "react";

function useCountUp(end: number, duration: number) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 2);
      setValue(Math.round(easeOut * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration]);
  return value;
}

const rows = [
  { company: "Google", role: "SWE",      dot: "#1d9e75", stage: "Tailored",     result: "94%" },
  { company: "Amazon", role: "SDE II",   dot: "#1d9e75", stage: "Tailored",     result: "91%" },
  { company: "Meta",   role: "Data role", dot: "#60a5fa", stage: "In progress",  result: "—"  },
];

export default function MockupCard4ApplicationsMobile() {
  const tracked  = useCountUp(1240, 900);
  const passRate = useCountUp(99,   900);
  const insights = useCountUp(10,   900);

  return (
    <div style={{
      width: "100%",
      maxWidth: 380,
      height: 390,
      margin: "0 auto",
      borderRadius: 18,
      overflow: "hidden",
      border: "0.5px solid rgba(255,255,255,0.08)",
      background: "rgba(14,14,18,0.97)",
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      display: "flex",
      flexDirection: "column",
      boxSizing: "border-box",
    }}>

      {/* ── Header ── */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "11px 14px",
        borderBottom: "0.5px solid rgba(255,255,255,0.07)",
        background: "rgba(0,0,0,0.2)",
        flexShrink: 0,
      }}>
        <div style={{
          width: 22, height: 22, borderRadius: "50%",
          overflow: "hidden", flexShrink: 0,
          background: "rgba(255,255,255,0.08)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 10,
        }}>
          <img src="/mentorque-logo.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <span style={{ fontSize: 11.5, color: "#fff", fontWeight: 500 }}>Job search automation</span>
        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.28)", marginLeft: 2 }}>Mentorque</span>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 10, color: "#1d9e75", display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1d9e75", display: "inline-block" }} />
            Live
          </span>
          <span style={{
            fontSize: 10, background: "#fff", color: "#000",
            borderRadius: 20, padding: "3px 10px", fontWeight: 600,
          }}>
            Run
          </span>
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>

        {/* Title + description */}
        <div style={{ fontSize: 13.5, color: "#fff", fontWeight: 500, lineHeight: 1.3, marginBottom: 4 }}>
          Your job search runs on automation
        </div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", lineHeight: 1.5, marginBottom: 12 }}>
          AI tailors your resume to every job in minutes. Tracks applications, surfaces patterns, and keeps you moving.
        </div>

        {/* ── Stat grid ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 6,
          marginBottom: 12,
          flexShrink: 0,
        }}>
          {[
            { label: "Applications", value: tracked.toLocaleString(), sub: "This month" },
            { label: "Match score",  value: `${passRate}%`,           sub: "Avg · tailored" },
            { label: "Insights",     value: insights,                  sub: "This week" },
          ].map((s, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.03)",
              border: "0.5px solid rgba(255,255,255,0.07)",
              borderRadius: 10,
              padding: "10px 8px",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}>
              <div style={{ fontSize: 8.5, color: "rgba(255,255,255,0.35)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                {s.label}
              </div>
              <div style={{ fontSize: 22, fontWeight: 300, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                {s.value}
              </div>
              <div style={{ fontSize: 8.5, color: "rgba(255,255,255,0.25)" }}>
                {s.sub}
              </div>
            </div>
          ))}
        </div>

        {/* ── Table ── */}
        <div style={{
          flex: 1,
          minHeight: 0,
          borderRadius: 10,
          overflow: "hidden",
          border: "0.5px solid rgba(255,255,255,0.07)",
        }}>
          {/* Table header */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr auto auto",
            padding: "7px 12px",
            background: "rgba(255,255,255,0.04)",
            borderBottom: "0.5px solid rgba(255,255,255,0.06)",
          }}>
            {["Application", "Status", "Match"].map((h, i) => (
              <div key={h} style={{
                fontSize: 9,
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                textAlign: i === 2 ? "right" : "left",
                minWidth: i === 1 ? 80 : i === 2 ? 40 : "auto",
              }}>
                {h}
              </div>
            ))}
          </div>

          {/* Table rows */}
          {rows.map((row, i) => (
            <div key={i} style={{
              display: "grid",
              gridTemplateColumns: "1fr auto auto",
              padding: "9px 12px",
              borderBottom: i < rows.length - 1 ? "0.5px solid rgba(255,255,255,0.05)" : "none",
              alignItems: "center",
            }}>
              {/* Company + role */}
              <div>
                <span style={{ fontSize: 11, color: "#fff", fontWeight: 500 }}>{row.company}</span>
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginLeft: 5 }}>· {row.role}</span>
              </div>

              {/* Status */}
              <div style={{
                display: "flex", alignItems: "center", gap: 5,
                minWidth: 80,
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: row.dot, flexShrink: 0,
                  display: "inline-block",
                }} />
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.45)" }}>{row.stage}</span>
              </div>

              {/* Match score */}
              <div style={{
                fontSize: 11,
                fontWeight: 500,
                color: row.result === "—" ? "rgba(255,255,255,0.25)" : "#fff",
                minWidth: 40,
                textAlign: "right",
              }}>
                {row.result}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}