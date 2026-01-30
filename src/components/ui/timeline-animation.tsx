"use client";

import { motion } from "framer-motion";
import {
  useRef,
  useEffect,
  useState,
  type RefObject,
  type ReactNode,
} from "react";

const motionTagMap = {
  h1: motion.h1,
  p: motion.p,
  div: motion.div,
} as const;

export type TimelineContentProps = {
  as?: keyof typeof motionTagMap;
  className?: string;
  animationNum?: number;
  customVariants?: {
    visible: (i: number) => object;
    hidden: object;
  };
  timelineRef?: RefObject<HTMLDivElement | null>;
  children?: ReactNode;
};

export function TimelineContent({
  as: tag = "div",
  className = "",
  animationNum = 0,
  customVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { delay: i * 0.4, duration: 0.5 },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  },
  timelineRef,
  children,
}: TimelineContentProps) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const targetRef = timelineRef ?? ref;

  useEffect(() => {
    const el = targetRef?.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setIsInView(true);
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [targetRef]);

  const MotionEl = motionTagMap[tag] ?? motion.div;

  return (
    <MotionEl
      ref={ref as React.Ref<HTMLDivElement>}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={customVariants}
      custom={animationNum}
    >
      {children}
    </MotionEl>
  );
}
