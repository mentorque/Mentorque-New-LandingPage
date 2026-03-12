/**
 * Single source of testimonial data for Testimonials.tsx and testimonial-v2.
 * Local avatars only; no Unsplash or dummy data.
 */

export type TestimonialEntry = {
  id: number;
  name: string;
  content: string;
  avatar: string;
  role: string;
  rating?: number;
};

export const TESTIMONIALS: TestimonialEntry[] = [
  {
    id: 3,
    name: "Snehashish",
    content:
      "Looking for a role in the US was a huge challenge, but the mentorship here made it possible. The mock interview preparation was instrumental—they really grilled me on high-level architecture until I could explain it perfectly. One of my major projects was actually inspired by my mentor, and it ended up being a huge talking point in my actual interviews. It’s a very professional program that prepares you for the standard of top-tier global firms.",
    avatar: "/Testimonials-People/snehashish.png",
    role: "Tech Professional",
    rating: 5,
  },
  {
    id: 2,
    name: "Komal Joshi",
    content:
      "Was struggling to even get a response, but the outreach strategy here actually works. Finally started getting multiple interview calls from the companies I wanted. We did about 5–6 mock interview rounds to make sure I was ready, which really helped with my confidence. By the final round, I wasn't even nervous because we’d already covered everything with the mentor. Very solid if you're getting ghosted by HRs.",
    avatar: "/Testimonials-People/komal-joshi.png",
    role: "Professional",
    rating: 5,
  },
  {
    id: 9,
    name: "Sree Laxmi",
    content:
      "After six months with no interview calls, I heard back from Optum, Amazon, and eBay within two weeks of joining Mentorque and landed a Vodafone Order Analyst role.",
    avatar: "/Testimonials-People/SreeLaxmi.png",
    role: "Order Analyst",
    rating: 5,
  },
  {
    id: 11,
    name: "Sowmya",
    content:
      "Mentorque sharpened my application strategy within weeks I received calls from Amazon and Bounce.io and secured an IT consultant role at TP Dublin.",
    avatar: "/Testimonials-People/sowmya-testimonial.jpeg",
    role: "IT Consultant",
    rating: 5,
  },
  {
    id: 12,
    name: "Morgan",
    content:
      "The mentors and the team helped me really understand what it took to start getting consistent interview calls, instead of just sending applications and hoping for the best.",
    avatar: "/Testimonials-People/morgan-testimonial.jpeg",
    role: "Professional",
    rating: 5,
  },
  {
    id: 10,
    name: "Shubham",
    content:
      "The personalised guidance made all the difference. I received interview calls from DE Shaw, Q2, Saviynt, and AQR Capital. I'd recommend Mentorque to anyone trying to land calls from top firms.",
    avatar: "/Testimonials-People/shubham-testimonial.png",
    role: "Software Professional",
    rating: 5,
  },
  {
    id: 1,
    name: "Nilesh Khatiya",
    content:
      "Doing self prep, I couldn't even get any call backs from companies. The resume and portfolios built by Reshu and team were a gamechanger. 100% recommended.",
    avatar: "/nilesh.jpeg",
    role: "",
    rating: 5,
  },
  {
    id: 14,
    name: "Jagruthi C",
    content:
      "Agniva's guidance, personal progress tracking and LLM powered resume tools simplified my job hunt process and saved me a lot of time.",
    avatar: "/jagruti.jpeg",
    role: "",
    rating: 4,
  },
  {
    id: 5,
    name: "Anshul Shetty",
    content:
      "The resume session helped me realise crucial ATS related mistakes and hear back from mutiple companies including Amazon.",
    avatar: "/anshul.jpeg",
    role: "",
    rating: 4,
  },
  {
    id: 6,
    name: "Rigved Harmalker",
    content:
      "Landing my internship was a huge win, and the mock interviews with the team were definitely the turning point. The questions they helped me prep were pretty much the same as what was asked in the interviews. That specific practice made all the difference when I finally sat for the real interview. It’s a very practical and high-quality approach to prep.",
    avatar: "/rigved.jpeg",
    role: "",
    rating: 5,
  },
  {
    id: 13,
    name: "Pramod",
    content:
      "Mentorque completely revamped my profile. They helped me add industry-relevant projects that actually showcase what I can do, rather than just listing skills. The impact was almost immediate; I got multiple interview calls from companies like Landmark Group, Nike, Amazon and many more. If you’re struggling to get noticed by recruiters, the way they help you build your portfolio is a game-changer.",
    avatar: "/Testimonials-People/pramod-testimonial.png",
    role: "Tech Professional",
    rating: 5,
  },
];

/** Shuffle array (Fisher–Yates) and return new array */
export function shuffleTestimonials<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
