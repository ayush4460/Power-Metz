import React from "react"
import { Container, Section, Grid } from "@/components/layout"
import { H2, Lead, Paragraph } from "@/components/ui/typography"
import { Reveal, Stagger, FadeIn } from "@/components/motion"
import { homeContent } from "@/content/home"

export const QualitySection = () => {
  const { headline, subheadline, pillars } = homeContent.quality

  return (
    <Section className="py-32 md:py-48 bg-background relative overflow-hidden">
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left: Sticky Typography */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-40">
              <Reveal direction="right" duration={0.8}>
                <H2 className="mb-8 leading-tight tracking-tight text-5xl md:text-6xl">{headline}</H2>
              </Reveal>
              <Reveal direction="right" delay={0.1} duration={0.8}>
                <Lead className="text-muted-foreground max-w-md text-lg leading-relaxed">{subheadline}</Lead>
              </Reveal>
              
              {/* Decorative accent */}
              <div className="mt-16 w-16 h-1 bg-primary/20 rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-primary" />
              </div>
            </div>
          </div>

          {/* Right: Editorial List */}
          <div className="lg:col-span-7 mt-8 lg:mt-0">
            <Stagger staggerChildren={0.15}>
              <div className="space-y-16 md:space-y-24">
                {pillars.map((pillar, index) => (
                  <FadeIn key={index} className="flex flex-col group border-t border-border/50 pt-10 first:border-0 first:pt-0">
                    <div className="flex items-start gap-8 md:gap-12">
                      <span className="text-3xl md:text-5xl font-mono font-light text-muted-foreground/30 group-hover:text-primary transition-colors duration-500 mt-2">
                        0{index + 1}
                      </span>
                      <div>
                        <h4 className="text-2xl md:text-3xl font-headings font-medium text-foreground mb-4 tracking-tight group-hover:text-primary transition-colors duration-500">
                          {pillar.title}
                        </h4>
                        <Paragraph className="text-muted-foreground text-lg leading-relaxed max-w-lg">
                          {pillar.description}
                        </Paragraph>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </Stagger>
          </div>
        </div>
      </Container>
    </Section>
  )
}
