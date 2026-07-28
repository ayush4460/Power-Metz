"use client";

import { motion } from "framer-motion";
import { Container, Section } from "@/components/layout";
import { Reveal } from "@/components/motion";
import { certifications } from "@/content/about";
import { ShieldCheck } from "lucide-react";

// Descriptions for each cert to add context and visual weight
const certDetails: Record<string, string> = {
  "ISO 9001": "Quality Management",
  "ISO 14001": "Environmental Management",
  "UL": "Safety Certification",
  "IEC": "International Electrotechnical",
  "CE": "European Conformity",
  "RoHS": "Hazardous Substances",
  "UN38.3": "Transport Safety",
};

export const CertificationsSection = () => {
  return (
    <Section className="py-12 lg:py-16 bg-background overflow-hidden">
      <Container>

        {/* Section header — same style as rest of page */}
        <Reveal direction="up" duration={0.8}>
          <div className="text-center max-w-2xl mx-auto mb-14 md:mb-20">
            <div className="text-primary font-semibold text-sm md:text-base tracking-widest uppercase mb-4">
              Quality & Trust
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4 font-headings leading-tight">
              Built to Global Standards
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed font-light">
              Every PowerMetz product is engineered and tested to meet the most rigorous international safety, quality, and environmental benchmarks.
            </p>
          </div>
        </Reveal>

        {/* Certification cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              className="group relative bg-background border border-border/70 hover:border-primary/40 rounded-2xl p-6 flex flex-col items-start gap-4 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              {/* Subtle orange tint on hover */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/[0.03] transition-colors duration-300 rounded-2xl pointer-events-none" />

              {/* Icon */}
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-primary" strokeWidth={2.5} />
              </div>

              {/* Name + Description */}
              <div>
                <p className="text-xl md:text-2xl font-bold text-foreground tracking-tight mb-1">
                  {cert}
                </p>
                <p className="text-sm text-muted-foreground font-medium leading-snug">
                  {certDetails[cert] ?? "International Standard"}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </Container>
    </Section>
  );
};

