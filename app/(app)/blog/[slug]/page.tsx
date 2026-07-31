import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import { Container } from '@/components/layout'
import { H1 } from '@/components/ui/typography'
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react'

// Calculate minutes read
const calculateReadTime = (content: string) => {
  const wordsPerMinute = 200
  const text = content.replace(/<[^>]+>/g, '')
  const wordCount = text.split(/\s+/).length
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute))
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = await params
  const post = await prisma.post.findUnique({
    where: { slug }
  })

  if (!post || !post.published) {
    return { title: 'Post Not Found | PowerMetz' }
  }

  return {
    title: `${post.seoTitle || post.title} | PowerMetz`,
    description: post.seoDescription || post.excerpt,
    keywords: post.seoKeywords,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt || '',
      images: post.coverImage ? [post.coverImage] : [],
      type: 'article',
      publishedTime: post.publishedAt?.toISOString() || post.createdAt.toISOString(),
    }
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await prisma.post.findUnique({
    where: { slug },
    include: { categories: true }
  })

  if (!post || !post.published) {
    notFound()
  }

  const readTime = calculateReadTime(post.content)

  return (
    <article className="pb-20">
      {/* Hero Banner Section */}
      <div className="relative w-full h-[60vh] min-h-100 flex items-end justify-center mb-16">
        {/* Background Image */}
        {post.coverImage ? (
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/60 to-black/30" />
            <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-black/60 to-transparent" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-slate-900" />
        )}
        
        {/* Overlay Content */}
        <Container className="relative z-10 pb-12 w-full max-w-4xl pt-32">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {post.categories.map((cat: { id: string; name: string }) => (
              <span key={cat.id} className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-md shadow-sm">
                {cat.name}
              </span>
            ))}
          </div>

          <H1 className="text-primary! mb-6 md:text-5xl lg:text-6xl drop-shadow-lg">{post.title}</H1>
          
          <div className="flex items-center gap-4 text-white/80 text-sm font-medium">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>PowerMetz</span>
            </div>
            <span className="text-white/40">|</span>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.publishedAt?.toISOString() || post.createdAt.toISOString()}>
                {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </time>
            </div>
            <span className="text-white/40">|</span>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{readTime} min read</span>
            </div>
          </div>
        </Container>
      </div>

      <Container className="max-w-4xl">
        <Link href="/blog" className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-primary transition-colors mb-10 uppercase tracking-wider">
          <ArrowLeft className="w-4 h-4 mr-2" /> BACK TO BLOG
        </Link>

        <div 
          className="prose prose-lg sm:prose-xl dark:prose-invert prose-orange max-w-none prose-img:rounded-2xl prose-img:border prose-img:border-border prose-img:shadow-lg prose-headings:font-semibold prose-p:leading-[1.8] prose-p:mb-8 prose-li:mb-4 prose-p:text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
        
        {/* Author / CTA Footer */}
        <div className="mt-20 pt-10 border-t border-border flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-surface p-8 rounded-3xl">
          <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/images/Power_Metz_Logo.png" 
              alt="PowerMetz" 
              className="h-full w-full object-left object-cover" 
            />
          </div>
          <div className="text-center sm:text-left">
            <h4 className="text-lg font-bold text-foreground mb-2">Power<span className="text-primary">Metz</span> Team</h4>
            <p className="text-muted-foreground mb-4">
              Innovators in Battery Energy Storage Systems. We are dedicated to providing sustainable, efficient, and reliable energy solutions for the future.
            </p>
            <Link href="/about" className="text-primary font-medium hover:underline">
              Learn more about our mission &rarr;
            </Link>
          </div>
        </div>
      </Container>
    </article>
  )
}
