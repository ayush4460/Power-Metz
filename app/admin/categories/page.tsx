"use client"

import { useState, useEffect } from 'react'
import { H3, Paragraph } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Trash2, Plus } from 'lucide-react'

type Category = {
  id: string
  name: string
  slug: string
  _count: { posts: number }
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/categories')
      const data = await res.json()
      if (res.ok) setCategories(data)
    } catch (error) {
      console.error('Failed to fetch categories')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])



  const handleCreate = async (e: React.FormEvent) => {
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
        setCategories([...categories, data].sort((a, b) => a.name.localeCompare(b.name)))
        setName('')
        fetchCategories()
      } else {
        setError(data.error || 'Failed to create category')
      }
    } catch {
      setError('An error occurred.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return

    try {
      const res = await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setCategories(categories.filter(c => c.id !== id))
      } else {
        const data = await res.json()
        alert(data.error || 'Failed to delete')
      }
    } catch {
      alert('An error occurred.')
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <H3>Categories</H3>
        <Paragraph className="text-muted-foreground mt-1">Manage blog categories</Paragraph>
      </div>

      <div className="bg-surface border border-border p-6 rounded-2xl shadow-sm">
        <h4 className="text-lg font-semibold mb-4">Add New Category</h4>
        <form onSubmit={handleCreate} className="flex flex-col md:flex-row gap-4 items-start">
          <div className="flex-1 space-y-2 w-full">
            <label className="text-sm font-medium text-foreground">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
              placeholder="e.g. Technology"
              className="w-full h-10 px-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
          </div>
          <div className="md:mt-7 w-full md:w-auto">
            <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto h-10 bg-primary text-white hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>
        </form>
        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
      </div>

      <div className="bg-surface border border-border rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Loading categories...</div>
        ) : categories.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No categories found. Create one above.</div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Slug</th>
                <th className="px-6 py-4 font-semibold">Posts</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{category.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{category.slug}</td>
                  <td className="px-6 py-4 text-muted-foreground">{category._count?.posts || 0}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="p-2 text-muted-foreground hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors"
                      title="Delete category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
