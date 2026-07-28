import React from "react"
import { Container, Section } from "@/components/layout"
import { H2, Paragraph } from "@/components/ui/typography"
import { Reveal } from "@/components/motion"
import { ResponsiveImage } from "@/components/shared/media"
import { Button } from "@/components/ui/button"
import { homeContent } from "@/content/home"
import { ArrowRight } from "lucide-react"

export const IntroSection = () => {
  const { label, headline, paragraph1, paragraph2, image, cta, card, metrics } = homeContent.intro

  return (
    <Section className="bg-background relative z-20 py-12 lg:py-20 overflow-hidden">
      <Container>
        {/* Top: 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 xl:gap-24 lg:items-stretch items-center">
          
          {/* Left: Text Content */}
          <div className="flex flex-col justify-center text-center lg:text-left order-2 lg:order-1 w-full max-w-155 mx-auto lg:mx-0 py-4">
            <Reveal direction="up" duration={0.8}>
              <div className="text-primary font-semibold text-sm md:text-base tracking-widest uppercase mb-4">
                {label}
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6 font-headings leading-tight">
                {headline}
              </h2>
            </Reveal>
            
            <div className="space-y-6 mb-10">
              <Reveal direction="up" delay={0.1} duration={0.8}>
                <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed font-light mx-auto lg:mx-0">{paragraph1}</p>
              </Reveal>
              <Reveal direction="up" delay={0.2} duration={0.8}>
                <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed font-light mx-auto lg:mx-0">{paragraph2}</p>
              </Reveal>
            </div>

            <Reveal direction="up" delay={0.3} duration={0.8} className="flex justify-center lg:justify-start">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-base md:text-lg px-8 h-14 rounded-full transition-all duration-300 w-fit group">
                {cta}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Reveal>
          </div>

          {/* Right: Image */}
          <div className="relative flex flex-col items-center lg:items-start order-1 lg:order-2 w-full mt-8 lg:mt-0 h-full">
            <Reveal direction="up" duration={1} delay={0.2} className="relative w-full aspect-square md:aspect-4/3 lg:aspect-auto lg:h-full rounded-2xl overflow-hidden bg-muted shadow-2xl">
              <ResponsiveImage
                src={image.src}
                alt={image.alt}
                fill
                unoptimized={true}
                className="object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-foreground/5 rounded-2xl pointer-events-none" />
            </Reveal>
            

          </div>
        </div>

        <Reveal direction="up" delay={0.5} duration={0.8} className="mt-16 lg:mt-32 pt-12 lg:pt-16 border-t border-border/40">
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-8 md:gap-12 lg:gap-8 text-center lg:text-left">
            {metrics.map((metric, index) => (
              <div key={index} className="flex flex-col gap-1.5 md:gap-2">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
                  {metric.value}
                </div>
                <div className="text-xs md:text-sm lg:text-base text-foreground/60 font-semibold uppercase tracking-wider">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

      </Container>
    </Section>
  )
}

