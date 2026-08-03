import React from "react";
import { Container } from "./index";
import { CompanyLogo, SocialIcons } from "@/components/shared/utilities";
import { companyConfig } from "@/config/company";
import { navigationConfig } from "@/config/navigation";
import { Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { AnimatedLandscape } from "./animated-landscape";

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const StarsBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        .star { animation: twinkle 4s ease-in-out infinite alternate; }
        .star-fast { animation: twinkle 2s ease-in-out infinite alternate; }
        .star-slow { animation: twinkle 6s ease-in-out infinite alternate; }
        @keyframes twinkle {
          0% { opacity: 0.1; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
      <g fill="#ffffff">
        {/* Generate a fixed array of stars for a galaxy effect */}
        {[...Array(60)].map((_, i) => {
          // Deterministic pseudo-random generation for stable rendering
          const x = (Math.sin(i * 13) * 0.5 + 0.5) * 100;
          const y = (Math.cos(i * 17) * 0.5 + 0.5) * 60; // Keep mostly in top 60%
          const size = (Math.sin(i * 19) * 0.5 + 0.5) * 1.5 + 0.5;
          const opacity = (Math.cos(i * 23) * 0.5 + 0.5) * 0.8 + 0.2;
          const animClass = i % 3 === 0 ? "star-fast" : i % 2 === 0 ? "star-slow" : "star";
          const delay = (i % 5) * -1.5;
          
          return (
            <circle
              key={i}
              cx={`${x}%`}
              cy={`${y}%`}
              r={size}
              opacity={opacity}
              className={animClass}
              style={{ animationDelay: `${delay}s`, transformOrigin: `${x}% ${y}%` }}
            />
          );
        })}
      </g>
    </svg>
  </div>
);

export const Footer = () => {
  return (
    <footer 
      className="relative overflow-hidden pt-16 border-t-0"
      style={{ background: "linear-gradient(180deg, #1A2634 0%, #354B5E 40%, #54748A 75%, #769BAE 100%)" }}
    >
      <StarsBackground />

      <Container className="relative z-10 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Company Info */}
          <div className="space-y-6">
            <CompanyLogo className="text-white" />
            <p className="text-base md:text-lg text-white/80 leading-relaxed pr-4">
              PowerMetz is an Indian manufacturer of intelligent Battery Energy
              Storage Systems, delivering reliable LFP battery solutions for
              industrial, commercial, solar and grid-connected energy
              applications.
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href="https://www.linkedin.com/company/powermetz-energy-private-limited"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary transition-colors"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/powermetz.in"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary transition-colors"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href={`tel:${companyConfig.phone.replace(/[^+\d]/g, "")}`}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary transition-colors"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${companyConfig.email}`}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://maps.app.goo.gl/BoqdPCddBx2t1rdq8"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary transition-colors"
              >
                <MapPin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Solutions Column */}
          <div className="space-y-6">
            <h4 className="font-headings font-semibold text-xl md:text-2xl text-primary tracking-tight">
              Solutions
            </h4>
            <div className="space-y-4 flex flex-col">
              <Link
                href="/products/bess"
                className="text-base md:text-lg text-white/80 hover:text-primary transition-colors"
              >
                BESS
              </Link>
              <Link
                href="/products/ess"
                className="text-base md:text-lg text-white/80 hover:text-primary transition-colors"
              >
                ESS
              </Link>
              <Link
                href="/products/ups-data-center"
                className="text-base md:text-lg text-white/80 hover:text-primary transition-colors"
              >
                UPS / DATA CENTER BATTERY
              </Link>
              <Link
                href="/products/oems-customised"
                className="text-base md:text-lg text-white/80 hover:text-primary transition-colors"
              >
                OEMS CUSTOMISED
              </Link>
              <Link
                href="/products/ev-traction"
                className="text-base md:text-lg text-white/80 hover:text-primary transition-colors"
              >
                EV / TRACTION BATTERY SOLUTION
              </Link>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-6">
            <h4 className="font-headings font-semibold text-xl md:text-2xl text-primary tracking-tight">
              Quick Links
            </h4>
            <div className="space-y-4 flex flex-col">
              {navigationConfig.mainNav.map((item) => (
                <Link
                  key={item.title}
                  href={item.href || "#"}
                  className="text-base md:text-lg text-white/80 hover:text-primary transition-colors"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Column */}
          <div className="space-y-6">
            <h4 className="font-headings font-semibold text-xl md:text-2xl text-primary tracking-tight">
              Contact Us
            </h4>
            <div className="space-y-5 text-base md:text-lg text-white/80 flex flex-col">
              <a
                href={`tel:${companyConfig.phone.replace(/[^+\d]/g, "")}`}
                className="flex items-center gap-3 hover:text-primary transition-colors group"
              >
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>{companyConfig.phone}</span>
              </a>
              <a
                href={`mailto:${companyConfig.email}`}
                className="flex items-center gap-3 hover:text-primary transition-colors group"
              >
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>{companyConfig.email}</span>
              </a>
              <a
                href="https://maps.app.goo.gl/BoqdPCddBx2t1rdq8"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 hover:text-primary transition-colors group"
              >
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span className="leading-relaxed">{companyConfig.address}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/20 text-base md:text-lg text-white/70">
          <p>
            © {new Date().getFullYear()} PowerMetz Energy. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            {/* Empty array placeholder for social links, to be configured later */}
            <SocialIcons links={[]} />
          </div>
        </div>
      </Container>
      
      {/* Dynamic Background Landscape (Very bottom) */}
      <AnimatedLandscape className="w-full pointer-events-none block mt-4" />
    </footer>
  );
};
