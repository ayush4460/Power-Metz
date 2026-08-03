import React from "react"
import type { Metadata } from "next"
import { Container, Section, Grid } from "@/components/layout"
import { H1, Lead } from "@/components/ui/typography"
import { Reveal } from "@/components/motion"
import { ResponsiveImage } from "@/components/shared/media"
import { categories } from "@/content/categories"
import Link from "next/link"
import { ArrowRight, Check, ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Energy Storage Solutions & Products | PowerMetz",
  description: "Explore PowerMetz's enterprise energy storage solutions. From residential ESS to megawatt-scale containerized BESS, engineered for critical infrastructure.",
}

export default function ProductsPage() {
  // Generate JSON-LD Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "PowerMetz Energy Storage Solutions",
    "description": "Enterprise energy storage solutions from PowerMetz Energy.",
    "url": "https://www.powermetz.com/products",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": categories.map((category, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `https://www.powermetz.com/products/${category.slug}`,
        "name": category.name
      }))
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero Section */}
      <Section className="bg-background pt-32 pb-8 md:pt-36 lg:pt-40 lg:pb-12 border-b border-border/5">
        <Container>
          <div className="w-full">


            <Reveal direction="up" delay={0.1} duration={0.8}>
              <div className="text-primary font-semibold text-sm tracking-widest uppercase mb-4 text-center md:text-left">
                Products & Solutions
              </div>
            </Reveal>
            <Reveal direction="up" delay={0.2} duration={0.8}>
              <H1 className="mb-4 text-center md:text-left">Engineered for Every Application</H1>
            </Reveal>
            <Reveal direction="up" delay={0.3} duration={0.8}>
              <Lead className="w-full text-lg text-center md:text-left max-w-4xl mx-auto md:mx-0">
                PowerMetz develops advanced Lithium Iron Phosphate (LFP) battery systems. 
                Our industrial-grade solutions range from modular residential units to megawatt-scale 
                containerized storage, ensuring reliable power for the most demanding environments.
              </Lead>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Categories Grid */}
      <Section className="bg-[#F6F5F2] py-8 lg:py-12">
        <Container>
          <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
            {categories.map((category, index) => (
              <Reveal 
                key={category.id} 
                direction="up" 
                delay={index * 0.1} 
                duration={0.8}
                className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-22px)] flex flex-col"
              >
                <Link 
                  href={`/products/${category.slug}`} 
                  className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-black/5 h-full relative"
                >
                  <div className="relative w-full aspect-[4/3] bg-muted/10 overflow-hidden">
                    <ResponsiveImage
                      src={category.image}
                      alt={category.name}
                      fill
                      objectFit="contain"
                      className="p-4 group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                  
                  <div className="p-6 md:p-8 flex flex-col flex-1 relative bg-white">
                    <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors">
                      {category.name}
                    </h2>
                    
                    <p className="text-sm md:text-base text-muted-foreground mb-6 line-clamp-3">
                      {category.description}
                    </p>

                    <div className="mt-auto">
                      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                        Ideal For
                      </div>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {category.suitableFor.slice(0, 3).map((app) => (
                          <div key={app} className="inline-flex items-center gap-1 bg-muted/50 px-2.5 py-1 rounded-md text-xs font-medium text-foreground/80">
                            <Check className="w-3 h-3 text-primary" />
                            {app}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm font-semibold text-primary group-hover:underline group-hover:underline-offset-4">
                      Explore Series
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
