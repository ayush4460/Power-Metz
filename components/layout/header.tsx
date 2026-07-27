"use client"

import React, { useState } from "react"
import { usePathname } from "next/navigation"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { cn } from "@/lib/cn"
import { CompanyLogo } from "@/components/shared/utilities"
import { NavigationMenu } from "./navigation-menu"
import { MobileNav } from "./mobile-nav"
import { navigationConfig } from "@/config/navigation"
import { Button } from "@/components/ui/button"
import { Container } from "./index" // Assuming we can import layout components here

export const Header = () => {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const { scrollY } = useScroll()
  const [scrollState, setScrollState] = useState<"transparent" | "glass" | "solid">("transparent")

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest <= 20) {
      setScrollState("transparent")
    } else if (latest > 20 && latest < 100) {
      setScrollState("glass")
    } else {
      setScrollState("solid")
    }
  })

  // We convert the mainNav config to the NavigationItem format, adding a dummy dropdown for Solutions as requested to demonstrate scalability.
  const navItems = navigationConfig.mainNav.map(nav => {
    if (nav.title === "Solutions") {
      return {
        title: "Solutions",
        items: [
          { title: "Solar Integration", href: "/solutions/solar", description: "Turnkey solar systems" },
          { title: "Energy Storage", href: "/solutions/storage", description: "Commercial battery scaling" },
          { title: "Grid Modernization", href: "/solutions/grid", description: "Smart grid tech" },
        ]
      }
    }
    return nav
  })

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-[80] h-[var(--header-height)] flex items-center transition-all duration-500",
        scrollState === "transparent" ? (isHome ? "bg-transparent text-white" : "bg-transparent text-foreground") : "bg-background/80 backdrop-blur-md border-b border-border text-foreground shadow-sm",
      )}
    >
      {/* Skip Navigation */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] px-4 py-2 bg-primary text-white rounded">
        Skip to content
      </a>

      <Container className="relative flex items-center justify-between w-full h-full">
        {/* Left: Logo */}
        <div className="flex-1 flex justify-start z-10">
          <a href="/" className="shrink-0 hover:opacity-80 transition-opacity">
            <CompanyLogo />
          </a>
        </div>

        {/* Center: Navigation */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex justify-center z-10">
          <NavigationMenu items={navItems} variant={scrollState === "transparent" && isHome ? "transparent" : "default"} />
        </div>
        
        {/* Right: CTA & Mobile Nav */}
        <div className="flex-1 flex items-center justify-end gap-2 z-10">
          <div className="hidden lg:block">
            <Button className="bg-primary text-white hover:bg-primary/90 border-0 text-base px-6">
              Get a Quote
            </Button>
          </div>
          <div className="lg:hidden">
            <MobileNav items={navItems} />
          </div>
        </div>
      </Container>
    </motion.header>
  )
}
