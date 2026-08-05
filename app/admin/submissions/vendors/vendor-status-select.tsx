"use client"

import { useTransition } from "react"
import { updateVendorStatus } from "./actions"
import { Check, X, Loader2 } from "lucide-react"

export function VendorStatusSelect({ id, currentStatus }: { id: string, currentStatus: string }) {
  const [isPending, startTransition] = useTransition()
  
  const handleUpdate = (status: "APPROVED" | "REJECTED") => {
    startTransition(async () => {
      await updateVendorStatus(id, status)
    })
  }
  
  return (
    <div className="flex items-center gap-2 shrink-0">
      {currentStatus !== "PENDING" && (
        <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider border transition-all
            ${currentStatus === 'APPROVED' ? 'bg-green-50 text-green-700 border-green-200' :
              currentStatus === 'REJECTED' ? 'bg-red-50 text-red-700 border-red-200' :
              'bg-yellow-50 text-yellow-700 border-yellow-200'}
          `}
        >
          {currentStatus}
        </span>
      )}

      {currentStatus === "PENDING" && !isPending && (
        <div className="flex items-center gap-2">
          <button 
            onClick={() => handleUpdate("APPROVED")} 
            className="p-1.5 rounded-md bg-white border border-border text-green-600 hover:bg-green-50 hover:border-green-200 transition-colors shadow-sm cursor-pointer" 
            title="Approve"
          >
            <Check className="w-4 h-4" />
          </button>
          <button 
            onClick={() => handleUpdate("REJECTED")} 
            className="p-1.5 rounded-md bg-white border border-border text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors shadow-sm cursor-pointer" 
            title="Reject"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      
      {isPending && <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />}
    </div>
  )
}
