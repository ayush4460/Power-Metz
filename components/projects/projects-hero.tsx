"use client";

import { Container } from "@/components/layout";
import { Reveal } from "@/components/motion";

export const ProjectsHero = () => {
  return (
    <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-[url('/images/industry_solar_1784955969013.png')] bg-cover bg-center bg-no-repeat"
      />
      
      {/* Overall gradient from bottom (blackening effect) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
      
      {/* Dark gradient from top for navbar visibility */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/80 to-transparent" />

      <Container className="relative z-10">
        <Reveal direction="up" duration={0.8}>
          <div className="text-center max-w-4xl mx-auto mt-20">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
              Advanced Battery <br />
              <span className="text-primary">Projects Portfolio</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto font-light">
              Browse our completed successful installations and high-quality energy storage products across Residential, Commercial & Industrial, EV, and OEMs.
            </p>
            
            <div className="w-24 h-1 bg-primary mx-auto mt-8 rounded-full" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
};
