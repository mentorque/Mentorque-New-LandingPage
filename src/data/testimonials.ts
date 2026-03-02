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
    id: 9,
    name: "Sree Laxmi",
    content:
      "After six months with no interview calls, I heard back from Optum, Amazon, and eBay within two weeks of joining Mentorque and landed a Vodafone Order Analyst role.",
    avatar: "/Testimonials-People/sreelaxmi-testimonial.jpeg",
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
      "Working with the team helped me land multiple interview calls in a week using their strategies and automation tools to find and connect with HRs. Highly recommended if you want a faster breakthrough in a tough job market.",
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
    id: 15,
    name: "Debmalya Das",
    content:
      "Few sessions with Agniva and Raajit saved me months of trial and error. Would highly recommend for getting calls faster!",
    avatar: "/3.jpeg",
    role: "",
    rating: 5,
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
      "The mock interviews with Raajit and Agniva were crucial in securing my internship offer.",
    avatar: "/rigved.jpeg",
    role: "",
    rating: 5,
  },
  {
    id: 13,
    name: "Pramod",
    content:
      "Mentorque revamped my profile and added industry-relevant projects that showcased my skills. Soon after, I received interview calls from Landmark Group, Alaan Pay, and Intervue.io.",
    avatar: "/Testimonials-People/pramod-testimonial.png",
    role: "Tech Professional",
    rating: 5,
  },
  {
    id: 2,
    name: "Komal Joshi",
    content:
      "Biotechnology and Business Strategy professional with expertise in bridging technical innovation and business growth in the Biotechnology and Pharmaceutical industries. Skilled in business strategy, market analysis, and financial forecasting, with hands-on experience in development and strategic planning.",
    avatar: "/Testimonials-People/koaml-joshi.png",
    role: "Biotechnology and Business Strategy Professional",
    rating: 5,
  },
  {
    id: 3,
    name: "Snehashish",
    content:
      "What was corrected: A complete rebuild of his profile with industry-relevant projects, clear application and interview strategy, and repeated mock coding interviews to reach technical readiness. Outcome: Progressed through multiple technical interview rounds for different companies, and secured a full-time role.",
    avatar: "/Testimonials-People/snehashish.png",
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
