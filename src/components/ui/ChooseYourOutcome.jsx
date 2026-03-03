import { useState, useEffect, useRef } from "react";

const features = [
  {
    id: 0,
    headline: "4× Faster Without Losing Precision",
    subtext:
      "Reads what you read. Sees what you see. Maps required skills to your experience to automatically add them to your resume.",
  },
  {
    id: 1,
    headline: "Find Decision-Makers Inside Companies",
    subtext:
      "Enter any company. The system identifies hiring managers, recruiters, or department heads based on role and location — ready for structured outreach.",
  },
  {
    id: 2,
    headline: "Know Exactly Why You're Not Clearing Interviews",
    subtext:
      "Your mock interview is reviewed to highlight your strengths, pinpoint weak areas, and generate a personalized list of 30–40 questions you're most likely to face.",
  },
  {
    id: 3,
    headline: "Your Job Search Runs On Automation",
    subtext:
      "An AI agent monitors the market for you, understands your profile, and delivers only roles that genuinely fit — every single day.",
  },
];

const AUTO_ADVANCE_MS = 3800;

export default function ChooseYourOutcome() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const progressRef = useRef(null);
  const startTimeRef = useRef(null);
  const pausedRef = useRef(false);

  const startTimer = (fromIndex) => {
    clearTimeout(timerRef.current);
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
    return () => {
      cancelAnimationFrame(progressRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const handleSelect = (id) => {
    cancelAnimationFrame(progressRef.current);
    setActive(id);
  };

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .cyo-root {
          font-family: var(--font-sans, 'Inter', sans-serif);
          background: #0a0a0c;
          display: grid;
          grid-template-columns: 0.92fr 1.35fr;
          align-items: stretch;
          position: relative;
          overflow: hidden;
        }

        @media (max-width: 820px) {
          .cyo-root { grid-template-columns: 1fr; }
          .cyo-right {
            min-height: 320px;
            border-left: none;
            border-top: 1px solid rgba(255,255,255,0.06);
          }
          .cyo-left { padding: 40px 20px 32px 24px; }
        }

        /* Subtle grain */
        .cyo-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 100;
        }

        /* ── LEFT ── */
        .cyo-left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 72px 56px 72px 64px;
          position: relative;
          z-index: 1;
        }

        .cyo-kicker {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
        }

        .cyo-kicker-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #3b82f6;
        }

        .cyo-kicker-text {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
        }

        .cyo-title {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: clamp(36px, 3.6vw, 56px);
          font-weight: 400;
          line-height: 1.12;
          color: #f2f0ec;
          letter-spacing: -0.02em;
          margin-bottom: 8px;
        }

        .cyo-title .cyo-title-accent {
          font-style: normal;
          color: #60a5fa;
        }

        .cyo-subtitle {
          font-size: 16px;
          font-weight: 300;
          color: rgba(255,255,255,0.38);
          line-height: 1.6;
          margin-bottom: 52px;
          max-width: 380px;
        }

        /* Feature list */
        .cyo-list {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .cyo-item {
          border-top: 1px solid rgba(255,255,255,0.07);
          padding: 0;
          cursor: pointer;
          position: relative;
          transition: border-color 0.3s;
        }

        .cyo-item:last-child {
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }

        .cyo-item-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 22px 0;
          gap: 16px;
        }

        .cyo-item-headline {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: clamp(20px, 2.2vw, 26px);
          font-weight: 400;
          color: rgba(255,255,255,0.45);
          line-height: 1.4;
          transition: color 0.3s;
          flex: 1;
        }

        .cyo-item.active .cyo-item-headline {
          color: #f2f0ec;
          font-weight: 500;
        }

        .cyo-item-arrow {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .cyo-item.active .cyo-item-arrow {
          opacity: 1;
        }

        .cyo-item-arrow svg {
          display: block;
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

        .cyo-item-body-inner {
          overflow: hidden;
        }

        .cyo-item-subtext {
          font-size: 16px;
          font-weight: 300;
          color: rgba(255,255,255,0.78);
          line-height: 1.7;
          padding-bottom: 20px;
          padding-right: 36px;
        }

        /* Progress bar at bottom of active item */
        .cyo-progress-bar {
          position: absolute;
          bottom: -1px;
          left: 0;
          height: 1px;
          background: #3b82f6;
          transition: none;
          z-index: 2;
        }

        /* ── RIGHT ── images full width, no padding */
        .cyo-right {
          position: relative;
          overflow: hidden;
          background: #0a0a0c;
          border-left: 1px solid rgba(255,255,255,0.06);
          padding: 0;
          min-width: 0;
        }

        .cyo-slide {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: stretch;
          justify-content: stretch;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1);
          pointer-events: none;
        }

        .cyo-slide.active {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        .cyo-slide-img-wrap {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cyo-slide-img-wrap img {
          object-fit: contain;
          object-position: center;
        }

        /* Desktop: show desktop image only, fill right panel (much bigger) */
        .cyo-slide-img-wrap .cyo-panel-desktop {
          display: block;
          width: 100%;
          height: 100%;
          max-width: none;
          max-height: none;
        }
        .cyo-slide-img-wrap .cyo-panel-mobile {
          display: none;
        }
        @media (max-width: 820px) {
          .cyo-slide-img-wrap .cyo-panel-desktop {
            display: none;
          }
          .cyo-slide-img-wrap .cyo-panel-mobile {
            display: block;
          }
          .cyo-slide-img-wrap { inset: 0; width: 100%; height: 100%; }
          .cyo-slide-img-wrap img { max-width: 100%; max-height: 100%; }
        }

        .progress-dots {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          gap: 6px;
          justify-content: center;
          padding: 16px 0;
          z-index: 5;
        }

        .progress-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: rgba(255,255,255,0.12);
          transition: background 0.3s;
        }

        .progress-dot.active { background: #3b82f6; }
      `}</style>

      <div className="cyo-root font-sans">
        {/* ── LEFT ── */}
        <div className="cyo-left">
          <div className="cyo-kicker">
            <div className="cyo-kicker-dot" />
            <span className="cyo-kicker-text">What you get</span>
          </div>

          <h2 className="cyo-title">
            Choose your<br />
            <span className="cyo-title-accent">outcome</span>
          </h2>
          <p className="cyo-subtitle">
            On top of mentorship — AI-powered tools that work while you don't.
          </p>

          <div className="cyo-list">
            {features.map((f) => {
              const isActive = active === f.id;
              return (
                <div
                  key={f.id}
                  className={`cyo-item ${isActive ? "active" : ""}`}
                  onClick={() => handleSelect(f.id)}
                >
                  {/* Progress bar */}
                  {isActive && (
                    <div
                      className="cyo-progress-bar"
                      style={{ width: `${progress * 100}%` }}
                    />
                  )}

                  <div className="cyo-item-header">
                    <div className="cyo-item-headline">{f.headline}</div>
                    <div className="cyo-item-arrow">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7h10M7 2l5 5-5 5" stroke="#3b82f6" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
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
          {[
            { desktop: "/Website Panels 2/Panel 1 Desktop.png", mobile: "/Website Panels 2/Panel 1 Mobile.png" },
            { desktop: "/Website Panels 2/Panel 2 Desktop.png", mobile: "/Website Panels 2/Panel 2 Mobile.png" },
            { desktop: "/Website Panels 2/Panel 3 Desktop.png", mobile: "/Website Panels 2/Panel 3 Mobile.png" },
            { desktop: "/Website Panels 2/Panel 4 Desktop.png", mobile: "/Website Panels 2/Panel 4 Mobile.png" },
          ].map((panel, idx) => (
            <div key={idx} className={`cyo-slide ${active === idx ? "active" : ""}`}>
              <div className="cyo-slide-img-wrap">
                <img src={panel.desktop} alt="" className="cyo-panel-desktop" loading="lazy" decoding="async" />
                <img src={panel.mobile} alt="" className="cyo-panel-mobile" loading="lazy" decoding="async" />
              </div>
            </div>
          ))}

          {/* Dots */}
          <div className="progress-dots">
            {features.map((f) => (
              <div
                key={f.id}
                className={`progress-dot ${active === f.id ? "active" : ""}`}
                onClick={() => handleSelect(f.id)}
                style={{ cursor: "pointer" }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
