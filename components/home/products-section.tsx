import React from "react"
import { ArrowRight } from "lucide-react"
import { Container, Section, Grid } from "@/components/layout"
import { H2, Paragraph } from "@/components/ui/typography"
import { Reveal, FadeIn } from "@/components/motion"
import { ResponsiveImage } from "@/components/shared/media"
import { homeContent } from "@/content/home"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const ProductsSection = () => {
  const { products } = homeContent.products

  return (
    <Section className="bg-[#F6F5F2] border-t border-border/5">
      <Container>
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <Reveal direction="up" duration={0.8}>
              <div className="text-primary font-semibold text-sm md:text-base tracking-widest uppercase mb-4">
                Powering Every Need
              </div>
            </Reveal>
            <Reveal direction="up" delay={0.1} duration={0.8}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6 font-headings">
                Engineered for Every Application
              </h2>
            </Reveal>
            <Reveal direction="up" delay={0.2} duration={0.8}>
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed font-light">
                High-performance battery systems designed for industrial, commercial, and critical applications.
              </p>
            </Reveal>
          </div>
          
          <Reveal direction="up" delay={0.3} duration={0.8}>
            <Link href="/products">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-base md:text-lg px-8 h-14 rounded-full transition-all duration-300 w-fit group mt-4 md:mt-0">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </Reveal>
        </div>

        {/* Grid Area */}
        <Grid cols={3} className="gap-6 lg:gap-8">
          {products.map((product, index) => (
            <Reveal 
              key={product.id} 
              direction="up" 
              delay={0.2 + index * 0.1} 
              duration={0.8}
            >
              <Link 
                href={product.link} 
                className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-xl transition-all duration-300 border border-black/5 h-full"
              >
                {/* Image */}
                <div className="relative w-full aspect-4/3 bg-muted/20 p-8 flex items-center justify-center">
                  <ResponsiveImage
                    src={product.image.src}
                    alt={product.image.alt}
                    fill
                    className="object-contain scale-90 group-hover:scale-100 transition-transform duration-500 ease-out mix-blend-darken"
                  />
                </div>
                
                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col flex-1 relative bg-white">
                  <div className="text-primary font-bold tracking-wide mb-1 text-sm md:text-base">
                    {product.id.toUpperCase().replace('POWER-', '')}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-4">
                    {product.category}
                  </h3>
                  
                  <div className="text-xs md:text-sm text-muted-foreground mt-auto">
                    {product.description}
                  </div>
                  
                  {/* Arrow Button */}
                  <div className="absolute bottom-6 md:bottom-8 right-6 md:right-8 w-10 h-10 rounded-xl border border-border/60 flex items-center justify-center text-foreground group-hover:border-primary group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                    <ArrowRight className="w-4 h-4 group-hover:-rotate-45 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}

