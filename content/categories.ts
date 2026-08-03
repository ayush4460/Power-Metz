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
    id: "bess",
    name: "BESS",
    slug: "bess",
    description: "Utility-scale Battery Energy Storage Systems designed for massive turnkey capacity and grid stabilization.",
    image: "/images/products/containerized.webp", 
    suitableFor: ["Utility", "Grid Stabilization", "Solar Farms"],
  },
  {
    id: "ess",
    name: "ESS",
    slug: "ess",
    description: "High-performance stackable and modular Energy Storage Systems for commercial and telecom applications.",
    image: "/images/products/ESS51.2V230AH.png", 
    suitableFor: ["Telecom", "Data Centers", "Commercial Load Shaving"],
  },
  {
    id: "ups-data-center",
    name: "UPS / DATA CENTER BATTERY",
    slug: "ups-data-center",
    description: "Stackable high-voltage UPS systems designed to deliver zero-delay power transitions for critical infrastructure.",
    image: "/images/products/ups.webp", 
    suitableFor: ["Hospitals", "Data Centers", "Industrial Automation"],
  },
  {
    id: "oems-customised",
    name: "OEMS CUSTOMISED",
    slug: "oems-customised",
    description: "Tailored energy storage solutions featuring modular stacking and specialized capacities for OEM partners.",
    image: "/images/products/ESS51.2V105AH.png", 
    suitableFor: ["Custom Integration", "Industrial OEMs", "Specialized Projects"],
  },
  {
    id: "ev-traction",
    name: "EV / TRACTION BATTERY SOLUTION",
    slug: "ev-traction",
    description: "Advanced lithium battery packs engineered for 3-wheelers, traction applications, and material handling.",
    image: "/images/products/12.16KWh_3W-Passenger.png", 
    suitableFor: ["3-Wheeler Passenger Vehicles", "Forklifts", "Material Handling"],
  },
]
