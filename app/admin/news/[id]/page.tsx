import { NewsEditorForm } from '@/components/admin/news-editor'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const news = await prisma.news.findUnique({
    where: { id },
    include: { categories: true }
  })

  if (!news) {
    notFound()
  }

  return <NewsEditorForm initialData={news} />
}
