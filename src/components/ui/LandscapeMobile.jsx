import { useState, useEffect, useRef } from "react";
import MockupCard1Resume from "./Landscape-Cards-mobile/MockupCard1Resume";
import MockupCard2Callback from "./Landscape-Cards-mobile/MockupCard2Callback";
import MockupCard4Applications from "./Landscape-Cards-mobile/MockupCard4Applications";
import MockupCard5Automation from "./Landscape-Cards-mobile/MockupCard5Applications";

// Keep mobile text aligned with the desktop landscape accordion
const features = [
  {
    id: 0,
    headline: "Mentor-guided resume transformation",
    subtext:
      "Every bullet, every project, every number — refined by someone who's already hired for the roles you're targeting.",
  },
  {
    id: 1,
    headline: "Automate workflows with AI agents",
    subtext:
      "Connect triggers, conditions, and actions. AI agents run your workflows so you focus on what matters.",
  },
  {
    id: 2,
    headline: "Find decision-makers inside companies",
    subtext:
      "Enter any company. The system identifies hiring managers and recruiters based on role and location — ready for structured outreach.",
  },
  {
    id: 3,
    headline: "Your job search runs on automation",
    subtext:
      "AI tailors your resume to every job in minutes. Tracks applications, surfaces patterns, and keeps you moving without the manual grind.",
  },
];

const MOBILE_CARDS = [
  MockupCard1Resume,
  MockupCard5Automation,
  MockupCard2Callback,
  MockupCard4Applications,
];

const AUTO_ADVANCE_MS = 3800;

