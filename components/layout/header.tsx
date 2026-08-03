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
import Link from "next/link"

export const Header = () => {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const isBlogPost = pathname.startsWith("/blog")
  const isProjects = pathname.startsWith("/projects")
  const isTransparentRoute = isHome || isBlogPost || isProjects
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
          { title: "BESS", href: "/products/bess", description: "Utility-scale BESS" },
          { title: "ESS", href: "/products/ess", description: "Commercial Energy Storage" },
          { title: "UPS / DATA CENTER BATTERY", href: "/products/ups-data-center", description: "Critical Power Systems" },
          { title: "OEMS CUSTOMISED", href: "/products/oems-customised", description: "Tailored Energy Solutions" },
          { title: "EV / TRACTION BATTERY SOLUTION", href: "/products/ev-traction", description: "Lithium packs for mobility" },
        ]
      }
    }
    return nav
  })

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-80 h-(--header-height) flex items-center transition-all duration-500",
        scrollState === "transparent" ? (isTransparentRoute ? "bg-transparent text-white" : "bg-transparent text-foreground") : "bg-background/80 backdrop-blur-md border-b border-border text-foreground shadow-sm",
      )}
    >
      {/* Skip Navigation */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-100 px-4 py-2 bg-primary text-white rounded">
        Skip to content
      </a>

      <Container className="relative flex items-center justify-between w-full h-full">
        {/* Left: Logo */}
        <div className="flex-1 flex justify-start z-10 pointer-events-none">
          <Link href="/" className="shrink-0 hover:opacity-80 transition-opacity pointer-events-auto">
            <CompanyLogo />
          </Link>
        </div>

        {/* Center: Navigation */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex justify-center z-20 w-auto">
          <NavigationMenu items={navItems} variant={scrollState === "transparent" && isTransparentRoute ? "transparent" : "default"} />
        </div>
        
        {/* Right: CTA & Mobile Nav */}
        <div className="flex-1 flex items-center justify-end gap-2 z-10 pointer-events-none">
          <div className="hidden lg:block pointer-events-auto">
            <Button className="bg-primary text-white hover:bg-primary/90 border-0 text-base px-6">
              Get a Quote
            </Button>
          </div>
          <div className="lg:hidden pointer-events-auto">
            <MobileNav items={navItems} />
          </div>
        </div>
      </Container>
    </motion.header>
  )
}
