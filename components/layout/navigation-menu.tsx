"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/cn"
import Link from "next/link"

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
            <Link 
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
                  className="absolute bottom-1 left-4 right-4 h-0.5 bg-primary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </Link>
          ) : (
            <button className={cn(
              "flex items-center gap-1 px-4 py-2 text-base font-medium transition-colors relative z-10 cursor-pointer",
              variant === "transparent" ? "text-white/80 hover:text-white" : "text-muted-foreground hover:text-black"
            )}>
              {item.title}
              <ChevronDown 
                className={cn(
                  "h-4 w-4 opacity-50 transition-transform duration-200", 
                  hoveredIndex === index ? "rotate-180" : ""
                )} 
              />
              {hoveredIndex === index && (
                <motion.div
                  layoutId="nav-hover"
                  className="absolute bottom-1 left-4 right-10 h-0.5 bg-primary"
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
                  className="absolute top-full left-0 pt-3 z-50"
                >
                  <div className="min-w-[220px] bg-white shadow-2xl rounded-2xl p-2 relative">
                    {/* Triangle Caret */}
                    <div className="absolute -top-1.5 left-6 w-4 h-4 bg-white rotate-45 rounded-sm z-[-1]" />
                    
                    <div className="flex flex-col py-2">
                      {item.items.map((subItem, i) => (
                        <React.Fragment key={subItem.title}>
                          <Link 
                            href={subItem.href || "#"} 
                            className="flex items-center gap-3 px-5 py-2.5 hover:bg-orange-50/40 group cursor-pointer transition-all duration-300"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F58220]/40 group-hover:bg-[#F58220] transition-all duration-300 shrink-0 group-hover:scale-125" />
                            <span className="text-xs uppercase tracking-wider font-semibold text-slate-700 group-hover:text-[#F58220] transition-all duration-300 group-hover:translate-x-1">
                              {subItem.title}
                            </span>
                          </Link>
                          {i !== item.items!.length - 1 && (
                            <div className="h-px bg-gradient-to-r from-transparent via-[#F58220]/20 to-transparent mx-4 my-0.5" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
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
