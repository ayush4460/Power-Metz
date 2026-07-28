"use client";

import { motion } from "framer-motion";
import { Container, Section } from "@/components/layout";
import { H2 } from "@/components/ui/typography";
import { ResponsiveImage } from "@/components/shared/media";
import { engineeringPillars } from "@/content/about";
import { Check } from "lucide-react";

export const EngineeringExcellence = () => {
  return (
    <Section className="py-12 lg:py-16 bg-background">
      <Container>
        
        <div className="text-center max-w-4xl mx-auto mb-20 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-semibold text-primary uppercase tracking-widest mb-6">Engineering Philosophy</h2>
            <H2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
              Designed for Safety.<br/>
              <span className="text-slate-400">Engineered for Performance.</span><br/>
              Built for Reliability.
            </H2>
          </motion.div>
        </div>

        <div className="space-y-24 lg:space-y-32">
          {engineeringPillars.map((pillar, index) => {
            const isEven = index % 2 === 0;

            return (
              <div key={index} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}>
                
                {/* Image Side */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full lg:w-1/2"
                >
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-slate-50">
                    <ResponsiveImage
                      src={pillar.image}
                      alt={pillar.title}
                      fill
                      objectFit="cover"
                      className="hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-3xl" />
                  </div>
                </motion.div>

                {/* Content Side */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  className="w-full lg:w-1/2 max-w-xl"
                >
                  <div className="text-primary font-bold text-6xl opacity-20 mb-4 font-serif">
                    0{index + 1}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                    {pillar.title}
                  </h3>
                  <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                    {pillar.description}
                  </p>

                  <ul className="space-y-4">
                    {pillar.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5 text-primary" strokeWidth={3} />
                        </div>
                        <span className="text-slate-800 font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

              </div>
            );
          })}
        </div>

      </Container>
    </Section>
  );
};


