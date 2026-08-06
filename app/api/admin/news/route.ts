import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const posts = await prisma.news.findMany({
      orderBy: { createdAt: 'desc' },
      include: { categories: true }
    })
    return NextResponse.json(posts)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { title, excerpt, content, coverImage, seoTitle, seoDescription, seoKeywords, published, categoryIds } = data

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')

    const post = await prisma.news.create({
      data: {
        title,
        slug,
        excerpt,
        content: content || '',
        coverImage,
        seoTitle,
        seoDescription,
        seoKeywords,
        published: Boolean(published),
        publishedAt: published ? new Date() : null,
        categories: {
          connect: categoryIds ? categoryIds.map((id: string) => ({ id })) : []
        }
      }
    })

    await prisma.auditLog.create({
      data: {
        action: 'CREATE_POST',
        entityId: post.id,
        details: JSON.stringify({ title, slug, published })
      }
    })

    return NextResponse.json(post)
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (error instanceof Error && (error as any).code === 'P2002') {
      return NextResponse.json({ error: 'Post with this slug already exists' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}


