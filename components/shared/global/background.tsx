import React from "react"
import { cn } from "@/lib/cn"

export interface BackgroundProps {
  gradient?: boolean
  radialGlow?: boolean
  grid?: boolean
  noise?: boolean
  className?: string
}

export const Background = ({ gradient, radialGlow, noise, className }: BackgroundProps) => {
  return (
    <div className={cn("fixed inset-0 -z-50 pointer-events-none overflow-hidden bg-background", className)}>
      {gradient && (
        <>
          <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent" />
          <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[150px] opacity-50 -translate-y-1/2 translate-x-1/3 mix-blend-screen" />
          <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[150px] opacity-30 translate-y-1/3 -translate-x-1/3 mix-blend-screen" />
        </>
      )}
      
      {radialGlow && (
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-screen h-[50vh] bg-primary/10 rounded-full blur-[120px] opacity-80 mix-blend-screen" />
      )}
      
      {noise && (
        <div 
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
      )}
    </div>
  )
}
