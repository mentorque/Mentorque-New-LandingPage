import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LogoCarousel from "@/components/LogoCarousel";
import About from "@/components/About";
import Footer from "@/components/Footer";
import TestimonialCarousel from "@/components/Testimonials";
import Weeks from "@/components/Weeks";
import MentorqueFAQ from "@/components/faq";
import TrustedByLearners from "@/components/TrustedByLearners";
import TestimonialGallery from "@/components/whatsApp";
import ScrollTextReveal from "@/components/ui/scrollTextReveal";
import Resume from "@/components/resume";
import FloatingChat from "@/components/FloatingChat";
import InterviewSuccessFeatures from "@/components/InterviewSuccessFeatures";
import ChooseYourOutcome from "@/components/ui/ChooseYourOutcome";

const Index = () => {
  // Scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Smooth scrolling
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href")?.substring(1);
        if (!targetId) return;
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;
        const offset = window.innerWidth < 768 ? 100 : 80;
        window.scrollTo({ top: targetElement.offsetTop - offset, behavior: "smooth" });
      });
    });
  }, []);

  // **GA4 UTM tracking**
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utm_source = params.get('utm_source');
    const utm_medium = params.get('utm_medium');
    const utm_campaign = params.get('utm_campaign');
    const utm_content = params.get('utm_content');

    if (utm_source && window.gtag) {
      window.gtag('event', 'utm_params', {
        source: utm_source,
        medium: utm_medium,
        campaign: utm_campaign,
        content: utm_content,
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="space-y-16 md:space-y-24">
        <section id="Home">
          <Hero />
        </section>

         <section id="Clients">
          <LogoCarousel />
          <TestimonialGallery />
          <ScrollTextReveal />
        </section>

    <section id="About">
          <About />
        </section>

        <section id="success-rate">
          <InterviewSuccessFeatures />
        </section>

        <section id="choose-outcome">
          <ChooseYourOutcome />
        </section>

        <section id="services">
          <Weeks />
        </section>

       <section id="Testimonials">
          <TestimonialCarousel />
        </section>

        <div className="flex justify-center pt-4 pb-2">
          <Link
            to="/testimonials"
            className="flex items-center justify-center group w-full sm:w-auto text-center bg-white text-gray-900 hover:bg-gray-100 font-semibold py-3 sm:py-4 px-6 sm:px-8 lg:px-10 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] text-base sm:text-lg"
          >
            <Calendar className="mr-2 sm:mr-3 w-5 h-5 sm:w-6 sm:h-6" />
            View Testimonial
            <ArrowUpRight className="ml-2 sm:ml-3 w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <TrustedByLearners />

        <section id="FAQ">
          <MentorqueFAQ />
        </section>
      </main>
      <Footer />
      <FloatingChat />
    </div>
  );
};

export default Index;
