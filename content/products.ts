export interface Product {
  id: string
  categoryId: string
  name: string
  slug: string
  modelNumber: string
  shortDescription: string
  capacity: string
  chemistry: string
  cycleLife?: string
  applications: string[]
  image: string
  features: string[]
  advantages: string[]
  overview: string
}

export const products: Product[] = [
  // --- BESS ---
  {
    id: "container-160kw-836kwh",
    categoryId: "bess",
    name: "160kW / 836kWh Containerized BESS",
    slug: "container-160kw-836kwh",
    modelNumber: "Container 160kW/836kWh",
    shortDescription: "Utility-scale containerized energy storage system featuring HVAC cooling and 836kWh rated capacity.",
    capacity: "836 kWh",
    chemistry: "LFP",
    cycleLife: "4000 Cycles",
    applications: ["utility", "grid-stabilization", "solar"],
    image: "/images/products/Containerized_BESS.png",
    features: ["HVAC Cooling Type", "1P208S x 4 racks Configuration", "665.6V Nominal Voltage", "Smart BMS"],
    advantages: ["Massive 836 kWh turnkey capacity", "High-voltage architecture (520V - 748V Range)", "Pre-integrated into standard container (2 Tonne/rack)"],
    overview: "The Container 160kW/836kWh is a complete, turnkey utility-scale battery energy storage system. Designed with LFP chemistry, integrated HVAC cooling, and a high-voltage 665.6V nominal architecture, it is ready to be deployed for demanding grid stabilization and large-scale renewable integration projects."
  },

  // --- ESS ---
  {
    id: "ess-48v-314ah",
    categoryId: "ess",
    name: "48V 314AH 15.07KWH Rack Module",
    slug: "ess-48v-314ah",
    modelNumber: "ESS48V314AH",
    shortDescription: "15.07 kWh high-capacity stackable module with parallel expansion support.",
    capacity: "15.07 kWh",
    chemistry: "LiFePO4",
    cycleLife: "≥ 4000 Cycles @ 80% DoD",
    applications: ["commercial", "telecom"],
    image: "/images/products/ESS48V314AH_ESS.png",
    features: ["Parallel Expansion Supported", "Smart JBD/DALY BMS", "Floor Standing Design", "RS485 Communication"],
    advantages: ["Massive 15.07 kWh capacity per unit", "High peak discharge support (200A/180A)", "Modular and stackable for 60.3+ kWh systems"],
    overview: "The ESS48V314AH delivers an impressive 15.07 kWh of storage per module. Built for floor-standing stackable architectures, it supports parallel expansion, allowing users to effortlessly scale up to high-capacity industrial power banks."
  },
  {
    id: "ess-51-2v-105ah",
    categoryId: "ess",
    name: "51.2V 105AH 5.37kWH Rack Module",
    slug: "ess-51-2v-105ah",
    modelNumber: "ESS51.2V105AH",
    shortDescription: "5.37 kWh stackable/rack-mounted LFP battery for flexible scaling.",
    capacity: "5.37 kWh",
    chemistry: "LFP",
    cycleLife: "≥ 4000 Cycles @ 80% DOD",
    applications: ["commercial", "residential"],
    image: "/images/products/ESS51.2V105AH_ESS.png",
    features: ["Rack Mounted / Stackable", "Smart JBD/PALY BMS", "RS485 / CAN Communication", "Metal Case Material"],
    advantages: ["5kwh / 10kwh / 15kwh / 20kwh Stack Capacities", "Lightweight design (~55kg)", "High charging acceptance (100A multiple stack)"],
    overview: "The ESS51.2V105AH is a versatile 5.37 kWh battery module designed for both rack-mounted and stackable configurations. It offers seamless parallel stacking to easily scale capacity from 5kWh to 20kWh and beyond."
  },
  {
    id: "ess-51-2v-150ah",
    categoryId: "ess",
    name: "51.2V 150AH 7.68kWH Rack Module",
    slug: "ess-51-2v-150ah",
    modelNumber: "ESS51.2V150AH",
    shortDescription: "7.68 kWh rack-mounted prismatic LFP module with advanced BMS protection.",
    capacity: "7.68 kWh",
    chemistry: "LiFePO4",
    cycleLife: "≥ 4000 Cycles @ 80% DOD",
    applications: ["commercial", "data-center"],
    image: "/images/products/ESS51.2V150AH_ESS.png",
    features: ["Prismatic Cell Type", "Rack Mounted", "Smart JBD/PALY BMS", "CAN / RS485 Communication"],
    advantages: ["Scalable up to 16 Units in Parallel", "High peak discharge (150A for 10s)", "Intelligent Smart BMS"],
    overview: "Engineered with highly stable prismatic LiFePO4 cells, the ESS51.2V150AH delivers 7.68 kWh of reliable power. It supports massive scalability, allowing up to 16 units to be connected in parallel for high-demand commercial deployments."
  },
  {
    id: "ess-51-2v-230ah",
    categoryId: "ess",
    name: "51.2V 230AH 11.78kWh Rack Module",
    slug: "ess-51-2v-230ah",
    modelNumber: "ESS51.2V230AH",
    shortDescription: "11.78 kWh high-density module supporting up to 16 parallel units.",
    capacity: "11.78 kWh",
    chemistry: "LiFePO4",
    cycleLife: "≥ 4000 Cycles",
    applications: ["commercial", "industrial"],
    image: "/images/products/ESS51.2V230AH.png",
    features: ["Parallel Expandable", "Modular Design", "Smart BMS", "CAN & RS485 Communication"],
    advantages: ["High continuous discharge (115A)", "Massive parallel expansion up to 16 Units", "Deep 95% Depth of Discharge"],
    overview: "The ESS51.2V230AH is a heavy-duty rack module providing 11.78 kWh of storage. Built for commercial integration, it features advanced CAN and RS485 communication protocols and supports extensive parallel scaling for energy-intensive facilities."
  },
  {
    id: "ess-51-2v-314ah",
    categoryId: "ess",
    name: "51.2V 314AH 16.08kWh Rack Module",
    slug: "ess-51-2v-314ah",
    modelNumber: "ESS51.2V314AH",
    shortDescription: "16.08 kWh massive capacity rack module for high-demand applications.",
    capacity: "16.08 kWh",
    chemistry: "LiFePO4",
    cycleLife: "≥ 4000 Cycles",
    applications: ["industrial", "commercial"],
    image: "/images/products/ESS51.2V314AH.png",
    features: ["OEM & ODM Support", "Modular Design", "Intelligent Smart BMS", "CAN & RS485 Communication"],
    advantages: ["Highest capacity 51.2V unit (16.08 kWh)", "High discharge current (314A for 10s)", "Seamless parallel expansion"],
    overview: "Representing the pinnacle of our 51.2V series, the ESS51.2V314AH offers a massive 16.08 kWh capacity per module. It is designed to handle intense load spikes with a 1C peak discharge rate, making it the optimal choice for demanding industrial and commercial backup."
  },

  // --- UPS / DATA CENTER BATTERY ---
  {
    id: "ess-96v-50ah",
    categoryId: "ups-data-center",
    name: "96V 50AH 4.8kWH Stackable",
    slug: "ess-96v-50ah",
    modelNumber: "ESS96V50AH",
    shortDescription: "96V 4.8 kWh rack-mounted module for medium-voltage scaling.",
    capacity: "4.8 kWh",
    chemistry: "LiFePO4",
    cycleLife: "≥ 4000 Cycles @ 80% DOD",
    applications: ["commercial", "telecom", "ups"],
    image: "/images/products/ESS96V50AH.png",
    features: ["Floor Standing / Rack Mounted", "Smart BMS", "CAN / RS485 Communication", "96V Architecture"],
    advantages: ["Higher voltage for increased efficiency", "Compact 4.8 kWh form factor", "Robust 95% DoD capability"],
    overview: "The ESS96V50AH provides a higher-voltage 96V baseline for increased efficiency in energy transfer. Delivering 4.8 kWh per unit, it is perfectly suited for scalable stackable or rack-mounted telecom and commercial environments."
  },
  {
    id: "ups-120v-series",
    categoryId: "ups-data-center",
    name: "120V Stackable UPS Series",
    slug: "120v-stackable-ups",
    modelNumber: "ESS120V50AH / 100AH / 105AH",
    shortDescription: "120V UPS battery stacks available in 6.0 kWh, 12.0 kWh, and 18.0 kWh capacities.",
    capacity: "6.0 kWh - 18.0 kWh",
    chemistry: "LiFePO4",
    cycleLife: "≥ 4000 Cycles",
    applications: ["ups", "data-center"],
    image: "/images/products/120V_UPS.png",
    features: ["Stackable Roll-Cart Design", "CAN / RS485 Communication", "1C Peak Discharge (10s)", "120V Nominal Architecture"],
    advantages: ["Rapid 1C discharge capability for UPS systems", "Scalable 50Ah, 100Ah, and 105Ah configurations", "Zero-delay power transition"],
    overview: "The 120V Stackable UPS Series provides critical, zero-delay power backup for highly sensitive infrastructure. Available in 50Ah, 100Ah, and 105Ah capacities, these systems are housed in a mobile, stackable cart design for easy deployment in data centers and hospitals."
  },
  {
    id: "ups-240v-series",
    categoryId: "ups-data-center",
    name: "240V Stackable UPS Series",
    slug: "240v-stackable-ups",
    modelNumber: "ESS240V50AH / 100AH / 105AH",
    shortDescription: "240V UPS battery stacks delivering up to 36.0 kWh per stack.",
    capacity: "12.0 kWh - 36.0 kWh",
    chemistry: "LiFePO4",
    cycleLife: "≥ 4000 Cycles",
    applications: ["ups", "industrial"],
    image: "/images/products/240V_UPS.png",
    features: ["240V Nominal Architecture", "Stackable Roll-Cart Design", "CAN / RS485 Communication", "1C Peak Discharge"],
    advantages: ["Supports high-voltage, high-efficiency UPS inverters", "Massive capacity scaling up to 36 kWh", "95% Depth of Discharge"],
    overview: "Designed for mid-to-large scale industrial and commercial uninterrupted power supply, the 240V Stackable UPS Series scales from 12.0 kWh to 36.0 kWh. Its high-voltage architecture ensures compatibility with heavy-duty UPS systems requiring reliable, deep-discharge LiFePO4 cells."
  },
  {
    id: "ups-360v-series",
    categoryId: "ups-data-center",
    name: "360V Stackable UPS Series",
    slug: "360v-stackable-ups",
    modelNumber: "ESS360V50AH / 100AH / 105AH",
    shortDescription: "360V UPS battery stacks providing advanced power density up to 54.0 kWh.",
    capacity: "18.0 kWh - 54.0 kWh",
    chemistry: "LiFePO4",
    cycleLife: "≥ 4000 Cycles",
    applications: ["ups", "industrial", "utility"],
    image: "/images/products/360V_UPS.png",
    features: ["360V High-Voltage Architecture", "Modular Stackable Cart", "Smart BMS Protection", "CAN / RS485 Integration"],
    advantages: ["Extremely high power density for large facilities", "Up to 54.0 kWh in a single footprint", "High current delivery (150A max charging)"],
    overview: "The 360V Stackable UPS Series meets the intense power demands of enterprise-scale facilities and industrial plants. Delivering up to 54.0 kWh per stack, this series ensures critical operations never skip a beat during grid fluctuations."
  },
  {
    id: "ups-480v-series",
    categoryId: "ups-data-center",
    name: "480V Stackable UPS Series",
    slug: "480v-stackable-ups",
    modelNumber: "ESS480V50AH / 100AH / 105AH",
    shortDescription: "480V ultra-high-voltage UPS battery stacks delivering up to 72.0 kWh.",
    capacity: "24.0 kWh - 72.0 kWh",
    chemistry: "LiFePO4",
    cycleLife: "≥ 4000 Cycles",
    applications: ["ups", "industrial", "utility"],
    image: "/images/products/480V_UPS.png",
    features: ["480V Ultra-High-Voltage Architecture", "Stackable Cart System", "CAN / RS485 Diagnostics", "1C 10-Second Discharge"],
    advantages: ["Peak efficiency for megawatt-scale inverters", "Maximum 72.0 kWh storage per stack", "Deep 95% DoD reliability"],
    overview: "Our most powerful modular UPS line, the 480V Stackable UPS Series, is engineered for ultra-high-voltage utility and heavy industrial integration. Providing up to 72.0 kWh per stack, it delivers the massive, rapid discharge capability required to stabilize large-scale power grids."
  },

  // --- OEMS CUSTOMISED ---
  {
    id: "ess-12-8v-100ah",
    categoryId: "oems-customised",
    name: "12.8V 100AH LiFePO4 Module",
    slug: "ess-12-8v-100ah",
    modelNumber: "ESS12.8V100AH",
    shortDescription: "1.28 kWh parallel expandable battery module featuring a smart BMS and eco-friendly design.",
    capacity: "1.28 kWh",
    chemistry: "LiFePO4",
    cycleLife: "≥ 4000 Cycles @ 80% DoD",
    applications: ["residential", "solar"],
    image: "/images/products/ESS12.8V100AH.png",
    features: ["Parallel Expandable", "Smart BMS (Smart JBD)", "Eco Friendly", "RS485 Communication"],
    advantages: ["10+ Years Design Life", "Deep Discharge capability (95% DoD)", "Modular expansion for homes"],
    overview: "The ESS12.8V100AH is a reliable, high-performance Lithium Iron Phosphate (LiFePO4) battery module offering 1.28 kWh capacity. Featuring parallel expandability and a smart BMS, it is engineered for long-lasting performance in residential and small-scale renewable applications."
  },
  {
    id: "ess-25-6v-105ah",
    categoryId: "oems-customised",
    name: "25.6V 105AH LiFePO4 Module",
    slug: "ess-25-6v-105ah",
    modelNumber: "ESS25.6V105AH",
    shortDescription: "2.69 kWh modular battery designed for wall mount or floor standing installation.",
    capacity: "2.69 kWh",
    chemistry: "LiFePO4",
    cycleLife: "≥ 4000 Cycles @ 80% DoD",
    applications: ["residential", "commercial"],
    image: "/images/products/ESS25.6V105AH.png",
    features: ["Parallel Expandable", "Modular Design", "Smart BMS", "Bluetooth Communication"],
    advantages: ["Intelligent Built-in BMS", "10+ Years Design Life", "Flexible Wall Mount/Floor Standing installation"],
    overview: "The ESS25.6V105AH provides 2.69 kWh of energy storage using premium LiFePO4 chemistry. With its modular design, parallel expandability, and Bluetooth communication, it offers seamless integration for both wall-mounted and floor-standing setups."
  },
  {
    id: "oem-48v-314ah-stackable",
    categoryId: "oems-customised",
    name: "48V 314AH Stackable Solution",
    slug: "oem-48v-314ah-stackable",
    modelNumber: "OEM48V314AH-4",
    shortDescription: "60.3 kWh massive capacity stackable solution composed of 4x 48V 314AH modules.",
    capacity: "60.3 kWh",
    chemistry: "LiFePO4",
    cycleLife: "≥ 4000 Cycles",
    applications: ["industrial", "commercial"],
    image: "/images/products/ESS48V314AH_OEMS.png",
    features: ["Stackable Configuration", "4x 48V 314AH Modules", "Smart BMS", "OEM Customization"],
    advantages: ["Massive 60.3 kWh total capacity", "Highly scalable", "Robust design for custom applications"],
    overview: "This custom stackable solution combines four 48V 314AH modules to deliver an impressive 60.3 kWh of energy storage. Designed for extensive OEM customization, it meets the highest industrial demands with reliability and intelligent BMS monitoring."
  },
  {
    id: "oem-51-2v-105ah-stackable",
    categoryId: "oems-customised",
    name: "51.2V 105AH Stackable Solution",
    slug: "oem-51-2v-105ah-stackable",
    modelNumber: "OEM51.2V105AH-4",
    shortDescription: "21.5 kWh stackable power system combining 4x 51.2V 105AH modules.",
    capacity: "21.5 kWh",
    chemistry: "LiFePO4",
    cycleLife: "≥ 4000 Cycles",
    applications: ["industrial", "commercial"],
    image: "/images/products/ESS51.2V105AH.png",
    features: ["Stackable Configuration", "4x 51.2V 105AH Modules", "Smart BMS", "Flexible Scaling"],
    advantages: ["21.5 kWh total capacity", "Modular energy storage", "Adaptable to specialized setups"],
    overview: "A highly adaptable stackable power system that aggregates four 51.2V 105AH modules into a 21.5 kWh energy reservoir. It provides flexible and modular energy storage perfectly suited for tailored commercial setups."
  },
  {
    id: "oem-51-2v-150ah-stackable",
    categoryId: "oems-customised",
    name: "51.2V 150AH Stackable Solution",
    slug: "oem-51-2v-150ah-stackable",
    modelNumber: "OEM51.2V150AH-4",
    shortDescription: "30.72 kWh scalable storage solution using 4x 51.2V 150AH modules.",
    capacity: "30.72 kWh",
    chemistry: "LiFePO4",
    cycleLife: "≥ 4000 Cycles",
    applications: ["industrial", "commercial"],
    image: "/images/products/ESS51.2V150AH.png",
    features: ["Stackable Configuration", "4x 51.2V 150AH Modules", "Robust Integration", "Smart BMS"],
    advantages: ["30.72 kWh total capacity", "High continuous discharge", "Designed for robust OEM integration"],
    overview: "Designed for robust OEM integration, this 30.72 kWh solution scales high-demand commercial applications by linking four 51.2V 150AH modules. It offers superior longevity, safety, and customizable integration parameters."
  },

  // --- EV / TRACTION BATTERY SOLUTION ---
  {
    id: "ev-60-8v-200ah",
    categoryId: "ev-traction",
    name: "60.8V 200AH 3-Wheeler Battery",
    slug: "ev-60-8v-200ah",
    modelNumber: "EV60.8V200AH",
    shortDescription: "12.16 kWh high-capacity lithium battery pack engineered specifically for 3-wheeler passenger vehicles.",
    capacity: "12.16 kWh",
    chemistry: "LFP",
    cycleLife: "≥ 2500 Cycles",
    applications: ["electric-mobility", "commercial"],
    image: "/images/products/12.16KWh_3W-Passenger.png",
    features: ["Advanced BMS Safety", "High Energy Density", "Maintenance Free", "Lightweight & Compact"],
    advantages: ["12.16 kWh nominal energy", "High max discharge current (200A)", "Ideal for E-Rickshaws"],
    overview: "The EV60.8V200AH is a 12.16 kWh high-capacity lithium battery pack engineered specifically for 3-wheeler passenger vehicles. Featuring advanced BMS safety, environmental friendliness, and a robust 110Kg form factor, it guarantees a longer range and reliable performance."
  },
  {
    id: "traction-25-6v-230ah",
    categoryId: "ev-traction",
    name: "25.6V 230AH Traction Battery",
    slug: "traction-25-6v-230ah",
    modelNumber: "PMEV256230",
    shortDescription: "5.88 kWh high-performance traction battery designed for BOPT applications.",
    capacity: "5.88 kWh",
    chemistry: "LFP",
    cycleLife: "4000 Cycles",
    applications: ["industrial", "electric-mobility"],
    image: "/images/products/5.88KWh_Traction-Battery.png",
    features: ["Fast Charging", "Safe & Reliable", "High Energy Density", "IP20 Rating"],
    advantages: ["5.88 kWh total capacity", "Designed for Forklifts / Material Handling", "5 Years Warranty"],
    overview: "The PMEV256230 is a 5.88 kWh high-performance traction battery engineered for BOPT applications and material handling. Delivering fast charging, maintenance-free operation, and a rugged Mild Steel (MS) case, it is built to keep industrial vehicles moving sustainably."
  }
]
