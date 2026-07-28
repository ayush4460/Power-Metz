"use client";

import { motion } from "framer-motion";
import { Container, Section } from "@/components/layout";
import { Reveal } from "@/components/motion";
import { Target, Lightbulb } from "lucide-react";

export const MissionVision = () => {
  return (
    <Section className="py-16 lg:py-24 bg-background relative overflow-hidden border-y border-border/50">
      
      {/* Decorative ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Mission */}
          <Reveal direction="up" duration={0.8}>
            <div className="h-full bg-background border border-border/70 hover:border-primary/40 rounded-3xl p-8 lg:p-12 shadow-sm hover:shadow-xl transition-all duration-500 group relative overflow-hidden flex flex-col">
              
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/[0.03] group-hover:to-primary/[0.08] transition-colors duration-500 pointer-events-none" />
              
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 shrink-0 group-hover:scale-110 transition-transform duration-500">
                <Target className="w-7 h-7 text-primary" strokeWidth={2} />
              </div>

              <h2 className="text-sm font-semibold text-primary uppercase tracking-widest mb-6">Our Mission</h2>
              
              <p className="text-2xl md:text-3xl font-bold text-foreground leading-snug tracking-tight font-headings flex-1">
                Deliver intelligent, reliable and sustainable battery energy storage solutions through engineering excellence and innovation.
              </p>
            </div>
          </Reveal>

          {/* Vision */}
          <Reveal direction="up" delay={0.2} duration={0.8}>
            <div className="h-full bg-background border border-border/70 hover:border-primary/40 rounded-3xl p-8 lg:p-12 shadow-sm hover:shadow-xl transition-all duration-500 group relative overflow-hidden flex flex-col">
              
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/[0.03] group-hover:to-primary/[0.08] transition-colors duration-500 pointer-events-none" />
              
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 shrink-0 group-hover:scale-110 transition-transform duration-500">
                <Lightbulb className="w-7 h-7 text-primary" strokeWidth={2} />
              </div>

              <h2 className="text-sm font-semibold text-primary uppercase tracking-widest mb-6">Our Vision</h2>
              
              <p className="text-2xl md:text-3xl font-bold text-foreground leading-snug tracking-tight font-headings flex-1">
                Become one of India's leading battery energy storage technology companies supporting global clean energy transformation.
              </p>
            </div>
          </Reveal>

        </div>
      </Container>
    </Section>
  );
};
