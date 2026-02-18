"use client";

import { TimelineContent } from "@/components/ui/timeline-animation";
import { useRef } from "react";

const MENTORS_IMG_DIR = "/mentor's-bg-removed";

// Mentors from mentor's-bg-removed — short, conversational; mention AI tools, job trackers, weeks program, mock interviews
const MENTOR_QUOTES = [
  {
    quote:
      "The AI resume tools and job trackers—my mentees actually use them. Two placed at Mango and a top firm.",
    name: "Gayatri Poddar",
    role: "Senior Data Scientist, Optum",
    image: `${MENTORS_IMG_DIR}/Gayatri Poddar.png`,
  },
  {
    quote:
      "Mock interviews and the weeks program. That structure is what got my mentees calls from Amazon and Samsung.",
    name: "Tripti Kumari",
    role: "Senior Software Engineer, Sprinklr",
    image: `${MENTORS_IMG_DIR}/Tripti Kumari.png`,
  },
  {
    quote:
      "Mock interviews are spot on. Plus the AI tools for ATS—two of my mentees placed at Microsoft and a product company.",
    name: "Agniva Dutta",
    role: "Senior Software Engineer, Microsoft",
    image: `${MENTORS_IMG_DIR}/Agniva Dutta.png`,
  },
  {
    quote:
      "Job trackers and the way they frame experience. My mentees landed at AWS and Stripe.",
    name: "Adori Medhi",
    role: "Senior Business Analyst, AWS",
    image: `${MENTORS_IMG_DIR}/Adori.png`,
  },
  {
    quote:
      "The weeks program and mock interviews—that’s what clicks. Mentees I work with have landed at Salesforce and HSE.",
    name: "Pratibha Gowrishankar",
    role: "HR Business Partner, HSE",
    image: `${MENTORS_IMG_DIR}/Pratibha Gowrishankar.png`,
  },
  {
    quote:
      "AI tools and mock interviews. My mentees have been placed at Google and top startups—really recommend it.",
    name: "Nirvan Kashyap",
    role: "Sales and Marketing, Google",
    image: `${MENTORS_IMG_DIR}/Nirvan Kashyap.png`,
  },
];

