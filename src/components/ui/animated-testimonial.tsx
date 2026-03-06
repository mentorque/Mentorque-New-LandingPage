import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { MENTORS } from "@/data/mentors";

// Shape used by the carousel (profile image as src, intro instead of quote)
export type MentorCard = {
  name: string;
  designation: string;
  company: string;
  src: string;
  companyLogo?: { src: string; name: string };
  intro: string;
};

const mentors: MentorCard[] = MENTORS.map((m) => ({
  name: m.name,
  designation: m.designation,
  company: m.company,
  src: m.profileImagePath,
  companyLogo: m.companyLogo,
  intro: m.intro,
}));

// --- Main Animated Testimonials Component ---
const AnimatedTestimonials = ({
  testimonials,
  autoplay = true,
}: {
  testimonials: MentorCard[];
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
                  <div className="mt-3 flex items-center gap-3">
                    <img
                      src={testimonials[active].companyLogo.src}
                      alt={testimonials[active].companyLogo.name}
                      className="h-12 w-auto max-w-[140px] rounded-lg object-contain object-left"
                    />
                    <span className="text-xs text-neutral-500">
                      Works at {testimonials[active].companyLogo.name}
                    </span>
                  </div>
                )}
                <motion.p className="mt-6 text-lg text-neutral-300 leading-relaxed">
                  {testimonials[active].intro}
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
          They&apos;ve mentored 70+ working professionals to crack competitive
          interviews and secure roles at leading companies like EY, Amazon,
          Microsoft, Vodafone, and 50+ top organizations across the UK and
          India.
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
