"use client"

import React from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/cn"
import { Button } from "@/components/ui/button"
import { Section, Container } from "@/components/layout"
import { H2, Paragraph } from "@/components/ui/typography"


export const CTA = ({ title, description, primaryAction, secondaryAction, className }: { title: string, description: string, primaryAction?: React.ReactNode, secondaryAction?: React.ReactNode, className?: string }) => (
  <Section className={cn("bg-primary text-primary-foreground py-16", className)}>
    <Container className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
      <div className="max-w-2xl">
        <H2 className="text-white">{title}</H2>
        <Paragraph className="text-primary-foreground/90 mt-4 text-lg">{description}</Paragraph>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 shrink-0">
        {primaryAction}
        {secondaryAction}
      </div>
    </Container>
  </Section>
)

export const Breadcrumb = ({ items, className }: { items: { label: string, href?: string }[], className?: string }) => (
  <nav aria-label="Breadcrumb" className={cn("flex text-sm text-muted-foreground", className)}>
    <ol className="flex items-center space-x-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-center">
          {item.href ? (
            <a href={item.href} className="hover:text-primary transition-colors">{item.label}</a>
          ) : (
            <span className="text-foreground">{item.label}</span>
          )}
          {index < items.length - 1 && <ChevronRight className="h-4 w-4 mx-1" />}
        </li>
      ))}
    </ol>
  </nav>
)


import Image from "next/image"

export const CompanyLogo = ({ className }: { className?: string }) => (
  <div className={cn("font-headings font-bold text-2xl tracking-tighter flex items-center gap-2", className)}>
    <Image 
      src="/images/Power_Metz_Logo.png" 
      alt="PowerMetz Logo" 
      width={40} 
      height={40} 
      className="object-contain h-8 md:h-9 w-auto transition-all"
      priority
    />
    <span>Power<span className="text-primary">Metz</span></span>
  </div>
)

export const SocialIcons = ({ links, className }: { links: { url: string, icon: React.ReactNode }[], className?: string }) => (
  <div className={cn("flex items-center gap-4", className)}>
    {links.map((link, i) => (
      <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
        {link.icon}
      </a>
    ))}
  </div>
)
