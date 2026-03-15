import { useState, useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

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
  const isMobile = useIsMobile(720);
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
            border-radius: 12px;
          }
          .cyo-right {
            border-left: none !important;
            border-top: 1px solid rgba(255,255,255,0.06);
            min-height: 360px;
            height: 360px;
            order: 1;
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
          font-size: clamp(40px, 4vw, 48px);
          font-weight: 500;
          color: #fafafa;
          line-height: 1.22;
          margin: 0 0 6px;
          letter-spacing: -0.02em;
        }
        @media (min-width: 1024px) {
          .cyo-title { font-size: 48px; }
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

        @media (max-width: 720px) {
          .cyo-slide-img-wrap img {
            height: 92%;
            width: auto;
            border-radius: 16px;
            margin: 0 auto;
          }
        }

        /* Dots */
        .progress-dots {
          position: absolute;
          bottom: 12px;
          left: 0; right: 0;
          display: flex;
          gap: 5px;
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
      `}</style>

      <div className="cyo-root">
        {/* ── LEFT ── */}
        <div className="cyo-left">         

          <h2 className="cyo-title">
            Choose your <span className="text-blue-400 drop-shadow-lg"> outcome </span><br />
          </h2>
          <p className="text-[13px] font-light text-white/30 leading-snug mb-2 max-w-[300px]">
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
          {[
            { desktop: "/Website Panels 2/webiste-desktop/Panel 4 Desktop.png", mobile: "/Website Panels 2/Websit-mobile/Panel 4 Mobile.png" },
            { desktop: "/Website Panels 2/webiste-desktop/Panel 2 Desktop.png", mobile: "/Website Panels 2/Websit-mobile/Panel 2 Mobile.png" },
            { desktop: "/Website Panels 2/webiste-desktop/Panel 1 Desktop.png", mobile: "/Website Panels 2/Websit-mobile/Panel 1 Mobile.png" },
            { desktop: "/Website Panels 2/webiste-desktop/Panel 3 Desktop.png", mobile: "/Website Panels 2/Websit-mobile/Panel 3 Mobile.png" },
          ].map((panel, idx) => (
            <div key={idx} className={`cyo-slide ${active === idx ? "active" : ""}`}>
              <div className="cyo-slide-img-wrap">
                <img
                  src={isMobile ? panel.mobile : panel.desktop}
                  alt=""
                  loading={isMobile && idx === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              </div>
            </div>
          ))}

          <div className="progress-dots">
            {features.map((f) => (
              <div
                key={f.id}
                className={`progress-dot ${active === f.id ? "active" : ""}`}
                onClick={() => handleSelect(f.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}