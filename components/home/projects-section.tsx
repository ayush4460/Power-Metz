import React from "react"
import { ArrowRight, MapPin } from "lucide-react"
import { Container, Section, Grid } from "@/components/layout"
import { H2, Lead, H4 } from "@/components/ui/typography"
import { Reveal, Stagger, FadeIn } from "@/components/motion"
import { ResponsiveImage } from "@/components/shared/media"
import { homeContent } from "@/content/home"
import Link from "next/link"

export const ProjectsSection = () => {
  const { headline, subheadline, items } = homeContent.projects

  return (
    <Section className="bg-background border-t border-border/10">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 md:mb-28">
          <div className="max-w-2xl">
            <Reveal direction="up" duration={0.8}>
              <H2 className="mb-6 leading-tight tracking-tight">{headline}</H2>
            </Reveal>
            <Reveal direction="up" delay={0.1} duration={0.8}>
              <Lead className="text-muted-foreground">{subheadline}</Lead>
            </Reveal>
          </div>
        </div>

        <Stagger staggerChildren={0.15}>
          <Grid cols={3} className="gap-12 md:gap-16">
            {items.map((project) => (
              <FadeIn key={project.id} className="group">
                <Link href={project.link} className="block w-full">
                  <div className="relative w-full aspect-video md:aspect-3/2 rounded-3xl overflow-hidden mb-8 bg-surface">
                    <ResponsiveImage
                      src={project.image.src}
                      alt={project.image.alt}
                      fill
                      className="object-cover transition-transform duration-[1.5s] ease-[0.16,1,0.3,1] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-border/20 rounded-3xl pointer-events-none" />
                  </div>
                  
                  <div className="flex items-center gap-3 text-primary font-mono text-xs tracking-widest uppercase mb-4">
                    <span>{project.industry}</span>
                    <span className="w-4 h-px bg-primary/50" />
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5" />
                      {project.location}
                    </span>
                  </div>

                  <H4 className="text-2xl mb-4 tracking-tight transition-colors duration-500 group-hover:text-primary">{project.name}</H4>
                  <p className="text-muted-foreground text-base font-light leading-relaxed line-clamp-2 mb-8">
                    {project.description}
                  </p>

                  <div className="flex items-center gap-3 text-foreground font-medium text-base transition-colors group-hover:text-primary">
                    View Project
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
                  </div>
                </Link>
              </FadeIn>
            ))}
          </Grid>
        </Stagger>
      </Container>
    </Section>
  )
}

