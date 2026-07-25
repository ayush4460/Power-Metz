"use client"

import React, { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Container, Section } from "@/components/layout"
import { H2, Lead } from "@/components/ui/typography"
import { Reveal } from "@/components/motion"
import { homeContent } from "@/content/home"
import { Plus } from "lucide-react"

export const TechnologySection = () => {
  const { headline, subheadline, image, hotspots } = homeContent.technology
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null)

  return (
    <Section className="py-32 md:py-48 bg-surface relative overflow-hidden rounded-t-3xl md:rounded-t-[3rem] -mt-8 z-30 shadow-[0_-20px_40px_rgba(0,0,0,0.2)]">
      {/* Noise Texture Background */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("/images/noise.png")' }} />

      <Container>
        <div className="text-center max-w-4xl mx-auto mb-20 md:mb-32">
          <Reveal direction="up" duration={0.8}>
            <H2 className="mb-8 leading-tight tracking-tight">{headline}</H2>
          </Reveal>
          <Reveal direction="up" delay={0.1} duration={0.8}>
            <Lead className="text-muted-foreground max-w-prose mx-auto">{subheadline}</Lead>
          </Reveal>
        </div>

        <Reveal direction="up" delay={0.2} duration={1}>
          <div className="relative w-full max-w-6xl mx-auto aspect-[4/5] md:aspect-[16/9] lg:aspect-[2/1] rounded-3xl overflow-hidden shadow-2xl">
            {/* Deep background glow for the battery */}
            <div className="absolute inset-0 bg-primary/10 blur-[150px] rounded-full translate-x-1/4 -translate-y-1/4 -z-10" />
            
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover md:object-contain object-center scale-105"
              sizes="(max-width: 1024px) 100vw, 1500px"
            />

            {/* Hotspots */}
            {hotspots.map((hotspot) => (
              <div 
                key={hotspot.id}
                className="absolute z-20"
                style={{ top: hotspot.position.top, left: hotspot.position.left }}
                onMouseEnter={() => setActiveHotspot(hotspot.id)}
                onMouseLeave={() => setActiveHotspot(null)}
                onClick={() => setActiveHotspot(activeHotspot === hotspot.id ? null : hotspot.id)}
              >
                {/* Hotspot Button */}
                <button 
                  className="relative group flex items-center justify-center w-8 h-8 md:w-12 md:h-12 -ml-4 -mt-4 md:-ml-6 md:-mt-6 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/50 rounded-full"
                  aria-label={`View details for ${hotspot.title}`}
                  aria-expanded={activeHotspot === hotspot.id}
                >
                  <span className={`absolute inset-0 rounded-full transition-colors duration-500 ${activeHotspot === hotspot.id ? 'bg-primary' : 'bg-background/80 backdrop-blur-md border border-border/50'}`} />
                  <span className={`absolute inset-0 rounded-full animate-ping opacity-20 duration-1000 ${activeHotspot === hotspot.id ? 'bg-primary' : 'bg-foreground'}`} />
                  <Plus className={`relative z-10 w-4 h-4 md:w-5 md:h-5 transition-transform duration-500 ${activeHotspot === hotspot.id ? 'rotate-45 text-white' : 'text-foreground'}`} />
                </button>

                {/* Tooltip */}
                <AnimatePresence>
                  {activeHotspot === hotspot.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-6 w-64 md:w-80 bg-background/90 backdrop-blur-2xl border border-border/50 p-6 rounded-2xl shadow-2xl pointer-events-none"
                    >
                      <h4 className="text-foreground font-headings font-semibold text-lg mb-3 flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(255,102,0,0.5)]" />
                        {hotspot.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {hotspot.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
