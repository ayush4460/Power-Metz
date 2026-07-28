"use client";

import { motion } from "framer-motion";
import { Container, Section } from "@/components/layout";
import { ResponsiveImage } from "@/components/shared/media";
import Link from "next/link";

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const FounderSection = () => {
  return (
    <Section className="py-12 lg:py-16 bg-white">
      <Container>
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 xl:gap-16 xl:items-stretch items-center">
          {/* Left: Portrait (Spans 5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="xl:col-span-5 relative w-full h-full min-h-100"
          >
            <div className="relative w-full h-full min-h-100 aspect-4/5 xl:aspect-auto rounded-3xl overflow-hidden shadow-2xl">
              <ResponsiveImage
                src="/Darshan%20Shah%20PowerMetz.jpeg"
                alt="Mr. Darshan Shah"
                fill
                objectFit="cover"
                className="transition-all duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent pointer-events-none" />

              <div className="absolute bottom-0 left-0 w-full p-8">
                <h3 className="text-3xl font-bold text-white mb-1">
                  Mr. Darshan Shah
                </h3>
                <p className="text-primary font-medium tracking-wide">
                  Founder & Director
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Content (Spans 7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="xl:col-span-7 flex flex-col justify-center py-4"
          >
            {/* Editorial Quote */}
            <div className="mb-12 relative">
              <span className="absolute -top-12 -left-6 text-9xl text-slate-100 font-serif leading-none select-none -z-10">
                &quot;
              </span>
              <h4 className="text-2xl md:text-3xl lg:text-4xl font-serif text-slate-900 leading-snug font-medium italic">
                The future of energy depends on intelligent, safe and scalable
                storage solutions.
              </h4>
            </div>

            <div className="w-16 h-1 bg-primary mb-10 rounded-full" />

            {/* Biography */}
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed mb-10">
              <p>
                A visionary entrepreneur with a strong foundation in new energy
                technologies, Darshan Shah brings over 12 years of experience in
                building innovative solutions for the clean energy ecosystem.
              </p>
              <p>
                With expertise spanning renewable energy, battery energy
                storage, electric mobility, EV infrastructure, and emerging
                technologies, he has been instrumental in driving sustainable
                solutions that address the evolving needs of modern industries.
              </p>
              <p>
                His forward-thinking approach and commitment to technology-led
                growth have shaped PowerMetz into an energy storage company
                focused on reliability, innovation, and a cleaner future.
              </p>
            </div>

            <Link
              href="https://www.linkedin.com/in/darshan-shah-58913620/"
              target="_blank"
            >
              <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-colors font-medium">
                <LinkedinIcon className="w-4 h-4" /> Connect on LinkedIn
              </button>
            </Link>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};
