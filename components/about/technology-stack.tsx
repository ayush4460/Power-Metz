"use client";

import { motion } from "framer-motion";
import { Container, Section } from "@/components/layout";
import { H2 } from "@/components/ui/typography";
import { technologyStack } from "@/content/about";
import { Cpu, Zap, Activity, Shield, Box, Network, Globe2 } from "lucide-react";

export const TechnologyStack = () => {
  const icons = [Zap, Cpu, Network, Shield, Box, Activity, Globe2];

  return (
    <Section className="py-12 lg:py-16 bg-white">
      <Container>
        
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">Innovation</h2>
            <H2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
              Advanced Technology Stack
            </H2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {technologyStack.map((tech, index) => {
            const Icon = icons[index % icons.length];
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#F6F5F2] p-8 rounded-3xl border border-slate-100 hover:shadow-lg transition-shadow duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white text-primary transition-colors duration-300">
                  <Icon className="w-6 h-6" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">
                  {tech.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {tech.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </Container>
    </Section>
  );
};


