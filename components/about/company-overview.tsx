"use client";

import { motion } from "framer-motion";
import { Container, Section } from "@/components/layout";
import { H2, Paragraph } from "@/components/ui/typography";
import { ResponsiveImage } from "@/components/shared/media";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const CompanyOverview = () => {
  return (
    <Section className="py-12 lg:py-16 bg-background overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 xl:gap-24 xl:items-stretch items-center">
          
          {/* Left: Editorial Image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full h-full min-h-[420px]"
          >
            <div className="relative w-full h-full min-h-[420px] aspect-[4/3] xl:aspect-auto rounded-2xl overflow-hidden shadow-2xl">
              <ResponsiveImage
                src="/images/Engineering_Flow_Web.jpg"
                alt="PowerMetz Engineers at work"
                fill
                objectFit="cover"
                className="hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-foreground/5 rounded-2xl pointer-events-none" />
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <div className="text-primary font-semibold text-sm md:text-base tracking-widest uppercase mb-4">
              Who We Are
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6 font-headings leading-tight">
              Driving India's Energy Transition Through Engineering Excellence.
            </h2>

            <div className="space-y-5 text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed font-light">
              <Paragraph>
                PowerMetz Energy Private Limited designs and manufactures advanced Battery Energy Storage Systems (BESS) engineered for commercial, industrial, and utility-scale applications. From residential backup to megawatt-scale containerized storage, we provide intelligent, scalable lithium battery solutions built for high performance and long-term reliability.
              </Paragraph>
              
              <Paragraph>
                Our core manufacturing capability spans cutting-edge LFP and NMC cell chemistries seamlessly integrated with proprietary Smart Battery Management Systems (BMS). This vertical integration allows us to deliver optimized EV battery packs, robust industrial storage, and customized OEM battery solutions that meet rigorous safety standards.
              </Paragraph>
              
              <Paragraph>
                Operating from our state-of-the-art 3.2 GWh manufacturing facility in Vadodara, Gujarat, we combine large-scale automated production with meticulous quality control. Supported by our parent corporate group, Mercury EV-Tech Limited, PowerMetz is uniquely positioned to accelerate the electrification of mobility and the widespread adoption of renewable energy across India.
              </Paragraph>
            </div>

          </motion.div>

        </div>
      </Container>
    </Section>
  );
};


