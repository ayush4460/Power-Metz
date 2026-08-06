"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Tags, LogOut, Briefcase, Inbox, Building2, Menu, X, Users, Store, ExternalLink } from "lucide-react"

type SidebarProps = {
  vendorsCount: number
  customersCount: number
  careersCount: number
  reachUsCount?: number
}

export function AdminSidebar({ vendorsCount, customersCount, careersCount, reachUsCount = 0 }: SidebarProps) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    const handleOpen = () => setIsSidebarOpen(true)
    window.addEventListener('openSidebar', handleOpen)
    return () => window.removeEventListener('openSidebar', handleOpen)
  }, [])

  const navItems = [
    { name: 'Blogs', href: '/admin/blogs', icon: LayoutDashboard },
    { name: 'Blog Categories', href: '/admin/categories', icon: Tags },
    { name: 'Job Departments', href: '/admin/departments', icon: Building2 },
    { name: 'Job Openings', href: '/admin/jobs', icon: Briefcase },
    { 
      name: 'Reach Us Submissions', 
      href: '/admin/submissions/reach-us', 
      icon: Inbox,
      count: reachUsCount
    },
    { 
      name: 'Vendor Submissions', 
      href: '/admin/submissions/vendors', 
      icon: Store,
      count: vendorsCount
    },
    { 
      name: 'Customer Submissions', 
      href: '/admin/submissions/customers', 
      icon: Users,
      count: customersCount
    },
    { 
      name: 'Career Submissions', 
      href: '/admin/submissions/careers', 
      icon: Briefcase,
      count: careersCount
    },
  ]

  return (
    <>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-border flex flex-col transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 border-b border-border flex items-center justify-between">
          <Link href="/admin/blogs" className="flex items-center gap-2" onClick={() => setIsSidebarOpen(false)}>
            <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center shrink-0">
              <img src="/images/Power_Metz_Logo.png" alt="PowerMetz" className="h-full w-full object-left object-cover" />
            </div>
            <span className="text-xl font-bold text-foreground">Power<span className="text-[#F58220]">Metz</span></span>
          </Link>
          <button 
            className="lg:hidden text-muted-foreground p-1 hover:bg-muted rounded-md"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href)
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon className="w-5 h-5 shrink-0" />
                  <span className="truncate whitespace-nowrap">{item.name}</span>
                </div>
                {item.count !== undefined && item.count > 0 && (
                  <span className={`shrink-0 ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${isActive ? 'bg-primary text-white' : 'bg-primary/20 text-primary'}`}>
                    {item.count}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-border space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors cursor-pointer"
          >
            <ExternalLink className="w-5 h-5" />
            View Website
          </Link>
          <button 
            onClick={() => {
              document.cookie = "admin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              window.location.href = '/admin/login';
            }}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-muted-foreground hover:bg-red-500/10 hover:text-red-500 transition-colors cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  )
}
