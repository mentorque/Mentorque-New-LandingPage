/**
 * Mentor profiles: name, company, profile image path, company logo (when available), short intro.
 * Profile images from public/mentor's-bg-removed; company logos from public/mentor's-company.
 */

export const MENTORS_IMG_DIR = "/mentor's-bg-removed";
/** Use encoded apostrophe so img src URLs resolve: public/mentor's-company */
export const MENTOR_COMPANY_DIR = "/mentor%27s-company";

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
  Sprinklr: { src: `${MENTOR_COMPANY_DIR}/sprinklr.png`, name: "Sprinklr" },
  "MKO Ireland": { src: `${MENTOR_COMPANY_DIR}/mkoireland.jpeg`, name: "MKO Ireland" },
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
    name: "Tripti Kumari",
    designation: "Senior Software Engineer",
    company: "Sprinklr · Gurugram, India",
    profileImagePath: `${MENTORS_IMG_DIR}/Tripti Kumari.png`,
    companyLogo: { src: `${MENTOR_COMPANY_DIR}/tripti.png`, name: "Sprinklr" },
    intro: "Senior Software Engineer at Sprinklr, Gurugram. Scalable systems and coding interviews.",
  },
  {
    name: "Aditi Dey",
    designation: "Planning Practitioner",
    company: "MKO Ireland · Dublin, Ireland",
    profileImagePath: "/Aditi - mentor.png",
    companyLogo: { src: `${MENTOR_COMPANY_DIR}/aditi.png`, name: "MKO Ireland" },
    intro: "Chartered Urban Planner at MKO Ireland, Dublin. Strategy and engagement; KPMG & UCD Alumni.",
  },
  {
    name: "Adori Medhi",
    designation: "Senior Business Analyst",
    company: "AWS · Dublin, Ireland",
    profileImagePath: `${MENTORS_IMG_DIR}/Adori.png`,
    companyLogo: { src: `${MENTOR_COMPANY_DIR}/adori.png`, name: "AWS" },
    intro: "Senior Business Analyst at AWS, Dublin. Product and business case interviews.",
  },
  {
    name: "Ashwini Harle",
    designation: "SDE",
    company: "Amazon · Pune, India",
    profileImagePath: `${MENTORS_IMG_DIR}/Aswini.png`,
    companyLogo: { src: `${MENTOR_COMPANY_DIR}/ashwini.png`, name: "Amazon" },
    intro: "SDE at Amazon, Pune. DSA, algorithms, and leadership principles.",
  },
  {
    name: "Ayush Shankar",
    designation: "Recruitment Officer",
    company: "HSE · Dublin, Ireland",
    profileImagePath: `${MENTORS_IMG_DIR}/Ayush Shankar.png`,
    companyLogo: { src: `${MENTOR_COMPANY_DIR}/ayush.png`, name: "HSE" },
    intro: "Recruitment Officer at HSE, Dublin. Hiring and interview best practices.",
  },
  {
    name: "Agniva Dutta",
    designation: "Senior Software Engineer",
    company: "Microsoft · Hyderabad, India",
    profileImagePath: `${MENTORS_IMG_DIR}/Agniva Dutta.png`,
    companyLogo: { src: `${MENTOR_COMPANY_DIR}/agniva.png`, name: "Microsoft" },
    intro: "Senior Software Engineer at Microsoft, Hyderabad. Coding rounds and system design.",
  },
  {
    name: "Aryan Chandna",
    designation: "SDE 2",
    company: "Grappus · New Delhi, India",
    profileImagePath: `${MENTORS_IMG_DIR}/Aryan Chandna.png`,
    companyLogo: { src: `${MENTOR_COMPANY_DIR}/aryan.png`, name: "Grappus" },
    intro: "SDE 2 at Grappus, New Delhi. Full-stack and front-end interview prep.",
  },
  {
    name: "Abhik Mehta",
    designation: "Software Engineer",
    company: "Stripe · Bengaluru, India",
    profileImagePath: `${MENTORS_IMG_DIR}/Abhik Mehta.png`,
    companyLogo: { src: `${MENTOR_COMPANY_DIR}/abhik.png`, name: "Stripe" },
    intro: "Software Engineer at Stripe, Bengaluru. APIs, payments, and high-bar tech interviews.",
  },
  {
    name: "Pratibha Gowrishankar",
    designation: "HR Business Partner",
    company: "HSE · Dublin, Ireland",
    profileImagePath: `${MENTORS_IMG_DIR}/Pratibha Gowrishankar.png`,
    companyLogo: { src: `${MENTOR_COMPANY_DIR}/prathibha.png`, name: "HSE" },
    intro: "HR Business Partner at HSE, Dublin. Behavioural interviews and career transitions.",
  },
  {
    name: "Harshal Desai",
    designation: "SDE",
    company: "Amazon Web Services (AWS) · Dublin, Ireland",
    profileImagePath: `${MENTORS_IMG_DIR}/Harshal Desai.png`,
    companyLogo: { src: `${MENTOR_COMPANY_DIR}/harshal.png`, name: "AWS" },
    intro: "SDE at AWS, Dublin. DSA and real-world problem-solving for tech roles.",
  },
  {
    name: "Sparsh Prasad",
    designation: "Senior Software Engineer",
    company: "Salesforce · Bengaluru, India",
    profileImagePath: `${MENTORS_IMG_DIR}/Sparsh Prasad.png`,
    companyLogo: { src: `${MENTOR_COMPANY_DIR}/sparsh.png`, name: "Salesforce" },
    intro: "Senior Software Engineer at Salesforce, Bengaluru. Cloud and platform engineering interviews.",
  },
  {
    name: "Nirvan Kashyap",
    designation: "Sales and Marketing",
    company: "Google · Dublin, Ireland",
    profileImagePath: `${MENTORS_IMG_DIR}/Nirvan Kashyap.png`,
    companyLogo: { src: `${MENTOR_COMPANY_DIR}/nirvan.png`, name: "Google" },
    intro: "Sales and Marketing at Google, Dublin. Go-to-market and non-engineering interview paths.",
  },
  {
    name: "Shivanjali Verma",
    designation: "SWE",
    company: "Microsoft · Bengaluru, India",
    profileImagePath: `${MENTORS_IMG_DIR}/Shivanjali Verma.png`,
    companyLogo: { src: `${MENTOR_COMPANY_DIR}/shivanjali.png`, name: "Microsoft" },
    intro: "SWE at Microsoft, Bengaluru. Coding, design, and behavioural rounds for product companies.",
  },
   {
    name: "Gayatri Poddar",
    designation: "Data Scientist",
    company: "Optum · Dublin, Ireland",
    profileImagePath: `${MENTORS_IMG_DIR}/Gayatri Poddar.png`,
    companyLogo: { src: `${MENTOR_COMPANY_DIR}/gayatri.png`, name: "Optum" },
    intro: "Data Scientist at Optum, Dublin. Data and analytics for decision-making.",
  },
  {
    name: "Akash Anand",
    designation: "Senior Software Engineer",
    company: "Samsung · Bengaluru, India",
    profileImagePath: `${MENTORS_IMG_DIR}/Akash Anand.png`,
    companyLogo: { src: `${MENTOR_COMPANY_DIR}/aakash.png`, name: "Samsung" },
    intro: "Senior Software Engineer at Samsung, Bengaluru. System design and backend roles.",
  },
];
