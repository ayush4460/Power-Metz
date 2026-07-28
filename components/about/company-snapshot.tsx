"use client";

import { motion } from "framer-motion";
import { Container, Section } from "@/components/layout";
import { companySnapshot } from "@/content/about";
import { CheckCircle } from "lucide-react";

const capabilities = companySnapshot.slice(0, -1);

export const CompanySnapshot = () => {
  return (
    <Section className="py-10 md:py-14 bg-background border-y border-border/50">
      <Container>

        {/* Header row */}
        <div className="mb-8 md:mb-10">
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-1">
            At a Glance
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            PowerMetz at a Glance
          </h2>
        </div>

        {/* Grid */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {capabilities.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-muted/60 hover:bg-primary/5 border border-border/60 hover:border-primary/30 transition-all duration-300 group"
            >
              <CheckCircle
                className="w-4 h-4 text-primary shrink-0 group-hover:scale-110 transition-transform duration-200"
                strokeWidth={2.5}
              />
              <span className="text-sm md:text-base font-medium text-foreground leading-snug">
                {item}
              </span>
            </motion.li>
          ))}
        </ul>

      </Container>
    </Section>
  );
};

