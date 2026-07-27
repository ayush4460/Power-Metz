"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRight, Filter, X } from "lucide-react"
import { Container, Section, Grid } from "@/components/layout"
import { ResponsiveImage } from "@/components/shared/media"
import type { Category } from "@/content/categories"
import type { Product } from "@/content/products"

interface Props {
  category: Category
  products: Product[]
  allCategories: Category[]
}

export const CategoryProductsView = ({ category, products, allCategories }: Props) => {
  const pathname = usePathname()
  const [activeFilter, setActiveFilter] = useState<string>("all")

  // Simple client-side filtering by application if needed
  // In a real app with more products, this could be extended to capacity/chemistry
  const filteredProducts = activeFilter === "all" 
    ? products 
    : products.filter(p => p.applications.includes(activeFilter))

  // Extract unique applications from products in this category for the filter
  const availableFilters = Array.from(new Set(products.flatMap(p => p.applications)))

  return (
    <Section className="bg-[#F6F5F2] pt-6 md:pt-8 lg:pt-10 pb-12 md:pb-16 lg:pb-20">
      <Container>


        {/* Header & Filter Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 relative z-20">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">Available Models</h2>
          
          {availableFilters.length > 0 && (
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Application:
              </span>
              <div className="relative">
                <button
                  onClick={(e) => {
                    const target = e.currentTarget.nextElementSibling;
                    target?.classList.toggle('hidden');
                  }}
                  onBlur={(e) => {
                    const target = e.currentTarget.nextElementSibling;
                    setTimeout(() => target?.classList.add('hidden'), 150);
                  }}
                  className="w-48 flex items-center justify-between bg-white border border-border/20 shadow-sm rounded-md px-4 py-2 text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer capitalize transition-all"
                >
                  <span>{activeFilter.replace('-', ' ')}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="m6 9 6 6 6-6"/></svg>
                </button>
                <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-border/20 shadow-xl rounded-md hidden overflow-hidden flex-col z-50">
                  <button
                    onClick={() => setActiveFilter("all")}
                    className="w-full text-left px-4 py-2.5 text-sm font-semibold hover:bg-primary/10 hover:text-primary transition-colors border-b border-border/10"
                  >
                    All
                  </button>
                  {availableFilters.map(filter => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className="w-full text-left px-4 py-2.5 text-sm font-medium capitalize hover:bg-primary/10 hover:text-primary transition-colors border-b border-border/5 last:border-0"
                    >
                      {filter.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Product Grid */}
        <Grid cols={3} className="gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <Link 
              key={product.id}
              href={`/products/${category.slug}/${product.slug}`}
              className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-black/5 h-full"
            >
              {/* Image */}
              <div className="relative w-full aspect-[4/3] shrink-0 bg-muted/10 p-8 flex items-center justify-center overflow-hidden">
                  <ResponsiveImage
                    src={product.image}
                    alt={product.name}
                    fill
                    objectFit="contain"
                    className="p-4 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
              </div>
              
              {/* Product Content */}
              <div className="p-6 md:p-8 flex flex-col flex-1 bg-white">
                <div className="text-primary font-bold tracking-wide mb-1 text-xs">
                  {category.name.toUpperCase()}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-4 line-clamp-2 min-h-[56px]">
                  {product.name}
                </h3>
                
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Model</span>
                    <span className="font-semibold text-foreground">{product.modelNumber}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Capacity</span>
                    <span className="font-semibold text-foreground">{product.capacity}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Chemistry</span>
                    <span className="font-semibold text-foreground">{product.chemistry}</span>
                  </div>
                  {product.cycleLife && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Cycle Life</span>
                      <span className="font-semibold text-foreground">{product.cycleLife}</span>
                    </div>
                  )}
                </div>

                <div className="mt-auto pt-4 border-t border-border/20">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {product.applications.slice(0, 3).map((app) => (
                      <span key={app} className="bg-primary text-white px-2 py-1 rounded text-[11px] font-semibold uppercase tracking-wider">
                        {app.replace('-', ' ')}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center text-sm font-semibold text-primary group-hover:underline group-hover:underline-offset-4">
                    Explore Product
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
          
          {filteredProducts.length === 0 && (
            <div className="col-span-full py-20 text-center text-muted-foreground">
              No products found matching the selected filter.
            </div>
          )}
        </Grid>
      </Container>
    </Section>
  )
}
