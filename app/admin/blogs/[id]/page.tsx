import { BlogEditorForm } from '@/components/admin/blog-editor'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await prisma.post.findUnique({
    where: { id },
    include: { categories: true }
  })

  if (!post) {
    notFound()
  }

  return <BlogEditorForm initialData={post} />
}
