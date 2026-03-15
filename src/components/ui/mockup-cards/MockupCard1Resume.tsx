import { useEffect, useRef, useState } from "react";

const pills = [
  { rowId: 0, label: "ATS 94%", color: "blue" },
  { rowId: 1, label: "Ready", color: "green" },
  { rowId: 2, label: "Draft", color: "amber" },
  { rowId: 3, label: "Reviewed", color: "purple" },
  { rowId: 4, label: "Updated", color: "blue" },
];

const pillColors: Record<string, string> = {
  blue:   "bg-blue-500/15 text-blue-400 border-blue-400/25",
  green:  "bg-green-500/15 text-green-400 border-green-400/25",
  amber:  "bg-amber-400/15 text-amber-400 border-amber-400/25",
  purple: "bg-purple-400/15 text-purple-400 border-purple-400/25",
};

const LANDSCAPE_LOGOS = {
  google: "/Landscape-Component/google-color-svgrepo-com.svg",
  amazon: "/Landscape-Component/amazon-color-svgrepo-com.svg",
  meta: "/Landscape-Component/meta-svgrepo-com.svg",
} as const;

const rows = [
  { label: "SDE I · Google tailored", selected: true,  hasTyping: true,  newTag: false, logo: "google" as const },
  { label: "SWE I· Amazon tailored", selected: false, hasTyping: false, newTag: false, logo: "amazon" as const },
  { label: "Data Analyst · Meta",      selected: false, hasTyping: false, newTag: true,  logo: "meta" as const },
  { label: "Impact bullets review.pdf",    selected: false, hasTyping: false, newTag: false, logo: null },
  { label: "Project framing guide.pdf",    selected: false, hasTyping: false, newTag: false, logo: null },
];

function FileIcon({ white }: { white?: boolean }) {
  const c = white ? "white" : "currentColor";
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <rect x="3" y="2" width="10" height="12" rx="1.5" stroke={c} strokeWidth="1.3"/>
      <path d="M6 6h4M6 9h3" stroke={c} strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center gap-[3px] ml-auto">
      {[0, 1, 2].map(i => (
        <div
          key={i}
          className="w-1 h-1 rounded-full bg-blue-400"
          style={{ animation: `typingBounce 1.4s ease-in-out ${i * 0.2}s infinite` }}
        />
      ))}
    </div>
  );
}

function PopoutPill({ label, color, visible, animate }: { label: string; color: string; visible: boolean; animate?: boolean }) {
  return (
    <span
      className={`flex items-center gap-[5px] text-[15px] px-[9px] py-[3px] rounded-full border whitespace-nowrap pointer-events-none transition-all duration-[280ms] ease-out ${pillColors[color]} ${
        visible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-2 scale-95"
      } ${animate ? "pill-color-animate" : ""}`}
      style={{ marginLeft: "auto", marginRight: 12 }}
    >
      <span className="w-[5px] h-[5px] rounded-full bg-current flex-shrink-0" />
      {label}
    </span>
  );
}

