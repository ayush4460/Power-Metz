"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { H3, Paragraph } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/ui/page-header'
import { PortalLoader } from '@/components/ui/portal-loader'
import { Plus, Edit2, Trash2, ExternalLink, RotateCcw, Search, FileText, ChevronDown } from 'lucide-react'

type News = {
  id: string
  title: string
  slug: string
  published: boolean
  isDeleted: boolean
  createdAt: string
  categories: { name: string }[]
  coverImage?: string | null
}

export default function AdminNewsPage() {
  const [newss, setNewss] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [currentTab, setCurrentTab] = useState<'all' | 'published' | 'draft' | 'trash'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const fetchNewss = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/news')
      if (res.ok) {
        const data = await res.json()
        setNewss(data)
      }
    } catch {
      console.error('Failed to fetch newss')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNewss()
  }, [])

  const handleDelete = async (id: string, isDeleted: boolean) => {
    if (!confirm(isDeleted ? 'Permanently delete this news? This cannot be undone.' : 'Move this news to trash?')) return
    try {
      const res = await fetch(`/api/admin/news/${id}`, { method: 'DELETE' })
      if (res.ok) {
        if (isDeleted) {
          setNewss(newss.filter(p => p.id !== id))
        } else {
          setNewss(newss.map(p => p.id === id ? { ...p, isDeleted: true } : p))
        }
      } else {
        alert('Failed to delete news')
      }
    } catch {
      alert('An error occurred')
    }
  }

  const handleRestore = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/news/${id}`, { 
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'restore' })
      })
      if (res.ok) {
        setNewss(newss.map(p => p.id === id ? { ...p, isDeleted: false } : p))
      } else {
        alert('Failed to restore news')
      }
    } catch {
      alert('An error occurred')
    }
  }

  const filteredNewss = newss.filter(news => {
    if (searchQuery && !news.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    if (currentTab === 'trash') return news.isDeleted
    if (news.isDeleted) return false
    if (currentTab === 'published') return news.published
    if (currentTab === 'draft') return !news.published
    return true
  })

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 pb-20">
      <PageHeader 
        title="News Articles" 
        actionButton={
          <Link href="/admin/news/new">
            <Button className="w-full sm:w-auto bg-[#F58220] hover:bg-[#d9731b] text-white">
              <Plus className="w-4 h-4 mr-2" />
              New News
            </Button>
          </Link>
        }
        onRefresh={fetchNewss}
        isRefreshing={loading}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-1 -mt-2">
        <div className="relative w-full flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text"
            placeholder="Search news by title..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#F58220]/20 focus:border-[#F58220] transition-colors shadow-sm placeholder:text-gray-400"
          />
        </div>

        <div className="relative w-full sm:w-48 shrink-0">
          {(() => {
            const options = [
              { value: 'all', label: `All (${newss.filter(p => !p.isDeleted).length})` },
              { value: 'published', label: `Published (${newss.filter(p => p.published && !p.isDeleted).length})` },
              { value: 'draft', label: `Drafts (${newss.filter(p => !p.published && !p.isDeleted).length})` },
              { value: 'trash', label: `Trash (${newss.filter(p => p.isDeleted).length})` }
            ]
            const currentOption = options.find(o => o.value === currentTab) || options[0]

            return (
              <>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                  className="w-full flex items-center justify-between px-4 py-2 text-sm bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#F58220]/20 focus:border-[#F58220] transition-colors shadow-sm cursor-pointer text-slate-700"
                >
                  <span className="font-medium">{currentOption.label}</span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-full bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden py-1 animate-in fade-in zoom-in-95 duration-100">
                    {options.map(option => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setCurrentTab(option.value as any)
                          setIsDropdownOpen(false)
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                          currentTab === option.value 
                            ? 'bg-[#F58220]/10 text-[#F58220] font-medium' 
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )
          })()}
        </div>
      </div>

      {/* ── Loading ── */}
      {loading ? (
        <PortalLoader message="Loading news..." />
      ) : filteredNewss.length === 0 ? (
        <div className="p-12 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-muted-foreground" />
          </div>
          <h4 className="text-lg font-semibold text-foreground">No news found</h4>
          <p className="text-muted-foreground mt-2 max-w-sm mb-6">There are no news in this section.</p>
          {currentTab !== 'trash' && (
            <Link href="/admin/news/new">
              <Button variant="outline">Create News</Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredNewss.map((news) => (
            <div key={news.id} className="bg-white border border-border rounded-none shadow-sm hover:shadow-md transition-shadow flex flex-col relative overflow-hidden group">
              
              {/* Cover Image */}
              <div className="relative w-full h-52 bg-slate-100 overflow-hidden shrink-0">
                {news.coverImage ? (
                  <img src={news.coverImage} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-100">
                    <FileText className="w-10 h-10 text-slate-300" />
                  </div>
                )}

                {/* Badges Overlay */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                  {news.categories.slice(0, 2).map((cat, idx) => (
                    <span key={idx} className="px-3 py-1.5 text-xs font-bold text-white shadow-sm tracking-wide bg-[#F58220]">
                      {cat.name}
                    </span>
                  ))}
                  {!news.categories.length && (
                    <span className="px-3 py-1.5 text-xs font-bold text-white shadow-sm tracking-wide bg-[#334155]">
                      Uncategorized
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h4 className="font-bold text-slate-900 text-[19px] leading-snug mb-3 line-clamp-3" title={news.title}>
                  {news.title}
                </h4>
                
                <div className="text-[14px] text-slate-400 mb-6">
                  {new Date(news.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                </div>

                <div className="mt-auto flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                  {news.isDeleted ? (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleRestore(news.id)} 
                        title="Restore"
                      >
                        <RotateCcw className="w-4 h-4 text-green-500" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(news.id, news.isDeleted)} 
                        title="Delete Permanently"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      {news.published && (
                        <Link href={`/news/${news.slug}`} target="_blank">
                          <Button 
                            variant="outline" 
                            size="sm"
                            title="Preview News"
                            type="button"
                          >
                            <ExternalLink className="w-4 h-4 text-blue-500" />
                          </Button>
                        </Link>
                      )}
                      <Link href={`/admin/news/${news.id}`}>
                        <Button 
                          variant="outline" 
                          size="sm"
                          title="Edit"
                          type="button"
                        >
                          <Edit2 className="w-4 h-4 text-gray-500" />
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(news.id, news.isDeleted)} 
                        title="Delete"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
