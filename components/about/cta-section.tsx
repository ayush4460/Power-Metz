"use client";

import { motion } from "framer-motion";
import { Container, Section } from "@/components/layout";
import { H2 } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";


export const CTASection = () => {
  return (
    <Section className="py-12 lg:py-16 bg-slate-900 text-white relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-4xl bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20 mix-blend-overlay pointer-events-none" />

      <Container className="relative z-10 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <H2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
            Let&apos;s Build Reliable Energy Storage Together
          </H2>
          
          <p className="text-xl text-slate-300 mb-2 font-medium">
            Need a Battery Energy Storage Solution for your business?
          </p>
          <p className="text-lg text-slate-400 mb-12">
            Talk with our engineering team today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="tel:+917041647216" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg font-semibold rounded-full bg-primary hover:bg-primary/90 text-white transition-all group">
                Talk to Experts
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            
            <a href="mailto:business@metzbattery.in" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg font-semibold rounded-full bg-transparent border-white/20 text-white hover:bg-white hover:text-slate-900 transition-colors">
                <Mail className="w-5 h-5 mr-2" /> Request Business Proposal
              </Button>
            </a>
          </div>
        </motion.div>

      </Container>
    </Section>
  );
};

