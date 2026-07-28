"use client";

import { motion } from "framer-motion";
import { Container, Section } from "@/components/layout";
import { H2 } from "@/components/ui/typography";
import { ResponsiveImage } from "@/components/shared/media";
import { industriesWePower } from "@/content/about";

export const IndustriesWePower = () => {
  return (
    <Section className="py-12 lg:py-16 bg-white">
      <Container className="max-w-[1400px]">
        
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">Applications</h2>
            <H2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
              Industries We Power
            </H2>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {industriesWePower.map((industry, index) => {
            // Make the first item larger for layout variety (2x2 span on desktop)
            const isFeatured = index === 0;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className={`relative group rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 ${isFeatured ? 'md:col-span-2 md:row-span-2 aspect-square md:aspect-auto' : 'aspect-square'}`}
              >
                <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-colors duration-500 z-10" />
                
                <ResponsiveImage
                  src={industry.image}
                  alt={industry.name}
                  fill
                  objectFit="cover"
                  className="group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                <div className="absolute inset-0 z-20 p-6 md:p-8 flex items-end">
                  <h3 className={`text-white font-bold tracking-tight ${isFeatured ? 'text-2xl md:text-4xl' : 'text-xl md:text-2xl'}`}>
                    {industry.name}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>

      </Container>
    </Section>
  );
};

