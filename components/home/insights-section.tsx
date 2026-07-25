import React from "react"
import { ArrowRight } from "lucide-react"
import { Container, Section, Grid } from "@/components/layout"
import { H2 } from "@/components/ui/typography"
import { Reveal, Stagger, FadeIn } from "@/components/motion"
import { homeContent } from "@/content/home"
import Link from "next/link"

export const InsightsSection = () => {
  const { headline, items } = homeContent.insights

  return (
    <Section className="bg-surface">
      <Container className="max-w-7xl">
        <Reveal direction="up" duration={0.8} className="mb-20 md:mb-28 flex justify-between items-end border-b border-border/50 pb-8">
          <H2 className="text-4xl md:text-5xl tracking-tight leading-none">{headline}</H2>
          <Link href="/insights" className="hidden md:flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium">
            View All
            <ArrowRight className="w-5 h-5" />
          </Link>
        </Reveal>

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
                  
                  <p className="text-muted-foreground text-base font-light leading-relaxed mb-10 flex-grow">
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
          <Link href="/insights" className="md:hidden mt-16 flex items-center justify-center gap-2 text-foreground hover:text-primary transition-colors font-medium border border-border/50 rounded-full py-4 px-8">
            View All Insights
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Stagger>
      </Container>
    </Section>
  )
}

