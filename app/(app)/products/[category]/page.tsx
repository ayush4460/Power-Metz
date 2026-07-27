import { Metadata } from "next"
import { notFound } from "next/navigation"
import { categories } from "@/content/categories"
import { products } from "@/content/products"
import { CategoryProductsView } from "@/components/products/category-products-view"
import { Container, Section } from "@/components/layout"
import { H1, Lead } from "@/components/ui/typography"

interface Props {
  params: Promise<{ category: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const category = categories.find((c) => c.slug === resolvedParams.category)
  
  if (!category) {
    return { title: "Category Not Found | PowerMetz" }
  }

  return {
    title: `${category.name} | PowerMetz Energy Storage Solutions`,
    description: category.description,
    alternates: {
      canonical: `https://www.powermetz.com/products/${category.slug}`,
    },
    openGraph: {
      title: `${category.name} | PowerMetz`,
      description: category.description,
      url: `https://www.powermetz.com/products/${category.slug}`,
      images: [category.image],
    },
  }
}

import Link from "next/link"

export default async function CategoryPage({ params }: Props) {
  const resolvedParams = await params;
  const category = categories.find((c) => c.slug === resolvedParams.category)
  
  if (!category) {
    notFound()
  }

  const categoryProducts = products.filter(p => p.categoryId === category.id)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": category.name,
    "description": category.description,
    "url": `https://www.powermetz.com/products/${category.slug}`,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": categoryProducts.map((product, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `https://www.powermetz.com/products/${category.slug}/${product.slug}`,
        "name": product.name
      }))
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Breadcrumb Navigation */}
      <div className="bg-background pt-20 lg:pt-24">
        <div className="bg-primary text-white py-3">
          <Container>
            <div className="flex items-center text-sm font-medium">
              <Link href="/products" className="hover:underline underline-offset-4 transition-all">Products</Link>
              <span className="mx-2 opacity-70">/</span>
              <span className="text-white">{category.name}</span>
            </div>
          </Container>
        </div>
      </div>
      
      {/* Category Hero */}
      <Section className="bg-background pt-8 pb-2 md:pt-10 md:pb-3 lg:pt-12 lg:pb-4 border-b border-border/5">
        <Container>
          <div className="w-full">
            <div className="text-primary font-semibold text-sm tracking-widest uppercase mb-4">
              Energy Storage Solutions
            </div>
            <H1 className="mb-4">{category.name}</H1>
            <Lead className="w-full max-w-4xl text-lg">
              {category.description}
            </Lead>
          </div>
        </Container>
      </Section>

      {/* Interactive Products View */}
      <CategoryProductsView 
        category={category} 
        products={categoryProducts} 
        allCategories={categories} 
      />
    </>
  )
}
