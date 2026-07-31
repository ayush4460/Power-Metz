import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    
    // Check if category is used by any posts
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: { posts: true }
        }
      }
    })

    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }

    if (category._count.posts > 0) {
      return NextResponse.json({ error: 'Cannot delete category with associated posts' }, { status: 400 })
    }

    await prisma.category.delete({
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
