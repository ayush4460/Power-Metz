"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/cn"

export interface NavigationItem {
  title: string
  href?: string
  description?: string
  items?: NavigationItem[]
}

export const NavigationMenu = ({ items, className, variant = "default" }: { items: NavigationItem[], className?: string, variant?: "transparent" | "default" }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <nav className={cn("hidden md:flex items-center gap-1", className)} onMouseLeave={() => setHoveredIndex(null)}>
      {items.map((item, index) => (
        <div 
          key={item.title} 
          className="relative"
          onMouseEnter={() => setHoveredIndex(index)}
        >
          {item.href ? (
            <a 
              href={item.href}
              className={cn(
                "px-4 py-2 text-base font-medium transition-colors relative z-10 block",
                variant === "transparent" ? "text-white/80 hover:text-white" : "text-muted-foreground hover:text-black"
              )}
            >
              {item.title}
              {hoveredIndex === index && (
                <motion.div
                  layoutId="nav-hover"
                  className="absolute bottom-1 left-4 right-4 h-[2px] bg-primary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </a>
          ) : (
            <button className={cn(
              "flex items-center gap-1 px-4 py-2 text-base font-medium transition-colors relative z-10",
              variant === "transparent" ? "text-white/80 hover:text-white" : "text-muted-foreground hover:text-black"
            )}>
              {item.title}
              <ChevronDown className="h-4 w-4 opacity-50" />
              {hoveredIndex === index && (
                <motion.div
                  layoutId="nav-hover"
                  className="absolute bottom-1 left-4 right-10 h-[2px] bg-primary"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          )}

          {/* Simple Dropdown implementation */}
          {item.items && (
            <AnimatePresence>
              {hoveredIndex === index && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10, transition: { duration: 0.1 } }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="absolute top-full left-0 mt-1 w-64 bg-background border border-border shadow-xl rounded-md p-1.5 z-50"
                >
                  <div className="flex flex-col gap-1">
                    {item.items.map((subItem) => (
                      <a 
                        key={subItem.title} 
                        href={subItem.href || "#"} 
                        className="px-4 py-3 rounded-md hover:bg-primary group cursor-pointer transition-colors"
                      >
                        <div className="text-sm font-medium text-foreground group-hover:text-white transition-colors">{subItem.title}</div>
                        {subItem.description && (
                          <div className="text-xs text-muted-foreground mt-0.5 group-hover:text-white/90 transition-colors">{subItem.description}</div>
                        )}
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      ))}
    </nav>
  )
}
