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

import { useSearchParams } from 'next/navigation'

export default function BlogClient() {
  const searchParams = useSearchParams()
  const initialTab = searchParams.get('tab') === 'news' ? 'news' : 'blogs'
  const [activeTab, setActiveTab] = useState<'blogs' | 'news'>(initialTab)
  const [posts, setPosts] = useState<Post[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [category, setCategory] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Sync tab state with URL parameter changes
  useEffect(() => {
    const tabParam = searchParams.get('tab')
    if (tabParam === 'news' || tabParam === 'blogs') {
      setActiveTab(tabParam)
    }
  }, [searchParams])

  // Fetch categories when tab changes
  useEffect(() => {
    const categoryEndpoint = activeTab === 'blogs' ? '/api/categories' : '/api/news-categories'
    fetch(categoryEndpoint)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCategories(data)
        } else {
          console.error('Failed to fetch categories:', data)
          setCategories([])
        }
      })
  }, [activeTab])

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
        if (category) {
          if (activeTab === 'blogs') {
            params.append('category', category)
          } else {
            params.append('newsCategory', category)
          }
        }

        const endpoint = activeTab === 'blogs' ? '/api/blogs' : '/api/news'
        const res = await fetch(`${endpoint}?${params}`)
        if (res.ok) {
          const data = await res.json()
          setPosts(data.data)
          setTotalPages(data.meta.totalPages)
        }
      } catch {
        console.error('Failed to fetch posts')
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [debouncedSearch, category, page, activeTab])

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
          <div className="absolute inset-0 bg-black/60 z-0" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent z-0" />
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
        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center p-1 bg-white border border-gray-200 rounded-full shadow-sm">
            <button
              onClick={() => {
                setActiveTab('blogs')
                setCategory('')
                setSearch('')
                setPage(1)
              }}
              className={`px-8 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeTab === 'blogs'
                  ? 'bg-primary text-white shadow-md'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              Blogs & Articles
            </button>
            <button
              onClick={() => {
                setActiveTab('news')
                setCategory('')
                setSearch('')
                setPage(1)
              }}
              className={`px-8 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeTab === 'news'
                  ? 'bg-primary text-white shadow-md'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              News & Updates
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12 bg-white px-6 py-5 rounded-2xl md:rounded-full border border-border shadow-sm w-full">
          {/* Search Bar */}
          <div className="relative w-full md:w-100 shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
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
            No {activeTab === 'blogs' ? 'blogs' : 'news'} found matching your criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post.id} href={`/${activeTab === 'blogs' ? 'blog' : 'news'}/${post.slug}`} className="group flex flex-col bg-surface border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
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
                  

                  <Paragraph className="text-muted-foreground mb-6 line-clamp-3 text-sm md:text-base leading-relaxed flex-grow">
                    {post.excerpt || post.content.replace(/<[^>]+>/g, '').substring(0, 160) + '...'}
                  </Paragraph>

                  <div className="mt-auto pt-6 border-t border-border/60 flex items-center justify-between relative z-20">
                    <div className="flex items-center text-muted-foreground text-sm font-medium">
                      <Clock className="w-4 h-4 mr-1.5 opacity-70" />
                      {calculateReadTime(post.content)} min read
                    </div>
                    <Link
                      href={`/${activeTab === 'blogs' ? 'blog' : 'news'}/${post.slug}`}
                      className="flex items-center text-primary font-semibold text-sm hover:underline"
                    >
                      Read {activeTab === 'blogs' ? 'Article' : 'News'} <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
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
