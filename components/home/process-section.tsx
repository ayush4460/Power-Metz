"use client"

import React from "react"
import { motion } from "framer-motion"
import { Container, Section } from "@/components/layout"
import { H2, H3, Lead, Paragraph } from "@/components/ui/typography"
import { Reveal } from "@/components/motion"
import { ResponsiveImage } from "@/components/shared/media"
import { homeContent } from "@/content/home"
import { Check } from "lucide-react"

export const ProcessSection = () => {
  const { headline, subheadline, steps } = homeContent.engineeringProcess

  return (
    <Section className="bg-surface relative overflow-hidden py-16 md:py-24">
      <Container>
        <div className="text-center max-w-4xl mx-auto mb-16 md:mb-24">
          <Reveal direction="up" duration={0.8}>
            <div className="text-primary font-semibold text-sm md:text-base tracking-widest uppercase text-center mb-4">
              OUR PROCESS
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6 text-center font-headings">{headline}</h2>
          </Reveal>
          <Reveal direction="up" delay={0.1} duration={0.8}>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed font-light text-center max-w-3xl mx-auto">{subheadline}</p>
          </Reveal>
        </div>

        <div className="relative max-w-7xl mx-auto space-y-20 md:space-y-32">
          {steps.map((step, index) => {
            const isImageRight = index % 2 === 0

            return (
              <div key={step.id} className="relative flex flex-col md:flex-row gap-10 md:gap-16 items-center group">
                {/* Content */}
                <div className={`w-full md:w-[45%] ${isImageRight ? 'md:order-1' : 'md:order-2'}`}>
                  <Reveal direction="up" duration={0.8}>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-8">
                      <div className="flex items-center gap-4">
                        <span className="text-4xl md:text-5xl font-bold text-muted-foreground group-hover:text-primary transition-colors duration-500">{step.id}</span>
                        <div className="h-px bg-border w-12 sm:w-16 relative overflow-hidden">
                          <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                            className="absolute inset-0 bg-primary origin-left"
                          />
                        </div>
                      </div>
                      <H3 className="text-3xl md:text-4xl tracking-tight mb-0">{step.title}</H3>
                    </div>
                    <Paragraph className="text-muted-foreground text-lg leading-relaxed mb-8">
                      {step.description}
                    </Paragraph>
                    <ul className="space-y-3">
                      {step.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-3 text-base font-semibold text-foreground">
                          <Check className="w-5 h-5 text-primary shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </div>

                {/* Image */}
                <div className={`w-full md:w-[55%] ${isImageRight ? 'md:order-2' : 'md:order-1'}`}>
                  <Reveal direction="up" duration={0.8} delay={0.1}>
                    <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl">
                      <ResponsiveImage
                        src={step.image.src}
                        alt={step.image.alt}
                        fill
                        className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                      <div className="absolute inset-0 ring-1 ring-inset ring-border/20 rounded-3xl pointer-events-none" />
                    </div>
                  </Reveal>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

