"use client"

import React from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { cn } from "@/lib/cn"

export const ScrollProgress = ({ className }: { className?: string }) => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <motion.div
      className={cn("fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-[100]", className)}
      style={{ scaleX }}
    />
  )
}
