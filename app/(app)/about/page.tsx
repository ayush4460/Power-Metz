import { Metadata } from "next";
import { HeroSection } from "@/components/about/hero-section";
import { CompanySnapshot } from "@/components/about/company-snapshot";
import { CompanyOverview } from "@/components/about/company-overview";
import { CertificationsSection } from "@/components/about/certifications-section";
import { WhyChoose } from "@/components/about/why-choose";
import { OurJourneyVision } from "@/components/about/our-journey-vision";
import { FounderSection } from "@/components/about/founder-section";
import { MissionVision } from "@/components/about/mission-vision";
import { CTASection } from "@/components/about/cta-section";

export const metadata: Metadata = {
  title: "About Us | Battery Energy Storage System Manufacturer | PowerMetz",
  description: "PowerMetz designs and manufactures Battery Energy Storage Systems engineered for commercial, industrial and utility-scale applications, combining intelligent battery management, advanced lithium battery technology and robust engineering practices.",
};

export default function AboutPage() {
  return (
    <main className="bg-background overflow-x-hidden">
      <HeroSection />
      <CompanySnapshot />
      <CompanyOverview />
      <WhyChoose />
      <OurJourneyVision />
      <FounderSection />
      <MissionVision />
      <CertificationsSection />
      <CTASection />
    </main>
  );
}
