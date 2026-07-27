export interface Category {
  id: string
  name: string
  slug: string
  description: string
  image: string
  suitableFor: string[]
}

export const categories: Category[] = [
  {
    id: "residential-energy-storage",
    name: "Residential Energy Storage",
    slug: "residential-energy-storage",
    description: "Compact 12.8V and 25.6V modules designed for scalable residential backup and solar integration.",
    image: "/images/products/residential.webp", 
    suitableFor: ["Homes", "Solar Backup", "Small Businesses"],
  },
  {
    id: "rack-mounted-bess",
    name: "Rack Mounted & Stackable ESS",
    slug: "rack-mounted-bess",
    description: "High-performance 48V, 51.2V, and 96V stackable modules optimized for seamless integration in standard racks.",
    image: "/images/products/rack.webp", 
    suitableFor: ["Telecom", "Data Centers", "Commercial Load Shaving"],
  },
  {
    id: "ups-battery-systems",
    name: "UPS Battery Systems",
    slug: "ups-battery-systems",
    description: "120V to 480V stackable high-voltage UPS systems designed to deliver zero-delay power transitions for critical infrastructure.",
    image: "/images/products/ups.webp", 
    suitableFor: ["Hospitals", "Data Centers", "Industrial Automation"],
  },
  {
    id: "containerized-bess",
    name: "Containerized BESS",
    slug: "containerized-bess",
    description: "Megawatt-scale turnkey containerized energy storage solutions for grid stabilization, utility-scale renewable integration, and demand shaving.",
    image: "/images/products/containerized.webp", 
    suitableFor: ["Utility", "Solar Farms", "Wind Farms", "Grid Stabilization"],
  },
]
