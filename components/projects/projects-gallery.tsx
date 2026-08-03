"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Container, Section } from "@/components/layout";
import { projectCategories, projectsData, ProjectItem } from "@/content/projects";

export const ProjectsGallery = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredProjects =
    activeTab === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === activeTab);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const nextLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) =>
        prev === filteredProjects.length - 1 ? 0 : (prev || 0) + 1
      );
    }
  };

  const prevLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) =>
        prev === 0 ? filteredProjects.length - 1 : (prev || 0) - 1
      );
    }
  };

  return (
    <Section className="py-16 md:py-24 bg-slate-50">
      <Container>
        {/* Filter Navigation */}
        <div className="flex overflow-x-auto flex-nowrap md:flex-wrap justify-start md:justify-center gap-3 md:gap-4 mb-12 pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveTab(cat);
                setLightboxIndex(null);
              }}
              className={`shrink-0 whitespace-nowrap px-5 py-2.5 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                activeTab === cat
                  ? "bg-primary text-white shadow-md"
                  : "bg-white text-muted-foreground hover:bg-slate-200 hover:text-slate-900 shadow-sm border border-border/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="relative group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-border/50"
              onClick={() => openLightbox(index)}
            >
                <div className="relative aspect-square w-full p-6">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain p-8 group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6">
                    <h3 className="text-white text-xl md:text-2xl font-bold text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </div>
          ))}
        </div>
      </Container>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-[110]"
            >
              <X className="w-8 h-8" />
            </button>

            <button
              onClick={prevLightbox}
              className="absolute left-2 md:left-10 p-2 md:p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-[110]"
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            <button
              onClick={nextLightbox}
              className="absolute right-2 md:right-10 p-2 md:p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-[110]"
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            <div
              className="relative w-full h-full max-h-[100dvh] max-w-6xl px-14 md:px-24 py-16 md:py-16 flex flex-col items-center justify-center gap-4 md:gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full flex-1 min-h-0 mt-4 md:mt-8">
                <Image
                  src={filteredProjects[lightboxIndex].image}
                  alt={filteredProjects[lightboxIndex].title}
                  fill
                  className="object-contain"
                />
              </div>
              
              <div className="text-center shrink-0 w-full px-4 mb-4 md:mb-8">
                <div className="inline-block px-4 py-2 md:px-6 md:py-2.5 bg-black/40 backdrop-blur-md rounded-full text-white/90 shadow-lg max-w-full overflow-hidden border border-white/10">
                  <h4 className="text-sm md:text-base font-semibold truncate">
                    {filteredProjects[lightboxIndex].title}
                  </h4>
                  <p className="text-[10px] md:text-xs text-white/60 font-medium mt-0.5">
                    {filteredProjects[lightboxIndex].category}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
};
