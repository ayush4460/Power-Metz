"use client"

import { Section, Container } from "@/components/layout"
import { motion } from "framer-motion"

export function AboutVideo() {
  return (
    <Section className="py-16 md:py-24 bg-muted/30">
      <Container>

        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative aspect-video w-full max-w-5xl mx-auto rounded-xl overflow-hidden shadow-2xl border border-border/50 bg-black"
        >
          <video 
            src="/Ending About Us.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline
            controls
            className="w-full h-full object-cover"
          >
            Your browser does not support the video tag.
          </video>
        </motion.div>
      </Container>
    </Section>
  )
}
