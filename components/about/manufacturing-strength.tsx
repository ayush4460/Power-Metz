"use client";

import { motion } from "framer-motion";
import { Container, Section } from "@/components/layout";
import { H2 } from "@/components/ui/typography";
import { ResponsiveImage } from "@/components/shared/media";
import { manufacturingGallery } from "@/content/about";
import { Factory, ShieldCheck, Cog, Gauge, Microscope } from "lucide-react";

export const ManufacturingStrength = () => {
  const capabilities = [
    { icon: Factory, title: "Gigawatt Scale Manufacturing", desc: "3.2 GWh annual production capacity located in Vadodara, Gujarat." },
    { icon: Cog, title: "Precision Automation", desc: "High-precision automated cell grading and laser welding lines." },
    { icon: Microscope, title: "Rigorous Testing", desc: "Hardware-in-the-loop (HIL) battery management testing protocols." },
    { icon: ShieldCheck, title: "Industrial Safety", desc: "Compliance with strict AIS 156 Phase 2 safety guidelines." },
    { icon: Gauge, title: "Quality Assurance", desc: "Multi-chemistry adaptability ensuring uncompromised performance." },
  ];

  return (
    <Section className="py-12 lg:py-16 bg-slate-900 text-white overflow-hidden">
      <Container>
        
        {/* Top Header Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">Infrastructure</h2>
            <H2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6">
              World-Class Manufacturing Strength
            </H2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-8">
              Central to our commercial scaling is our advanced manufacturing facility in Vadodara, Gujarat. Boasting a 3.2 GWh production capacity, this facility is built to handle multi-chemistry cell grading, high-precision automated welding, and rigorous safety compliance.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {capabilities.map((cap, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <cap.icon className="w-5 h-5 text-primary" strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">{cap.title}</h4>
                    <p className="text-sm text-slate-400">{cap.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Magazine Gallery Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px] lg:h-[800px]">
          {manufacturingGallery.map((img, index) => {
            let layoutClasses = "";
            if (img.type === "large") layoutClasses = "md:col-span-2 md:row-span-2";
            else if (img.type === "landscape") layoutClasses = "md:col-span-2 md:row-span-1";
            else if (img.type === "wide") layoutClasses = "md:col-span-4 md:row-span-1 hidden"; // fallback
            else layoutClasses = "md:col-span-1 md:row-span-1";

            // If wide is in standard grid, make it span fully below if we wanted, but we'll adapt:
            if (img.type === "wide") {
              return null; // Skip wide from the main block to put it below, or adjust standard
            }

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative rounded-2xl overflow-hidden group ${layoutClasses} h-[300px] md:h-auto`}
              >
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <ResponsiveImage
                  src={img.src}
                  alt={`Manufacturing facility ${index}`}
                  fill
                  objectFit="cover"
                  className="group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              </motion.div>
            );
          })}
        </div>

        {/* The Wide image spanning full width at the bottom */}
        {manufacturingGallery.find(img => img.type === "wide") && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="mt-4 relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden group"
          >
            <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
            <ResponsiveImage
              src={manufacturingGallery.find(img => img.type === "wide")!.src}
              alt="Factory Overview"
              fill
              objectFit="cover"
              className="group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </motion.div>
        )}

      </Container>
    </Section>
  );
};


