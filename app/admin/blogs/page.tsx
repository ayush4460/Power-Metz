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
          <p className="text-muted-foreground mt-1 text-sm">Manage all your blogs and content</p>
        </div>
        <Link href="/admin/blogs/new">
          <Button className="bg-primary hover:bg-primary/90 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Blog
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2 pb-1 justify-between sm:justify-start">
        {[
          { id: 'all', label: 'All', count: posts.filter(p => !p.isDeleted).length },
          { id: 'published', label: 'Published', count: posts.filter(p => p.published && !p.isDeleted).length },
          { id: 'draft', label: 'Drafts', count: posts.filter(p => !p.published && !p.isDeleted).length },
          { id: 'trash', label: 'Trash', count: posts.filter(p => p.isDeleted).length },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setCurrentTab(tab.id as any)}
            className={`cursor-pointer inline-flex items-center justify-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 flex-1 sm:flex-none ${
              currentTab === tab.id
                ? 'bg-[#F58220] text-white shadow-sm shadow-[#F58220]/30'
                : 'bg-white border border-gray-200 text-slate-500 hover:border-[#F58220]/40 hover:text-[#F58220] hover:bg-[#F58220]/5'
            }`}
          >
            {tab.label}
            <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded-full min-w-[20px] text-center ${
              currentTab === tab.id ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-500'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* ── Loading ── */}
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
        <>
          {/* ── Mobile / Tablet: Card Grid (hidden on lg+) ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
            {filteredPosts.map((post) => (
              <div key={post.id} className="bg-white border border-border rounded-xl p-5 shadow-sm flex flex-col gap-3 relative overflow-hidden">

                {/* Header */}
                <div className="flex items-start justify-between gap-2 pt-1">
                  <h4 className="font-semibold text-slate-800 text-sm leading-snug line-clamp-2" title={post.title}>
                    {post.title}
                  </h4>
                  <span className={`shrink-0 text-[11px] font-semibold ${post.isDeleted ? 'text-red-500' : post.published ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {post.isDeleted ? 'Trashed' : post.published ? 'Published' : 'Draft'}
                  </span>
                </div>

                {/* Meta */}
                <div className="flex flex-col gap-1 text-xs text-slate-500">
                  <span><span className="font-medium text-slate-700">Category:</span> {post.categories.length > 0 ? post.categories.map(c => c.name).join(', ') : <span className="text-slate-300 italic">None</span>}</span>
                  <span><span className="font-medium text-slate-700">Date:</span> {new Date(post.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })} · {new Date(post.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 pt-2 border-t border-gray-100">
                  {post.isDeleted ? (
                    <>
                      <button onClick={() => handleRestore(post.id)} title="Restore" className="cursor-pointer flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                        <RotateCcw className="w-3.5 h-3.5" /> Restore
                      </button>
                      <button onClick={() => handleDelete(post.id, post.isDeleted)} title="Permanently Delete" className="cursor-pointer flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium text-red-500 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </>
                  ) : (
                    <>
                      {post.published && (
                        <Link href={`/blog/${post.slug}`} target="_blank" title="View Live" className="cursor-pointer p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 rounded-lg transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      )}
                      <Link href={`/admin/blogs/${post.id}`} title="Edit" className="cursor-pointer p-2 text-slate-400 hover:bg-[#F58220]/10 hover:text-[#F58220] rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button onClick={() => handleDelete(post.id, post.isDeleted)} title="Move to Trash" className="cursor-pointer p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* ── Desktop: Table (hidden below lg) ── */}
          <div className="hidden lg:block bg-surface border border-border rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-gray-100">
                    <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Date</th>
                    <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Title</th>
                    <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Category</th>
                    <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Status</th>
                    <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredPosts.map((post) => (
                    <tr
                      key={post.id}
                      className="group border-b border-gray-50 hover:bg-[#F58220]/[0.03] transition-all duration-150 cursor-default"
                    >
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        <div className="text-sm font-semibold text-slate-700">
                          {new Date(post.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5 font-medium">
                          {new Date(post.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="font-semibold text-slate-800 group-hover:text-[#F58220] transition-colors duration-150 truncate block max-w-xs mx-auto" title={post.title}>
                          {post.title}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        {post.categories.length > 0
                          ? <span className="text-sm text-slate-500 font-medium">{post.categories.map(c => c.name).join(', ')}</span>
                          : <span className="text-slate-300">—</span>
                        }
                      </td>
                      <td className="px-6 py-4 text-center">
                        {post.isDeleted ? (
                          <span className="text-xs font-semibold text-red-500">Trashed</span>
                        ) : post.published ? (
                          <span className="text-xs font-semibold text-emerald-600">Published</span>
                        ) : (
                          <span className="text-xs font-semibold text-amber-600">Draft</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-0.5 opacity-60 group-hover:opacity-100 transition-opacity">
                          {post.isDeleted ? (
                            <>
                              <button onClick={() => handleRestore(post.id)} title="Restore" className="cursor-pointer p-2 text-slate-400 hover:bg-green-50 hover:text-green-600 rounded-lg transition-all duration-150">
                                <RotateCcw className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleDelete(post.id, post.isDeleted)} title="Permanently Delete" className="cursor-pointer p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 rounded-lg transition-all duration-150">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </>
                          ) : (
                            <>
                              {post.published && (
                                <Link href={`/blog/${post.slug}`} target="_blank" title="View Live" className="cursor-pointer p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 rounded-lg transition-all duration-150">
                                  <ExternalLink className="w-4 h-4" />
                                </Link>
                              )}
                              <Link href={`/admin/blogs/${post.id}`} title="Edit" className="cursor-pointer p-2 text-slate-400 hover:bg-[#F58220]/10 hover:text-[#F58220] rounded-lg transition-all duration-150">
                                <Edit2 className="w-4 h-4" />
                              </Link>
                              <button onClick={() => handleDelete(post.id, post.isDeleted)} title="Move to Trash" className="cursor-pointer p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 rounded-lg transition-all duration-150">
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
          </div>
        </>
      )}
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
