"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { H3, Paragraph } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Plus, Edit2, Trash2, ExternalLink, RotateCcw } from 'lucide-react'

type Post = {
  id: string
  title: string
  slug: string
  published: boolean
  isDeleted: boolean
  createdAt: string
  categories: { name: string }[]
}

export default function AdminBlogsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [currentTab, setCurrentTab] = useState<'all' | 'published' | 'draft' | 'trash'>('all')

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/admin/blogs')
        if (res.ok) {
          const data = await res.json()
          setPosts(data)
        }
      } catch {
        console.error('Failed to fetch posts')
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  const handleDelete = async (id: string, isDeleted: boolean) => {
    if (!confirm(isDeleted ? 'Permanently delete this blog? This cannot be undone.' : 'Move this blog to trash?')) return
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, { method: 'DELETE' })
      if (res.ok) {
        if (isDeleted) {
          setPosts(posts.filter(p => p.id !== id))
        } else {
          setPosts(posts.map(p => p.id === id ? { ...p, isDeleted: true } : p))
        }
      } else {
        alert('Failed to delete blog')
      }
    } catch {
      alert('An error occurred')
    }
  }

  const handleRestore = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, { 
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'restore' })
      })
      if (res.ok) {
        setPosts(posts.map(p => p.id === id ? { ...p, isDeleted: false } : p))
      } else {
        alert('Failed to restore blog')
      }
    } catch {
      alert('An error occurred')
    }
  }

  const filteredPosts = posts.filter(post => {
    if (currentTab === 'trash') return post.isDeleted
    if (post.isDeleted) return false
    if (currentTab === 'published') return post.published
    if (currentTab === 'draft') return !post.published
    return true
  })

  return (
    <div className="w-full space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <H3>Blogs</H3>
          <Paragraph className="text-muted-foreground mt-1">Manage all your blogs and content</Paragraph>
        </div>
        <Link href="/admin/blogs/new">
          <Button className="bg-primary hover:bg-primary/90 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Blog
          </Button>
        </Link>
      </div>

      <div className="flex space-x-2 border-b border-border">
        {[
          { id: 'all', label: 'All', count: posts.filter(p => !p.isDeleted).length },
          { id: 'published', label: 'Published', count: posts.filter(p => p.published && !p.isDeleted).length },
          { id: 'draft', label: 'Drafts', count: posts.filter(p => !p.published && !p.isDeleted).length },
          { id: 'trash', label: 'Trash', count: posts.filter(p => p.isDeleted).length },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setCurrentTab(tab.id as any)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors -mb-[1px] ${
              currentTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
            }`}
          >
            {tab.label} <span className={`ml-1.5 text-xs px-2 py-0.5 rounded-full ${currentTab === tab.id ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>{tab.count}</span>
          </button>
        ))}
      </div>

      <div className="bg-surface border border-border rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Loading blogs...</div>
        ) : filteredPosts.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
            <h4 className="text-lg font-semibold text-foreground">No blogs found</h4>
            <p className="text-muted-foreground mt-2 max-w-sm mb-6">There are no blogs in this section.</p>
            {currentTab !== 'trash' && (
              <Link href="/admin/blogs/new">
                <Button variant="outline">Create Blog</Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="px-6 py-4 font-semibold">Title</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Categories</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground max-w-50 sm:max-w-xs md:max-w-md truncate">
                      {post.title}
                    </td>
                    <td className="px-6 py-4">
                      {post.isDeleted ? (
                         <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-red-500/10 text-red-500">Trashed</span>
                      ) : post.published ? (
                        <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-green-500/10 text-green-500">Published</span>
                      ) : (
                        <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-500/10 text-amber-500">Draft</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {post.categories.map(c => c.name).join(', ') || '—'}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {post.isDeleted ? (
                          <>
                            <button
                              onClick={() => handleRestore(post.id)}
                              title="Restore"
                              className="p-2 text-muted-foreground hover:bg-green-500/10 hover:text-green-600 rounded-lg transition-colors flex items-center justify-center"
                            >
                              <RotateCcw className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(post.id, post.isDeleted)}
                              title="Permanently Delete"
                              className="p-2 text-muted-foreground hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors flex items-center justify-center"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            {post.published && (
                              <Link href={`/blog/${post.slug}`} target="_blank" className="p-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg transition-colors flex items-center justify-center">
                                <ExternalLink className="w-4 h-4" />
                              </Link>
                            )}
                            <Link href={`/admin/blogs/${post.id}`} className="p-2 text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-lg transition-colors flex items-center justify-center">
                              <Edit2 className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => handleDelete(post.id, post.isDeleted)}
                              title="Move to Trash"
                              className="p-2 text-muted-foreground hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors flex items-center justify-center"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FileText(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  )
}