export default function MockupCard1Resume() {
  const [activePill, setActivePill] = useState<number | null>(null);
  const [scoreWidth, setScoreWidth] = useState(0);
  const [scorePct, setScorePct] = useState(0);
  const indexRef = useRef(0);

  useEffect(() => {
    const scoreTimer = setTimeout(() => {
      setScoreWidth(82);
      let n = 0;
      const interval = setInterval(() => {
        n = Math.min(n + 2, 82);
        setScorePct(n);
        if (n >= 82) clearInterval(interval);
      }, 35);
      return () => clearInterval(interval);
    }, 1200);

    const pillTimer = setTimeout(() => {
      const cycle = () => {
        setActivePill(indexRef.current % pills.length);
        indexRef.current++;
      };
      cycle();
      const interval = setInterval(cycle, 2200);
      return () => clearInterval(interval);
    }, 1200);

    return () => {
      clearTimeout(scoreTimer);
      clearTimeout(pillTimer);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes typingBounce {
          0%,60%,100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
        @keyframes orbPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(167,139,250,0); }
          50% { box-shadow: 0 0 0 5px rgba(167,139,250,0.15); }
        }
        @keyframes pillColorPulse {
          0%,100% { opacity: 1; filter: brightness(1); }
          50% { opacity: 0.92; filter: brightness(1.15); }
        }
        .pill-color-animate {
          animation: pillColorPulse 2s ease-in-out infinite;
        }
        .mc-c1-row {
          transition: box-shadow 0.2s ease, background-color 0.2s ease;
        }
        .mc-c1-row.active-row {
          /* no transform — avoid moving out */
        }
        .mc-c1-row:hover {
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        .mc-c1-row.active-row:hover {
          box-shadow: 0 2px 8px rgba(0,0,0,0.25);
        }
      `}</style>

      <div className="mc-c1 font-sans" style={{ position: "relative" }}>
        {/* Sidebar */}
        <div className="mc-c1-left">
          <div className="mc-c1-agent">
            <div className="mc-c1-orb" style={{ overflow: "hidden", padding: 0 }}>
              <img src="/mentorque-logo.png" alt="Mentorque" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <span className="mc-c1-agent-name">Mentorque AI</span>
          </div>
          <div className="mc-c1-search">
            <span style={{ fontSize: 18 }}>🔍</span>
            <span>Search resume.</span>
          </div>
          {["Resume", "Applications", "Profile", "Settings"].map((item, i) => (
            <div key={item} className={`mc-c1-nav-item${i === 0 ? " sel" : ""}`}>
              <span className="mc-c1-nav-icon">{["📋","📊","👤","⚙"][i]}</span> {item}
            </div>
          ))}
          <div className="mc-c1-footer">
            <div className="mc-c1-footer-row">
              <span className="mc-c1-footer-label">ATS score</span>
              <span className="ls-badge">High</span>
            </div>
            <div className="mc-c1-footer-row">
              <span className="mc-c1-footer-label">Mentor</span>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>Reshu S.</span>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="mc-c1-right" style={{ display: "flex", flexDirection: "column", paddingBottom: 0 }}>
          <div style={{ flex: 1, minHeight: 0, overflow: "auto", overflowX: "hidden" }}>
            {/* Resume versions */}
            <div className="mc-c1-section">
              <div className="mc-c1-section-head">
                📁 Resume versions
                <span style={{ marginLeft: "auto", fontSize: 13, cursor: "default" }}>∧</span>
              </div>
              {rows.slice(0, 3).map((row, i) => {
                const pill = pills[i];
                const pillVisible = activePill !== null && activePill % pills.length === i;
                const logoSrc = row.logo ? LANDSCAPE_LOGOS[row.logo] : null;
                return (
                  <div key={i} className={`mc-c1-row${pillVisible ? " active-row" : ""}`}>
                    {logoSrc ? (
                      <span className="mc-c1-row-icon" style={{ width: 20, height: 20, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <img src={logoSrc} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                      </span>
                    ) : (
                      <span className="mc-c1-row-icon"><FileIcon white={pillVisible} /></span>
                    )}
                    {row.label}
                    <PopoutPill label={pill.label} color={pill.color} visible={pillVisible} animate={pillVisible} />
                  </div>
                );
              })}
            </div>

            {/* Mentor notes */}
            <div className="mc-c1-section">
              <div className="mc-c1-section-head">
                📁 Mentor notes
                <span style={{ marginLeft: "auto", fontSize: 13, cursor: "default" }}>∧</span>
              </div>
              {rows.slice(3).map((row, i) => {
                const pillIdx = i + 3;
                const pill = pills[pillIdx];
                const pillVisible = activePill !== null && activePill % pills.length === pillIdx;
                return (
                  <div key={i} className={`mc-c1-row${pillVisible ? " active-row" : ""}`}>
                    <span className="mc-c1-row-icon"><FileIcon white={pillVisible} /></span>
                    {row.label}
                    <PopoutPill label={pill.label} color={pill.color} visible={pillVisible} animate={pillVisible} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Score bar — below content, attached to card */}
          <div style={{
            flexShrink: 0,
            background: "rgba(0,0,0,0.25)",
            borderTop: "0.5px solid rgba(255,255,255,0.06)",
            padding: "12px 20px",
            display: "flex", alignItems: "center", gap: 14,
          }}>
            <span style={{ fontSize: 15, color: "rgba(255,255,255,0.3)", whiteSpace: "nowrap" }}>Match score</span>
            <div style={{ flex: 1, height: 4, background: "rgba(255,255,255,0.07)", borderRadius: 4, overflow: "hidden" }}>
              <div style={{
                height: "100%", borderRadius: 4, background: "#3b82f6",
                width: `${scoreWidth}%`,
                transition: "width 1.6s cubic-bezier(0.4,0,0.2,1)",
              }} />
            </div>
            <span style={{ fontSize: 16, color: "#60a5fa", fontWeight: 500, minWidth: 30 }}>{scorePct}%</span>
          </div>
        </div>
      </div>
    </>
  );
}