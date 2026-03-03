"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GradientBlinds } from "@/components/ui/gradient-blinds";

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
        className="font-sans relative mx-auto max-w-6xl px-3 pt-10 pb-8 sm:px-4 sm:pt-12 sm:pb-10 md:pt-16 md:pb-12"
        ref={pricingRef}
      >
      <article className="flex flex-col items-start justify-between sm:flex-row sm:items-center sm:pb-0 pb-3">
        <div className="mb-3 w-full text-left sm:mb-4">
          <h2 className="font-display mb-2 mt-12 text-4xl  leading-tight text-white sm:mb-3 sm:text-3xl md:text-4xl sm:leading-[130%]">
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
            className="w-full text-sm text-gray-300 sm:text-base md:w-[80%] mb-4 sm:mb-6"
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
        className="mx-auto grid gap-4 sm:gap-5 md:grid-cols-2 md:items-stretch"
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
                    "relative flex h-full w-full flex-col border border-gray-200/80 bg-[#f3f4f9] rounded-[20px] overflow-hidden",
                    "shadow-[0_4px_20px_rgba(0,0,0,0.06),0_2px_8px_rgba(0,0,0,0.04),0_20px_50px_rgba(0,0,0,0.12),0_0_0_1px_rgba(255,255,255,0.8)_inset]",
                    plan.popular &&
                      "md:scale-[1.02] shadow-[0_8px_30px_rgba(0,0,0,0.1),0_4px_16px_rgba(0,0,0,0.06),0_24px_60px_rgba(0,0,0,0.14),0_0_40px_rgba(99,102,241,0.1),0_0_0_1px_rgba(255,255,255,0.9)_inset] ring-0 absolute inset-[3px] z-10",
                  )}
                >
                  <CardContent className="flex flex-col flex-1 p-5 sm:p-6">
                    {/* Plan name - large font (replacing days) */}
                    <h3 className="font-display text-3xl font-semibold text-gray-900 sm:text-4xl md:text-4xl mb-4">
                      {plan.name}
                    </h3>

                    {/* CTA Button */}
                    <Link
                      to="/book-call"
                      className={cn(
                        "flex w-full items-center justify-center rounded-xl p-2.5 text-base font-medium sm:p-3 sm:text-lg transition-all duration-200 mb-4",
                        plan.popular
                          ? "border border-neutral-400 bg-gradient-to-t from-neutral-100 to-neutral-300 text-black shadow-lg shadow-neutral-500/50 hover:shadow-xl hover:shadow-neutral-500/40"
                          : "border border-neutral-700 bg-gradient-to-t from-neutral-900 to-neutral-600 text-white shadow-lg shadow-neutral-900/40 hover:shadow-xl hover:shadow-neutral-900/50",
                      )}
                    >
                      {plan.buttonText}
                    </Link>

                    <div className="border-t border-gray-100 mb-3" />

                    {/* Feature matrix rows - compact */}
                    <div className="space-y-0 flex-1">
                      {FEATURE_ROWS.map((row) => {
                        const value = getValue(row);
                        const isCheck = value.includes("✅");
                        const isCross = value === "❌";
                        const checkSuffix = value.replace(/^✅\s*/, "").trim() || null;
                        return (
                          <div
                            key={row.feature}
                            className="flex items-center justify-between gap-3 py-1.5 border-b border-gray-100 last:border-b-0"
                          >
                            <span className="text-xs sm:text-sm text-gray-700">
                              {row.feature}
                            </span>
                            <span className="flex flex-shrink-0 items-center gap-1.5 text-xs sm:text-sm font-normal text-gray-900">
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