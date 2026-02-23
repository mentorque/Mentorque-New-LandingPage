"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";
import { CheckCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Mentorque Blue",
    description:
      "Foundation first. Perfect for getting started with structured job search and core tools.",
    duration: 30,
    mentorship: "1 session",
    popular: false,
    buttonText: "Explore course",
    buttonVariant: "outline" as const,
    bestFor: "Foundation first",
    includes: [
      "Everything included:",
      "Resume Building Tool",
      "Resume Tailoring Tool",
      "Job Dashboard",
      "HR Database",
      "Outreach Templates",
      "WhatsApp Community",
    ],
    excludes: [
      "Customer Success Manager",
      "Placement Team",
      "Portfolio Building",
      "Interview Prep Plan",
      "Question Bank",
      "Mock Interviews",
      "Recruiter Referrals",
      "Offer Negotiation",
      "The Double Guarantee",
    ],
  },
  {
    name: "Mentorque Silver",
    description:
      "The sweet spot. Ongoing mentorship plus portfolio, prep, and mock interviews.",
    duration: 90,
    mentorship: "Ongoing",
    popular: false,
    buttonText: "Explore course",
    buttonVariant: "outline" as const,
    bestFor: "The sweet spot",
    includes: [
      "Everything in Blue, plus:",
      "Customer Success Manager",
      "Portfolio Building (1 session)",
      "Interview Prep Plan",
      "Question Bank",
      "Mock Interviews (3 rounds)",
    ],
    excludes: [
      "Placement Team",
      "Recruiter Referrals",
      "Offer Negotiation",
      "The Double Guarantee",
    ],
  },
  {
    name: "Mentorque Black",
    description:
      "Leave nothing to chance. Full placement support, referrals, and the Double Guarantee.",
    duration: 180,
    mentorship: "Ongoing + Priority",
    popular: true,
    buttonText: "Explore course",
    buttonVariant: "default" as const,
    bestFor: "Leave nothing to chance",
    includes: [
      "Everything in Silver, plus:",
      "Placement Team",
      "Portfolio Building (2 sessions)",
      "Mock Interviews (5 rounds)",
      "Recruiter Referrals (Warm introduction)",
      "Offer Negotiation",
      "The Double Guarantee",
    ],
    excludes: [],
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
        className="mx-auto grid gap-3 rounded-lg bg-gradient-to-b from-neutral-100 to-neutral-200 p-2 sm:gap-4 sm:p-3 md:grid-cols-3 md:items-stretch"
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
            <Card
              className={cn(
                "relative flex h-full flex-col justify-between",
                plan.popular
                  ? "md:scale-110 ring-2 ring-neutral-900 bg-gradient-to-t from-black to-neutral-900 text-white"
                  : "border-none bg-transparent pt-3 text-gray-900 shadow-none sm:pt-4",
              )}
            >
              <CardContent className="flex-1 min-h-0 pt-0 px-4 pb-4 sm:px-6 sm:pb-6">
                <div className="space-y-1.5 pb-2 sm:space-y-2 sm:pb-3">
                  {plan.popular && (
                    <div className="pt-2 sm:pt-4">
                      <span className="rounded-full bg-neutral-600 px-2.5 py-0.5 text-xs font-medium text-white sm:px-3 sm:py-1">
                        Popular
                      </span>
                    </div>
                  )}

                  <div className="flex items-baseline gap-0.5">
                    <span className="text-3xl font-semibold sm:text-4xl">
                      <NumberFlow
                        value={plan.duration}
                        className="text-3xl font-semibold sm:text-4xl"
                      />
                    </span>
                    <span
                      className={
                        plan.popular
                          ? "text-lg font-bold tracking-tight text-neutral-200 sm:text-xl"
                          : "text-lg font-bold tracking-tight text-gray-600 sm:text-xl"
                      }
                    >
                      days
                    </span>
                  </div>
                  <p
                    className={
                      plan.popular
                        ? "text-sm text-neutral-300"
                        : "text-sm text-gray-500"
                    }
                  >
                    Mentorship: {plan.mentorship}
                  </p>
                </div>

                <div className="flex justify-between">
                  <h3 className="mb-1.5 text-xl font-semibold sm:mb-2 sm:text-2xl md:text-3xl">{plan.name}</h3>
                </div>
                <p
                  className={
                    plan.popular
                      ? "mb-3 text-xs text-neutral-200 sm:mb-4 sm:text-sm"
                      : "mb-3 text-xs text-gray-600 sm:mb-4 sm:text-sm"
                  }
                >
                  {plan.description}
                </p>
                <p
                  className={
                    plan.popular
                      ? "mb-2 text-xs font-medium text-neutral-400 sm:mb-3"
                      : "mb-2 text-xs font-medium text-gray-500 sm:mb-3"
                  }
                >
                  Best for: {plan.bestFor}
                </p>

                <div className="space-y-2 border-t border-neutral-200 pt-3 sm:space-y-3 sm:pt-4">
                  <h4 className="mb-2 text-sm font-medium sm:mb-3 sm:text-base">
                    {plan.includes[0]}
                  </h4>
                  <ul className="space-y-1.5 font-semibold sm:space-y-2">
                    {plan.includes.slice(1).map((feature, featureIndex) => (
                      <li
                        key={`${feature}-${featureIndex}`}
                        className="flex items-center gap-2"
                      >
                        <span
                          className={
                            plan.popular
                              ? "mr-2 mt-0.5 grid h-5 w-5 flex-shrink-0 place-content-center rounded-full border border-neutral-500 bg-neutral-600 text-white sm:mr-3 sm:h-6 sm:w-6"
                              : "mr-2 mt-0.5 grid h-5 w-5 flex-shrink-0 place-content-center rounded-full border border-black bg-white text-black sm:mr-3 sm:h-6 sm:w-6"
                          }
                        >
                          <CheckCheck className="h-3 w-3 sm:h-4 sm:w-4" />
                        </span>
                        <span
                          className={
                            plan.popular
                              ? "text-xs text-neutral-100 sm:text-sm"
                              : "text-xs text-gray-600 sm:text-sm"
                          }
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="mt-auto shrink-0 px-4 pb-4 pt-0 sm:px-6 sm:pb-6">
                <Link
                  to="/book-call"
                  className={cn(
                    "flex w-full items-center justify-center rounded-xl p-3 text-base font-semibold sm:mb-6 sm:p-4 sm:text-xl",
                    plan.popular
                      ? "border border-neutral-400 bg-gradient-to-t from-neutral-100 to-neutral-300 font-semibold text-black shadow-lg shadow-neutral-500"
                      : plan.buttonVariant === "outline"
                        ? "border border-neutral-700 bg-gradient-to-t from-neutral-900 to-neutral-600 font-semibold text-white shadow-lg shadow-neutral-900"
                        : "bg-primary text-primary-foreground font-semibold",
                  )}
                >
                  {plan.buttonText}
                </Link>
              </CardFooter>
            </Card>
          </TimelineContent>
        ))}
      </TimelineContent>
    </div>
  );
}
