import React from "react"
import { ArrowRight } from "lucide-react"
import { Container, Section, Grid } from "@/components/layout"
import { H2 } from "@/components/ui/typography"
import { Reveal, Stagger, FadeIn } from "@/components/motion"
import { homeContent } from "@/content/home"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const InsightsSection = () => {
  const { headline, items } = homeContent.insights

  return (
    <Section className="bg-surface">
      <Container className="max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 md:mb-28 border-b border-border/50 pb-8">
          <div className="max-w-2xl">
            <Reveal direction="up" duration={0.8}>
              <div className="text-primary font-semibold text-sm md:text-base tracking-widest uppercase mb-4">
                INSIGHTS & NEWS
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6 font-headings">{headline}</h2>
            </Reveal>
          </div>
          
          <Reveal direction="up" delay={0.2} duration={0.8} className="hidden md:block">
            <Link href="/insights">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-base md:text-lg px-8 h-14 rounded-full transition-all duration-300 w-fit group">
                View All Insights
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </Reveal>
        </div>

        <Stagger staggerChildren={0.15}>
          <Grid cols={1} className="md:grid-cols-3 gap-12 md:gap-16">
            {items.map((insight) => (
              <FadeIn key={insight.id} className="flex flex-col group">
                <Link href={insight.link} className="flex flex-col h-full group">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-primary font-mono text-xs uppercase tracking-widest">{insight.category}</span>
                    <span className="w-4 h-px bg-border" />
                    <span className="text-muted-foreground font-mono text-xs tracking-widest">{insight.date}</span>
                  </div>
                  
                  <h4 className="text-2xl md:text-3xl font-headings font-medium text-foreground leading-tight tracking-tight mb-6 group-hover:text-primary transition-colors duration-300">
                    {insight.title}
                  </h4>
                  
                  <p className="text-muted-foreground text-base font-light leading-relaxed mb-10 grow">
                    {insight.excerpt}
                  </p>

                  <div className="flex items-center gap-3 text-foreground font-medium text-sm transition-colors group-hover:text-primary mt-auto pt-6 border-t border-border/30 w-fit pr-8">
                    Read Article
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
                  </div>
                </Link>
              </FadeIn>
            ))}
          </Grid>
          <Reveal direction="up" delay={0.3} duration={0.8} className="md:hidden mt-12 flex justify-center">
            <Link href="/insights" className="w-full">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-base md:text-lg px-8 h-14 rounded-full transition-all duration-300 w-full group">
                View All Insights
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </Reveal>
        </Stagger>
      </Container>
    </Section>
  )
}
