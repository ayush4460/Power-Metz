import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const post = await prisma.post.findUnique({
      where: { id },
      include: { categories: true }
    })
    if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const data = await request.json()
    const { title, excerpt, content, coverImage, seoTitle, seoDescription, seoKeywords, published, categoryIds } = data

    const slug = title ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : undefined

    // Get current post to see if publish status changed
    const currentPost = await prisma.post.findUnique({ where: { id } })
    if (!currentPost) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    let publishedAt = currentPost.publishedAt
    if (!currentPost.published && published) {
      publishedAt = new Date() // Just published
    }

    const post = await prisma.post.update({
      where: { id },
      data: {
        title,
        ...(slug ? { slug } : {}),
        excerpt,
        content,
        coverImage,
        seoTitle,
        seoDescription,
        seoKeywords,
        published: Boolean(published),
        publishedAt,
        categories: {
          set: categoryIds ? categoryIds.map((id: string) => ({ id })) : []
        }
      }
    })

    await prisma.auditLog.create({
      data: {
        action: 'UPDATE_POST',
        entityId: post.id,
        details: JSON.stringify({ title, published })
      }
    })

    return NextResponse.json(post)
  } catch (error: any) {
    if (error.code === 'P2002') return NextResponse.json({ error: 'Slug already exists' }, { status: 400 })
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await prisma.post.delete({ where: { id } })

    await prisma.auditLog.create({
      data: {
        action: 'DELETE_POST',
        entityId: id,
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
