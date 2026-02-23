import { useState, useCallback, useMemo } from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import DisplayCards from "@/components/ui/display-cards";
import { Target, FileX, Users } from "lucide-react";
import "@/bookcall.css";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxqe3h-H7hyZRFtcdY81UFpi-mPNyLmYbXGmz63RlTPJrmhsT8e4hf0tnl1ay8HZr0zig/exec";

const INITIAL_FORM_DATA = {
  name: "",
  email: "",
  contactNumber: "",
  occupation: "",
};

const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone: string) => /^[\d\s\-+()]{10,}$/.test(phone);

const BOOK_CALL_CARDS = [
  {
    icon: <Target className="w-8 h-8" />,
    title: "Land your next high-paying job",
    description: "",
    date: "Get started",
    iconClassName: "text-emerald-500",
    titleClassName: "text-emerald-400",
    className:
      "[grid-area:stack] before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-neutral-600 before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-black/50 grayscale-[100%] before:transition-opacity before:duration-700 before:left-0 before:top-0 hover:before:opacity-0 hover:grayscale-0 hover:-translate-y-10 border-neutral-600 bg-neutral-800/70 text-neutral-200 [&_p]:text-neutral-300",
    activeClassName: "-translate-y-10 before:opacity-0 grayscale-0",
  },
  {
    icon: <FileX className="w-8 h-8" />,
    title: "Ditch the resume that doesn't land interviews",
    description: "",
    date: "Resume + strategy",
    iconClassName: "text-amber-500",
    titleClassName: "text-amber-400",
    className:
      "[grid-area:stack] translate-x-16 translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-neutral-600 before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-black/50 grayscale-[100%] before:transition-opacity before:duration-700 before:left-0 before:top-0 hover:before:opacity-0 hover:grayscale-0 hover:-translate-y-1 border-neutral-600 bg-neutral-800/70 text-neutral-200 [&_p]:text-neutral-300",
    activeClassName: "-translate-y-1 before:opacity-0 grayscale-0",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Get mentored by Mentorque from top mentors",
    description: "",
    date: "Start free",
    iconClassName: "text-violet-500",
    titleClassName: "text-violet-400",
    className:
      "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10 border-neutral-600 bg-neutral-800/70 text-neutral-200 [&_p]:text-neutral-300",
    activeClassName: "translate-y-10",
  },
];

