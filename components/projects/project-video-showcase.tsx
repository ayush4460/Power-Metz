"use client";

import { Container, Section } from "@/components/layout";
import { Reveal } from "@/components/motion";
import { projectVideos } from "@/content/projects";

export const ProjectVideoShowcase = () => {
  return (
    <Section className="py-16 md:py-24 bg-background">
      <Container>
        <Reveal direction="up" duration={0.8}>
          <div className="text-center max-w-2xl mx-auto mb-14 md:mb-20">
            <div className="text-primary font-semibold text-sm md:text-base tracking-widest uppercase mb-4">
              Technology & Manufacturing
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4 font-headings leading-tight">
              Video Showcase
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-light">
              Watch our technology in action. Our advanced manufacturing and precision engineering processes ensure every product meets the highest standards.
            </p>
          </div>
        </Reveal>

        <div className="flex flex-col gap-12 md:gap-20 max-w-5xl mx-auto">
          {projectVideos.map((video, index) => (
            <Reveal key={video.id} direction="up" duration={0.8} delay={index * 0.1}>
              <div className="flex flex-col gap-6">
                <div className="relative w-full aspect-video bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-border/50 group">
                  <video
                    src={video.url}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
                </div>
                
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-foreground font-headings">
                    {video.title}
                  </h3>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
};
