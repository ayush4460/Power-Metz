"use client"

import { useState, useEffect, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { RichTextEditor } from '@/components/admin/rich-text-editor'
import { H3 } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Save, Loader2, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'

type Category = { id: string; name: string }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function BlogEditorForm({ initialData = null }: { initialData?: any }) {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    excerpt: initialData?.excerpt || '',
    content: initialData?.content || '',
    coverImage: initialData?.coverImage || '',
    seoTitle: initialData?.seoTitle || '',
    seoDescription: initialData?.seoDescription || '',
    seoKeywords: initialData?.seoKeywords || '',
    published: Boolean(initialData?.published),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    categoryIds: (initialData?.categories?.map((c: any) => c.id) || []) as string[]
  })

  useEffect(() => {
    fetch('/api/admin/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
  }, [])



  const handleUploadCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    const uploadData = new FormData()
    uploadData.append('file', file)
    uploadData.append('folder', `powermetz/blogs/${formData.slug || 'drafts'}/cover`)

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: uploadData })
      const data = await res.json()
      if (data.url) {
        setFormData(prev => ({ ...prev, coverImage: data.url }))
      } else {
        alert('Cover upload failed')
      }
    } catch {
      alert('Upload failed')
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    
    try {
      const url = initialData ? `/api/admin/blogs/${initialData.id}` : '/api/admin/blogs'
      const method = initialData ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        router.push('/admin/blogs')
        router.refresh()
      } else {
        const err = await res.json()
        alert(err.error || 'Failed to save post')
      }
    } catch {
      alert('An error occurred while saving')
    } finally {
      setIsSaving(false)
    }
  }

  const toggleCategory = (id: string) => {
    setFormData(prev => {
      const ids = prev.categoryIds.includes(id) 
        ? prev.categoryIds.filter((cid: string) => cid !== id)
        : [...prev.categoryIds, id]
      return { ...prev, categoryIds: ids }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-surface p-4 border border-border rounded-xl sticky top-4 z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/admin/blogs" className="p-2 hover:bg-muted rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </Link>
          <H3 className="text-xl sm:text-2xl m-0">{initialData ? 'Edit Post' : 'New Post'}</H3>
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input 
              type="checkbox" 
              checked={formData.published}
              onChange={e => setFormData(prev => ({ ...prev, published: e.target.checked }))}
              className="w-4 h-4 text-primary rounded border-border" 
            />
            <span className="text-sm font-medium">Publish Post</span>
          </label>
          <Button type="submit" disabled={isSaving} className="flex-1 sm:flex-none bg-primary text-white hover:bg-primary/90">
            {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save Post
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Post Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={e => {
                const title = e.target.value
                setFormData(prev => ({ 
                  ...prev, 
                  title,
                  ...(!initialData && !prev.slug ? { slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') } : {})
                }))
              }}
              className="w-full h-12 px-4 bg-background border border-border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="e.g., The Future of Energy Storage"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Content</label>
            <RichTextEditor 
              content={formData.content} 
              onChange={(html) => setFormData(prev => ({ ...prev, content: html }))}
              slug={formData.slug}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Excerpt</label>
            <textarea
              value={formData.excerpt}
              onChange={e => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
              className="w-full p-4 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-25"
              placeholder="A short summary of the post..."
            />
          </div>
        </div>

        {/* Sidebar Settings Column */}
        <div className="space-y-6">
          {/* Cover Image */}
          <div className="bg-surface p-6 border border-border rounded-xl space-y-4 shadow-sm">
            <h4 className="font-semibold">Cover Image</h4>
            {formData.coverImage && (
              <img src={formData.coverImage} alt="Cover" className="w-full aspect-video object-cover rounded-lg border border-border" />
            )}
            <label className="flex items-center justify-center gap-2 w-full h-10 border border-dashed border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors cursor-pointer text-muted-foreground">
              {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
              {formData.coverImage ? 'Change Image' : 'Upload Image'}
              <input type="file" accept="image/*" className="hidden" onChange={handleUploadCover} />
            </label>
          </div>

          {/* Categories */}
          <div className="bg-surface p-6 border border-border rounded-xl space-y-6 shadow-sm">
            <div className="space-y-3">
              <label className="text-sm font-semibold">Categories</label>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => toggleCategory(cat.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors border ${
                      formData.categoryIds.includes(cat.id)
                        ? 'bg-primary/10 text-primary border-primary/30'
                        : 'bg-background text-muted-foreground border-border hover:border-primary/50'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* SEO Metadata */}
          <div className="bg-surface p-6 border border-border rounded-xl space-y-4 shadow-sm">
            <h4 className="font-semibold text-primary">SEO Settings</h4>
            
            <div className="space-y-2">
              <label className="text-xs font-medium">Meta Title</label>
              <input
                type="text"
                value={formData.seoTitle}
                onChange={e => setFormData(prev => ({ ...prev, seoTitle: e.target.value }))}
                className="w-full h-9 px-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
                placeholder="Leave blank to use post title"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-medium">Meta Description</label>
              <textarea
                value={formData.seoDescription}
                onChange={e => setFormData(prev => ({ ...prev, seoDescription: e.target.value }))}
                className="w-full p-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 min-h-20"
                placeholder="Leave blank to use excerpt"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-medium">Meta Keywords</label>
              <input
                type="text"
                value={formData.seoKeywords}
                onChange={e => setFormData(prev => ({ ...prev, seoKeywords: e.target.value }))}
                className="w-full h-9 px-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
                placeholder="Comma separated"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
