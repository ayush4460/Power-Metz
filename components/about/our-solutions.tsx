"use client";

import { motion } from "framer-motion";
import { Container, Section } from "@/components/layout";
import { H2 } from "@/components/ui/typography";
import { ResponsiveImage } from "@/components/shared/media";
import { ourSolutions } from "@/content/about";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const OurSolutions = () => {
  return (
    <Section className="py-12 lg:py-16 bg-[#F6F5F2]">
      <Container className="max-w-[1400px]">
        
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">What We Do</h2>
            <H2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
              Our Solutions
            </H2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {ourSolutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <Link href={solution.link} className="flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                
                {/* Image */}
                <div className="relative w-full aspect-[4/3] bg-slate-50 overflow-hidden">
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <ResponsiveImage
                    src={solution.image}
                    alt={solution.title}
                    fill
                    objectFit="cover"
                    className="group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col flex-1 relative bg-white">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors duration-300">
                    {solution.title}
                  </h3>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-8 flex-1">
                    {solution.description}
                  </p>
                  
                  <div className="mt-auto flex items-center text-sm font-semibold text-primary">
                    Learn More 
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>

              </Link>
            </motion.div>
          ))}
        </div>

      </Container>
    </Section>
  );
};

