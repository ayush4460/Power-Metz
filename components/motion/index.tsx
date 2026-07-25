"use client"

import React, { useRef, useEffect, useState } from "react"
import { motion, useInView, useReducedMotion, Variants } from "framer-motion"
import { cn } from "@/lib/cn"

export const FadeIn = ({ children, className, delay = 0, duration = 0.5 }: { children: React.ReactNode, className?: string, delay?: number, duration?: number }) => {
  const prefersReducedMotion = useReducedMotion()
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: prefersReducedMotion ? 0 : duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export const Reveal = ({ children, className, delay = 0, duration = 0.6, direction = "up" }: { children: React.ReactNode, className?: string, delay?: number, duration?: number, direction?: "up" | "down" | "left" | "right" }) => {
  const prefersReducedMotion = useReducedMotion()
  
  const variants: Variants = {
    hidden: { 
      opacity: 0, 
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0,
      transition: { duration: prefersReducedMotion ? 0 : duration, delay, ease: [0.16, 1, 0.3, 1] } 
    }
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export const Stagger = ({ children, className, delayChildren = 0.1, staggerChildren = 0.1 }: { children: React.ReactNode, className?: string, delayChildren?: number, staggerChildren?: number }) => {
  const prefersReducedMotion = useReducedMotion()
  
  const variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren,
        staggerChildren: prefersReducedMotion ? 0 : staggerChildren
      }
    }
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export const StaggerItem = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
  }

  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  )
}

export const HoverLift = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const prefersReducedMotion = useReducedMotion()
  return (
    <motion.div
      whileHover={prefersReducedMotion ? {} : { y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export const AnimatedDivider = ({ className }: { className?: string }) => {
  const prefersReducedMotion = useReducedMotion()
  return (
    <motion.hr
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: "easeInOut" }}
      className={cn("w-full border-t border-border origin-left", className)}
    />
  )
}

// Simple Counter (counts up when in view)
export const Counter = ({ from = 0, to, duration = 2, className }: { from?: number, to: number, duration?: number, className?: string }) => {
  const prefersReducedMotion = useReducedMotion()
  const [count, setCount] = useState(prefersReducedMotion ? to : from)
  const nodeRef = useRef<HTMLSpanElement>(null)
  const inView = useInView(nodeRef, { once: true })

  useEffect(() => {
    if (inView && !prefersReducedMotion) {
      let startTimestamp: number
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1)
        // easeOutQuart
        const easeProgress = 1 - Math.pow(1 - progress, 4)
        setCount(Math.floor(easeProgress * (to - from) + from))
        
        if (progress < 1) {
          window.requestAnimationFrame(step)
        } else {
          setCount(to)
        }
      }
      window.requestAnimationFrame(step)
    }
  }, [inView, from, to, duration, prefersReducedMotion])

  return <span ref={nodeRef} className={className}>{count}</span>
}
