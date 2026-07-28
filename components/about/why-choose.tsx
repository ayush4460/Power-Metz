"use client";

import { motion } from "framer-motion";
import { Container, Section } from "@/components/layout";
import { H2 } from "@/components/ui/typography";
import { ResponsiveImage } from "@/components/shared/media";
import { whyChooseUs } from "@/content/about";
import { CheckCircle2 } from "lucide-react";

export const WhyChoose = () => {
  return (
    <Section className="py-12 lg:py-16 bg-[#F6F5F2] overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 xl:gap-24 xl:items-stretch items-center">
          
          {/* Left: Content Checklist */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">Our Advantage</h2>
            <H2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-8">
              Why Customers Choose PowerMetz
            </H2>
            <p className="text-lg text-slate-600 mb-10 max-w-lg">
              We deliver industrial-grade energy storage systems that prioritize safety, longevity, and intelligent management.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
              {whyChooseUs.map((reason, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-primary" strokeWidth={2.5} />
                  </div>
                  <span className="font-semibold text-slate-800 tracking-tight text-lg">
                    {reason}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full h-full min-h-[420px]"
          >
            <div className="relative w-full h-full min-h-[420px] aspect-[4/3] xl:aspect-auto rounded-2xl overflow-hidden shadow-2xl">
              <ResponsiveImage
                src="/customer%20choose%20powermetz.JPG"
                alt="PowerMetz Advantage"
                fill
                objectFit="cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-foreground/5 rounded-2xl pointer-events-none" />
            </div>
          </motion.div>

        </div>
      </Container>
    </Section>
  );
};


