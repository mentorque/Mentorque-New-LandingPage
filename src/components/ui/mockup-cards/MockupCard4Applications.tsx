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
  { company: "Google · SWE",     dot: "#1d9e75", stage: "Tailored", result: "94%" },
  { company: "Amazon · SDE II",  dot: "#1d9e75", stage: "Tailored", result: "91%" },
  { company: "Meta · Data role",  dot: "#60a5fa", stage: "In progress", result: "—"  },
];

export default function MockupCard4Applications() {
  const passRate     = useCountUp(99,   900);
  const simPassed    = useCountUp(1240, 900);
  const simFailed    = useCountUp(10,   900);

  return (
    <div className="mc-c4" style={{ background: "rgba(30,30,34,0.97)", borderRadius: 16, overflow: "hidden", padding: 0 }}>

      {/* Header bar */}
      <div style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "14px 24px",
        borderBottom: "0.5px solid rgba(255,255,255,0.08)",
        background: "rgba(0,0,0,0.25)",
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: "50%",
          overflow: "hidden",
          flexShrink: 0,
        }}>
          <img src="/mentorque-logo.png" alt="Mentorque" style={{ width: "100%", height: "100%"}} />
        </div>
        <span style={{ fontSize: 16, color: "#fff", fontWeight: 500 }}>Job search automation</span>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginLeft: 4 }}>Mentorque</span>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 18 }}>
          <span style={{ fontSize: 13, color: "#1d9e75", display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#1d9e75", display: "inline-block" }} />
            Live
          </span>
          <span style={{ fontSize: 13, background: "#fff", color: "#000", borderRadius: 20, padding: "4px 12px", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
            Run
          </span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "24px 26px" }}>
        <div style={{ fontSize: 22, color: "#fff", fontWeight: 500, marginBottom: 8 }}>Your job search runs on automation</div>
        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.5, marginBottom: 20 }}>
          AI tailors your resume to every job in minutes. Tracks applications, surfaces patterns, and keeps you moving without the manual grind.
        </div>

        {/* Stat grid */}
        <div className="mc-c4-grid" style={{ marginBottom: 24 }}>
          <div className="mc-c4-stat">
            <div className="mc-c4-stat-lbl">Applications tracked</div>
            <div className="mc-c4-stat-num" style={{ fontSize: 48, fontWeight: 300 }}>{simPassed.toLocaleString()}</div>
            <div className="mc-c4-stat-sub">This month</div>
          </div>
          <div className="mc-c4-stat">
            <div className="mc-c4-stat-lbl">Resumes tailored</div>
            <div className="mc-c4-stat-num" style={{ fontSize: 48, fontWeight: 300 }}>{passRate}%</div>
            <div className="mc-c4-stat-sub">Match score avg</div>
          </div>
          <div className="mc-c4-stat">
            <div className="mc-c4-stat-lbl">Patterns surfaced</div>
            <div className="mc-c4-stat-num" style={{ fontSize: 48, fontWeight: 300 }}>{simFailed}</div>
            <div className="mc-c4-stat-sub">Insights this week</div>
          </div>
        </div>

        {/* Table */}
        <table className="mc-c4-table">
          <thead>
            <tr style={{ background: "rgba(255,255,255,0.04)", borderRadius: 8 }}>
              <th className="mc-c4-th" style={{ padding: "12px 16px", borderRadius: "8px 0 0 8px" }}>Application</th>
              <th className="mc-c4-th" style={{ padding: "12px 16px" }}>Status</th>
              <th className="mc-c4-th" style={{ padding: "12px 16px", borderRadius: "0 8px 8px 0", textAlign: "right" }}>Match</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                <td className="mc-c4-td" style={{ padding: "14px 16px" }}>{row.company}</td>
                <td className="mc-c4-td" style={{ padding: "14px 16px" }}>
                  <span className="mc-status-dot" style={{ background: row.dot }} />
                  {row.stage}
                </td>
                <td className="mc-c4-td" style={{ padding: "14px 16px", textAlign: "right" }}>{row.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}