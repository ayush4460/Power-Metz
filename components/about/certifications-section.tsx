"use client";

import { motion } from "framer-motion";
import { Container, Section } from "@/components/layout";
import { Reveal } from "@/components/motion";
import Image from "next/image";

const certLogos = [
  { src: "/quality.png", alt: "Quality", name: "Quality", imageClass: "p-4 group-hover:scale-105" },
  { src: "/trust.png", alt: "Trust", name: "Trust", imageClass: "p-2 scale-125 group-hover:scale-[1.3]" },
  { src: "/ISO.png", alt: "ISO", name: "ISO Certified", imageClass: "p-4 group-hover:scale-105" },
  { src: "/BIS.png", alt: "BIS", name: "BIS Certified", imageClass: "p-4 group-hover:scale-105" },
];

export const CertificationsSection = () => {
  return (
    <Section className="py-12 lg:py-16 bg-background overflow-hidden">
      <Container>

        {/* Section header */}
        <Reveal direction="up" duration={0.8}>
          <div className="text-center max-w-2xl mx-auto mb-14 md:mb-20">
            <div className="text-primary font-semibold text-sm md:text-base tracking-widest uppercase mb-4">
              Certifications
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4 font-headings leading-tight">
              Quality & Trust
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed font-light">
              We are proudly certified by international and national standards, ensuring the highest quality, safety, and reliability in every product.
            </p>
          </div>
        </Reveal>

        {/* Certification logos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-start justify-items-center max-w-5xl mx-auto">
          {certLogos.map((logo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center gap-4 group"
            >
              <div className="relative w-32 h-32 md:w-44 md:h-44 flex items-center justify-center bg-white rounded-2xl shadow-sm border border-border/50 group-hover:shadow-md group-hover:border-primary/30 transition-all duration-300 overflow-hidden">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  sizes="(max-width: 768px) 128px, 176px"
                  className={`object-contain transition-transform duration-300 ${logo.imageClass}`}
                />
              </div>
              <h3 className="text-sm md:text-base font-semibold text-foreground text-center">
                {logo.name}
              </h3>
            </motion.div>
          ))}
        </div>

      </Container>
    </Section>
  );
};
