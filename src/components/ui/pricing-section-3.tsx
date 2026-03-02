"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const FEATURE_ROWS: { feature: string; one: string; pro: string }[] = [
  { feature: "Duration", one: "30 days", pro: "90 days" },
  { feature: "Mentorship Sessions", one: "1 session", pro: "Ongoing" },
  { feature: "Resume Building Tool", one: "✅", pro: "✅" },
  { feature: "Resume Tailoring Tool", one: "✅", pro: "✅" },
  { feature: "Job Dashboard", one: "✅", pro: "✅" },
  { feature: "HR Database", one: "✅", pro: "✅" },
  { feature: "Outreach Templates", one: "✅", pro: "✅" },
  { feature: "WhatsApp Community", one: "✅", pro: "✅" },
  { feature: "Customer Success Manager", one: "❌", pro: "✅" },
  { feature: "Placement Team", one: "❌", pro: "✅" },
  { feature: "Portfolio Building", one: "❌", pro: "✅" },
  { feature: "Interview Prep Plan", one: "❌", pro: "✅" },
  { feature: "Question Bank", one: "❌", pro: "✅" },
  { feature: "Mock Interviews", one: "❌", pro: "✅" },
  { feature: "Recruiter Referrals", one: "❌", pro: "✅" },
  { feature: "Offer Negotiation", one: "❌", pro: "✅" },
  { feature: "Best For", one: "Foundation first", pro: "The sweet spot" },
];

const plans = [
  {
    name: "Mentorque One",
    popular: false,
    buttonText: "Explore course",
    buttonVariant: "outline" as const,
  },
  {
    name: "Mentorque Pro",
    popular: true,
    buttonText: "Explore course",
    buttonVariant: "default" as const,
  },
];

