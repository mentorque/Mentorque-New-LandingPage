"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { cn } from "@/lib/utils";
import { Check, X, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GradientBlinds } from "@/components/ui/gradient-blinds";

const FEATURE_ROWS: { feature: string; one: string; pro: string }[] = [
  { feature: "Duration", one: "30 days", pro: "90 days" },
  { feature: "Mentorship Sessions", one: "Focused Strategy Session", pro: "Priority Mentorship Access" },
  { feature: "Resume Architecture System", one: "✅", pro: "✅" },
  { feature: "Mentorque AI", one: "✅", pro: "✅" },
  { feature: "Job Dashboard", one: "✅", pro: "✅" },
  { feature: "Verified Hiring Manager Network", one: "✅", pro: "✅" },
  { feature: "Strategic Outreach Frameworks", one: "❌", pro: "✅" },
  { feature: "WhatsApp Community", one: "✅", pro: "✅" },
  { feature: "Customer Success Manager", one: "❌", pro: "✅" },
  { feature: "Placement Acceleration Team", one: "❌", pro: "✅" },
  { feature: "Direct Recruiter Introductions", one: "❌", pro: "✅" },
  { feature: "Portfolio Building", one: "❌", pro: "✅" },
  { feature: "Structured Interview Roadmap", one: "❌", pro: "✅" },
  { feature: "Question Bank", one: "❌", pro: "✅" },
  { feature: "Live Mock Interview Simulations", one: "❌", pro: "✅" },
  { feature: "Recruiter Referrals", one: "❌", pro: "✅" },
  { feature: "Offer Negotiation", one: "❌", pro: "✅" },
];

const plans = [
  {
    name: "Mentorque One",
    buttonText: "Explore program",
    buttonVariant: "dark" as const,
    popular: false,
  },
  {
    name: "Mentorque Pro",
    buttonText: "Explore program",
    buttonVariant: "dark" as const,
    popular: true,
  },
];

export default function PricingSection3() {
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

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-black">
      {/* Gradient Blinds Background - Edges Only (Subtle) */}
      <div className="absolute inset-0 z-0 opacity-40">
        <GradientBlinds
          gradientColors={['#1e3a5f', '#2563eb', '#3b82f6', '#60a5fa']}
          angle={45}
          noise={0.13}
          blindCount={20}
          edgesOnly={true}
          edgeWidth={4.2}
        />
      </div>
      <div className="relative z-10">
        <Navbar />
        <main>
      <div
        className="font-sans relative mx-auto max-w-6xl px-3 pt-20 pb-4 sm:px-4 sm:pt-24 sm:pb-4 md:pt-24 md:pb-4"
        ref={pricingRef}
      >
      <article className="flex flex-col items-start justify-between sm:flex-row sm:items-center sm:pb-0 pb-1">
        <div className="mb-1 w-full text-left sm:mb-2">
          <h2 className="font-display mb-1 mt-2 text-3xl leading-tight text-white sm:mb-2 sm:text-3xl md:text-4xl sm:leading-[130%]">
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
              Our Programs
            </VerticalCutReveal>
          </h2>

          <TimelineContent
            as="p"
            animationNum={0}
            timelineRef={pricingRef}
            customVariants={revealVariants}
            className="w-full text-sm text-gray-300 sm:text-base md:w-[80%] mb-2 sm:mb-3"
          >
            Find the right program for your goals. From getting started to full
            placement support—pick the path that fits you.
          </TimelineContent>
        </div>
      </article>

      <TimelineContent
        as="div"
        animationNum={2}
        timelineRef={pricingRef}
        customVariants={revealVariants}
        className="mx-auto grid gap-2 sm:gap-3 md:grid-cols-2 md:items-start"
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
              <div className="relative h-full w-full">
                {plan.popular && (
                  <div
                    className="absolute inset-0 rounded-[20px] overflow-hidden"
                    aria-hidden
                  >
                    <div
                      className="absolute inset-0 rounded-[20px] bg-[conic-gradient(from_0deg,#3b82f6,#60a5fa,#93c5fd,#3b82f6,#2563eb,#3b82f6)] animate-[spin_3s_linear_infinite]"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                )}
                <Card
                  className={cn(
                    "relative flex w-full flex-col border border-gray-200/80 bg-[#f3f4f9] rounded-[20px] overflow-hidden max-h-[85vh]",
                    "shadow-[0_4px_20px_rgba(0,0,0,0.06),0_2px_8px_rgba(0,0,0,0.04),0_20px_50px_rgba(0,0,0,0.12),0_0_0_1px_rgba(255,255,255,0.8)_inset]",
                    plan.popular &&
                      "md:scale-[1.02] shadow-[0_8px_30px_rgba(0,0,0,0.1),0_4px_16px_rgba(0,0,0,0.06),0_24px_60px_rgba(0,0,0,0.14),0_0_40px_rgba(99,102,241,0.1),0_0_0_1px_rgba(255,255,255,0.9)_inset] ring-0 absolute inset-[3px] z-10",
                  )}
                >
                  <CardContent className="flex flex-col flex-1 p-4 sm:p-5 min-h-0">
                    {/* Plan name */}
                    <h3 className="font-display text-2xl font-semibold text-gray-900 sm:text-3xl mb-3">
                      {plan.name}
                    </h3>

                    {/* CTA Button - Hero style, no calendar icon */}
                    <Link
                      to="/book-call"
                      className="flex w-full items-center justify-center group text-center bg-gray-900 text-white hover:bg-black font-semibold py-2.5 sm:py-3 px-5 sm:px-6 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] text-sm sm:text-base mb-3"
                    >
                      {plan.buttonText}
                      <ArrowUpRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                    </Link>

                    <div className="border-t border-gray-100 mb-2" />

                    {/* Feature matrix rows - compact, no inner scroll */}
                    <div className="space-y-0 flex-1 min-h-0">
                      {FEATURE_ROWS.map((row) => {
                        const value = getValue(row);
                        const isCheck = value.includes("✅");
                        const isCross = value === "❌";
                        const checkSuffix = value.replace(/^✅\s*/, "").trim() || null;
                        return (
                          <div
                            key={row.feature}
                            className="flex items-center justify-between gap-2 py-1 border-b border-gray-100 last:border-b-0"
                          >
                            <span className="text-xs text-gray-700">
                              {row.feature}
                            </span>
                            <span className="flex flex-shrink-0 items-center gap-1.5 text-xs font-normal text-gray-900">
                              {isCheck && (
                                <>
                                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/15 text-blue-600 border border-blue-400/30 sm:h-6 sm:w-6">
                                    <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5" strokeWidth={2.5} />
                                  </span>
                                  {checkSuffix && <span>{checkSuffix}</span>}
                                </>
                              )}
                              {isCross && (
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-gray-500 border border-gray-200 sm:h-6 sm:w-6">
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
                </Card>
              </div>
            </TimelineContent>
          );
        })}
      </TimelineContent>
    </div>
    </main>
    <Footer />
      </div>
    </div>
  );
}