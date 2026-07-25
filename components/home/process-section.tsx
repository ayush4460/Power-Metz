"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Container, Section } from "@/components/layout"
import { H2, H3, Lead, Paragraph } from "@/components/ui/typography"
import { Reveal } from "@/components/motion"
import { ResponsiveImage } from "@/components/shared/media"
import { homeContent } from "@/content/home"

export const ProcessSection = () => {
  const { headline, subheadline, steps } = homeContent.process
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })
  
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <Section className="bg-surface relative overflow-hidden">
      <Container>
        <div className="text-center max-w-4xl mx-auto mb-24 md:mb-40">
          <Reveal direction="up" duration={0.8}>
            <H2 className="mb-8 leading-tight tracking-tight">{headline}</H2>
          </Reveal>
          <Reveal direction="up" delay={0.1} duration={0.8}>
            <Lead className="text-muted-foreground max-w-prose mx-auto">{subheadline}</Lead>
          </Reveal>
        </div>

        <div className="relative max-w-6xl mx-auto" ref={containerRef}>
          {/* Central Timeline Line (Desktop only) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border/50 -translate-x-1/2" />
          <motion.div 
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-primary -translate-x-1/2 origin-top"
            style={{ scaleY }}
          />

          <div className="space-y-32 md:space-y-48">
            {steps.map((step, index) => {
              const isEven = index % 2 === 1

              return (
                <div key={step.id} className="relative grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center group">
                  {/* Timeline Dot (Desktop only) */}
                  <div className="hidden md:block absolute left-1/2 top-1/2 w-4 h-4 bg-surface border-4 border-primary rounded-full -translate-x-1/2 -translate-y-1/2 z-10 transition-transform duration-500 group-hover:scale-[1.7]" />

                  {/* Content (Alternating) */}
                  <div className={`${isEven ? 'md:order-2 md:text-left' : 'md:order-1 md:text-right'}`}>
                    <Reveal direction="up" duration={0.8} delay={0.1}>
                      <span className="flex flex-wrap items-center gap-4 text-primary font-mono text-sm tracking-widest mb-6 uppercase">
                        {!isEven && <span className="hidden md:block w-8 h-px bg-primary ml-auto" />}
                        Step 0{step.id}
                        {isEven && <span className="hidden md:block w-8 h-px bg-primary" />}
                      </span>
                      <H3 className="mb-6 text-3xl tracking-tight">{step.title}</H3>
                      <Paragraph className={`text-muted-foreground text-lg leading-relaxed max-w-md ${isEven ? '' : 'md:ml-auto'}`}>
                        {step.description}
                      </Paragraph>
                    </Reveal>
                  </div>

                  {/* Image (Alternating) */}
                  <div className={`${isEven ? 'md:order-1' : 'md:order-2'}`}>
                    <Reveal direction="up" duration={0.8} delay={0.2}>
                      <div className="relative w-full aspect-[16/9] md:aspect-[3/2] rounded-3xl overflow-hidden shadow-2xl">
                        <ResponsiveImage
                          src={step.image.src}
                          alt={step.image.alt}
                          fill
                          className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                        />
                        <div className="absolute inset-0 ring-1 ring-inset ring-border/20 rounded-3xl pointer-events-none" />
                      </div>
                    </Reveal>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </Section>
  )
}

