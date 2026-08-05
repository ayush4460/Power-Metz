"use client"

import { useState, useEffect, useRef, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { RichTextEditor } from '@/components/admin/rich-text-editor'
import { H3 } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Save, Loader2, Image as ImageIcon, X } from 'lucide-react'
import Link from 'next/link'

type Category = { id: string; name: string }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function BlogEditorForm({ initialData = null }: { initialData?: any }) {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [categoryOpen, setCategoryOpen] = useState(false)
  const categoryRef = useRef<HTMLDivElement>(null)

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

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (categoryRef.current && !categoryRef.current.contains(e.target as Node)) {
        setCategoryOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedCategory = categories.find(c => c.id === formData.categoryIds[0])

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
        setError('Cover image upload failed. Please try again.')
      }
    } catch {
      setError('Upload failed. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!formData.title.trim()) { setError('Post title is required.'); return }
    if (!formData.content || formData.content === '<p></p>') { setError('Post content cannot be empty.'); return }
    setIsSaving(true)
    try {
      const url = initialData ? `/api/admin/blogs/${initialData.id}` : '/api/admin/blogs'
      const method = initialData ? 'PUT' : 'POST'
      const payload = initialData ? formData : { ...formData, published: true }
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (res.ok) {
        router.push('/admin/blogs')
        router.refresh()
      } else {
        const err = await res.json()
        setError(err.error || 'Failed to save post. Please try again.')
      }
    } catch {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="w-full space-y-8">
      {/* ── Header ── */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <Link href="/admin/blogs" className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <H3>{initialData ? 'Edit Blog Post' : 'Create New Blog Post'}</H3>
            <p className="text-muted-foreground mt-1 text-sm">
              {initialData ? 'Update the details for this post.' : 'Fill in the details to create and publish a new post.'}
            </p>
          </div>
        </div>
        <Link href="/admin/blogs">
          <Button variant="outline" type="button" className="hidden sm:flex">
            Back to Blogs
          </Button>
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-border shadow-sm space-y-6">

          {/* Error */}
          {error && (
            <div className="flex items-start justify-between gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 text-sm font-medium">
              <span>{error}</span>
              <button type="button" onClick={() => setError(null)} className="shrink-0"><X className="w-4 h-4" /></button>
            </div>
          )}

          {/* Row 1: Title + Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-slate-700">
                Post Title <span className="text-red-500">*</span>
              </label>
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
                className="w-full border border-gray-200 rounded-lg p-3 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F58220]/20 focus:border-[#F58220] hover:border-[#F58220]/50 transition-all duration-300 shadow-sm placeholder:text-gray-400"
                placeholder="e.g. The Future of Energy Storage"
              />
            </div>

            {/* Category Custom Dropdown */}
            <div>
              <label className="block text-sm font-medium mb-1.5 text-slate-700">Category</label>
              <div className="relative" ref={categoryRef}>
                <div
                  onClick={() => setCategoryOpen(o => !o)}
                  className={`w-full border ${categoryOpen ? 'border-[#F58220] ring-2 ring-[#F58220]/20' : 'border-gray-200'} rounded-lg p-3 pr-10 bg-white text-slate-800 hover:border-[#F58220]/50 transition-all duration-300 cursor-pointer shadow-sm select-none`}
                >
                  <span className={selectedCategory ? 'text-slate-800' : 'text-gray-400'}>
                    {selectedCategory ? selectedCategory.name : 'Select a category...'}
                  </span>
                </div>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#F58220]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${categoryOpen ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
                </div>
                {categoryOpen && (
                  <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-lg shadow-[0_12px_40px_rgb(0,0,0,0.08)] overflow-hidden py-1">
                    {categories.map(cat => (
                      <div
                        key={cat.id}
                        onClick={() => { setFormData(prev => ({ ...prev, categoryIds: [cat.id] })); setCategoryOpen(false) }}
                        className={`px-4 py-2.5 cursor-pointer transition-colors text-sm ${formData.categoryIds[0] === cat.id ? 'bg-[#F58220]/10 text-[#F58220] font-medium' : 'text-slate-700 hover:bg-slate-50 hover:text-[#F58220]'}`}
                      >
                        {cat.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium mb-1.5 text-slate-700">Short Summary / Excerpt</label>
            <p className="text-xs text-muted-foreground mb-2">Shown in the blog listing page below the title.</p>
            <textarea
              value={formData.excerpt}
              onChange={e => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg p-3 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F58220]/20 focus:border-[#F58220] hover:border-[#F58220]/50 transition-all duration-300 shadow-sm placeholder:text-gray-400 min-h-[80px] resize-none"
              placeholder="A short summary of the post..."
            />
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-sm font-medium mb-1.5 text-slate-700">Cover Image</label>
            <p className="text-xs text-muted-foreground mb-2">The thumbnail shown on the listing page and at the top of the post.</p>
            {formData.coverImage ? (
              <div className="space-y-3">
                <img src={formData.coverImage} alt="Cover preview" className="w-full max-h-56 object-cover rounded-lg border border-gray-200 shadow-sm" />
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-muted/50 transition-colors cursor-pointer text-slate-700 shadow-sm">
                    {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
                    Change Image
                    <input type="file" accept="image/*" className="hidden" onChange={handleUploadCover} />
                  </label>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, coverImage: '' }))}
                    className="px-4 py-2 text-sm text-red-500 hover:text-red-600 hover:bg-red-50 border border-red-100 rounded-lg transition-colors font-medium shadow-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center gap-2 w-full h-36 border-2 border-dashed border-gray-200 rounded-lg text-muted-foreground hover:border-[#F58220]/40 hover:bg-muted/20 transition-all cursor-pointer">
                {isUploading
                  ? <Loader2 className="w-7 h-7 animate-spin text-[#F58220]" />
                  : <ImageIcon className="w-7 h-7 opacity-25" />
                }
                <span className="text-sm font-medium">{isUploading ? 'Uploading...' : 'Click to upload cover image'}</span>
                <span className="text-xs">PNG, JPG, WEBP</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleUploadCover} />
              </label>
            )}
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium mb-1.5 text-slate-700">
              Post Content <span className="text-red-500">*</span>
            </label>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <RichTextEditor
                content={formData.content}
                onChange={(html) => setFormData(prev => ({ ...prev, content: html }))}
                slug={formData.slug}
              />
            </div>
          </div>

          {/* SEO Section */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-4 pb-3 border-b border-border">
              SEO Settings <span className="text-xs text-muted-foreground font-normal ml-1">(optional — leave blank to use defaults)</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium mb-1.5 text-slate-700">Meta Title</label>
                <input
                  type="text"
                  value={formData.seoTitle}
                  onChange={e => setFormData(prev => ({ ...prev, seoTitle: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg p-3 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F58220]/20 focus:border-[#F58220] hover:border-[#F58220]/50 transition-all duration-300 shadow-sm placeholder:text-gray-400"
                  placeholder="Leave blank to use post title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5 text-slate-700">Meta Keywords</label>
                <input
                  type="text"
                  value={formData.seoKeywords}
                  onChange={e => setFormData(prev => ({ ...prev, seoKeywords: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg p-3 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F58220]/20 focus:border-[#F58220] hover:border-[#F58220]/50 transition-all duration-300 shadow-sm placeholder:text-gray-400"
                  placeholder="energy storage, BESS, EV battery"
                />
              </div>
            </div>
            <div className="mt-5">
              <label className="block text-sm font-medium mb-1.5 text-slate-700">Meta Description</label>
              <textarea
                value={formData.seoDescription}
                onChange={e => setFormData(prev => ({ ...prev, seoDescription: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg p-3 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F58220]/20 focus:border-[#F58220] hover:border-[#F58220]/50 transition-all duration-300 shadow-sm placeholder:text-gray-400 min-h-[80px] resize-none"
                placeholder="Leave blank to use excerpt. Aim for 150–160 characters."
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={() => router.push('/admin/blogs')} disabled={isSaving}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-white" disabled={isSaving}>
              {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              {isSaving ? 'Saving...' : initialData ? 'Save Changes' : 'Publish Blog'}
            </Button>
          </div>

        </div>
      </form>
    </div>
  )
}
