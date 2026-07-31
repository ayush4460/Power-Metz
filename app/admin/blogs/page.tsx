"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { H3, Paragraph } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Plus, Edit2, Trash2, ExternalLink } from 'lucide-react'

type Post = {
  id: string
  title: string
  slug: string
  published: boolean
  createdAt: string
  categories: { name: string }[]
}

export default function AdminBlogsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

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

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setPosts(posts.filter(p => p.id !== id))
      } else {
        alert('Failed to delete post')
      }
    } catch {
      alert('An error occurred')
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <H3>Blog Posts</H3>
          <Paragraph className="text-muted-foreground mt-1">Manage all your articles and content</Paragraph>
        </div>
        <Link href="/admin/blogs/new">
          <Button className="bg-primary hover:bg-primary/90 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Write New Post
          </Button>
        </Link>
      </div>

      <div className="bg-surface border border-border rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
            <h4 className="text-lg font-semibold text-foreground">No posts yet</h4>
            <p className="text-muted-foreground mt-2 max-w-sm mb-6">You haven&apos;t written any blog posts. Click the button above to create your first one.</p>
            <Link href="/admin/blogs/new">
              <Button variant="outline">Create Post</Button>
            </Link>
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
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground max-w-50 sm:max-w-xs md:max-w-md truncate">
                      {post.title}
                    </td>
                    <td className="px-6 py-4">
                      {post.published ? (
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
                    <td className="px-6 py-4 text-right space-x-2">
                      {post.published && (
                        <Link href={`/blog/${post.slug}`} target="_blank" className="inline-block p-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      )}
                      <Link href={`/admin/blogs/${post.id}`} className="inline-block p-2 text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-2 text-muted-foreground hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
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
