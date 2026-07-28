"use client";

import { motion } from "framer-motion";
import { Container, Section } from "@/components/layout";
import { Reveal } from "@/components/motion";

const steps = [
  {
    num: "2022",
    title: "The Foundation",
    desc: "Established with a singular focus: to solve the critical energy storage bottleneck in India's green transition.",
  },
  {
    num: "2023",
    title: "The Growing Demand",
    desc: "Recognizing that intermittent renewable energy requires scalable, utility-scale storage to manage frequency response.",
  },
  {
    num: "2024",
    title: "The BESS Solution",
    desc: "Engineering high-performance, containerized battery energy storage systems that prioritize industrial-grade safety.",
  },
  {
    num: "2025",
    title: "Indian Manufacturing",
    desc: "Setting up a state-of-the-art 3.2 GWh manufacturing facility in Vadodara to drive indigenous production.",
  },
  {
    num: "2026",
    title: "The Future Roadmap",
    desc: "Scaling operations to establish India as a global manufacturing hub for advanced lithium and sodium batteries.",
  },
];

export const OurJourneyVision = () => {
  return (
    <Section className="py-12 lg:py-16 bg-background overflow-hidden">
      <Container>

        {/* Section header */}
        <Reveal direction="up" duration={0.8}>
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <div className="text-primary font-semibold text-sm md:text-base tracking-widest uppercase mb-4">
              Strategic Evolution
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground font-headings leading-tight">
              Our Journey &amp; Vision
            </h2>
          </div>
        </Reveal>

        {/* MOBILE / TABLET: vertical timeline */}
        <div className="flex flex-col items-start gap-0 lg:hidden relative">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex gap-6 pb-8 last:pb-0"
            >
              {/* Left: circle + vertical line */}
              <div className="flex flex-col items-center">
                <div className="w-[72px] h-[72px] shrink-0 rounded-full border-2 border-foreground/30 group-hover:border-primary bg-background flex items-center justify-center z-10 transition-colors duration-300">
                  <span className="text-sm font-bold text-primary tabular-nums tracking-tight">{step.num}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-px flex-1 bg-foreground/20 mt-2" />
                )}
              </div>
              {/* Right: text */}
              <div className="pt-4 pb-2">
                <h3 className="text-base font-bold text-foreground tracking-tight mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* DESKTOP: horizontal timeline */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-4 relative">
          {/* Full-width connector line through circle centers */}
          <div className="absolute top-11 left-[calc(10%+44px)] right-[calc(10%+44px)] h-[2px] bg-foreground/20 z-0" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="w-[88px] h-[88px] rounded-full border-2 border-foreground/30 group-hover:border-primary bg-background flex items-center justify-center mb-5 transition-colors duration-300 shadow-sm">
                <span className="text-base font-bold text-primary tabular-nums tracking-tight">{step.num}</span>
              </div>
              <h3 className="text-base md:text-lg font-bold text-foreground tracking-tight mb-2">{step.title}</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-light">{step.desc}</p>
            </motion.div>
          ))}
        </div>

      </Container>
    </Section>
  );
};
