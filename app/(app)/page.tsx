import { HeroSection } from "@/components/home/hero-section";
import { IntroSection } from "@/components/home/intro-section";
import { ProductsSection } from "@/components/home/products-section";
import { ProcessSection } from "@/components/home/process-section";
import { QualitySection } from "@/components/home/quality-section";
import { IndustriesSection } from "@/components/home/industries-section";
import { ProjectsSection } from "@/components/home/projects-section";
import { StatsSection } from "@/components/home/stats-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { InsightsSection } from "@/components/home/insights-section";
import { CertificationsSection } from "@/components/home/certifications-section";
import { CTASection } from "@/components/home/cta-section";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <IntroSection />
      <ProductsSection />
      <ProcessSection />
      <QualitySection />
      <IndustriesSection />
      <ProjectsSection />
      <StatsSection />
      <TestimonialsSection />
      <InsightsSection />
      <CertificationsSection />
      <CTASection />
    </div>
  );
}
