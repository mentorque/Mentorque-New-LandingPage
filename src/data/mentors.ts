/**
 * Mentor profiles: name, company, profile image path, company logo (when available), short intro.
 * Profile images from public/mentor's-bg-removed; company logos from public/mentor's-company.
 */

export const MENTORS_IMG_DIR = "/mentor's-bg-removed";
export const MENTOR_COMPANY_DIR = "/mentor's-company";

export const COMPANY_LOGOS: Record<string, { src: string; name: string }> = {
  Microsoft: { src: `${MENTOR_COMPANY_DIR}/microsoft.png`, name: "Microsoft" },
  Amazon: { src: `${MENTOR_COMPANY_DIR}/amazon.png`, name: "Amazon" },
  Samsung: { src: `${MENTOR_COMPANY_DIR}/samsung.png`, name: "Samsung" },
  AWS: { src: `${MENTOR_COMPANY_DIR}/aws.png`, name: "AWS" },
  Stripe: { src: `${MENTOR_COMPANY_DIR}/stripe.png`, name: "Stripe" },
  Salesforce: { src: `${MENTOR_COMPANY_DIR}/salesforce.png`, name: "Salesforce" },
  Grappus: { src: `${MENTOR_COMPANY_DIR}/grappus.png`, name: "Grappus" },
  Optum: { src: `${MENTOR_COMPANY_DIR}/optum.png`, name: "Optum" },
  "Canada Life": { src: `${MENTOR_COMPANY_DIR}/canada-life.png`, name: "Canada Life" },
  Google: { src: `${MENTOR_COMPANY_DIR}/google.png`, name: "Google" },
};

export type Mentor = {
  name: string;
  designation: string;
  company: string;
  profileImagePath: string;
  companyLogo?: { src: string; name: string };
  intro: string;
};

export const MENTORS: Mentor[] = [
  {
    name: "Gayatri Poddar",
    designation: "Senior Data Scientist",
    company: "Optum · Dublin, Ireland",
    profileImagePath: `${MENTORS_IMG_DIR}/Gayatri Poddar.png`,
    companyLogo: COMPANY_LOGOS.Optum,
    intro: "Senior Data Scientist at Optum, Dublin. Data and analytics for decision-making.",
  },
  {
    name: "Tripti Kumari",
    designation: "Senior Software Engineer",
    company: "Sprinklr · Gurugram, India",
    profileImagePath: `${MENTORS_IMG_DIR}/Tripti Kumari.png`,
    companyLogo: COMPANY_LOGOS.Amazon,
    intro: "Senior Software Engineer at Sprinklr, Gurugram. Scalable systems and coding interviews.",
  },
  {
    name: "Akash Anand",
    designation: "Senior Software Engineer",
    company: "Samsung · Bengaluru, India",
    profileImagePath: `${MENTORS_IMG_DIR}/Akash Anand.png`,
    companyLogo: COMPANY_LOGOS.Samsung,
    intro: "Senior Software Engineer at Samsung, Bengaluru. System design and backend roles.",
  },
  {
    name: "Adori Medhi",
    designation: "Senior Business Analyst",
    company: "AWS · Dublin, Ireland",
    profileImagePath: `${MENTORS_IMG_DIR}/Adori.png`,
    companyLogo: COMPANY_LOGOS.AWS,
    intro: "Senior Business Analyst at AWS, Dublin. Product and business case interviews.",
  },
  {
    name: "Ashwini Harle",
    designation: "SDE",
    company: "Amazon · Pune, India",
    profileImagePath: `${MENTORS_IMG_DIR}/Aswini.png`,
    companyLogo: COMPANY_LOGOS.Amazon,
    intro: "SDE at Amazon, Pune. DSA, algorithms, and leadership principles.",
  },
  {
    name: "Ayush Shankar",
    designation: "Recruitment Officer",
    company: "HSE · Dublin, Ireland",
    profileImagePath: `${MENTORS_IMG_DIR}/Ayush Shankar.png`,
    intro: "Recruitment Officer at HSE, Dublin. Hiring and interview best practices.",
  },
  {
    name: "Agniva Dutta",
    designation: "Senior Software Engineer",
    company: "Microsoft · Hyderabad, India",
    profileImagePath: `${MENTORS_IMG_DIR}/Agniva Dutta.png`,
    companyLogo: COMPANY_LOGOS.Microsoft,
    intro: "Senior Software Engineer at Microsoft, Hyderabad. Coding rounds and system design.",
  },
  {
    name: "Aryan Chandna",
    designation: "SDE 2",
    company: "Grappus · New Delhi, India",
    profileImagePath: `${MENTORS_IMG_DIR}/Aryan Chandna.png`,
    companyLogo: COMPANY_LOGOS.Grappus,
    intro: "SDE 2 at Grappus, New Delhi. Full-stack and front-end interview prep.",
  },
  {
    name: "Abhik Mehta",
    designation: "Software Engineer",
    company: "Stripe · Bengaluru, India",
    profileImagePath: `${MENTORS_IMG_DIR}/Abhik Mehta.png`,
    companyLogo: COMPANY_LOGOS.Stripe,
    intro: "Software Engineer at Stripe, Bengaluru. APIs, payments, and high-bar tech interviews.",
  },
  {
    name: "Pratibha Gowrishankar",
    designation: "HR Business Partner",
    company: "HSE · Dublin, Ireland",
    profileImagePath: `${MENTORS_IMG_DIR}/Pratibha Gowrishankar.png`,
    companyLogo: COMPANY_LOGOS["Canada Life"],
    intro: "HR Business Partner at HSE, Dublin. Behavioural interviews and career transitions.",
  },
  {
    name: "Harshal Desai",
    designation: "SDE",
    company: "Sapiens · Bengaluru, India",
    profileImagePath: `${MENTORS_IMG_DIR}/Harshal Desai.png`,
    intro: "SDE at Sapiens, Bengaluru. DSA and real-world problem-solving for tech roles.",
  },
  {
    name: "Sparsh Prasad",
    designation: "Senior Software Engineer",
    company: "Salesforce · Bengaluru, India",
    profileImagePath: `${MENTORS_IMG_DIR}/Sparsh Prasad.png`,
    companyLogo: COMPANY_LOGOS.Salesforce,
    intro: "Senior Software Engineer at Salesforce, Bengaluru. Cloud and platform engineering interviews.",
  },
  {
    name: "Nirvan Kashyap",
    designation: "Sales and Marketing",
    company: "Google · Dublin, Ireland",
    profileImagePath: `${MENTORS_IMG_DIR}/Nirvan Kashyap.png`,
    companyLogo: COMPANY_LOGOS.Google,
    intro: "Sales and Marketing at Google, Dublin. Go-to-market and non-engineering interview paths.",
  },
  {
    name: "Shivanjali Verma",
    designation: "SWE",
    company: "Microsoft · Bengaluru, India",
    profileImagePath: `${MENTORS_IMG_DIR}/Shivanjali Verma.png`,
    companyLogo: COMPANY_LOGOS.Microsoft,
    intro: "SWE at Microsoft, Bengaluru. Coding, design, and behavioural rounds for product companies.",
  },
  {
    name: "Shayak Das",
    designation: "Senior Software Engineer",
    company: "AWS · Dublin, Ireland",
    profileImagePath: `${MENTORS_IMG_DIR}/Shayak Das.png`,
    companyLogo: COMPANY_LOGOS.AWS,
    intro: "Senior Software Engineer at AWS, Dublin. Distributed systems and cloud-focused interviews.",
  },
];