const PricingSwitch = ({
  onSwitch,
  className,
}: {
  onSwitch: (value: string) => void;
  className?: string;
}) => {
  const [selected, setSelected] = useState("0");

  const handleSwitch = (value: string) => {
    setSelected(value);
    onSwitch(value);
  };

  return (
    <div className={cn("flex justify-center", className)}>
      <div className="relative z-10 mx-auto flex w-fit rounded-full border border-gray-200 bg-neutral-50 p-1">
        <button
          type="button"
          onClick={() => handleSwitch("0")}
          className={cn(
            "relative z-10 h-10 w-fit cursor-pointer rounded-full px-3 py-1 font-medium transition-colors sm:h-12 sm:px-6 sm:py-2",
            selected === "0"
              ? "text-black"
              : "text-muted-foreground hover:text-black",
          )}
        >
          {selected === "0" && (
            <motion.span
              layoutId="pricing-switch"
              className="absolute left-0 top-0 h-10 w-full rounded-full border-4 border-neutral-300 bg-gradient-to-t from-neutral-100 via-neutral-200 to-neutral-300 shadow-sm shadow-neutral-300 sm:h-12"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative">Duration</span>
        </button>

        <button
          type="button"
          onClick={() => handleSwitch("1")}
          className={cn(
            "relative z-10 flex-shrink-0 cursor-pointer rounded-full px-3 py-1 font-medium transition-colors h-10 w-fit sm:h-12 sm:px-6 sm:py-2",
            selected === "1"
              ? "text-black"
              : "text-muted-foreground hover:text-black",
          )}
        >
          {selected === "1" && (
            <motion.span
              layoutId="pricing-switch"
              className="absolute left-0 top-0 h-10 w-full rounded-full border-4 border-neutral-300 bg-gradient-to-t from-neutral-100 via-neutral-200 to-neutral-300 shadow-sm shadow-neutral-300 sm:h-12"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative flex items-center gap-2">
            Compare plans
          </span>
        </button>
      </div>
    </div>
  );
};

export default function PricingSection3() {
  const [viewMode, setViewMode] = useState<"duration" | "compare">("duration");
  const pricingRef = useRef<HTMLDivElement>(null);

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.4,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  const toggleView = (value: string) =>
    setViewMode(Number.parseInt(value, 10) === 1 ? "compare" : "duration");

  return (
    <div
      className="font-sans relative mx-auto max-w-7xl px-3 pt-14 pb-10 sm:px-4 sm:pt-16 sm:pb-12 md:pt-20 md:pb-16"
      ref={pricingRef}
    >
      <article className="flex flex-col items-start justify-between sm:flex-row sm:items-center sm:pb-0 pb-4">
        <div className="mb-4 w-full text-left sm:mb-6">
          <h2 className="mb-3 mt-2 text-2xl font-medium leading-tight text-gray-900 sm:mb-4 sm:text-3xl md:text-4xl sm:leading-[130%]">
            <VerticalCutReveal
              splitBy="words"
              staggerDuration={0.15}
              staggerFrom="first"
              reverse
              containerClassName="justify-start"
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 40,
                delay: 0,
              }}
            >
              Our Courses
            </VerticalCutReveal>
          </h2>

          <TimelineContent
            as="p"
            animationNum={0}
            timelineRef={pricingRef}
            customVariants={revealVariants}
            className="w-full text-sm text-gray-600 sm:text-base md:w-[80%] mb-6 sm:mb-8"
          >
            Find the right program for your goals. From getting started to full
            placement support—pick the path that fits you.
          </TimelineContent>
        </div>

        {/* Duration / Compare plans toggle - commented out
        <TimelineContent
          as="div"
          animationNum={1}
          timelineRef={pricingRef}
          customVariants={revealVariants}
        >
          <PricingSwitch onSwitch={toggleView} className="shrink-0" />
        </TimelineContent>
        */}
      </article>

      <TimelineContent
        as="div"
        animationNum={2}
        timelineRef={pricingRef}
        customVariants={revealVariants}
        className="mx-auto grid gap-6 rounded-2xl p-2 sm:gap-8 sm:p-4 md:grid-cols-2 md:items-stretch"
      >
        {plans.map((plan, index) => {
          const isPro = plan.name === "Mentorque Pro";
          const getValue = (row: { feature: string; one: string; pro: string }) =>
            isPro ? row.pro : row.one;
          return (
            <TimelineContent
              as="div"
              key={plan.name}
              animationNum={index + 3}
              timelineRef={pricingRef}
              customVariants={revealVariants}
              className="flex h-full"
            >
              <Card
                className={cn(
                  "relative flex h-full flex-col justify-between border border-gray-200/80 bg-white rounded-[20px] overflow-hidden",
                  "shadow-[0_4px_20px_rgba(0,0,0,0.06),0_2px_8px_rgba(0,0,0,0.04),0_20px_50px_rgba(0,0,0,0.12),0_0_0_1px_rgba(255,255,255,0.8)_inset]",
                  plan.popular &&
                    "md:scale-[1.02] shadow-[0_8px_30px_rgba(0,0,0,0.1),0_4px_16px_rgba(0,0,0,0.06),0_24px_60px_rgba(0,0,0,0.14),0_0_40px_rgba(99,102,241,0.1),0_0_0_1px_rgba(255,255,255,0.9)_inset] ring-2 ring-indigo-200/50",
                )}
              >
                <CardContent className="flex-1 min-h-0 pt-6 pb-5 px-5 sm:pt-8 sm:px-6 sm:pb-6">
                  {/* Plan name - large font (replacing days) */}
                  <h3 className="mb-5 text-3xl font-bold text-gray-900 sm:text-4xl md:text-4xl">
                    {plan.name}
                  </h3>

                  {/* Feature matrix rows */}
                  <div className="space-y-0 border-t border-gray-100 pt-4">
                    {FEATURE_ROWS.map((row) => {
                      const value = getValue(row);
                      const isCheck = value.includes("✅");
                      const isCross = value === "❌";
                      const checkSuffix = value.replace(/^✅\s*/, "").trim() || null;
                      return (
                        <div
                          key={row.feature}
                          className="flex items-center justify-between gap-4 py-2.5 border-b border-gray-50 last:border-b-0"
                        >
                          <span className="text-sm text-gray-700">
                            {row.feature}
                          </span>
                          <span className="flex flex-shrink-0 items-center gap-2 text-sm font-medium text-gray-900">
                            {isCheck && (
                              <>
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 sm:h-6 sm:w-6">
                                  <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5" strokeWidth={2.5} />
                                </span>
                                {checkSuffix && <span>{checkSuffix}</span>}
                              </>
                            )}
                            {isCross && (
                              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-red-500 sm:h-6 sm:w-6">
                                <X className="h-3 w-3 sm:h-3.5 sm:w-3.5" strokeWidth={2.5} />
                              </span>
                            )}
                            {!isCheck && !isCross && value}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
                <CardFooter className="shrink-0 px-5 pb-6 pt-0 sm:px-6 sm:pb-6">
                  <Link
                    to="/book-call"
                    className={cn(
                      "flex w-full items-center justify-center rounded-xl p-3 text-base font-semibold sm:p-4 sm:text-lg transition-all duration-200",
                      plan.popular
                        ? "border border-neutral-400 bg-gradient-to-t from-neutral-100 to-neutral-300 text-black shadow-lg shadow-neutral-500/50 hover:shadow-xl hover:shadow-neutral-500/40"
                        : "border border-neutral-700 bg-gradient-to-t from-neutral-900 to-neutral-600 text-white shadow-lg shadow-neutral-900/40 hover:shadow-xl hover:shadow-neutral-900/50",
                    )}
                  >
                    {plan.buttonText}
                  </Link>
                </CardFooter>
              </Card>
            </TimelineContent>
          );
        })}
      </TimelineContent>
    </div>
  );
}
