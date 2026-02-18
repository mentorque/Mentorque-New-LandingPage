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
    intro: "Senior Data Scientist at Optum, Dublin. Focuses on data and analytics to drive decisions.",
  },
  {
    name: "Tripti Kumari",
    designation: "Senior Software Engineer",
    company: "Sprinklr · Gurugram, India",
    profileImagePath: `${MENTORS_IMG_DIR}/Tripti Kumari.png`,
    companyLogo: COMPANY_LOGOS.Amazon,
    intro: "Senior Software Engineer at Sprinklr, Gurugram. Builds scalable systems and mentors on coding interviews.",
  },
  {
    name: "Akash Anand",
    designation: "Senior Software Engineer",
    company: "Samsung · Bengaluru, India",
    profileImagePath: `${MENTORS_IMG_DIR}/Akash Anand.png`,
    companyLogo: COMPANY_LOGOS.Samsung,
    intro: "Senior Software Engineer at Samsung, Bengaluru. Helps with system design and backend roles.",
  },
  {
    name: "Adori Medhi",
    designation: "Senior Business Analyst",
    company: "AWS · Dublin, Ireland",
    profileImagePath: `${MENTORS_IMG_DIR}/Adori.png`,
    companyLogo: COMPANY_LOGOS.AWS,
    intro: "Senior Business Analyst at AWS, Dublin. Guides on product and business case interviews.",
  },
  {
    name: "Ashwini Harle",
    designation: "SDE",
    company: "Amazon · Pune, India",
    profileImagePath: `${MENTORS_IMG_DIR}/Aswini.png`,
    companyLogo: COMPANY_LOGOS.Amazon,
    intro: "SDE at Amazon, Pune. Mentors on data structures, algorithms, and Amazon’s leadership principles.",
  },
  {
    name: "Ayush Shankar",
    designation: "Recruitment Officer",
    company: "HSE · Dublin, Ireland",
    profileImagePath: `${MENTORS_IMG_DIR}/Ayush Shankar.png`,
    intro: "Recruitment Officer at HSE, Dublin. Shares hiring and interview best practices from the other side of the table.",
  },
  {
    name: "Agniva Dutta",
    designation: "Senior Software Engineer",
    company: "Microsoft · Hyderabad, India",
    profileImagePath: `${MENTORS_IMG_DIR}/Agniva Dutta.png`,
    companyLogo: COMPANY_LOGOS.Microsoft,
    intro: "Senior Software Engineer at Microsoft, Hyderabad. Helps with coding rounds and system design.",
  },
  {
    name: "Aryan Chandna",
    designation: "SDE 2",
    company: "Grappus · New Delhi, India",
    profileImagePath: `${MENTORS_IMG_DIR}/Aryan Chandna.png`,
    companyLogo: COMPANY_LOGOS.Grappus,
    intro: "SDE 2 at Grappus, New Delhi. Focuses on full-stack and front-end interview prep.",
  },
  {
    name: "Abhik Mehta",
    designation: "Software Engineer",
    company: "Stripe · Bengaluru, India",
    profileImagePath: `${MENTORS_IMG_DIR}/Abhik Mehta.png`,
    companyLogo: COMPANY_LOGOS.Stripe,
    intro: "Software Engineer at Stripe, Bengaluru. Mentors on APIs, payments, and high-bar tech interviews.",
  },
  {
    name: "Pratibha Gowrishankar",
    designation: "HR Business Partner",
    company: "HSE · Dublin, Ireland",
    profileImagePath: `${MENTORS_IMG_DIR}/Pratibha Gowrishankar.png`,
    companyLogo: COMPANY_LOGOS["Canada Life"],
    intro: "HR Business Partner at HSE, Dublin. Supports with behavioural interviews and career transitions.",
  },
  {
    name: "Harshal Desai",
    designation: "SDE",
    company: "Sapiens · Bengaluru, India",
    profileImagePath: `${MENTORS_IMG_DIR}/Harshal Desai.png`,
    intro: "SDE at Sapiens, Bengaluru. Helps with DSA and real-world problem-solving for tech roles.",
  },
  {
    name: "Sparsh Prasad",
    designation: "Senior Software Engineer",
    company: "Salesforce · Bengaluru, India",
    profileImagePath: `${MENTORS_IMG_DIR}/Sparsh Prasad.png`,
    companyLogo: COMPANY_LOGOS.Salesforce,
    intro: "Senior Software Engineer at Salesforce, Bengaluru. Guides on cloud and platform engineering interviews.",
  },
  {
    name: "Nirvan Kashyap",
    designation: "Sales and Marketing",
    company: "Google · Dublin, Ireland",
    profileImagePath: `${MENTORS_IMG_DIR}/Nirvan Kashyap.png`,
    companyLogo: COMPANY_LOGOS.Google,
    intro: "Sales and Marketing at Google, Dublin. Mentors on go-to-market and non-engineering interview paths.",
  },
  {
    name: "Shivanjali Verma",
    designation: "SWE",
    company: "Microsoft · Bengaluru, India",
    profileImagePath: `${MENTORS_IMG_DIR}/Shivanjali Verma.png`,
    companyLogo: COMPANY_LOGOS.Microsoft,
    intro: "SWE at Microsoft, Bengaluru. Focuses on coding, design, and behavioural rounds for product companies.",
  },
  {
    name: "Shayak Das",
    designation: "Senior Software Engineer",
    company: "AWS · Dublin, Ireland",
    profileImagePath: `${MENTORS_IMG_DIR}/Shayak Das.png`,
    companyLogo: COMPANY_LOGOS.AWS,
    intro: "Senior Software Engineer at AWS, Dublin. Helps with distributed systems and cloud-focused interviews.",
  },
];
