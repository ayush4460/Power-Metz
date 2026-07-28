import React from "react";
import { Container, Section } from "@/components/layout";
import { H2, Lead } from "@/components/ui/typography";
import { Reveal } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { homeContent } from "@/content/home";
import { ArrowRight } from "lucide-react";

export const CTASection = () => {
  const { headline, subheadline, primaryBtn, secondaryBtn } = homeContent.cta;

  return (
    <Section className="bg-slate-900 relative overflow-hidden text-center z-10 py-16 md:py-24 lg:py-32">
      {/* Subtle noise/texture for the dark section */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('/noise.png')]" />

      <Container className="relative z-10">
        <Reveal direction="up" duration={0.8}>
          <div className="text-primary font-semibold text-sm md:text-base tracking-widest uppercase text-center mb-4">
            GET IN TOUCH
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 font-headings max-w-4xl mx-auto text-center">
            {headline}
          </h2>
        </Reveal>

        <Reveal direction="up" delay={0.1} duration={0.8}>
          <p className="text-base md:text-lg lg:text-xl text-slate-400 leading-relaxed font-light text-center max-w-2xl mx-auto mb-12">
            {subheadline}
          </p>
        </Reveal>

        <Reveal direction="up" delay={0.2} duration={1}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            <a
              href="mailto:business@metzbattery.in"
              className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                className="w-full h-14 px-8 text-base group bg-primary hover:bg-primary/90 text-white transition-all duration-300 rounded-full border-0"
              >
                {primaryBtn}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </a>
            <a
              href="/powermetx products.pdf"
              download
              className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                variant="outline"
                className="w-full h-14 px-8 text-base border-slate-700 bg-transparent text-white hover:bg-white hover:text-slate-900 transition-all duration-300 rounded-full"
              >
                {secondaryBtn}
              </Button>
            </a>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
};