function BookCall() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isFormValid = useMemo(() => {
    const { name, email, contactNumber } = formData;
    return (
      name.trim().length >= 2 &&
      validateEmail(email.trim()) &&
      validatePhone(contactNumber.trim())
    );
  }, [formData]);

  const validateField = useCallback(
    (name: string, value: string) => {
      const newErrors = { ...errors };
      switch (name) {
        case "name":
          if (value.trim().length < 2) {
            newErrors.name = "Name must be at least 2 characters";
          } else {
            delete newErrors.name;
          }
          break;
        case "email":
          if (!validateEmail(value.trim())) {
            newErrors.email = "Please enter a valid email";
          } else {
            delete newErrors.email;
          }
          break;
        case "contactNumber":
          if (!validatePhone(value.trim())) {
            newErrors.contactNumber = "Please enter a valid phone number";
          } else {
            delete newErrors.contactNumber;
          }
          break;
      }
      setErrors(newErrors);
    },
    [errors]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (value.trim().length > 0 || errors[name]) {
        validateField(name, value);
      }
    },
    [validateField, errors]
  );

  const handleSubmit = useCallback(async () => {
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        contactNumber: formData.contactNumber.trim(),
        occupation: formData.occupation.trim(),
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      void fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      setTimeout(() => {
        setShowSuccess(true);
        setSubmitStatus("success");
      }, 2000);

      setFormData(INITIAL_FORM_DATA);
      setErrors({});

      setTimeout(() => {
        setShowSuccess(false);
        setSubmitStatus("");
      }, 3000);
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, isFormValid, isSubmitting]);

  const handleCloseSuccess = useCallback(() => {
    setShowSuccess(false);
    setSubmitStatus("");
  }, []);

  const getInputClassName = useCallback(
    (fieldName: string) => {
      const base =
        "w-full px-5 py-4 text-base rounded-2xl border-2 bg-neutral-900/90 text-neutral-100 placeholder-neutral-500 outline-none transition-all duration-200 focus:ring-2 focus:ring-neutral-400/30 focus:border-neutral-400";
      const hasError = errors[fieldName];
      if (hasError) {
        return `${base} border-red-500/60 focus:border-red-400`;
      }
      return `${base} border-neutral-600 hover:border-neutral-500 focus:border-neutral-400`;
    },
    [errors]
  );

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-neutral-950">
      <BackgroundBeams className="absolute inset-0" />

      {/* Blue gradient edges */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-blue-500/10" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1400px] flex-col gap-12 px-6 py-12 lg:flex-row lg:gap-16 lg:px-12 lg:py-20">
        {/* Left 60% — Heading + DisplayCards */}
        <div className="hidden w-full flex-col justify-center lg:flex lg:w-[60%]">
          <div className="flex flex-col gap-20 items-start -mt-40 xl:-mt-48">
            <h1 className="text-5xl font-bold leading-tight text-neutral-100 xl:text-6xl">
              We help you land the role you{" "}
              <span className="text-blue-400 font-extrabold">deserve.</span>
            </h1>
            <div className="w-full max-w-3xl -ml-24 lg:-ml-32 xl:-ml-40 mt-8 origin-left scale-[1.3]">              <DisplayCards cards={BOOK_CALL_CARDS} />
            </div>
          </div>
        </div>

        {/* Right 40% — Form */}
        <div className="flex w-full items-center justify-center lg:w-[40%]">
          <div className="w-full max-w-md rounded-3xl border border-neutral-700 bg-neutral-900/80 p-8 shadow-2xl backdrop-blur-md lg:p-10">
            <div className="mb-8 flex items-center justify-center gap-3">
              <img
                src="/mentorque-logo.png"
                alt=""
                className="h-9 w-auto object-contain sm:h-10"
              />
              <h2 className="text-3xl font-bold text-neutral-100">
                Mentorque
              </h2>
            </div>

            <div className="space-y-5">
              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-300">
                  Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={getInputClassName("name")}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-400">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-300">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={getInputClassName("email")}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              {/* Contact number */}
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-300">
                  Contact number <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className={getInputClassName("contactNumber")}
                  placeholder="+1 (555) 000-0000"
                />
                {errors.contactNumber && (
                  <p className="mt-2 text-sm text-red-400">{errors.contactNumber}</p>
                )}
              </div>

              {/* Occupation */}
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-300">
                  Occupation
                </label>
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  className={getInputClassName("occupation")}
                  placeholder="Software Engineer, Designer, etc."
                />
              </div>

              {/* Submit button */}
              <button
                onClick={handleSubmit}
                disabled={!isFormValid || isSubmitting}
                className="relative mt-6 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting && (
                  <span className="absolute inset-0 flex items-center justify-center bg-blue-600">
                    <svg
                      className="h-5 w-5 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  </span>
                )}
                {isSubmitting ? (
                  <>
                    <span className="invisible">Opening doors...</span>
                  </>
                ) : (
                  <>
                    <span>Start for Free</span>
                  </>
                )}
              </button>

              {submitStatus === "error" && (
                <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-center text-sm text-red-400">
                  Something went wrong. Please try again.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Success modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-md rounded-3xl border border-neutral-700 bg-neutral-900 p-8 shadow-2xl">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-emerald-500/20 p-4">
                <svg
                  className="h-12 w-12 text-emerald-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <h3 className="mb-3 text-center text-2xl font-bold text-neutral-100">
              Application Submitted!
            </h3>
            <p className="mb-8 text-center text-neutral-400">
              We'll get back to you within 24 hours.
            </p>
            <button
              onClick={handleCloseSuccess}
              className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 font-semibold text-white transition-all hover:shadow-lg"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookCall;