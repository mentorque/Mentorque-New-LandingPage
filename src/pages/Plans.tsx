"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const plans = [
  {
    name: "Mentorque Blue",
    duration: 30,
    description: "All essential features.",
    buttonText: "Explore course",
    buttonVariant: "dark" as const,
    popular: false,
    includes: [
      "Everything included:",
      "Resume Building Tool",
      "Resume Tailoring Tool",
      "Job Dashboard",
      "HR Database",
      "Outreach Templates",
      "WhatsApp Community",
    ],
  },
  {
    name: "Mentorque Silver",
    duration: 90,
    description: "Ongoing mentorship plus portfolio, prep, and mock interviews.",
    buttonText: "Explore course",
    buttonVariant: "dark" as const,
    popular: false,
    includes: [
      "Everything in Blue, plus:",
      "Customer Success Manager",
      "Portfolio Building (1 session)",
      "Interview Prep Plan",
      "Question Bank",
      "Mock Interviews (3 rounds)",
    ],
  },
  {
    name: "Mentorque Black",
    duration: 180,
    description: "Full placement support, referrals, and the Double Guarantee.",
    buttonText: "Explore course",
    buttonVariant: "dark" as const,
    popular: true,
    includes: [
      "Everything in Silver, plus:",
      "Placement Team",
      "Portfolio Building (2 sessions)",
      "Mock Interviews (5 rounds)",
      "Recruiter Referrals (Warm introduction)",
      "Offer Negotiation",
    ],
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
    <div className="min-h-screen w-full bg-[#dde2ee]">
      <Navbar />
      <main>
      <div
        className="font-sans relative mx-auto max-w-6xl px-3 pt-14 pb-10 sm:px-4 sm:pt-16 sm:pb-12 md:pt-20 md:pb-16"
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
      </article>

      <TimelineContent
        as="div"
        animationNum={2}
        timelineRef={pricingRef}
        customVariants={revealVariants}
        className="mx-auto grid gap-5 sm:gap-6 md:grid-cols-3 md:items-stretch"
      >
        {plans.map((plan, index) => (
          <TimelineContent
            as="div"
            key={plan.name}
            animationNum={index + 3}
            timelineRef={pricingRef}
            customVariants={revealVariants}
            className="flex h-full"
          >
            <div className={cn("relative h-full w-full", plan.popular && "min-h-[320px]")}>
              {/* Revolving blue ring around Mentorque Black */}
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
              <CardContent className="flex flex-col flex-1 p-6 sm:p-8">
                {/* Plan name */}
                <h3 className="font-sans text-lg font-medium text-gray-800 mb-4 sm:text-xl md:text-xl">
                  {plan.name}
                </h3>

                {/* Duration - days */}
                <div className="flex items-baseline gap-2 mb-5 font-emilio font-light">
                  <span className="text-6xl text-gray-900 sm:text-6xl md:text-7xl lg:text-7xl leading-none tracking-tighter tabular-nums">
                    {plan.duration}
                  </span>
                  <span className="text-2xl tracking-tight text-gray-500 sm:text-3xl md:text-4xl lg:text-5xl">
                    days
                  </span>
                </div>

                {/* CTA Button - right below price */}
                <Link
                  to="/book-call"
                  className={cn(
                    "flex w-full items-center justify-center rounded-xl p-3 text-base font-semibold sm:p-4 sm:text-lg transition-all duration-200 mb-4",
                    plan.popular
                      ? "border border-neutral-400 bg-gradient-to-t from-neutral-100 to-neutral-300 text-black shadow-lg shadow-neutral-500/50 hover:shadow-xl hover:shadow-neutral-500/40"
                      : "border border-neutral-700 bg-gradient-to-t from-neutral-900 to-neutral-600 text-white shadow-lg shadow-neutral-900/40 hover:shadow-xl hover:shadow-neutral-900/50",
                  )}
                >
                  {plan.buttonText}
                </Link>

                {/* Short description */}
                <p className="text-sm text-gray-400 mb-2">
                  {plan.description}
                </p>

                {/* Divider */}
                <div className="border-t border-gray-100 mb-5" />

                {/* Feature heading + list */}
                <div className="space-y-3 flex-1">
                  <h4 className="text-sm font-semibold text-gray-800">
                    {plan.includes[0]}
                  </h4>
                  <ul className="space-y-2.5">
                    {plan.includes.slice(1).map((feature, featureIndex) => (
                      <li
                        key={`${feature}-${featureIndex}`}
                        className="flex items-start gap-2.5"
                      >
                        <Check
                          className="h-4 w-4 flex-shrink-0 text-blue-500 mt-0.5"
                          strokeWidth={2.5}
                        />
                        <span className="text-sm text-gray-600 leading-snug">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
            </div>
          </TimelineContent>
        ))}
      </TimelineContent>
    </div>
    </main>
    <Footer />
    </div>
  );
}