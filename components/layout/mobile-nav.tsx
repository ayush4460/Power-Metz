"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { createPortal } from "react-dom"
import { X, Menu, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SocialIcons, CompanyLogo } from "@/components/shared/utilities"
import { siteConfig } from "@/config/site"
import { NavigationItem } from "./navigation-menu"

const MobileNavGroup = ({ item }: { item: NavigationItem }) => {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div className="flex flex-col">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex items-center justify-between text-2xl font-headings font-medium text-foreground hover:text-primary transition-colors text-left"
      >
        {item.title}
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight className="h-6 w-6 text-muted-foreground" />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && item.items && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pl-4 flex flex-col gap-4 border-l-2 border-primary/30 mt-4 py-2">
              {item.items.map((subItem) => (
                <a key={subItem.title} href={subItem.href || "#"} className="text-lg text-muted-foreground hover:text-primary transition-colors">
                  {subItem.title}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

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
    <div className="lg:hidden">
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)} aria-label="Open menu">
        <Menu className="h-6 w-6" />
      </Button>

      {typeof window !== 'undefined' && createPortal(
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
              <div className="flex items-center justify-between p-4 border-b border-border">
                <CompanyLogo />
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
                        <MobileNavGroup item={item} />
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
        </AnimatePresence>,
        document.body
      )}
    </div>
  )
}
