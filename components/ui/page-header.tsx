"use client"

import { ReactNode, useState } from 'react'
import { RotateCcw, Menu } from 'lucide-react'
import { H3 } from '@/components/ui/typography'
import { useRouter } from 'next/navigation'

interface PageHeaderProps {
  title: ReactNode
  actionButton?: ReactNode
  onRefresh?: () => void
  isRefreshing?: boolean
}

export function PageHeader({ title, actionButton, onRefresh, isRefreshing }: PageHeaderProps) {
  const router = useRouter()
  const [internalRefreshing, setInternalRefreshing] = useState(false)

  const handleRefresh = async () => {
    if (onRefresh) {
      onRefresh()
    } else {
      setInternalRefreshing(true)
      router.refresh()
      setTimeout(() => setInternalRefreshing(false), 1000)
    }
  }

  const currentlyRefreshing = isRefreshing || internalRefreshing

  return (
    <div className="flex flex-row justify-between items-center gap-2 sm:gap-4 bg-white border-b border-gray-200 -mx-4 md:-mx-8 -mt-4 md:-mt-8 px-4 md:px-8 py-0 h-[81px] mb-6 shadow-sm relative z-10">
      <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
        <button 
          onClick={() => window.dispatchEvent(new Event('openSidebar'))}
          className="lg:hidden text-slate-500 p-1 hover:bg-slate-100 rounded-md -ml-1 transition-colors shrink-0"
        >
          <Menu className="w-5 h-5" />
        </button>
        <H3 className="text-base sm:text-2xl font-bold text-slate-800 truncate">{title}</H3>
      </div>
      <div className="flex items-center gap-2 sm:gap-4 w-auto shrink-0">
        <button 
          onClick={handleRefresh}
          disabled={currentlyRefreshing}
          className="flex items-center justify-center gap-1.5 text-slate-500 hover:text-slate-800 transition-colors text-xs sm:text-sm font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
        >
          <RotateCcw className={`w-4 h-4 ${currentlyRefreshing ? 'animate-spin text-[#F58220]' : ''}`} />
          <span className="hidden sm:inline">{currentlyRefreshing ? 'Refreshing...' : 'Refresh'}</span>
        </button>
        {actionButton && (
          <div className="flex-none scale-90 sm:scale-100 origin-right">
            {actionButton}
          </div>
        )}
      </div>
    </div>
  )
}
