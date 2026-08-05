"use client"

import { usePathname } from "next/navigation"

export function AdminLayoutClient({ 
  children, 
  sidebar 
}: { 
  children: React.ReactNode
  sidebar: React.ReactNode 
}) {
  const pathname = usePathname()

  // Don't show sidebar or dashboard layout on login page
  if (pathname.includes('/admin/login')) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen flex bg-muted/30 overflow-hidden relative">
      {sidebar}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 pt-16 lg:pt-0">
        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
