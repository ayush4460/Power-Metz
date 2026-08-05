"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, FileText, Settings, LogOut, Menu, X, User } from "lucide-react"
import { CompanyLogo } from "@/components/shared/utilities"

export function VendorSidebar() {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const navItems = [
    { name: 'Dashboard', href: '/vendor/dashboard', icon: LayoutDashboard },
    { name: 'My Profile', href: '/vendor/dashboard/profile', icon: User },
    { name: 'Documents', href: '/vendor/dashboard/documents', icon: FileText },
    { name: 'Settings', href: '/vendor/dashboard/settings', icon: Settings },
  ]

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      window.location.href = '/vendor/login'
    } catch (error) {
      console.error("Failed to logout:", error)
      // Fallback
      window.location.href = '/vendor/login'
    }
  }

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
          <Link href="/vendor/dashboard" className="flex items-center gap-2" onClick={() => setIsSidebarOpen(false)}>
            <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center shrink-0">
              <CompanyLogo className="h-full w-full" />
            </div>
            <span className="text-xl font-bold text-foreground">Vendor Portal</span>
          </Link>
          <button 
            className="lg:hidden text-muted-foreground p-1 hover:bg-muted rounded-md"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/vendor/dashboard')
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
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-muted-foreground hover:bg-red-500/10 hover:text-red-500 transition-colors cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Header (To toggle sidebar) */}
      <header className="lg:hidden bg-surface border-b border-border p-4 flex items-center justify-between absolute top-0 w-full z-30">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="text-muted-foreground p-1 hover:bg-muted rounded-md -ml-1"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-bold">Vendor Portal</span>
        </div>
      </header>
    </>
  )
}
