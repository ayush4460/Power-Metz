"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { X, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SocialIcons } from "@/components/shared/utilities"
import { siteConfig } from "@/config/site"
import { NavigationItem } from "./navigation-menu"

export const MobileNav = ({ items }: { items: NavigationItem[] }) => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Close on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  // Escape key handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [])

  return (
    <div className="md:hidden">
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)} aria-label="Open menu">
        <Menu className="h-6 w-6" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-xl"
            />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-[100] w-full sm:w-96 bg-surface shadow-2xl border-l border-border flex flex-col pt-safe-top pb-safe-bottom"
            >
              <div className="flex items-center justify-end p-4 border-b border-border">
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Close menu">
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-8">
                <div className="flex flex-col gap-6">
                  {items.map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                    >
                      {item.href ? (
                        <a href={item.href} className="text-2xl font-headings font-medium text-foreground hover:text-primary transition-colors block">
                          {item.title}
                        </a>
                      ) : (
                        <div className="space-y-3">
                          <div className="text-2xl font-headings font-medium text-muted-foreground">{item.title}</div>
                          {item.items && (
                            <div className="pl-4 flex flex-col gap-3 border-l-2 border-border/50">
                              {item.items.map((subItem) => (
                                <a key={subItem.title} href={subItem.href || "#"} className="text-lg text-foreground hover:text-primary transition-colors">
                                  {subItem.title}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="p-6 border-t border-border mt-auto bg-surface space-y-6"
              >
                <Button className="w-full" size="lg">Get in Touch</Button>
                <div className="flex justify-center">
                  {/* Assuming social icons setup here. We'll pass dummy for now or pull from siteConfig if we had them mapped to lucide icons */}
                  <SocialIcons links={[]} />
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
