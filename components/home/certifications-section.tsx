import React from "react"
import { Container, Section } from "@/components/layout"
import { Reveal, Stagger, FadeIn } from "@/components/motion"
import { homeContent } from "@/content/home"
import { ShieldCheck } from "lucide-react"

export const CertificationsSection = () => {
  const { items } = homeContent.certifications

  return (
    <Section className="bg-background border-t border-border/10">
      <Container>
        <Stagger staggerChildren={0.1}>
          <div className="flex flex-wrap items-center justify-center md:justify-between gap-10 md:gap-16 opacity-60 hover:opacity-100 transition-opacity duration-700">
            {items.map((cert, index) => (
              <FadeIn key={index} className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-primary opacity-80" />
                <span className="font-mono text-sm tracking-widest uppercase text-muted-foreground">{cert.name}</span>
              </FadeIn>
            ))}
          </div>
        </Stagger>
      </Container>
    </Section>
  )
}

