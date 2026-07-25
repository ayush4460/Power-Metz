import React from "react"
import { Container, Section, Grid } from "@/components/layout"
import { H2, Paragraph } from "@/components/ui/typography"
import { Reveal } from "@/components/motion"
import { ResponsiveImage } from "@/components/shared/media"
import { Button } from "@/components/ui/button"
import { homeContent } from "@/content/home"
import { ArrowRight } from "lucide-react"

export const IntroSection = () => {
  const { headline, paragraph1, paragraph2, image } = homeContent.intro

  return (
    <Section className="py-24 md:py-32 bg-background relative z-20">
      <Container>
        <Grid className="items-stretch gap-16 lg:gap-24" cols={12}>
          {/* Left Typography (50% on Desktop) */}
          <div className="col-span-12 lg:col-span-6 flex flex-col justify-center">
            <Reveal direction="up" duration={0.8}>
              <H2 className="mb-10 max-w-[18ch] leading-[1.1] tracking-tighter text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground">{headline}</H2>
            </Reveal>
            
            <div className="space-y-8 max-w-prose text-foreground/80 text-xl md:text-2xl font-light leading-relaxed mb-12">
              <Reveal direction="up" delay={0.1} duration={0.8}>
                <Paragraph>{paragraph1}</Paragraph>
              </Reveal>
              <Reveal direction="up" delay={0.2} duration={0.8}>
                <Paragraph>{paragraph2}</Paragraph>
              </Reveal>
            </div>

            <Reveal direction="up" delay={0.3} duration={0.8}>
              <Button variant="ghost" size="lg" className="w-fit p-0 h-auto hover:bg-transparent text-primary hover:text-primary/80 group text-base font-medium">
                {homeContent.intro.cta}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
            </Reveal>
          </div>

          {/* Right Image (50% on Desktop) */}
          <div className="col-span-12 lg:col-span-6 flex">
            <Reveal direction="up" duration={1} delay={0.2} className="relative w-full h-full min-h-[300px] rounded-2xl overflow-hidden bg-muted flex-1">
              <ResponsiveImage
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-foreground/10 rounded-2xl pointer-events-none" />
            </Reveal>
          </div>
        </Grid>
      </Container>
    </Section>
  )
}
