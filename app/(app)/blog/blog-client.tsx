"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Container } from '@/components/layout'
import { H1, H3, Paragraph } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Search, ChevronLeft, ChevronRight, Calendar, Clock, ChevronDown } from 'lucide-react'

const calculateReadTime = (content: string) => {
  const wordsPerMinute = 200
  const text = content.replace(/<[^>]+>/g, '')
  const wordCount = text.split(/\s+/).length
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute))
}

type Post = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  publishedAt: string
  createdAt: string
  categories: { id: string, name: string, slug: string }[]
}

type Category = {
  id: string
  name: string
  slug: string
}

export default function BlogClient() {
  const [posts, setPosts] = useState<Post[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [category, setCategory] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCategories(data)
        } else {
          console.error('Failed to fetch categories:', data)
          setCategories([])
        }
      })
  }, [])

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1) // Reset to page 1 on new search
    }, 500)
    return () => clearTimeout(timer)
  }, [search])

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: '9'
        })
        if (debouncedSearch) params.append('search', debouncedSearch)
        if (category) params.append('category', category)

        const res = await fetch(`/api/blogs?${params}`)
        if (res.ok) {
          const data = await res.json()
          setPosts(data.data)
          setTotalPages(data.meta.totalPages)
        }
      } catch {
        console.error('Failed to fetch blogs')
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [debouncedSearch, category, page])

  const handleCategoryChange = (slug: string) => {
    setCategory(slug === category ? '' : slug)
    setPage(1)
  }

  return (
    <div className="pb-20 bg-muted/20">
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] min-h-125 flex items-center justify-center mb-16">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/battery management.JPG" alt="Knowledge Center" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/60 to-black/30" />
          <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-black/80 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center max-w-5xl px-4 mt-20">
          <H1 className="text-white! mb-2 md:text-5xl lg:text-7xl drop-shadow-lg font-bold tracking-tight">
            Battery Energy Storage
          </H1>
          <H1 className="text-primary! mb-8 md:text-5xl lg:text-7xl drop-shadow-lg font-bold tracking-tight">
            Knowledge Center
          </H1>
          <Paragraph className="text-lg md:text-xl text-white/90 mx-auto max-w-3xl leading-relaxed">
            Practical guides, expert insights, and industry updates on battery storage, smart energy management, and India&apos;s clean energy transition — from the PowerMetz team.
          </Paragraph>
          <div className="w-16 h-1 bg-primary mx-auto mt-10 rounded-full" />
        </div>
      </div>

      <Container>
        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12 bg-white px-6 py-5 rounded-2xl md:rounded-full border border-border shadow-sm w-full">
          {/* Search Bar */}
          <div className="relative w-full md:w-100 shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-11 pl-11 pr-4 bg-muted/30 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm placeholder:text-muted-foreground"
            />
          </div>

          {/* Categories Custom Dropdown */}
          <div className="relative w-full md:w-64">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full h-11 px-5 bg-muted/30 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm cursor-pointer text-foreground font-semibold flex items-center justify-between transition-all"
            >
              <span className="truncate">{category ? categories.find(c => c.slug === category)?.name : "All Categories"}</span>
              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-300 shrink-0 ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            
            {/* Click outside overlay */}
            {isDropdownOpen && (
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsDropdownOpen(false)} 
              />
            )}
            
            {/* Dropdown Menu */}
            <div className={`absolute right-0 top-[calc(100%+8px)] w-full bg-white border border-border shadow-xl rounded-2xl overflow-hidden z-50 transition-all duration-200 origin-top ${isDropdownOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
              <div className="max-h-75 overflow-y-auto py-2">
                <button
                  onClick={() => {
                    handleCategoryChange('');
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-5 py-3 text-sm font-medium transition-colors hover:bg-primary/5 hover:text-primary ${!category ? 'bg-primary/10 text-primary' : 'text-foreground'}`}
                >
                  All Categories
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      handleCategoryChange(cat.slug);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-5 py-3 text-sm font-medium transition-colors hover:bg-primary/5 hover:text-primary ${category === cat.slug ? 'bg-primary/10 text-primary' : 'text-foreground'}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="animate-pulse bg-muted rounded-2xl aspect-4/3 w-full" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            No blogs found matching your criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group flex flex-col bg-surface border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="relative aspect-16/10 w-full bg-muted overflow-hidden">
                  {post.coverImage ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary/5 text-primary">
                      PowerMetz
                    </div>
                  )}
                  {post.categories.length > 0 && (
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-1.5 bg-primary text-primary-foreground text-sm font-semibold rounded-full shadow-sm">
                        {post.categories[0].name}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <H3 className="text-xl mb-3 group-hover:text-primary transition-colors line-clamp-2 text-foreground font-bold">
                    {post.title}
                  </H3>
                  
                  <Paragraph className="text-muted-foreground line-clamp-3 mb-8 flex-1 text-[15px] leading-relaxed">
                    {post.excerpt || post.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...'}
                  </Paragraph>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50 text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {calculateReadTime(post.content)} min read
                      </div>
                    </div>
                    <div className="font-medium text-primary group-hover:underline inline-flex items-center gap-1">
                      Read &rarr;
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-16">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage(p => Math.max(1, p - 1))}
              className="h-12 px-6 rounded-full"
            >
              <ChevronLeft className="w-5 h-5 mr-1" /> Previous
            </Button>
            <div className="text-sm font-medium text-muted-foreground">
              Page {page} of {totalPages}
            </div>
            <Button
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              className="h-12 px-6 rounded-full"
            >
              Next <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
          </div>
        )}
      </Container>
    </div>
  )
}
