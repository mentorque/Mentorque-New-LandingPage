import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  collegeImage: string;
  companyImage: string;
  collegeName?: string;
  companyName?: string;
  linkedinUrl?: string;
}

const teamMembers: TeamMember[] = [
  {
    id: "raajit",
    name: "Raajit",
    role: "Founder",
    photo: "/Team Pics/raajit.png",
    collegeImage: "/Team Colleges/UCC (Raajit).png",
    companyImage: "/Team Companies/Vico Advirsory (Raajit).png",
    collegeName: "UCC",
    companyName: "Vico Advisory",
  },
  {
    id: "shresth",
    name: "Shresth",
    role: "Head of Ops",
    photo: "/Team Pics/shresth.png",
    collegeImage: "/Team Colleges/IIT-Kharagpur (Shresth).png",
    companyImage: "/Team Companies/OLA (Shresth).png",
    collegeName: "IIT Kharagpur",
    companyName: "OLA",
  },
  {
    id: "gokul",
    name: "Gokul",
    role: "Lead Engineer",
    photo: "/Team Pics/gokul.png",
    collegeImage: "/Team Colleges/Dayananda sagar (Gokul).png",
    companyImage: "/Team Companies/Mentorque (Gokul).png",
    collegeName: "Dayananda Sagar",
    companyName: "Mentorque",
  },
  {
    id: "afeef",
    name: "Afeef",
    role: "Growth & Rev Ops",
    photo: "/Team Pics/Afeef.png",
    collegeImage: "/Team Colleges/UCC (Raajit).png",
    companyImage: "/Team Companies/Mentorque (Gokul).png",
    collegeName: "UCC",
    companyName: "Mentorque",
  },
  {
    id: "shikhar",
    name: "Shikhar",
    role: "Growth Head",
    photo: "/Team Pics/shikhar.png",
    collegeImage: "/Team Colleges/IIT Banaras (Shikhar).png",
    companyImage: "/Team Companies/Aramya (Shikhar).png",
    collegeName: "IIT Banaras",
    companyName: "Aramya",
  },
  {
    id: "anchita",
    name: "Anchita",
    role: "Marketing Lead",
    photo: "/Team Pics/anchita.png",
    collegeImage: "/Team Colleges/UCD (Anchita).png",
    companyImage: "/Team Companies/TISS (Anchita).png",
    collegeName: "UCD",
    companyName: "TISS",
  },
  {
    id: "umang",
    name: "Umang",
    role: "Creative Designer",
    photo: "/Team Pics/umang.png",
    collegeImage: "/Team Colleges/Alison Learnings (Umang).png",
    companyImage: "/Team Companies/Autheo (Umang).png",
    collegeName: "Alison Learnings",
    companyName: "Autheo",
  },
  {
    id: "nyai",
    name: "Nyai",
    role: "Leads UI/UX and Marketing",
    photo: "/Team Pics/nyai.png",
    collegeImage: "/Team Colleges/Pearl Academy (Nyai).jpg",
    companyImage: "/Team Companies/Myntra (Nyai).png",
    collegeName: "Pearl Academy",
    companyName: "Myntra",
  },
];

const quotes = [
  "We're not just building a product; we're building futures.",
  "Unlocking possibilities one day at a time.",
  "Empowering the next generation of professionals.",
];

const collegeFullNames: Record<string, string> = {
  UCC: "University College Cork",
  "IIT Banaras": "IIT Banaras",
  "IIT Kharagpur": "IIT Kharagpur",
  "Pearl Academy": "Pearl Academy",
  "Alison Learnings": "Alison Learnings",
  UCD: "University College Dublin",
  "Dayananda Sagar": "Dayananda Sagar Clg of Engineering",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

/* ─── Sub-components ──────────────────────────────────────────── */

const TeamMemberCard = ({ member }: { member: TeamMember }) => (
  <motion.div
    variants={itemVariants}
    className="relative flex flex-col overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300 group"
  >
    {/* Photo */}
    <div className="relative w-full aspect-[3/4] overflow-hidden">
      <img
        src={member.photo}
        alt={member.name}
        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/placeholder.svg";
        }}
      />
      {/* Bottom gradient fade */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
    </div>

    {/* Info */}
    <div className="p-4 flex flex-col gap-2">
      <p className="text-lg font-semibold text-white">{member.name}</p>
      <p className="text-base font-medium text-white/90">{member.role}</p>

      {/* College & company — text only, no logos; no company for Raajit */}
      {member.collegeName && (
        <span className="text-sm font-medium text-white/80">
          {collegeFullNames[member.collegeName] || member.collegeName}
        </span>
      )}
      {member.companyName && member.id !== "raajit" && (
        <span className="text-sm font-medium text-white/80">{member.companyName}</span>
      )}

      {/* LinkedIn */}
      {member.linkedinUrl && (
        <a
          href={member.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 self-start text-white/40 hover:text-blue-400 transition-colors"
          aria-label={`${member.name} LinkedIn`}
        >
          <Linkedin size={16} />
        </a>
      )}
    </div>
  </motion.div>
);

const QuoteCard = ({ quote }: { quote: string }) => (
  <div className="flex-1 min-w-[280px] rounded-2xl border border-white/10 bg-white/5 p-8 flex items-center justify-center">
    <p className="text-center text-white/70 text-lg italic leading-relaxed">
      &ldquo;{quote}&rdquo;
    </p>
  </div>
);

/* ─── Background Layer (fixed, behind everything) ─────────────── */

const BackgroundLayer = () => (
  <div
    aria-hidden="true"
    className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-gradient-to-br from-[#0b1120] via-[#05070d] to-[#020204]"
  >
    {/* Gradient orbs */}
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
    <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
    <div className="absolute bottom-1/4 left-1/2 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl" />

    {/* Gradient overlays */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-950/10 via-transparent to-purple-950/10" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

    {/* Abstract SVG lines */}
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity: 0.3 }}
    >
      <path d="M0,40 Q25,35 50,40 T100,40" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="1.5" fill="none" />
      <line x1="0" y1="0" x2="100" y2="100" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="1.2" />
    </svg>

    {/* Noise texture */}
    <div
      className="absolute inset-0 opacity-[0.02]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "200px 200px",
      }}
    />
  </div>
);

/* ─── Page ────────────────────────────────────────────────────── */

const Team = () => {
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
    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <>
      {/* 1. Fixed decorative background — sits behind the entire page */}
      <BackgroundLayer />

      {/* 2. Page shell — flex column so footer always sticks to bottom */}
      <div className="relative min-h-screen flex flex-col text-white">
        <Navbar />

        {/* 3. Main content — grows to fill available space */}
        <main className="flex-1 flex flex-col">

          {/* ── Hero ── */}
          <section className="py-24 sm:py-28 px-6 sm:px-8 text-center max-w-4xl mx-auto w-full">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
            >
              Team of Dreamers, Doers,
              <br />
              and Everything in Between
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto"
            >
              Meet the brilliant minds behind Mentorque. From prestigious
              colleges to leading companies, we bring diverse expertise to
              transform your career journey.
            </motion.p>
          </section>

          {/* ── Team Grid ── */}
          <section className="px-6 sm:px-8 pb-20 max-w-7xl mx-auto w-full">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10"
            >
              {teamMembers.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </motion.div>
          </section>

          {/* ── Quotes ── */}
          <section className="px-6 sm:px-8 pb-24 max-w-7xl mx-auto w-full">
            <div className="flex flex-wrap gap-6 md:gap-8">
              {quotes.map((quote, i) => (
                <QuoteCard key={i} quote={quote} />
              ))}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Team;