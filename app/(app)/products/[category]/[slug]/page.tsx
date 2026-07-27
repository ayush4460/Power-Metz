import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowRight, Check, Download, Info, Mail } from "lucide-react"
import { categories } from "@/content/categories"
import { products } from "@/content/products"
import { productSpecifications } from "@/content/specifications"
import { Container, Section } from "@/components/layout"
import { H1, H2, H3, Paragraph } from "@/components/ui/typography"
import { ResponsiveImage } from "@/components/shared/media"
import { Button } from "@/components/ui/button"

interface Props {
  params: Promise<{ category: string; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const product = products.find((p) => p.slug === resolvedParams.slug)
  
  if (!product) {
    return { title: "Product Not Found | PowerMetz" }
  }

  return {
    title: `${product.name} | ${product.chemistry} Energy Storage | PowerMetz`,
    description: product.shortDescription,
    alternates: {
      canonical: `https://www.powermetz.com/products/${resolvedParams.category}/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | PowerMetz`,
      description: product.shortDescription,
      url: `https://www.powermetz.com/products/${resolvedParams.category}/${product.slug}`,
      images: [product.image],
    },
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const category = categories.find((c) => c.slug === resolvedParams.category)
  const product = products.find((p) => p.slug === resolvedParams.slug && p.categoryId === category?.id)
  
  if (!category || !product) {
    notFound()
  }

  const specs = productSpecifications[product.id] || []
  const relatedProducts = products.filter(p => p.categoryId === category.id && p.id !== product.id).slice(0, 3)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.image,
    "description": product.overview,
    "model": product.modelNumber,
    "brand": {
      "@type": "Brand",
      "name": "PowerMetz Energy"
    },
    "category": category.name,
    "additionalProperty": specs.map(spec => ({
      "@type": "PropertyValue",
      "name": spec.label,
      "value": spec.value
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Breadcrumb */}
      <div className="bg-background pt-20 lg:pt-24">
        <div className="bg-primary text-white py-3">
          <Container>
            <div className="flex items-center text-sm font-medium">
              <Link href="/products" className="hover:underline underline-offset-4 transition-all">Products</Link>
              <span className="mx-2 opacity-70">/</span>
              <Link href={`/products/${category.slug}`} className="hover:underline underline-offset-4 transition-all">{category.name}</Link>
              <span className="mx-2 opacity-70">/</span>
              <span className="text-white">{product.modelNumber}</span>
            </div>
          </Container>
        </div>
      </div>

      {/* 1. Hero Section */}
      <Section className="bg-background py-12 lg:py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Image */}
            <div className="relative w-full aspect-square md:aspect-[4/3] bg-muted/10 rounded-2xl p-8 flex items-center justify-center">
              <ResponsiveImage
                src={product.image}
                alt={product.name}
                fill
                objectFit="contain"
                className="scale-95 mix-blend-darken"
                priority
              />
            </div>
            
            {/* Right: Product Info */}
            <div>
              <div className="text-primary font-bold tracking-widest text-sm mb-4 uppercase">
                {category.name}
              </div>
              <H1 className="mb-6">{product.name}</H1>
              <p className="text-lg text-muted-foreground mb-8">
                {product.shortDescription}
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="bg-[#F6F5F2] p-4 rounded-xl border border-black/5">
                  <div className="text-sm text-muted-foreground mb-1 font-semibold uppercase tracking-wider">Model</div>
                  <div className="text-lg font-bold text-foreground">{product.modelNumber}</div>
                </div>
                <div className="bg-[#F6F5F2] p-4 rounded-xl border border-black/5">
                  <div className="text-sm text-muted-foreground mb-1 font-semibold uppercase tracking-wider">Capacity</div>
                  <div className="text-lg font-bold text-foreground">{product.capacity}</div>
                </div>
                <div className="bg-[#F6F5F2] p-4 rounded-xl border border-black/5">
                  <div className="text-sm text-muted-foreground mb-1 font-semibold uppercase tracking-wider">Chemistry</div>
                  <div className="text-lg font-bold text-foreground">{product.chemistry}</div>
                </div>
                {product.cycleLife && (
                  <div className="bg-[#F6F5F2] p-4 rounded-xl border border-black/5">
                    <div className="text-sm text-muted-foreground mb-1 font-semibold uppercase tracking-wider">Cycle Life</div>
                    <div className="text-lg font-bold text-foreground">{product.cycleLife}</div>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="flex-1 text-base font-semibold">
                  Request a Quote
                </Button>
                <Button variant="outline" size="lg" className="flex-1 text-base font-semibold">
                  <Download className="w-4 h-4 mr-2" /> Download Datasheet
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Compact Info Section */}
      <Section className="bg-[#F6F5F2] py-12 lg:py-16 border-y border-border/5">
        <Container>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Left Column: Specs & Overview */}
            <div className="space-y-12">
              {/* Technical Specifications */}
              {specs.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <H2 className="!mb-0">Technical Specifications</H2>
                  </div>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-black/5">
                    <table className="w-full text-left border-collapse text-sm md:text-base">
                      <tbody>
                        {specs.map((spec, index) => (
                          <tr key={index} className="border-b border-border/10 last:border-0 hover:bg-muted/5 transition-colors">
                            <th className="py-3 px-4 md:px-6 text-foreground font-semibold w-1/3 md:w-2/5 bg-muted/10 align-top">
                              {spec.label}
                            </th>
                            <td className="py-3 px-4 md:px-6 text-muted-foreground">
                              {spec.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* System Overview */}
              <div>
                <H2 className="mb-4">System Overview</H2>
                <Paragraph className="text-base md:text-lg text-muted-foreground">
                  {product.overview}
                </Paragraph>
              </div>
            </div>

            {/* Right Column: Features, Advantages, Applications */}
            <div className="space-y-12">
              {/* Advantages */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-primary text-white p-1.5 rounded-md">
                    <Info className="w-5 h-5" />
                  </div>
                  <H2 className="!mb-0">Key Advantages</H2>
                </div>
                <ul className="space-y-4">
                  {product.advantages.map((adv, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-0.5 min-w-[20px]">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary text-xs font-bold">{index + 1}</span>
                        </div>
                      </div>
                      <span className="text-base text-foreground font-medium">{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Engineering Features */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-primary text-white p-1.5 rounded-md">
                    <Check className="w-5 h-5" />
                  </div>
                  <H2 className="!mb-0">Engineering Features</H2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.features.map((feat, index) => (
                    <div key={index} className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-black/5 shadow-sm">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ideal Applications */}
              <div>
                <H2 className="mb-6">Ideal Applications</H2>
                <div className="flex flex-wrap gap-3">
                  {product.applications.map((app) => (
                    <div key={app} className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-black/5 shadow-sm">
                      <div className="bg-primary/10 p-1 rounded">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="font-semibold text-sm text-foreground capitalize">{app.replace('-', ' ')}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </Container>
      </Section>

      {/* 8. Related Products */}
      {relatedProducts.length > 0 && (
        <Section className="bg-background py-16 lg:py-24">
          <Container>
            <H2 className="mb-12">Related Solutions</H2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {relatedProducts.map(rp => (
                <Link 
                  key={rp.id}
                  href={`/products/${category.slug}/${rp.slug}`}
                  className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-black/5"
                >
                  <div className="relative w-full aspect-[4/3] bg-[#F6F5F2] p-8 flex items-center justify-center">
                    <ResponsiveImage
                      src={rp.image}
                      alt={rp.name}
                      fill
                      objectFit="contain"
                      className="scale-90 group-hover:scale-100 transition-transform duration-500 ease-out mix-blend-darken"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{rp.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{rp.shortDescription}</p>
                    <div className="flex items-center text-sm font-semibold text-primary">
                      View Specifications <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* 9. Enquiry CTA */}
      <Section className="bg-foreground py-16 lg:py-24 text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <H2 className="text-white mb-6">Need Help Choosing?</H2>
            <p className="text-lg text-white/80 mb-10">
              Our engineering team is ready to help you size and integrate the right energy storage solution for your specific requirements.
            </p>
            <Button size="lg" variant="default" className="bg-primary hover:bg-primary-hover text-white text-lg px-8 h-14 rounded-full">
              <Mail className="w-5 h-5 mr-3" /> Contact Engineering Team
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
