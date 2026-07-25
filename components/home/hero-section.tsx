"use client"

import React, { useRef } from "react"
import Image from "next/image"
import { ArrowRight, ChevronDown } from "lucide-react"
import { Container, Section, Grid } from "@/components/layout"
import { H1, Lead } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"
import { Reveal, FadeIn } from "@/components/motion"
import { homeContent } from "@/content/home"
import { motion, useScroll, useTransform } from "framer-motion"

export const HeroSection = () => {
  // @ts-ignore
  const { headline, headlineHighlight, subheadline, primaryCta, secondaryCta, image, trustStrip } = homeContent.hero
  const sectionRef = useRef<HTMLElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <Section 
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center pt-[var(--header-height)] pb-16 md:pb-24 overflow-hidden bg-[#050505] text-white"
    >
      {/* Cinematic Full Bleed Background Image */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          className="object-cover object-right"
          sizes="100vw"
          quality={100}
        />
        {/* Gradient overlays to ensure text readability and create dramatic contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />
      </motion.div>

      <Container className="relative z-20 h-full flex flex-col justify-center">
        <Grid className="items-center gap-12 lg:gap-8 h-full">
          <div className="col-span-1 lg:col-span-8 flex flex-col justify-center mt-12 lg:mt-0">
            <Reveal direction="up" duration={0.8}>
              <H1 className="mb-6 max-w-[18ch] leading-[1.05] tracking-tighter text-white font-bold text-5xl md:text-7xl lg:text-[5.5rem]">
                {headline}
                {headlineHighlight && (
                  <span className="block text-primary mt-2">{headlineHighlight}</span>
                )}
              </H1>
            </Reveal>
            
            <Reveal direction="up" delay={0.1} duration={0.8}>
              <Lead className="mb-12 max-w-[55ch] text-gray-300 text-lg md:text-xl font-light leading-relaxed">
                {subheadline}
              </Lead>
            </Reveal>
            
            <FadeIn delay={0.2} duration={0.8}>
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 md:mb-24">
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base group bg-primary hover:bg-primary/90 text-white border-0 transition-all duration-300">
                  {primaryCta}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-base border-white/30 bg-black/20 backdrop-blur text-white hover:bg-white/10 hover:text-white transition-colors duration-300">
                  {secondaryCta}
                </Button>
              </div>
            </FadeIn>

            {/* Integrated Trust Strip - Styled like Image 1 */}
            <FadeIn delay={0.3} duration={0.8}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10">
                {trustStrip.map((item, index) => (
                  <div key={index} className="flex flex-row items-center gap-3">
                    <item.icon className="h-6 w-6 text-primary flex-shrink-0" strokeWidth={1.5} />
                    <span className="text-sm font-medium text-gray-300 leading-tight">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </Grid>
      </Container>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-gray-400 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5 mb-1 opacity-50" />
        </motion.div>
        <span className="text-xs tracking-wider text-gray-500 font-medium">Scroll to explore</span>
      </motion.div>
    </Section>
  )
}
