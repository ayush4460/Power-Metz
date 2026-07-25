import React from "react"
import { Container, Section } from "@/components/layout"
import { H2, Lead } from "@/components/ui/typography"
import { Reveal } from "@/components/motion"
import { Button } from "@/components/ui/button"
import { homeContent } from "@/content/home"
import { ArrowRight } from "lucide-react"

export const CTASection = () => {
  const { headline, subheadline, primaryBtn, secondaryBtn } = homeContent.cta

  return (
    <Section className="py-32 md:py-48 bg-background relative overflow-hidden text-center z-10">
      {/* Deep space glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[600px] bg-primary/10 blur-[150px] rounded-full pointer-events-none -z-10 mix-blend-screen" />

      <Container className="relative z-10 max-w-4xl mx-auto">
        <Reveal direction="up" duration={0.8}>
          <H2 className="mb-8 text-5xl md:text-6xl tracking-tight leading-tight">{headline}</H2>
        </Reveal>
        
        <Reveal direction="up" delay={0.1} duration={0.8}>
          <Lead className="text-muted-foreground mb-16 max-w-2xl mx-auto text-xl md:text-2xl font-light leading-relaxed">
            {subheadline}
          </Lead>
        </Reveal>

        <Reveal direction="up" delay={0.2} duration={1}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button size="lg" className="w-full sm:w-auto h-16 px-10 text-lg group bg-primary hover:bg-primary/90 text-white border-0 shadow-[0_0_30px_rgba(255,102,0,0.2)] hover:shadow-[0_0_50px_rgba(255,102,0,0.4)] transition-all duration-500 rounded-full">
              {primaryBtn}
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-500" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-16 px-10 text-lg border-border/50 bg-background/50 backdrop-blur-md hover:bg-surface hover:text-primary transition-all duration-500 rounded-full">
              {secondaryBtn}
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
