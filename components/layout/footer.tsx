import React from "react";
import { Container, Stack } from "./index";
import { CompanyLogo, SocialIcons } from "@/components/shared/utilities";
import { companyConfig } from "@/config/company";
import { navigationConfig } from "@/config/navigation";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin } from "lucide-react";

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

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-border pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Company Info */}
          <div className="space-y-6">
            <CompanyLogo />
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed pr-4">
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
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/powermetz.in"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href="https://maps.app.goo.gl/BoqdPCddBx2t1rdq8"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <MapPin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Solutions Column */}
          <div className="space-y-6">
            <h4 className="font-headings font-semibold text-xl md:text-2xl text-foreground tracking-tight">
              Solutions
            </h4>
            <div className="space-y-4 flex flex-col">
              <a
                href="/products/residential-energy-storage"
                className="text-base md:text-lg text-muted-foreground hover:text-primary transition-colors"
              >
                Residential Energy Storage
              </a>
              <a
                href="/products/rack-mounted-bess"
                className="text-base md:text-lg text-muted-foreground hover:text-primary transition-colors"
              >
                Rack Mounted BESS
              </a>
              <a
                href="/products/ups-battery-systems"
                className="text-base md:text-lg text-muted-foreground hover:text-primary transition-colors"
              >
                UPS Battery Systems
              </a>
              <a
                href="/products/containerized-bess"
                className="text-base md:text-lg text-muted-foreground hover:text-primary transition-colors"
              >
                Containerized BESS
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-6">
            <h4 className="font-headings font-semibold text-xl md:text-2xl text-foreground tracking-tight">
              Quick Links
            </h4>
            <div className="space-y-4 flex flex-col">
              {navigationConfig.mainNav.map((item) => (
                <a
                  key={item.title}
                  href={item.href || "#"}
                  className="text-base md:text-lg text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.title}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Column */}
          <div className="space-y-6">
            <h4 className="font-headings font-semibold text-xl md:text-2xl text-foreground tracking-tight">
              Contact Us
            </h4>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground flex flex-col">
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
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-border/50 text-base md:text-lg text-muted-foreground">
          <p>
            © {new Date().getFullYear()} PowerMetz Energy. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
            <a href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
            {/* Empty array placeholder for social links, to be configured later */}
            <SocialIcons links={[]} />
          </div>
        </div>
      </Container>
    </footer>
  );
};
