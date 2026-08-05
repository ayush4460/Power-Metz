"use client"

import { useState } from "react"
import { MessageSquare, X } from "lucide-react"

export function VendorMessageModal({ message, companyName }: { message: string | null, companyName: string }) {
  const [isOpen, setIsOpen] = useState(false)

  if (!message) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground/50 text-sm">
        <MessageSquare className="w-4 h-4" />
        <span className="text-xs">No Message</span>
      </div>
    )
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 text-[#F58220] hover:underline font-medium text-sm transition-colors cursor-pointer"
      >
        <MessageSquare className="w-4 h-4" />
        View Message
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-muted/30">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#F58220]" />
                Message from {companyName}
              </h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto whitespace-pre-wrap text-foreground/80 leading-relaxed text-sm">
              {message}
            </div>
            
            <div className="px-6 py-4 border-t border-border bg-muted/30 flex justify-end">
              <button 
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-white border border-gray-300 text-foreground text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
