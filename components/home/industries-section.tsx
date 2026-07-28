import React from "react"
import { ArrowRight } from "lucide-react"
import { Container, Section } from "@/components/layout"
import { H2, Lead, H3 } from "@/components/ui/typography"
import { Reveal, Stagger, FadeIn } from "@/components/motion"
import { ResponsiveImage } from "@/components/shared/media"
import { homeContent } from "@/content/home"
import Link from "next/link"

export const IndustriesSection = () => {
  const { headline, subheadline, items } = homeContent.industries

  const featured = items.find(item => item.isFeatured)
  const regular = items.filter(item => !item.isFeatured)

  return (
    <Section className="bg-surface">
      <Container>
        <div className="flex flex-col items-center text-center w-full mb-16 md:mb-20">
          <Reveal direction="up" duration={0.8}>
            <H2 className="mb-6 leading-tight tracking-tight text-4xl md:text-5xl lg:text-6xl text-slate-900 w-full">
              {headline}
            </H2>
          </Reveal>
          <Reveal direction="up" delay={0.1} duration={0.8}>
            <Lead className="text-muted-foreground text-lg md:text-xl w-full">
              {subheadline}
            </Lead>
          </Reveal>
        </div>

        <Stagger staggerChildren={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-80 md:auto-rows-90">
            {/* Featured Tile */}
            {featured && (
              <FadeIn className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 md:row-span-2 group">
                <Link href="/products" className="relative block w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent z-10 opacity-80 group-hover:opacity-60 transition-opacity duration-700" />
                  
                  <ResponsiveImage
                    src={featured.image.src}
                    alt={featured.image.alt}
                    fill
                    className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                  />
                  
                  <div className="absolute inset-0 z-20 p-8 md:p-16 flex flex-col justify-end">
                    <div className="flex items-end justify-between mb-6">
                      <h3 className="text-white text-4xl md:text-5xl font-medium tracking-tight max-w-sm leading-[1.1]">{featured.title}</h3>
                      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 -translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 border border-white/20">
                        <ArrowRight className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <p className="text-white/70 text-lg md:text-xl font-light max-w-md line-clamp-2 transition-all duration-500 group-hover:text-white">
                      {featured.description}
                    </p>
                  </div>
                </Link>
              </FadeIn>
            )}

            {/* Regular Tiles */}
            {regular.map((item) => (
              <FadeIn key={item.id} className="col-span-1 row-span-1 group">
                <Link href="/products" className="relative block w-full h-full rounded-3xl overflow-hidden shadow-xl">
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent z-10 opacity-80 group-hover:opacity-60 transition-opacity duration-700" />
                  
                  <ResponsiveImage
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                  />
                  
                  <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-white font-headings font-medium text-2xl tracking-tight">{item.title}</h4>
                      <ArrowRight className="w-5 h-5 text-white opacity-0 -translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0" />
                    </div>
                    <p className="text-white/70 text-base font-light line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </Stagger>
      </Container>
    </Section>
  )
}