export default function LandscapeMobile() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(null);
  const startTimeRef = useRef(null);
  const pausedRef = useRef(false);

  const startTimer = (fromIndex) => {
    cancelAnimationFrame(progressRef.current);
    setProgress(0);
    startTimeRef.current = performance.now();

    const tick = (now) => {
      if (pausedRef.current) {
        progressRef.current = requestAnimationFrame(tick);
        return;
      }
      const elapsed = now - startTimeRef.current;
      const pct = Math.min(elapsed / AUTO_ADVANCE_MS, 1);
      setProgress(pct);
      if (pct < 1) {
        progressRef.current = requestAnimationFrame(tick);
      } else {
        const next = (fromIndex + 1) % features.length;
        setActive(next);
      }
    };
    progressRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    startTimer(active);
    return () => cancelAnimationFrame(progressRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const handleSelect = (id) => {
    cancelAnimationFrame(progressRef.current);
    setActive(id);
  };

  const handlePrev = () => {
    handleSelect((active - 1 + features.length) % features.length);
  };

  const handleNext = () => {
    handleSelect((active + 1) % features.length);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=DM+Mono:wght@400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .cyo-root {
          font-family: 'DM Sans', sans-serif;
          background: #080809;
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          align-items: stretch;
          min-height: 520px;
          max-height: 620px;
          position: relative;
          overflow: hidden;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.06);
        }

        /* Grain overlay */
        .cyo-root::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.028'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 50;
        }

        @media (max-width: 720px) {
          .cyo-root {
            grid-template-columns: 1fr;
            grid-template-rows: auto 1fr;
            max-height: none;
            min-height: 620px;
            border-radius: 12px;
          }
          .cyo-right {
            border-left: none !important;
            border-top: 1px solid rgba(255,255,255,0.06);
            min-height: 480px;
            height: 480px;
            order: 1;
            padding-bottom: 22px;
          }
          .cyo-left { padding: 28px 20px 24px; order: 2; }
          .cyo-slide-img-wrap {
            align-items: center;
            justify-content: center;
          }
        }

        /* ── LEFT ── */
        .cyo-left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 36px 40px 36px 44px;
          position: relative;
          z-index: 1;
        }

        .cyo-kicker {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 14px;
        }

        .cyo-kicker-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #3b82f6;
          box-shadow: 0 0 6px rgba(59,130,246,0.5);
        }

        .cyo-kicker-text {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
        }

        .cyo-title {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: clamp(30px, 4vw, 48px);
          font-weight: 500;
          color: #fafafa;
          line-height: 1.22;
          margin: 0 0 6px;
          letter-spacing: -0.02em;
        }
        @media (min-width: 1024px) {
          .cyo-title { font-size: 40px; }
        }

        /* Feature list */
        .cyo-list {
          display: flex;
          flex-direction: column;
        }

        .cyo-item {
          border-top: 1px solid rgba(255,255,255,0.06);
          cursor: pointer;
          position: relative;
          padding-top: 25px;
          padding-bottom: 12px;
        }

        .cyo-item:last-child {
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .cyo-item-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 0;
          gap: 12px;
        }

        .cyo-item-headline {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: 22px;
          font-weight: 400;
          color: rgba(255,255,255,0.35);
          line-height: 1.4;
          transition: color 0.3s;
          flex: 1;
        }

        .cyo-item.active .cyo-item-headline {
          color: #f0ede8;
          font-weight: 500;
        }

        .cyo-item-arrow {
          width: 16px; height: 16px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: translateX(-4px);
          transition: opacity 0.3s, transform 0.3s;
        }

        .cyo-item.active .cyo-item-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        /* Subtext expand */
        .cyo-item-body {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.4s cubic-bezier(0.16,1,0.3,1);
        }

        .cyo-item.active .cyo-item-body {
          grid-template-rows: 1fr;
        }

        .cyo-item-body-inner { overflow: hidden; }

        .cyo-item-subtext {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: 17px;
          font-weight: 400;
          color: rgba(255,255,255,0.55);
          line-height: 1.65;
          padding-bottom: 14px;
          padding-right: 28px;
        }

        /* Progress bar */
        .cyo-progress-bar {
          position: absolute;
          bottom: -1px;
          left: 0;
          height: 1px;
          background: linear-gradient(90deg, #3b82f6, #60a5fa);
          z-index: 2;
          transition: none;
        }

        /* ── RIGHT ── full bleed, no padding on any screen */
        .cyo-right {
          position: relative;
          overflow: hidden;
          background: #0c0c0f;
          border-left: 1px solid rgba(255,255,255,0.06);
          padding: 0;
          min-height: 0;
        }

        .cyo-slide {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: stretch;
          justify-content: stretch;
          opacity: 0;
          visibility: hidden;
          transform: translateY(14px) scale(0.97);
          transition:
            opacity 0.5s cubic-bezier(0.16,1,0.3,1),
            transform 0.5s cubic-bezier(0.16,1,0.3,1),
            visibility 0s linear 0.5s;
          pointer-events: none;
          padding: 0;
          z-index: 1;
        }

        .cyo-slide.active {
          opacity: 1;
          visibility: visible;
          transform: translateY(0) scale(1);
          pointer-events: auto;
          transition:
            opacity 0.5s cubic-bezier(0.16,1,0.3,1),
            transform 0.5s cubic-bezier(0.16,1,0.3,1),
            visibility 0s linear 0s;
          z-index: 2;
        }

        .cyo-slide-img-wrap {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: stretch;
          justify-content: stretch;
        }

        .cyo-slide-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          display: block;
          max-width: 100%;
          min-width: 0;
        }

        .cyo-slide-card-wrap {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 14px;
        }

        @media (max-width: 720px) {
          .cyo-slide-card-wrap { padding: 10px; }
        }

        /* Dots + chevrons row */
        .progress-dots {
          position: absolute;
          bottom: 12px;
          left: 0; right: 0;
          display: flex;
          gap: 5px;
          align-items: center;
          justify-content: center;
          z-index: 5;
        }

        .progress-dot {
          width: 4px; height: 4px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          cursor: pointer;
          transition: background 0.3s, transform 0.3s;
        }

        .progress-dot.active {
          background: #3b82f6;
          transform: scale(1.3);
        }

        /* Chevron buttons */
        .cyo-chevron {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 35px;
          height: 35px;
          border-radius: 30%;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
          flex-shrink: 0;
          z-index: 6;
        }

        .cyo-chevron:hover {
          background: rgba(59,130,246,0.18);
          border-color: rgba(59,130,246,0.35);
        }

        .cyo-chevron svg {
          display: block;
        }
      `}</style>

      <div className="cyo-root">
        {/* ── LEFT ── */}
        <div className="cyo-left">         

          <h2 className="cyo-title">
            Choose your <span className="text-blue-400 drop-shadow-lg"> outcome </span><br />
          </h2>
          <p className="text-[12px] font-light text-white/30 leading-snug mb-2 max-w-[450px]">
            AI-powered tools that work while you don't.
          </p>

          <div className="cyo-list mt-3">
            {features.map((f) => {
              const isActive = active === f.id;
              return (
                <div
                  key={f.id}
                  className={`cyo-item ${isActive ? "active" : ""}`}
                  onClick={() => handleSelect(f.id)}
                >
                  {isActive && (
                    <div
                      className="cyo-progress-bar"
                      style={{ width: `${progress * 100}%` }}
                    />
                  )}

                  <div className="cyo-item-header">
                    <div className="cyo-item-headline">{f.headline}</div>
                    <div className="cyo-item-arrow">
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7h10M7 2l5 5-5 5" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>

                  <div className="cyo-item-body">
                    <div className="cyo-item-body-inner">
                      <p className="cyo-item-subtext">{f.subtext}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="cyo-right">
          {MOBILE_CARDS.map((Card, idx) => (
            <div key={idx} className={`cyo-slide ${active === idx ? "active" : ""}`}>
              <div className="cyo-slide-card-wrap">
                <div style={{ width: "100%", height: "100%", borderRadius: 16, overflow: "hidden" }}>
                  {active === idx ? <Card /> : null}
                </div>
              </div>
            </div>
          ))}

          {/* Dots + chevrons */}
          <div className="progress-dots">
            <button className="cyo-chevron" onClick={handlePrev} aria-label="Previous">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path d="M5 1.5L2.5 4 5 6.5" stroke="rgba(255,255,255,0.55)" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {features.map((f) => (
              <div
                key={f.id}
                className={`progress-dot ${active === f.id ? "active" : ""}`}
                onClick={() => handleSelect(f.id)}
              />
            ))}

            <button className="cyo-chevron" onClick={handleNext} aria-label="Next">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path d="M3 1.5L5.5 4 3 6.5" stroke="rgba(255,255,255,0.55)" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}