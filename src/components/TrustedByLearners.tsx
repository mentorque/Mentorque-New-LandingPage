"use client";

import { Quote } from "lucide-react";

const TRUSTED_CARDS = [
  {
    id: "google",
    logo: "/Google.svg",
    logoAlt: "Google",
    rating: "4.7/5",
    quote:
      "Mentorque's AI tools, playbooks and mock interviews helped me finally start getting consistent interview calls and convert them into multiple offers.",
    name: "Ajay Mathur",
  },
  {
    id: "reddit",
    logo: "/reddit.webp",
    logoAlt: "Reddit",
    rating: "4.5/5",
    quote:
      "The mentors and the approach here helped me finally understand what it takes to consistently get interview calls and show up prepared.",
    name: "Vikas Sharma",
  },
];

export default function TrustedByLearners() {
  return (
    <section className="w-full bg-black overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl md:text-4xl lg:text-4xl text-white mb-12 md:mb-16">
          Hear From Our Learners
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {TRUSTED_CARDS.map((card) => (
            <div
              key={card.id}
              className="relative bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-6 md:p-8 border border-white/20 backdrop-blur-lg shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between mb-6">
                <img
                  src={card.logo}
                  alt={card.logoAlt}
                  className="h-8 md:h-10 w-auto object-contain"
                />
                <span className="text-white font-bold text-lg">{card.rating}</span>
              </div>
              <div className="relative flex-1">
                <Quote className="absolute -top-1 left-0 w-12 h-12 text-white/10 pointer-events-none" />
                <blockquote className="relative text-gray-200 text-sm md:text-base leading-relaxed font-medium pl-6">
                  {card.quote}
                </blockquote>
              </div>
              <p className="mt-6 font-bold text-white text-base">{card.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
