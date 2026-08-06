"use client"

import { useState, useEffect } from 'react'
import { H2 } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/ui/page-header'
import { PortalLoader } from '@/components/ui/portal-loader'
import { Trash2, Plus, Pencil, Tags, X } from 'lucide-react'

type Category = {
  id: string
  name: string
  slug: string
  _count: { posts: number }
}

// ── Add Modal ─────────────────────────────────────────────────────────────────
function AddCategoryModal({ onSuccess }: { onSuccess: () => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      })
      const data = await res.json()
      if (res.ok) {
        setName('')
        setIsOpen(false)
        onSuccess()
      } else {
        setError(data.error || 'Failed to create category')
      }
    } catch {
      setError('An error occurred.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className="bg-primary text-white hover:bg-primary/90">
        <Plus className="w-4 h-4 mr-2" />
        Add Category
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-800">Add Category</h3>
              <button
                onClick={() => { setIsOpen(false); setError(''); setName('') }}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg">{error}</div>
              )}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="e.g. Technology"
                  className="w-full border border-gray-200 rounded-lg p-3 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F58220]/20 focus:border-[#F58220] hover:border-[#F58220]/50 transition-all shadow-sm placeholder:text-gray-400"
                />
              </div>
              <div className="pt-2 flex items-center justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => { setIsOpen(false); setError(''); setName('') }}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting} className="bg-primary text-white hover:bg-primary/90">
                  {isSubmitting ? 'Creating...' : 'Create Category'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

// ── Edit Modal ─────────────────────────────────────────────────────────────────
function EditCategoryModal({ category, onSuccess, onDelete }: { category: Category; onSuccess: () => void; onDelete: () => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState(category.name)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)
    try {
      const res = await fetch(`/api/admin/categories/${category.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      })
      const data = await res.json()
      if (res.ok) {
        setIsOpen(false)
        onSuccess()
      } else {
        setError(data.error || 'Failed to update category')
      }
    } catch {
      setError('An error occurred.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this category?')) return
    setIsDeleting(true)
    try {
      const res = await fetch(`/api/admin/categories/${category.id}`, { method: 'DELETE' })
      const data = await res.json()
      if (res.ok) {
        setIsOpen(false)
        onDelete()
      } else {
        setError(data.error || 'Failed to delete')
        setIsDeleting(false)
      }
    } catch {
      setError('An error occurred.')
      setIsDeleting(false)
    }
  }

  return (
    <>
      <Button
        onClick={() => { setName(category.name); setIsOpen(true) }}
        variant="ghost"
        size="sm"
        className="text-primary hover:text-primary hover:bg-primary/10"
      >
        <Pencil className="w-4 h-4" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-800">Edit Category</h3>
              <button
                onClick={() => { setIsOpen(false); setError('') }}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg">{error}</div>
              )}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full border border-gray-200 rounded-lg p-3 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F58220]/20 focus:border-[#F58220] hover:border-[#F58220]/50 transition-all shadow-sm"
                />
              </div>
              <div className="pt-2 flex items-center justify-between">
                <Button
                  type="button"
                  variant="ghost"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </Button>
                <div className="flex gap-2">
                  <Button type="button" variant="outline" onClick={() => { setIsOpen(false); setError('') }}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting} className="bg-primary text-white hover:bg-primary/90">
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

// ── Delete Button ──────────────────────────────────────────────────────────────
function DeleteCategoryButton({ category, onDelete }: { category: Category; onDelete: () => void }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${category.name}"?`)) return
    setIsDeleting(true)
    try {
      const res = await fetch(`/api/admin/categories/${category.id}`, { method: 'DELETE' })
      const data = await res.json()
      if (res.ok) {
        onDelete()
      } else {
        alert(data.error || 'Failed to delete')
        setIsDeleting(false)
      }
    } catch {
      alert('An error occurred.')
      setIsDeleting(false)
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-muted-foreground hover:text-red-500 hover:bg-red-50"
      title="Delete category"
    >
      <Trash2 className="w-4 h-4" />
    </Button>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/categories')
      const data = await res.json()
      if (res.ok) setCategories(data)
    } catch {
      console.error('Failed to fetch categories')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchCategories() }, [])

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Blog Categories"
        actionButton={<AddCategoryModal onSuccess={fetchCategories} />}
        onRefresh={fetchCategories}
        isRefreshing={loading}
      />

      {loading ? (
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          <PortalLoader message="Loading categories..." />
        </div>
      ) : categories.length === 0 ? (
        <div className="bg-surface border border-dashed border-border rounded-xl p-12 flex flex-col items-center justify-center space-y-3 text-muted-foreground">
          <Tags className="w-10 h-10 opacity-20" />
          <p>No categories found. Add one to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-surface border border-border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group"
            >
              <div className="flex flex-col items-start gap-1.5 overflow-hidden pr-2 flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate w-full" title={category.name}>
                  {category.name}
                </h3>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-50 text-slate-600 border border-slate-200">
                  {category._count.posts} {category._count.posts === 1 ? 'post' : 'posts'}
                </span>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <EditCategoryModal
                  category={category}
                  onSuccess={fetchCategories}
                  onDelete={() => setCategories(prev => prev.filter(c => c.id !== category.id))}
                />
                <DeleteCategoryButton
                  category={category}
                  onDelete={() => setCategories(prev => prev.filter(c => c.id !== category.id))}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
