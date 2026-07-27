"use client"

import React, { useRef } from "react"
import { ArrowRight, ChevronDown } from "lucide-react"
import { Container, Section } from "@/components/layout"
import { H1, Lead } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"
import { Reveal, FadeIn } from "@/components/motion"
import { homeContent } from "@/content/home"
import { motion, useScroll, useTransform } from "framer-motion"

export const HeroSection = () => {
  // @ts-ignore
  const { headline, headlineHighlight, subheadline, primaryCta, secondaryCta, trustStrip } = homeContent.hero
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <Section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center pt-[var(--header-height)] pb-12 sm:pb-16 md:pb-24 overflow-hidden bg-[#050505] text-white"
    >
      {/* ── Cinematic Full-Bleed Video Background ── */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <video
          src="/HeroSection_BG.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-center"
          aria-hidden="true"
        />
        {/* Subtle left overlay to keep text legible */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </motion.div>

      {/* ── Content ── */}
      <Container className="relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-8">
          <div className="lg:col-span-8 flex flex-col justify-center mt-8 sm:mt-10 lg:mt-0">

            {/* Headline */}
            <Reveal direction="up" duration={0.8}>
              <H1 className="mb-4 sm:mb-6 max-w-[18ch] leading-[1.05] tracking-tighter text-white font-bold
                             text-4xl
                             xs:text-5xl
                             sm:text-5xl
                             md:text-6xl
                             lg:text-[5rem]
                             xl:text-[5.5rem]">
                {headline}
                {headlineHighlight && (
                  <span className="block text-primary mt-1 sm:mt-2">{headlineHighlight}</span>
                )}
              </H1>
            </Reveal>

            {/* Sub-headline */}
            <Reveal direction="up" delay={0.1} duration={0.8}>
              <Lead className="mb-8 sm:mb-10 md:mb-12 max-w-[55ch] text-gray-300
                               text-base sm:text-lg md:text-xl
                               font-light leading-relaxed">
                {subheadline}
              </Lead>
            </Reveal>

            {/* CTA Buttons */}
            <FadeIn delay={0.2} duration={0.8}>
              <div className="flex flex-col xs:flex-row sm:flex-row items-stretch xs:items-center gap-3 sm:gap-4 mb-10 sm:mb-16 md:mb-20">
                <Button
                  size="lg"
                  className="w-full xs:w-auto h-auto py-3 sm:py-4 px-6 sm:px-8
                             text-sm sm:text-base group
                             bg-primary hover:bg-primary/90 text-white border-0
                             transition-all duration-300 whitespace-normal text-center"
                >
                  {primaryCta}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform inline-block flex-shrink-0" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full xs:w-auto h-auto py-3 sm:py-4 px-6 sm:px-8
                             text-sm sm:text-base
                             border-white/30 bg-black/20 backdrop-blur
                             text-white hover:bg-white/10 hover:text-white
                             transition-colors duration-300 whitespace-normal text-center"
                >
                  {secondaryCta}
                </Button>
              </div>
            </FadeIn>

            {/* Trust Strip */}
            <FadeIn delay={0.3} duration={0.8}>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-white/10">
                {trustStrip.map((item: { icon: React.ElementType; label: string }, index: number) => (
                  <div key={index} className="flex flex-row items-center gap-2 sm:gap-3">
                    <item.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary flex-shrink-0" strokeWidth={1.5} />
                    <span className="text-xs sm:text-sm font-medium text-gray-300 leading-tight">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </FadeIn>

          </div>
        </div>
      </Container>

      {/* ── Scroll Indicator ── */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 text-gray-400 flex flex-col items-center gap-1"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5 opacity-50" />
        </motion.div>
        <span className="text-[10px] sm:text-xs tracking-wider text-gray-500 font-medium">
          Scroll to explore
        </span>
      </motion.div>
    </Section>
  )
}

