import React from "react"
import { Skeleton } from "@/components/ui/feedback"
import { Container } from "@/components/layout"

export default function Loading() {
  return (
    <Container className="pt-[var(--header-height)] pb-24">
      {/* Simulate a typical page structure loading state */}
      <div className="space-y-12 animate-pulse mt-12">
        <div className="space-y-4">
          <Skeleton className="h-16 w-3/4 max-w-2xl" />
          <Skeleton className="h-6 w-full max-w-xl" />
          <Skeleton className="h-6 w-5/6 max-w-xl" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Skeleton className="h-64 w-full rounded-2xl" />
          <Skeleton className="h-64 w-full rounded-2xl" />
          <Skeleton className="h-64 w-full rounded-2xl" />
        </div>
      </div>
    </Container>
  )
}