function ClientFeedback() {
  const testimonialRef = useRef<HTMLDivElement>(null);

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
    <main className="w-full bg-transparent">
      <section
        className="relative h-full container text-neutral-100 mx-auto rounded-lg py-14 bg-transparent"
        ref={testimonialRef}
      >
        <article className="max-w-screen-md mx-auto text-center space-y-2">
          <TimelineContent
            as="h1"
            className="xl:text-4xl text-3xl font-medium text-neutral-100"
            animationNum={0}
            customVariants={revealVariants}
            timelineRef={testimonialRef}
          >
            Trusted by job seekers and the world&apos;s largest companies
          </TimelineContent>
          <TimelineContent
            as="p"
            className="mx-auto text-neutral-400"
            animationNum={1}
            customVariants={revealVariants}
            timelineRef={testimonialRef}
          >
            Our mentors on the Mentorque program—and where their mentees have been placed
          </TimelineContent>
        </article>
        <div className="lg:grid lg:grid-cols-3 gap-2 flex flex-col w-full lg:py-10 pt-10 pb-4 lg:px-10 px-4">
          <div className="md:flex lg:flex-col lg:space-y-2 h-full lg:gap-0 gap-2">
            <TimelineContent
              animationNum={0}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="lg:flex-[7] flex-[6] flex flex-col justify-between relative bg-neutral-900/90 border-neutral-700/80 overflow-hidden rounded-lg border border-neutral-700/80 shadow-lg shadow-black/20 p-5"
            >
              <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,rgba(100,100,100,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,100,100,0.15)_1px,transparent_1px)] bg-[size:50px_56px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
              <article className="mt-auto relative z-10">
                <p className="text-neutral-200">
                  &quot;{MENTOR_QUOTES[0].quote}&quot;
                </p>
                <div className="flex justify-between pt-5">
                  <div>
                    <h2 className="font-semibold lg:text-xl text-sm text-neutral-100">
                      {MENTOR_QUOTES[0].name}
                    </h2>
                    <p className="text-neutral-400">{MENTOR_QUOTES[0].role}</p>
                  </div>
                  <img
                    src={MENTOR_QUOTES[0].image}
                    alt={MENTOR_QUOTES[0].name}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-xl object-cover ring-2 ring-neutral-700"
                  />
                </div>
              </article>
            </TimelineContent>
            <TimelineContent
              animationNum={1}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="lg:flex-[3] flex-[4] lg:h-fit lg:shrink-0 flex flex-col justify-between relative bg-blue-700/90 text-neutral-100 overflow-hidden rounded-lg border border-blue-600/50 shadow-lg shadow-blue-950/30 p-5"
            >
              <article className="mt-auto">
                <p className="text-blue-100/90">
                  &quot;{MENTOR_QUOTES[1].quote}&quot;
                </p>
                <div className="flex justify-between pt-5">
                  <div>
                    <h2 className="font-semibold text-xl text-neutral-100">{MENTOR_QUOTES[1].name}</h2>
                    <p className="text-blue-200/80">{MENTOR_QUOTES[1].role}</p>
                  </div>
                  <img
                    src={MENTOR_QUOTES[1].image}
                    alt={MENTOR_QUOTES[1].name}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-xl object-cover ring-2 ring-neutral-500/40"
                  />
                </div>
              </article>
            </TimelineContent>
          </div>
          <div className="lg:h-full md:flex lg:flex-col h-fit lg:space-y-2 lg:gap-0 gap-2">
            <TimelineContent
              animationNum={2}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="flex flex-col justify-between relative bg-neutral-900 text-neutral-100 overflow-hidden rounded-lg border border-neutral-700/80 shadow-lg shadow-black/30 p-5"
            >
              <article className="mt-auto">
                <p className="2xl:text-base text-sm text-neutral-200">
                  &quot;{MENTOR_QUOTES[2].quote}&quot;
                </p>
                <div className="flex justify-between items-end pt-5">
                  <div>
                    <h2 className="font-semibold lg:text-xl text-lg text-neutral-100">{MENTOR_QUOTES[2].name}</h2>
                    <p className="lg:text-base text-sm text-neutral-400">{MENTOR_QUOTES[2].role}</p>
                  </div>
                  <img
                    src={MENTOR_QUOTES[2].image}
                    alt={MENTOR_QUOTES[2].name}
                    width={64}
                    height={64}
                    className="lg:w-16 lg:h-16 w-12 h-12 rounded-xl object-cover ring-2 ring-neutral-600"
                  />
                </div>
              </article>
            </TimelineContent>
            <TimelineContent
              animationNum={3}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="flex flex-col justify-between relative bg-neutral-900 text-neutral-100 overflow-hidden rounded-lg border border-neutral-700/80 shadow-lg shadow-black/30 p-5"
            >
              <article className="mt-auto">
                <p className="2xl:text-base text-sm text-neutral-200">
                  &quot;{MENTOR_QUOTES[3].quote}&quot;
                </p>
                <div className="flex justify-between items-end pt-5">
                  <div>
                    <h2 className="font-semibold lg:text-xl text-lg text-neutral-100">
                      {MENTOR_QUOTES[3].name}
                    </h2>
                    <p className="lg:text-base text-sm text-neutral-400">
                      {MENTOR_QUOTES[3].role}
                    </p>
                  </div>
                  <img
                    src={MENTOR_QUOTES[3].image}
                    alt={MENTOR_QUOTES[3].name}
                    width={64}
                    height={64}
                    className="lg:w-16 lg:h-16 w-12 h-12 rounded-xl object-cover ring-2 ring-neutral-600"
                  />
                </div>
              </article>
            </TimelineContent>
            <TimelineContent
              animationNum={4}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="flex flex-col justify-between relative bg-neutral-900 text-neutral-100 overflow-hidden rounded-lg border border-neutral-700/80 shadow-lg shadow-black/30 p-5"
            >
              <article className="mt-auto">
                <p className="2xl:text-base text-sm text-neutral-200">
                  &quot;{MENTOR_QUOTES[4].quote}&quot;
                </p>
                <div className="flex justify-between items-end pt-5">
                  <div>
                    <h2 className="font-semibold lg:text-xl text-lg text-neutral-100">{MENTOR_QUOTES[4].name}</h2>
                    <p className="lg:text-base text-sm text-neutral-400">{MENTOR_QUOTES[4].role}</p>
                  </div>
                  <img
                    src={MENTOR_QUOTES[4].image}
                    alt={MENTOR_QUOTES[4].name}
                    width={64}
                    height={64}
                    className="lg:w-16 lg:h-16 w-12 h-12 rounded-xl object-cover ring-2 ring-neutral-600"
                  />
                </div>
              </article>
            </TimelineContent>
          </div>
          <div className="h-full md:flex lg:flex-col lg:space-y-2 lg:gap-0 gap-2">
            <TimelineContent
              animationNum={6}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="lg:flex-[7] flex-[6] flex flex-col justify-between relative bg-neutral-900/90 border-neutral-700/80 overflow-hidden rounded-lg border border-neutral-700/80 shadow-lg shadow-black/20 p-5"
            >
              <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,rgba(100,100,100,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,100,100,0.15)_1px,transparent_1px)] bg-[size:50px_56px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
              <article className="mt-auto relative z-10">
                <p className="text-neutral-200">
                  &quot;{MENTOR_QUOTES[5].quote}&quot;
                </p>
                <div className="flex justify-between pt-5">
                  <div>
                    <h2 className="font-semibold text-xl text-neutral-100">{MENTOR_QUOTES[5].name}</h2>
                    <p className="text-neutral-400">{MENTOR_QUOTES[5].role}</p>
                  </div>
                  <img
                    src={MENTOR_QUOTES[5].image}
                    alt={MENTOR_QUOTES[5].name}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-xl object-cover ring-2 ring-neutral-700"
                  />
                </div>
              </article>
            </TimelineContent>
          </div>
        </div>

        <div className="absolute border-b-2 border-neutral-700 bottom-4 h-16 z-[2] md:w-full w-[90%] md:left-0 left-[5%]">
          <div className="container mx-auto w-full h-full relative before:absolute before:-left-2 before:-bottom-2 before:w-4 before:h-4 before:bg-neutral-900 before:shadow-sm before:border before:border-neutral-700 after:absolute after:-right-2 after:-bottom-2 after:w-4 after:h-4 after:bg-neutral-900 after:shadow-sm after:border after:border-neutral-700"></div>
        </div>
      </section>
    </main>
  );
}

export default ClientFeedback;
