import React from "react"
import { Container, Section, Grid } from "@/components/layout"
import { H2 } from "@/components/ui/typography"
import { Reveal, Stagger, FadeIn } from "@/components/motion"
import { homeContent } from "@/content/home"

export const TestimonialsSection = () => {
  const { headline, items } = homeContent.testimonials

  return (
    <Section className="bg-background border-t border-border/10">
      <Container>
        <Reveal direction="up" duration={0.8} className="mb-24 md:mb-32">
          <H2 className="text-center font-headings text-4xl md:text-5xl leading-tight tracking-tight">{headline}</H2>
        </Reveal>

        <Stagger staggerChildren={0.2}>
          <Grid cols={1} className="md:grid-cols-2 gap-16 md:gap-24 max-w-6xl mx-auto">
            {items.map((testimonial) => (
              <FadeIn key={testimonial.id} className="relative flex flex-col group">
                {/* Minimal typographic quote mark */}
                <div className="text-primary font-headings text-7xl md:text-8xl leading-none opacity-20 group-hover:opacity-40 transition-opacity duration-500 mb-4 select-none">
                  &ldquo;
                </div>
                
                <p className="text-xl md:text-3xl font-headings text-foreground leading-snug mb-12 tracking-tight">
                  {testimonial.quote}
                </p>
                
                <div className="flex flex-col mt-auto pt-6 border-t border-border/50">
                  <span className="font-medium text-foreground text-lg tracking-wide uppercase">{testimonial.author}</span>
                  <span className="text-muted-foreground text-sm font-light mt-1">{testimonial.role}</span>
                </div>
              </FadeIn>
            ))}
          </Grid>
        </Stagger>
      </Container>
    </Section>
  )
}

