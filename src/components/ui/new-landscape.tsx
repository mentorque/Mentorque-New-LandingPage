"use client";

import { useState, useEffect } from "react";
import "./new-landscape.css";
import MockupCard1Resume from "./mockup-cards/MockupCard1Resume";
import MockupCard2Callback from "./mockup-cards/MockupCard2Callback";
import MockupCard3MockInterview from "./mockup-cards/MockupCard3MockInterview";
import MockupCard4Applications from "./mockup-cards/MockupCard4Applications";
import MockupCard5Automation from "./mockup-cards/MockupCard5Applications";

const LANDSCAPE_IMG = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80";

const accordionItems = [
  {
    title: "Mentor-guided resume transformation",
    body: "Every bullet, every project, every number — refined by someone who's already hired for the roles you're targeting.",
  },
  {
    title: "Find decision-makers inside companies",
    body: "Enter any company. The system identifies hiring managers and recruiters based on role and location — ready for structured outreach.",
  },

  {
    title: "Your job search runs on automation",
    body: "AI tailors your resume to every job in minutes. Tracks applications, surfaces patterns, and keeps you moving without the manual grind.",
  },
  {
    title: "Automate workflows with AI agents",
    body: "Connect triggers, conditions, and actions. AI agents run your workflows so you focus on what matters.",
  },
];

const MOCKUP_CARDS = [
  MockupCard1Resume,
  MockupCard2Callback,
  MockupCard4Applications,
  MockupCard5Automation,
];

function LeftPanel({
  activeIndex,
  onSelect,
  progress,
  animateBar,
}: {
  activeIndex: number;
  onSelect: (i: number) => void;
  progress: number;
  animateBar: boolean;
}) {
  return (
    <div className="ls-left">
      <div className="ls-eyebrow">Mentorque</div>
      <h2 className="ls-headline">Choose your <span>outcome</span></h2>
      <p className="ls-sub">Everything working together mentor, AI & strategy so you move faster.</p>
      <div className="ls-items">
        {accordionItems.map((item, i) => (
          <div
            key={i}
            className={`ls-item ${activeIndex === i ? "active" : ""}`}
            onClick={() => onSelect(i)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onSelect(i)}
          >
            <div className="ls-item-head">
              <span className="ls-item-title">{item.title}</span>
              <span className="ls-item-arrow">›</span>
            </div>
            <div className="ls-item-body">
              <p>{item.body}</p>
              <div className="ls-item-bar" />
            </div>
            {activeIndex === i && (
              <div className="ls-auto-bar">
                <div
                  className={`ls-auto-fill${animateBar ? " ls-auto-fill-anim" : ""}`}
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function NewLandscape() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardTransition, setCardTransition] = useState(false);
  const [progress, setProgress] = useState(0);
  const [animateBar, setAnimateBar] = useState(false);

  const AUTO_MS = 6200; // 4 seconds per accordion state

  // Auto-cycle accordion + mockup every few seconds with subtle progress bar
  useEffect(() => {
    // reset bar instantly, then start smooth fill
    setAnimateBar(false);
    setProgress(0);

    let frameId: number;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(elapsed / AUTO_MS, 1);
      setProgress(pct);

      if (pct < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setCardTransition(true);
        setTimeout(() => {
          setActiveIndex((prev) => (prev + 1) % accordionItems.length);
          setCardTransition(false);
        }, 200);
      }
    };

    frameId = requestAnimationFrame((now) => {
      setAnimateBar(true);
      tick(now);
    });

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [activeIndex]);

  const handleSelect = (i: number) => {
    if (i === activeIndex) return;
    setCardTransition(true);
    setTimeout(() => {
      setActiveIndex(i);
      setCardTransition(false);
    }, 200);
  };

  const CardComponent = MOCKUP_CARDS[activeIndex];

  return (
    <div className="new-landscape">
      <div className="ls-wrap">
        <LeftPanel
          activeIndex={activeIndex}
          onSelect={handleSelect}
          progress={progress}
          animateBar={animateBar}
        />
        <div className="ls-right">
          <img className="ls-bg" src={LANDSCAPE_IMG} alt="" />
          <div className="ls-mockup">
            <div
              className="ls-card"
              style={{
                opacity: cardTransition ? 0 : 1,
                transform: cardTransition ? "translateY(8px)" : "translateY(0)",
              }}
            >
              <div className="ls-card-bar">
                <div className="ls-dot" style={{ background: "#ff5f57" }} />
                <div className="ls-dot" style={{ background: "#febc2e" }} />
                <div className="ls-dot" style={{ background: "#28c840" }} />
              </div>
              <div className="ls-card-body">
                <CardComponent />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
