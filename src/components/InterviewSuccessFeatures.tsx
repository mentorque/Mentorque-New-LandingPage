import { useRef, useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { CLOUDINARY_INTERVIEW_SUCCESS } from "@/constants/cloudinaryAssets";

const TARGET_PERCENT = 90;
const DURATION_MS = 2200;

const features = [
  {
    number: "01",
    title: "Mentor-Guided Resume Transformation",
    description:
      "Every bullet point, every project, every number—refined by someone who's been in the rooms you're walking into.",
  },
  {
    number: "02",
    title: "AI-Powered Resume Tailoring",
    description:
      "Your master resume adapts to every job in minutes. No more manual tweaking.",
  },
  {
    number: "03",
    title: "Mock Interviews Until You're Ready",
    description:
      "4–5 rounds of live mocks with structured feedback—from mentors who've already cracked the path you're on.",
  },
  {
    number: "04",
    title: "1:1 Mentorship from Industry Insiders",
    description:
      "Learn from engineers, data scientists, and HR leaders at top global tech companies.",
  },
];

const InterviewSuccessFeatures = () => {
  const sectionRef = useRef(null);
  const [displayPercent, setDisplayPercent] = useState(0);
  const [visible, setVisible] = useState(false);
  const rafIdRef = useRef(null);
  const isMobile = useIsMobile(768);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          setVisible(true);
          setDisplayPercent(0);
          const startTime = performance.now();
          const tick = (now) => {
            const elapsed = now - startTime;
            const t = Math.min(elapsed / DURATION_MS, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setDisplayPercent(Math.round(eased * TARGET_PERCENT));
            if (t < 1) {
              rafIdRef.current = requestAnimationFrame(tick);
            } else {
              rafIdRef.current = null;
            }
          };
          if (rafIdRef.current != null) cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = requestAnimationFrame(tick);
        } else {
          setVisible(false);
          setDisplayPercent(0);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (rafIdRef.current != null) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  return (
    <>
      <style>{`
        .ifs-root {
          font-family: var(--font-sans, 'Inter', sans-serif);
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px 24px 20px;
          position: relative;
          overflow: hidden;
        }

        .ifs-bg-glow-1,
        .ifs-bg-glow-2 {
          display: none;
        }

        .ifs-wrapper {
          max-width: 1440px;
          width: 100%;
          display: grid;
          grid-template-columns: 800px auto 1fr;
          gap: 0;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        @media (max-width: 900px) {
          .ifs-wrapper {
            grid-template-columns: 1fr;
            gap: 4px;
          }
          .ifs-divider {
            display: none;
          }
          .ifs-left {
terview            padding: 16px 20px 24px;
            order: 2;
          }
          .ifs-right {
            padding: 16px 16px 24px;
            border-radius: 0;
            border: none;
            order: 1;
          }
        }

        .ifs-divider {
          width: 1px;
          align-self: stretch;
          min-height: 280px;
          background: linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.06) 10%, rgba(255,255,255,0.14) 50%, rgba(255,255,255,0.06) 90%, transparent 100%);
          flex-shrink: 0;
        }

        /* LEFT - slightly smaller, accurate */
        .ifs-left {
          opacity: 0;
          transform: translateX(-24px);
          transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
          padding: 28px 32px 28px 24px;
          background: transparent;
          border: none;
          border-radius: 0;
          box-shadow: none;
        }
        .ifs-left.visible {
          opacity: 1;
          transform: translateX(0);
        }

        .ifs-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(59,130,246,0.08);
          border: 1px solid rgba(59,130,246,0.2);
          border-radius: 100px;
          padding: 6px 16px 6px 8px;
          margin-bottom: 32px;
        }

        .ifs-eyebrow-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #3b82f6;
          box-shadow: 0 0 8px #3b82f6;
          animation: pulse-dot 2s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.85); }
        }

        .ifs-eyebrow-text {
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #60a5fa;
        }

        .ifs-heading {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: clamp(28px, 4vw, 48px);
          font-weight: 500;
          color: #fafafa;
          line-height: 1.22;
          margin: 0 0 40px;
          letter-spacing: -0.02em;
        }
        @media (min-width: 1024px) {
          .ifs-heading { font-size: 48px; }
        }

        .ifs-heading span {
          color: #e4e4e7;
          font-weight: 500;
        }
        .ifs-heading .ifs-heading-blue {
          color: #60A5FA;
        }

        /* Feature items */
        .ifs-feature {
          display: flex;
          gap: 16px;
          padding: 16px 12px;
          margin: 0 -12px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          border-radius: 10px;
          opacity: 0;
          transform: translateY(28px) scale(0.92);
          transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.3s, background 0.3s, box-shadow 0.3s;
          cursor: default;
        }

        .ifs-feature:first-of-type {
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .ifs-feature.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .ifs-feature:hover {
          border-bottom-color: rgba(59,130,246,0.25);
          background: rgba(59,130,246,0.05);
          box-shadow: 0 4px 24px rgba(0,0,0,0.3), 0 0 0 1px rgba(59,130,246,0.08);
          transform: translateY(0) scale(1.02);
        }

        .ifs-feature:hover .ifs-feature-num {
          color: #60a5fa;
          text-shadow: 0 0 20px rgba(96,165,250,0.4);
        }

        .ifs-feature:hover .ifs-feature-dot {
          background: #3b82f6;
          box-shadow: 0 0 8px #3b82f6;
        }

        .ifs-feature-num {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: 18px;
          font-weight: 600;
          color: rgba(147,197,253,0.9);
          min-width: 40px;
          line-height: 1.5;
          transition: color 0.3s, text-shadow 0.3s;
          letter-spacing: 0.04em;
          padding-top: 2px;
        }

        .ifs-feature-body {
          flex: 1;
        }

        .ifs-feature-title-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }

        .ifs-feature-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(96,165,250,0.3);
          flex-shrink: 0;
          transition: background 0.3s, box-shadow 0.3s;
        }

        .ifs-feature-title {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: 20px;
          font-weight: 400;
          color: #f4f4f5;
          letter-spacing: 0.01em;
          line-height: 1.35;
        }

        .ifs-feature-desc {
          font-family: var(--font-sans, 'Inter', sans-serif);
          font-size: 15px;
          font-weight: 400;
          color: rgba(228,228,231,0.9);
          line-height: 1.65;
          padding-left: 12px;
        }

        /* RIGHT - MacBook area, takes remainder so laptop stays in view */
        .ifs-right {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px 24px 24px 32px;
          background: #000;
          opacity: 0;
          transform: translateX(24px);
          transition: opacity 0.8s 0.2s cubic-bezier(0.16,1,0.3,1), transform 0.8s 0.2s cubic-bezier(0.16,1,0.3,1);
          overflow: hidden;
          min-height: 0;
          min-width: 0;
        }

        .ifs-right.visible {
          opacity: 1;
          transform: translateX(0);
        }

        .ifs-macbook-wrap {
          position: relative;
          width: 100%;
          max-width: 100%;
          margin: 0 auto;
        }

        .ifs-macbook-img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: contain;
        }

        /* Screen overlay — area for the stats group */
        .ifs-macbook-screen {
          position: absolute;
          top: 5.5%;
          left: 10.5%;
          right: 10.5%;
          bottom: 33%;
          background: transparent;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          text-align: center;
          isolation: isolate;
          pointer-events: none;
        }

        /* Corner tags */
        .ifs-corner-tag {
          position: absolute;
          z-index: 10;
          background: rgba(59,130,246,0.1);
          border: 1px solid rgba(59,130,246,0.2);
          border-radius: 8px;
          padding: 6px 12px;
          font-size: 11px;
          font-weight: 500;
          color: #93c5fd;
          letter-spacing: 0.08em;
          white-space: nowrap;
          backdrop-filter: blur(8px);
        }

        .ifs-corner-tag.top-right {
          top: 0;
          right: -20px;
          animation: float1 4s ease-in-out infinite;
        }

        .ifs-corner-tag.bottom-left {
          bottom: 10px;
          left: -30px;
          animation: float2 5s ease-in-out infinite;
        }

        .ifs-corner-tag.top-left {
          top: 20px;
          left: -24px;
          animation: float1 4.5s ease-in-out infinite;
        }

        .ifs-corner-tag.bottom-right {
          bottom: 24px;
          right: -20px;
          animation: float2 5.5s ease-in-out infinite;
        }

        .ifs-corner-tag.middle-right {
          top: 50%;
          right: -40px;
          animation: floatMiddle 4s ease-in-out infinite;
        }

        .ifs-corner-tag.middle-left {
          top: 50%;
          left: -40px;
          animation: floatMiddleLeft 4.2s ease-in-out infinite;
        }

        @keyframes float1 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        @keyframes floatMiddle {
          0%, 100% { transform: translateY(-50%) translateY(0); }
          50% { transform: translateY(calc(-50% - 6px)); }
        }
        @keyframes floatMiddleLeft {
          0%, 100% { transform: translateY(-50%) translateY(0); }
          50% { transform: translateY(calc(-50% - 6px)); }
        }
      `}</style>

      <section className="ifs-root font-sans" ref={sectionRef}>
        <div className="ifs-bg-glow-1" />
        <div className="ifs-bg-glow-2" />

        <div className="ifs-wrapper">
          {/* LEFT */}
          <div className={`ifs-left ${visible ? "visible" : ""}`}>
            <h2 className="ifs-heading">
              Everything you need to<br />
              <span>land the role</span> <span className="ifs-heading-blue">you deserve</span>
            </h2>

            {features.map(({ number, title, description }, i) => (
              <div
                key={number}
                className={`ifs-feature ${visible ? "visible" : ""}`}
                style={{ transitionDelay: visible ? `${0.15 + i * 0.12}s` : "0s" }}
              >
                <div className="ifs-feature-num">{number}</div>
                <div className="ifs-feature-body">
                  <div className="ifs-feature-title-row">
                    <div className="ifs-feature-dot" />
                    <div className="ifs-feature-title">{title}</div>
                  </div>
                  <div className="ifs-feature-desc">{description}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="ifs-divider" aria-hidden />

          {/* RIGHT - MacBook with stats on screen */}
          <div className={`ifs-right ${visible ? "visible" : ""}`}>
            <div className="ifs-macbook-wrap">
              <img
                src={CLOUDINARY_INTERVIEW_SUCCESS.laptop}
                alt=""
                className="ifs-macbook-img"
                loading="eager"
                fetchPriority="high"
              />
              <div className="ifs-macbook-screen">
                {/* Movable group: adjust left/right/top/bottom to position the whole block */}
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                    bottom: isMobile ? "5%" : "6%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-sans, 'Inter', sans-serif)",
                      fontSize: isMobile ? 52 : 85,
                      fontWeight: 300,
                      lineHeight: 1,
                      letterSpacing: "-0.04em",
                      color: "#f9fafb",
                    }}
                  >
                    {displayPercent}%
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      marginTop: 12,
                      flexWrap: "nowrap",
                      width: "100%",
                      maxWidth: "100%",
                      paddingLeft: 8,
                      paddingRight: 8,
                      boxSizing: "border-box",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-sans, 'Inter', sans-serif)",
                        fontSize: isMobile ? 15 : 21,
                        fontWeight: 400,
                        color: "#e5e7eb",
                        letterSpacing: "0.02em",
                        lineHeight: 1.3,
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                      }}
                    >
                      of Interview outcomes with
                    </span>
                    <img
                      src="/mentorque-logo.png"
                      alt="Mentorque"
                      style={{
                        borderRadius: 4,
                        height: isMobile ? 22 : 28,
                        width: "auto",
                        objectFit: "contain",
                        display: "block",
                        flexShrink: 0,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InterviewSuccessFeatures;