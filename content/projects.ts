import { products } from "./products";
import { categories } from "./categories";

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

export interface ProjectVideo {
  id: string;
  title: string;
  url: string;
}

export const projectCategories = ["All", ...categories.map(c => c.name)];

export const projectsData: ProjectItem[] = products.map(p => {
  const cat = categories.find(c => c.id === p.categoryId);
  return {
    id: p.id,
    title: p.name,
    category: cat ? cat.name : "Uncategorized",
    image: p.image
  };
});

export const projectVideos: ProjectVideo[] = [
  {
    id: "vid-1",
    title: "Build with Precision",
    url: "/Build with Precision.mp4"
  },
  {
    id: "vid-2",
    title: "Lithium Technology",
    url: "/Lithium Technology.mp4"
  },
  {
    id: "vid-3",
    title: "PowerMetz Showcase",
    url: "/HeroSection_BG.mp4"
  }
];
