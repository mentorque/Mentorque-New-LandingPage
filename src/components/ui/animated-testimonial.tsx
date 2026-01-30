import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

// --- Types ---
type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  company: string;
  src: string;
  companyLogo?: { src: string; name: string };
};

// Company logos from public/logo — shown per mentor: they work at these companies (don't mentor for them)
const COMPANY_LOGOS: { src: string; name: string }[] = [
  { src: "/logo/microsoft.png", name: "Microsoft" },
  { src: "/logo/amazon.png", name: "Amazon" },
  { src: "/logo/apple.png", name: "Apple" },
  { src: "/logo/goldman_sachs.png", name: "Goldman Sachs" },
  { src: "/logo/deloitte.svg", name: "Deloitte" },
  { src: "/logo/walmart.png", name: "Walmart" },
  { src: "/logo/samsung.png", name: "Samsung" },
  { src: "/logo/servicenow.png", name: "ServiceNow" },
  { src: "/logo/myntra.png", name: "Myntra" },
  { src: "/logo/zomato.png", name: "Zomato" },
  { src: "/logo/hashedin.jpg", name: "HashedIn" },
];

function getRandomCompany(): (typeof COMPANY_LOGOS)[number] {
  return COMPANY_LOGOS[Math.floor(Math.random() * COMPANY_LOGOS.length)];
}

const microsoftLogo = { src: "/logo/microsoft.png", name: "Microsoft" };

// 4 mentors: photos from public/hello-mentors (1.png, 2.png, 3.png + 1.png for 4th). They work at those companies.
const mentors: Testimonial[] = [
  {
    quote:
      "Mentorque's approach to resume and interview prep is what we needed. I've seen professionals land roles at Amazon, Vodafone, and top firms within weeks.",
    name: "Reshu",
    designation: "Career Coach",
    company: "Mentorque",
    src: "/hello-mentors/1.png",
    companyLogo: microsoftLogo,
  },
  {
    quote:
      "We focus on ATS-friendly resumes and real interview practice. Our mentees have cracked DE Shaw, Q2, Saviynt, and landed roles at TP Dublin, Optum, and more.",
    name: "Agniva",
    designation: "Lead Mentor",
    company: "Mentorque",
    src: "/hello-mentors/2.png",
    companyLogo: getRandomCompany(),
  },
  {
    quote:
      "From zero callbacks to multiple offers—we've guided hundreds through the grind. The goal is simple: get you interview-ready and confident.",
    name: "Sree Laxmi",
    designation: "Success Coach",
    company: "Mentorque",
    src: "/hello-mentors/3.png",
    companyLogo: getRandomCompany(),
  },
  {
    quote:
      "Mock interviews, portfolio reviews, and strategy sessions. We mentor professionals across tech and operations to land roles at top companies.",
    name: "Sowmya",
    designation: "Career Strategist",
    company: "Mentorque",
    src: "/hello-mentors/1.png",
    companyLogo: getRandomCompany(),
  },
];

// --- Main Animated Testimonials Component ---
const AnimatedTestimonials = ({
  testimonials,
  autoplay = true,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = useCallback(() => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [autoplay, handleNext]);

  const isActive = (index: number) => index === active;

  const rotations = useMemo(
    () => testimonials.map(() => `${Math.floor(Math.random() * 16) - 8}deg`),
    [testimonials.length]
  );

  return (
    <div className="mx-auto max-w-sm px-4 py-12 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-20">
        {/* Image Section */}
        <div className="flex items-center justify-center">
          <div className="relative h-80 w-full max-w-xs">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.src}-${index}`}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    y: 50,
                    rotate: rotations[index],
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.5,
                    scale: isActive(index) ? 1 : 0.9,
                    y: isActive(index) ? 0 : 20,
                    zIndex: isActive(index)
                      ? testimonials.length
                      : testimonials.length - Math.abs(index - active),
                    rotate: isActive(index) ? "0deg" : rotations[index],
                  }}
                  exit={{ opacity: 0, scale: 0.9, y: -50 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 origin-bottom"
                  style={{ perspective: "1000px" }}
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover shadow-2xl ring-2 ring-neutral-700/50"
                    onError={(e) => {
                      e.currentTarget.src = `/placeholder.svg`;
                      e.currentTarget.onerror = null;
                    }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Text and Controls Section */}
        <div className="flex flex-col justify-center py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex flex-col justify-between"
            >
              <div>
                <h3 className="text-2xl font-bold text-neutral-100">
                  {testimonials[active].name}
                </h3>
                <p className="text-sm text-neutral-400">
                  {testimonials[active].designation}
                  {testimonials[active].company && (
                    <> · {testimonials[active].company}</>
                  )}
                </p>
                {testimonials[active].companyLogo && (
                  <div className="mt-3 flex items-center gap-2">
                    <img
                      src={testimonials[active].companyLogo.src}
                      alt={testimonials[active].companyLogo.name}
                      className="h-8 w-auto max-w-[100px] object-contain object-left"
                    />
                    <span className="text-xs text-neutral-500">
                      Works at {testimonials[active].companyLogo.name}
                    </span>
                  </div>
                )}
                <motion.p className="mt-8 text-lg text-neutral-300 leading-relaxed">
                  &quot;{testimonials[active].quote}&quot;
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex gap-4 pt-12">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="group flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 border border-neutral-700 transition-colors hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-transparent"
            >
              <ArrowLeft className="h-5 w-5 text-neutral-300 transition-transform duration-300 group-hover:-translate-x-1" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next testimonial"
              className="group flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 border border-neutral-700 transition-colors hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-transparent"
            >
              <ArrowRight className="h-5 w-5 text-neutral-300 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Meet our mentors section (for Testimonials page) ---
export function MeetOurMentors() {
  return (
    <section
      className="relative w-full overflow-hidden bg-transparent pt-16 pb-6 md:pt-20 md:pb-8"
      aria-labelledby="mentors-heading"
    >
      <div className="container mx-auto px-4 text-center md:px-8">
        <h2
          id="mentors-heading"
          className="text-3xl font-bold tracking-tight text-neutral-100 sm:text-4xl"
        >
          Meet our mentors
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-400">
          They&apos;ve guided hundreds of professionals to land roles at top
          companies—from Amazon and Vodafone to DE Shaw and TP Dublin.
        </p>
      </div>
      <AnimatedTestimonials testimonials={mentors} autoplay />
    </section>
  );
}

// --- Export for demo / standalone use ---
export function Component() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-neutral-950">
      <div className="z-10 w-full">
        <MeetOurMentors />
      </div>
    </div>
  );
}

export default MeetOurMentors;
