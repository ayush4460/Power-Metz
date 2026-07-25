import React from "react"
import { Container, Section, Grid } from "@/components/layout"
import { Reveal, Stagger, FadeIn, Counter } from "@/components/motion"
import { homeContent } from "@/content/home"

export const StatsSection = () => {
  const { headline, items } = homeContent.statistics

  return (
    <Section className="bg-surface relative overflow-hidden">
      {/* Subtle ambient light from bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[300px] bg-primary/5 blur-[150px] rounded-t-[100%] pointer-events-none -z-10" />

      <Container>
        <Reveal direction="up" duration={0.8} className="text-center mb-24 md:mb-32">
          <h2 className="font-headings text-sm md:text-base text-primary font-mono tracking-widest uppercase flex items-center justify-center gap-4">
            <span className="w-8 h-px bg-primary" />
            {headline}
            <span className="w-8 h-px bg-primary" />
          </h2>
        </Reveal>

        <Stagger staggerChildren={0.15}>
          <Grid cols={2} className="md:grid-cols-4 gap-16 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-border/30">
            {items.map((stat, index) => (
              <FadeIn key={index} className="text-center flex flex-col items-center justify-center pt-12 md:pt-0 first:pt-0 md:first:border-l-0">
                <div className="text-6xl md:text-7xl lg:text-[6rem] font-medium font-headings text-foreground tracking-tighter mb-6 flex items-center leading-none">
                  <Counter to={stat.value} duration={2.5} />
                  <span className="text-primary">{stat.suffix}</span>
                </div>
                <p className="text-muted-foreground text-base md:text-lg font-light tracking-wide uppercase">{stat.label}</p>
              </FadeIn>
            ))}
          </Grid>
        </Stagger>
      </Container>
    </Section>
  )
}

