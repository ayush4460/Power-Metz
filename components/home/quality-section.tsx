import React from "react"
import { Container, Section } from "@/components/layout"
import { H2, Lead, Paragraph } from "@/components/ui/typography"
import { Reveal, Stagger, FadeIn } from "@/components/motion"
import { homeContent } from "@/content/home"
import { Cpu, ArrowRight } from "lucide-react"

export const QualitySection = () => {
  const { headline, subheadline, badges, pillars } = homeContent.reliability

  return (
    <Section className="bg-[#F8F9FA] relative overflow-hidden py-16 md:py-24 lg:py-32">
      {/* Premium Background Layering */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-slate-300/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay pointer-events-none" />
      
      <Container className="relative z-10">
        {/* Top Header Section */}
        <div className="flex flex-col items-center text-center w-full mb-8 md:mb-12">
          <Reveal direction="up" duration={0.8}>
            <H2 className="mb-6 leading-tight tracking-tight text-4xl md:text-5xl lg:text-6xl text-slate-900 w-full">
              {headline}
            </H2>
          </Reveal>
          
          <Reveal direction="up" delay={0.1} duration={0.8}>
            <Paragraph className="text-muted-foreground text-lg md:text-xl leading-relaxed w-full mb-4">
              {subheadline}
            </Paragraph>
          </Reveal>
        </div>

        {/* Bottom Cards Grid */}
        <Stagger staggerChildren={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {pillars.map((pillar, index) => (
              <FadeIn key={index} className="group h-full">
                <div className="relative bg-white/90 backdrop-blur-md rounded-3xl p-6 md:p-8 flex flex-col h-full border border-border/40 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                  {/* Left Orange Accent Line */}
                  <div className="absolute left-0 top-8 bottom-8 w-1 bg-primary rounded-r-full scale-y-50 group-hover:scale-y-100 transition-transform duration-500 origin-center opacity-0 group-hover:opacity-100" />
                  
                  {/* Number and Icon */}
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center border transition-colors duration-500 shrink-0 border-primary/30 bg-primary/5 lg:border-border/50 lg:bg-slate-50 lg:group-hover:border-primary/30 lg:group-hover:bg-primary/5">
                      <Cpu className="w-6 h-6 transition-all duration-500 text-primary rotate-[5deg] lg:text-slate-400 lg:rotate-0 lg:group-hover:text-primary lg:group-hover:rotate-[5deg]" />
                    </div>
                    <span className="text-5xl font-bold font-mono transition-colors duration-500 leading-none text-primary/20 lg:text-slate-200 lg:group-hover:text-primary/20">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1">
                    <h4 className="text-xl font-bold text-slate-900 mb-4 tracking-tight leading-snug">
                      {pillar.title}
                    </h4>
                    
                    <Paragraph className="text-slate-600 text-sm md:text-base mb-8 leading-relaxed flex-1">
                      {pillar.description}
                    </Paragraph>

                    <div className="flex flex-col gap-3 mt-auto">
                      {pillar.highlights.map(h => (
                        <div key={h} className="flex items-start gap-3 text-sm font-semibold text-slate-700">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                          <span className="leading-snug">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </Stagger>
      </Container>
    </Section>
  )
}

