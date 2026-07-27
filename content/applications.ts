export interface Application {
  id: string
  name: string
  description?: string
}

export const applications: Application[] = [
  { id: "residential", name: "Residential" },
  { id: "commercial", name: "Commercial" },
  { id: "industrial", name: "Industrial" },
  { id: "telecom", name: "Telecom" },
  { id: "ups", name: "UPS" },
  { id: "solar", name: "Solar" },
  { id: "data-centers", name: "Data Centers" },
  { id: "manufacturing", name: "Manufacturing" },
  { id: "ev-charging", name: "EV Charging" },
  { id: "utility", name: "Utility" },
  { id: "electric-mobility", name: "Electric Mobility" },
]
