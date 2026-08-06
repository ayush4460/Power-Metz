import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const { name } = await request.json()

    if (!name?.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    const slug = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

    const updated = await prisma.newsCategory.update({
      where: { id },
      data: { name: name.trim(), slug },
      include: { _count: { select: { news: true } } }
    })

    return NextResponse.json(updated)
  } catch (error: any) {
    if (error?.code === 'P2002') {
      return NextResponse.json({ error: 'A category with this name already exists' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    
    // Check if category is used by any posts
    const category = await prisma.newsCategory.findUnique({
      where: { id },
      include: {
        _count: {
          select: { news: true }
        }
      }
    })

    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }

    if (category._count.posts > 0) {
      return NextResponse.json({ error: 'Cannot delete category with associated posts' }, { status: 400 })
    }

    await prisma.newsCategory.delete({
      where: { id }
    })

    // Log the action
    await prisma.auditLog.create({
      data: {
        action: 'DELETE_CATEGORY',
        entityId: id,
        details: JSON.stringify({ name: category.name })
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 })
  }
}
