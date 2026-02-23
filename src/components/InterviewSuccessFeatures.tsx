import { useRef, useState, useEffect } from "react";
import {
  FileEdit,
  Sparkles,
  Video,
  Users,
  Briefcase,
  type LucideIcon,
} from "lucide-react";

const TARGET_PERCENT = 90;
const DURATION_MS = 1800;

const features: {
  number: number;
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    number: 1,
    icon: FileEdit,
    title: "Mentor-Guided Resume Transformation",
    description:
      "Every bullet point, every project, every number—refined by someone who's been in the rooms you're walking into.",
  },
  {
    number: 2,
    icon: Sparkles,
    title: "AI-Powered Resume Tailoring",
    description:
      "Your master resume adapts to every job in minutes. No more manual tweaking.",
  },
  {
    number: 3,
    icon: Video,
    title: "Mock Interviews Until You're Ready",
    description:
      "4–5 rounds of live mocks with structured feedback—from mentors who've already cracked the path you're on.",
  },
  {
    number: 4,
    icon: Users,
    title: "1:1 Mentorship from Industry Insiders",
    description:
      "Learn from engineers, data scientists, and HR leaders at top global tech companies.",
  },
  {
    number: 5,
    icon: Briefcase,
    title: "Portfolio + Real-World Projects Built With You",
    description:
      "Hyper-personalised sessions to build a role-specific portfolio and industry-relevant projects.",
  },
];

const InterviewSuccessFeatures = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [displayPercent, setDisplayPercent] = useState(0);
  const hasAnimatedRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting || hasAnimatedRef.current) return;
        hasAnimatedRef.current = true;

        const startTime = performance.now();

        const tick = (now: number) => {
          const elapsed = now - startTime;
          const t = Math.min(elapsed / DURATION_MS, 1);
          const eased = 1 - Math.pow(1 - t, 2);
          const value = Math.round(eased * TARGET_PERCENT);
          setDisplayPercent(value);
          if (t < 1) {
            rafIdRef.current = requestAnimationFrame(tick);
          } else {
            rafIdRef.current = null;
          }
        };

        rafIdRef.current = requestAnimationFrame(tick);
      },
      { threshold: 0.15, rootMargin: "0px 0px 0px 0px" }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (rafIdRef.current != null) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative grid grid-cols-1 lg:grid-cols-2 min-h-[80vh] lg:min-h-[600px]"
    >
      {/* Left: Success rate counter */}
      <div className="relative flex flex-col items-center justify-center bg-[#0a1628] px-6 py-16 lg:py-24 overflow-hidden">
        {/* Grid + glow */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-transparent/50 to-[#0a1628]" />
        {/* Glowing dots at grid intersections - simplified */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `radial-gradient(circle at center, rgba(96, 165, 250, 0.4) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative z-10 text-center">
          <p className="text-white/90 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase mb-2">
            Interview success rate
          </p>
          <p className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white tabular-nums tracking-tight">
            {displayPercent}%
          </p>
          <p className="text-white/90 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase mt-2">
            with Mentorque
          </p>
        </div>
      </div>

      {/* Right: Features list */}
      <div className="relative flex flex-col justify-center bg-gradient-to-b from-[#050a12] to-[#0a1628] px-6 pt-8 pb-12 sm:px-10 sm:pt-10 sm:pb-14 lg:px-14 lg:pt-12 lg:pb-16">
        <div className="max-w-xl">
          <div className="flex items-center gap-4 mb-4">
            <span className="h-px flex-1 bg-white/20" />
            <span className="text-white/60 text-xs font-medium tracking-[0.2em] uppercase">
              Features
            </span>
            <span className="h-px flex-1 bg-white/20" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-10 leading-tight">
            Mentorque learning experience
          </h2>

          <ul className="space-y-8">
            {features.map(({ number, icon: Icon, title, description }) => (
              <li key={number} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base sm:text-lg mb-1.5">
                    {number} {title}
                  </h3>
                  <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default InterviewSuccessFeatures;
