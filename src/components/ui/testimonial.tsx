"use client";

import { TimelineContent } from "@/components/ui/timeline-animation";
import { useRef } from "react";

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
            Let&apos;s hear how Mentorque clients feel about our service
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
                  &quot;Mentorque has been a game-changer for us. Their service
                  is top-notch and their team is incredibly responsive.&quot;
                </p>
                <div className="flex justify-between pt-5">
                  <div>
                    <h2 className="font-semibold lg:text-xl text-sm text-neutral-100">
                      Sree Laxmi
                    </h2>
                    <p className="text-neutral-400">Order Analyst, Vodafone</p>
                  </div>
                  <img
                    src="/Testimonials-People/sreelaxmi-testimonial.jpeg"
                    alt="Sree Laxmi"
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
                  &quot;We&apos;ve seen incredible results with Mentorque. Their
                  expertise and dedication.&quot;
                </p>
                <div className="flex justify-between pt-5">
                  <div>
                    <h2 className="font-semibold text-xl text-neutral-100">Sowmya</h2>
                    <p className="text-blue-200/80">IT Consultant, TP Dublin</p>
                  </div>
                  <img
                    src="/Testimonials-People/sowmya-testimonial.jpeg"
                    alt="Sowmya"
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
                  &quot;Their team is highly professional, and their innovative
                  solutions have truly transformed the way we approach job
                  search.&quot;
                </p>
                <div className="flex justify-between items-end pt-5">
                  <div>
                    <h2 className="font-semibold lg:text-xl text-lg text-neutral-100">Morgan</h2>
                    <p className="lg:text-base text-sm text-neutral-400">Professional</p>
                  </div>
                  <img
                    src="/Testimonials-People/morgan-testimonial.jpeg"
                    alt="Morgan"
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
                  &quot;We&apos;re extremely satisfied with Mentorque. Their
                  expertise and dedication have exceeded our expectations.&quot;
                </p>
                <div className="flex justify-between items-end pt-5">
                  <div>
                    <h2 className="font-semibold lg:text-xl text-lg text-neutral-100">
                      Shubham
                    </h2>
                    <p className="lg:text-base text-sm text-neutral-400">
                      Software Professional
                    </p>
                  </div>
                  <img
                    src="/Testimonials-People/shubham-testimonial.png"
                    alt="Shubham"
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
                  &quot;Their customer support is absolutely exceptional. They
                  are always available, incredibly helpful.&quot;
                </p>
                <div className="flex justify-between items-end pt-5">
                  <div>
                    <h2 className="font-semibold lg:text-xl text-lg text-neutral-100">Pramod</h2>
                    <p className="lg:text-base text-sm text-neutral-400">Tech Professional</p>
                  </div>
                  <img
                    src="/Testimonials-People/pramod-testimonial.png"
                    alt="Pramod"
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
              animationNum={5}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="lg:flex-[3] flex-[4] flex flex-col justify-between relative bg-blue-700/90 text-neutral-100 overflow-hidden rounded-lg border border-blue-600/50 shadow-lg shadow-blue-950/30 p-5"
            >
              <article className="mt-auto">
                <p className="text-blue-100/90">
                  &quot;Mentorque has been a key partner in our growth journey.&quot;
                </p>
                <div className="flex justify-between pt-5">
                  <div>
                    <h2 className="font-semibold text-xl text-neutral-100">Udith</h2>
                    <p className="text-blue-200/80">Candidate</p>
                  </div>
                  <img
                    src="/Testimonials-People/udith-testimonial.jpeg"
                    alt="Udith"
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-xl object-cover ring-2 ring-neutral-500/40"
                  />
                </div>
              </article>
            </TimelineContent>
            <TimelineContent
              animationNum={6}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="lg:flex-[7] flex-[6] flex flex-col justify-between relative bg-neutral-900/90 border-neutral-700/80 overflow-hidden rounded-lg border border-neutral-700/80 shadow-lg shadow-black/20 p-5"
            >
              <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,rgba(100,100,100,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,100,100,0.15)_1px,transparent_1px)] bg-[size:50px_56px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
              <article className="mt-auto relative z-10">
                <p className="text-neutral-200">
                  &quot;Mentorque has been a true game-changer for us. Their
                  exceptional service, combined with their deep expertise and
                  commitment to excellence, has made a significant impact on our
                  careers.&quot;
                </p>
                <div className="flex justify-between pt-5">
                  <div>
                    <h2 className="font-semibold text-xl text-neutral-100">Sree Laxmi</h2>
                    <p className="text-neutral-400">Order Analyst</p>
                  </div>
                  <img
                    src="/Testimonials-People/sreelaxmi-testimonial.jpeg"
                    alt="Sree Laxmi"
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
