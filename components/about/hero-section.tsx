"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Container, Section } from "@/components/layout";
import { Reveal } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { ResponsiveImage } from "@/components/shared/media";
import { ArrowRight, Phone } from "lucide-react";
import Link from "next/link";

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <Section
      className="bg-background relative pt-28 pb-12 md:pt-32 md:pb-16 lg:pt-40 lg:pb-20 overflow-hidden"
      ref={containerRef as React.RefObject<HTMLDivElement>}
    >
      <Container>
        {/* Same 2-col layout as intro-section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-24 xl:items-stretch items-center">

          {/* Left: Text */}
          <div className="flex flex-col justify-center text-center xl:text-left order-2 xl:order-1 w-full max-w-155 mx-auto xl:mx-0 py-4">

            <Reveal direction="up" duration={0.8}>
              {/* Label — exact same as landing page */}
              <div className="text-primary font-semibold text-sm md:text-base tracking-widest uppercase mb-4">
                About PowerMetz Energy
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6 font-headings leading-tight">
                Engineering the Future of Battery Energy Storage Solutions with Intelligent Lithium Battery Technology.
              </h1>
            </Reveal>

            <div className="space-y-6 mb-10">
              <Reveal direction="up" delay={0.1} duration={0.8}>
                <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed font-light mx-auto lg:mx-0">
                  PowerMetz Energy Private Limited designs and manufactures advanced Battery Energy Storage Systems (BESS) for commercial, industrial, and utility-scale applications — combining intelligent battery management, LFP and NMC cell technology, and large-scale manufacturing.
                </p>
              </Reveal>
              <Reveal direction="up" delay={0.2} duration={0.8}>
                <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed font-light mx-auto lg:mx-0">
                  Backed by Mercury EV-Tech Limited, PowerMetz operates from a 3.2 GWh facility in Vadodara, Gujarat — accelerating India&apos;s clean energy transition through reliable, scalable lithium battery solutions.
                </p>
              </Reveal>
            </div>

            <Reveal direction="up" delay={0.3} duration={0.8} className="flex flex-col sm:flex-row gap-4 items-center justify-center xl:justify-start w-full">
              <Link href="/products">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-base md:text-lg px-8 h-14 rounded-full transition-all duration-300 w-fit group">
                  Explore Solutions
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
              <a href="tel:+917041647216">
                <Button size="lg" variant="outline" className="h-14 px-8 text-base md:text-lg rounded-full border-border text-foreground hover:bg-muted transition-colors duration-300 w-fit flex items-center gap-2">
                  <Phone className="w-5 h-5" /> Contact Our Team
                </Button>
              </a>
            </Reveal>
          </div>

          {/* Right: Image */}
          <div className="relative flex flex-col items-center xl:items-start order-1 xl:order-2 w-full mt-8 xl:mt-0 h-full">
            <Reveal direction="up" duration={1} delay={0.2} className="relative w-full aspect-4/3 xl:aspect-auto xl:h-full rounded-2xl overflow-hidden bg-muted shadow-2xl xl:min-h-130">
              <motion.div style={{ y }} className="absolute inset-0 w-full h-[115%] top-[-7%]">
                <ResponsiveImage
                  src="/about%20powermetz.JPG"
                  alt="PowerMetz Battery Manufacturing Facility"
                  fill
                  objectFit="cover"
                  priority
                  unoptimized
                  quality={100}
                />
              </motion.div>
              <div className="absolute inset-0 ring-1 ring-inset ring-foreground/5 rounded-2xl pointer-events-none" />
            </Reveal>
          </div>

        </div>
      </Container>
    </Section>
  );
};

