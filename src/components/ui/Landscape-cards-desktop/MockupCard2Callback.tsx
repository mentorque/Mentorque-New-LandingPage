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
      setValue(decimals > 0 ? Math.round(current * Math.pow(10, decimals)) / Math.pow(10, decimals) : Math.round(current));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, decimals]);
  return value;
}

export default function MockupCard2Callback() {
  const multiplier = useCountUp(3.1, 900, 1);
  const percent = useCountUp(210, 900, 0);
  return (
    <div className="mc-c2">
      <div className="mc-c2-topbar">
        <div className="mc-c2-pill prim">Callback Rate (Last 30d) ▾</div>
        <div className="mc-c2-pill">Applications ▾</div>
        <div className="mc-c2-gen">+ Generate insights</div>
      </div>
      <div className="mc-c2-title">Callback rate improvement</div>
      <div className="mc-c2-big">
        {multiplier}× <span className="mc-c2-up">↑ {percent}%</span>
      </div>
      <div className="mc-c2-sub">vs. before Mentorque · 47 applications tracked</div>
      <div className="mc-c2-insight">
        <div className="mc-c2-insight-head">
          <span className="mc-c2-tag blue">Resume</span>
          <span className="mc-c2-insight-label">Impact phrasing rewrite</span>
        </div>
        <div className="mc-seg-track">
          <div className="mc-seg" style={{ width: "14%", background: "#3b82f6" }} />
          <div className="mc-seg" style={{ width: "8%", background: "#3b82f6" }} />
          <div className="mc-seg" style={{ width: "22%", background: "#3b82f6" }} />
          <div className="mc-seg" style={{ width: "5%", background: "rgba(255,255,255,0.1)" }} />
          <div className="mc-seg" style={{ width: "30%", background: "#3b82f6" }} />
        </div>
      </div>
      <div className="mc-c2-insight">
        <div className="mc-c2-insight-head">
          <span className="mc-c2-tag amber">Outreach</span>
          <span className="mc-c2-insight-label">Decision-maker direct contact</span>
        </div>
        <div className="mc-seg-track">
          <div className="mc-seg" style={{ width: "6%", background: "rgba(255,255,255,0.1)" }} />
          <div className="mc-seg" style={{ width: "18%", background: "#3b82f6" }} />
          <div className="mc-seg" style={{ width: "10%", background: "rgba(255,255,255,0.1)" }} />
          <div className="mc-seg" style={{ width: "28%", background: "#3b82f6" }} />
        </div>
      </div>
      <div className="mc-c2-insight">
        <div className="mc-c2-insight-head">
          <span className="mc-c2-tag blue">Tailoring</span>
          <span className="mc-c2-insight-label">AI keyword match per JD</span>
        </div>
        <div className="mc-seg-track">
          <div className="mc-seg" style={{ width: "35%", background: "#3b82f6" }} />
          <div className="mc-seg" style={{ width: "4%", background: "rgba(255,255,255,0.1)" }} />
          <div className="mc-seg" style={{ width: "20%", background: "#3b82f6" }} />
          <div className="mc-seg" style={{ width: "15%", background: "#3b82f6" }} />
        </div>
      </div>
    </div>
  );
}
