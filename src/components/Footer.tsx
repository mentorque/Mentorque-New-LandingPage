import { Mail, Phone, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-black border-t border-white/10">
      <div className="section-container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between gap-3 sm:gap-4 md:gap-6 text-white py-3 sm:py-4">

          {/* Brand Info */}
          <div className="flex flex-col gap-1 sm:gap-1.5">
            <h2 className="text-lg sm:text-xl font-bold">Mentorque</h2>
            <p className="text-xs sm:text-sm text-gray-400 max-w-sm leading-snug">
              Mentorque is an end to end job hunt program engineered to help professionals land and clear interviews faster.
            </p>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-sm sm:text-base font-semibold mb-1 sm:mb-1.5">Contact Us</h3>
            <ul className="text-xs sm:text-sm text-gray-300 space-y-0.5 sm:space-y-1">
              <li className="flex items-center gap-2">
                <Mail size={14} className="sm:w-4 sm:h-4" /> 
                <a 
                  href="mailto:info@mentorquedu.com" 
                  className="hover:text-white transition-colors break-all"
                >
                  info@mentorquedu.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="sm:w-4 sm:h-4" /> 
                <a 
                  href="tel:+918486242054" 
                  className="hover:text-white transition-colors"
                >
                  +91 8486242054
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-sm sm:text-base font-semibold mb-1 sm:mb-1.5">Follow Us</h3>
            <div className="flex gap-2 sm:gap-3">
              <a 
                href="https://www.linkedin.com/company/mentorquedu/" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn" 
                className="hover:opacity-80 transition-opacity"
              >
                <Linkedin size={20} className="sm:w-6 sm:h-6" color="white" />
              </a>
              <a 
                href="https://www.instagram.com/mentorquedu/?igsh=bmlic3didDBvemNs#" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram" 
                className="hover:opacity-80 transition-opacity"
              >
                <Instagram size={20} className="sm:w-6 sm:h-6" color="white" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="text-center text-xs text-gray-500 border-t border-white/10 py-2">
          © 2025 Mentorque. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;