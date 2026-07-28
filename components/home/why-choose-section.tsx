import React from "react"
import { Container, Section } from "@/components/layout"
import { H2, H3 } from "@/components/ui/typography"
import { Reveal, FadeIn, Stagger } from "@/components/motion"
import { homeContent } from "@/content/home"
import { Battery, Shield, Factory, Settings, Sun, Network, Wrench, Layers, CheckCircle } from "lucide-react"

export const WhyChooseSection = () => {
  const { headline, subheadline, items } = homeContent.whyChoosePowerMetz

  return (
    <Section className="relative overflow-hidden bg-[#faf9f8]">
      {/* Background Glows and Noise */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-150 bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none -z-10 bg-[url('/noise.png')] mix-blend-multiply" />

      <Container>
        {/* Header Rhythm */}
        <Reveal direction="up" duration={0.8} className="flex flex-col items-center text-center w-full mb-16 md:mb-24">
          <div className="text-primary font-semibold text-sm md:text-base tracking-widest uppercase text-center mb-4">
            WHY CHOOSE POWERMETZ
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-6 text-center w-full font-headings">
            {headline}
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-slate-600 leading-relaxed font-light w-full text-center max-w-3xl mx-auto">
            {subheadline}
          </p>
        </Reveal>

        <Stagger staggerChildren={0.15}>
          <div className="flex flex-col gap-6 md:gap-8">
            
            {/* Row 1: Large Feature (Safe Lithium Battery Technology) */}
            <FadeIn>
              <div className="group relative w-full rounded-3xl bg-white/60 backdrop-blur-xl border border-black/5 overflow-hidden flex flex-col lg:flex-row items-center transition-all duration-500 shadow-[0_8px_40px_rgb(0,0,0,0.08)] -translate-y-1 lg:shadow-[0_8px_30px_rgb(0,0,0,0.04)] lg:translate-y-0 lg:hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] lg:hover:-translate-y-1">
                <div className="w-full lg:w-1/2 p-10 md:p-16 flex flex-col justify-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-8 transition-transform duration-500 scale-110 lg:scale-100 lg:group-hover:scale-110">
                    <Battery className="w-7 h-7 text-primary" strokeWidth={1.5} />
                  </div>
                  <H3 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 mb-6">
                    {items[0].title}
                  </H3>
                  <p className="text-slate-500 text-lg leading-relaxed font-light">
                    Designed for long cycle life, thermal stability and dependable energy storage using premium Lithium Iron Phosphate Batteries.
                  </p>
                  <div className="mt-8 space-y-4">
                    <div className="flex items-center gap-3 text-slate-700">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span className="font-medium">Extended Cycle Life & Durability</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-700">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span className="font-medium">Advanced Thermal Management</span>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-1/2 h-100 lg:h-125 relative bg-slate-100 overflow-hidden">
                  <div dangerouslySetInnerHTML={{
                    __html: `<video src="/Lithium Technology.mp4" autoplay loop muted playsinline class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"></video>`
                  }} className="w-full h-full" />
                </div>
              </div>
            </FadeIn>

            {/* Row 2: Two Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Smart Battery Monitoring */}
              <FadeIn>
                <div className="group h-full rounded-3xl bg-white/60 backdrop-blur-xl border border-black/5 p-10 md:p-12 transition-all duration-500 shadow-[0_8px_40px_rgb(0,0,0,0.08)] -translate-y-1 lg:shadow-[0_8px_30px_rgb(0,0,0,0.04)] lg:translate-y-0 lg:hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] lg:hover:-translate-y-1">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-colors duration-500 bg-primary/5 border border-primary/30 lg:bg-white lg:border-slate-100 lg:shadow-sm lg:group-hover:border-primary/30 lg:group-hover:bg-primary/5">
                    <Settings className="w-7 h-7 transition-colors duration-500 text-primary lg:text-slate-700 lg:group-hover:text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-semibold tracking-tight text-slate-900 mb-4">
                    {items[1].title}
                  </h3>
                  <p className="text-slate-600 text-base md:text-lg font-light leading-relaxed">
                    {items[1].description}
                  </p>
                </div>
              </FadeIn>

              {/* Flexible Energy Storage Solutions */}
              <FadeIn>
                <div className="group h-full rounded-3xl bg-white/60 backdrop-blur-xl border border-black/5 p-10 md:p-12 transition-all duration-500 shadow-[0_8px_40px_rgb(0,0,0,0.08)] -translate-y-1 lg:shadow-[0_8px_30px_rgb(0,0,0,0.04)] lg:translate-y-0 lg:hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] lg:hover:-translate-y-1">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-colors duration-500 bg-primary/5 border border-primary/30 lg:bg-white lg:border-slate-100 lg:shadow-sm lg:group-hover:border-primary/30 lg:group-hover:bg-primary/5">
                    <Layers className="w-7 h-7 transition-colors duration-500 text-primary lg:text-slate-700 lg:group-hover:text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-semibold tracking-tight text-slate-900 mb-4">
                    {items[2].title}
                  </h3>
                  <p className="text-slate-600 text-base md:text-lg font-light leading-relaxed">
                    {items[2].description}
                  </p>
                </div>
              </FadeIn>
            </div>

            {/* Row 3: Wide Feature (Built with Precision) */}
            <FadeIn>
              <div className="group relative w-full rounded-3xl bg-white/60 backdrop-blur-xl border border-black/5 overflow-hidden flex flex-col-reverse lg:flex-row transition-all duration-500 shadow-[0_8px_40px_rgb(0,0,0,0.08)] -translate-y-1 lg:shadow-[0_8px_30px_rgb(0,0,0,0.04)] lg:translate-y-0 lg:hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] lg:hover:-translate-y-1">
                <div className="w-full lg:w-1/2 h-87.5 lg:h-112.5 relative bg-slate-100 overflow-hidden">
                  <div dangerouslySetInnerHTML={{
                    __html: `<video src="/Build with Precision.mp4" autoplay loop muted playsinline class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"></video>`
                  }} className="w-full h-full" />
                </div>
                <div className="w-full lg:w-1/2 p-10 md:p-16 flex flex-col justify-center">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-colors duration-500 bg-primary/5 border border-primary/30 lg:bg-white lg:border-slate-100 lg:shadow-sm lg:group-hover:border-primary/30 lg:group-hover:bg-primary/5">
                    <Factory className="w-7 h-7 transition-colors duration-500 text-primary lg:text-slate-700 lg:group-hover:text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 mb-6">
                    {items[3].title}
                  </h3>
                  <p className="text-slate-500 text-lg font-light leading-relaxed">
                    Factory-tested systems built with quality components by a leading Energy Storage Manufacturer.
                  </p>
                  <div className="mt-8 space-y-4">
                    <div className="flex items-center gap-3 text-slate-700">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span className="font-medium">Automated Assembly Lines</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-700">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span className="font-medium">Rigorous Quality Testing</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Row 4: Four Small Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
              {items.slice(4, 8).map((item, index) => {
                const icons = [Network, Shield, Sun, Wrench]
                const Icon = icons[index]

                return (
                  <FadeIn key={item.title}>
                    <div className="group h-full rounded-3xl bg-white/60 backdrop-blur-xl border border-black/5 p-8 transition-all duration-500 shadow-[0_8px_30px_rgb(0,0,0,0.06)] -translate-y-1 lg:shadow-[0_4px_20px_rgb(0,0,0,0.03)] lg:translate-y-0 lg:hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] lg:hover:-translate-y-1">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors duration-500 bg-primary/5 border border-primary/30 lg:bg-white lg:border-slate-100 lg:shadow-sm lg:group-hover:border-primary/30 lg:group-hover:bg-primary/5">
                        <Icon className="w-6 h-6 transition-colors duration-500 text-primary lg:text-slate-600 lg:group-hover:text-primary" strokeWidth={1.5} />
                      </div>
                      <h4 className="text-xl font-semibold tracking-tight text-slate-900 mb-3">
                        {item.title}
                      </h4>
                      <p className="text-slate-600 text-sm md:text-base font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </FadeIn>
                )
              })}
            </div>

          </div>
        </Stagger>
      </Container>
    </Section>
  )
}
