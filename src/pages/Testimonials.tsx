import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import CareersHero from "@/components/CareersHero"
import TestimonialsGallery from "@/components/TestimonialsGallery"
import VideoTestimonials from "@/components/VideoTestimonials"
import TestimonialV2 from "@/components/ui/testimonial-v2"
import ClientFeedback from "@/components/ui/testimonial"
import MeetOurMentors from "@/components/ui/animated-testimonial"

const Testimonials = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1120] via-[#05070d] to-[#020204]">
      <Navbar />
      <main className="pt-24 sm:pt-28 lg:pt-32">
        <CareersHero />
        <div className="dark">
          <MeetOurMentors />
          <TestimonialV2 />
        </div>
        <VideoTestimonials />
        <ClientFeedback />
        <TestimonialsGallery />
      </main>
      <Footer />
    </div>
  )
}

export default Testimonials

