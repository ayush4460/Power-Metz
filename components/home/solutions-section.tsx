"use client"

import React from "react"
import { ArrowRight, CheckCircle } from "lucide-react"
import { Container, Section, Grid } from "@/components/layout"
import { H2 } from "@/components/ui/typography"
import { Reveal } from "@/components/motion"
import { ResponsiveImage } from "@/components/shared/media"
import { categories } from "@/content/categories"
import Link from "next/link"

export const SolutionsSection = () => {
  return (
    <Section className="bg-[#F6F5F2] border-t border-border/5 overflow-hidden">
      <Container>
        {/* Header Area */}
        <div className="flex flex-col mb-12 lg:mb-16">
          <div className="w-full">
            <Reveal direction="up" duration={0.8}>
              <div className="text-primary font-semibold text-sm md:text-base tracking-widest uppercase mb-4 text-center md:text-left">
                POWERMETZ SOLUTIONS
              </div>
            </Reveal>
            <Reveal direction="up" delay={0.1} duration={0.8}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6 text-center md:text-left font-headings">
                Energy Storage Solutions for Every Application
              </h2>
            </Reveal>
            <Reveal direction="up" delay={0.2} duration={0.8}>
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed font-light text-center md:text-left max-w-4xl mx-auto md:mx-0">
                PowerMetz develops advanced Lithium Iron Phosphate battery systems engineered for residential, commercial, industrial, telecom, UPS and utility-scale applications.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Grid Area */}
        <div className="-mx-4 px-4 md:mx-0 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 pb-8 md:pb-0">
            {categories.map((category, index) => (
              <Reveal 
                key={category.id} 
                direction="up" 
                delay={0.2 + index * 0.1} 
                duration={0.8}
                className="min-w-0"
              >
                <Link 
                  href={`/products/${category.slug}`} 
                  className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-black/5 h-full relative"
                >
                  {/* Image */}
                  <div className="relative w-full aspect-4/3 bg-muted/10 overflow-hidden">
                    <ResponsiveImage
                      src={category.image}
                      alt={category.name}
                      fill
                      objectFit="contain"
                      className="p-4 md:p-6 group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 md:p-8 flex flex-col flex-1 relative bg-white">
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    
                    <p className="text-sm md:text-base text-muted-foreground mb-6 line-clamp-2">
                      {category.description}
                    </p>

                    <div className="mt-auto">
                      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                        Suitable For
                      </div>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {category.suitableFor.slice(0, 3).map((app) => (
                          <div key={app} className="inline-flex items-center gap-1.5 bg-muted/50 px-3 py-1.5 rounded-md text-xs font-medium text-foreground/80">
                            <CheckCircle className="w-3.5 h-3.5 text-primary" strokeWidth={2.5} />
                            {app}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm font-semibold text-primary underline underline-offset-4 lg:no-underline lg:group-hover:underline">
                      Explore Solution
                      <ArrowRight className="w-4 h-4 ml-2 translate-x-1 lg:translate-x-0 lg:group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-12 lg:mt-16 flex justify-center">
          <Reveal direction="up" delay={0.3} duration={0.8}>
            <Link 
              href="/products" 
              className="group inline-flex items-center gap-2 text-white font-semibold bg-primary hover:bg-primary/90 whitespace-nowrap text-sm md:text-base border border-transparent px-8 py-4 rounded-full shadow-sm hover:shadow-md transition-colors"
            >
              Explore All Products
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
