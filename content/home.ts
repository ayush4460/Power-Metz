import { ShieldCheck, MapPin, Award, Users } from "lucide-react"

export const homeContent = {
  hero: {
    headline: "Powering Progress.",
    headlineHighlight: "Sustaining Tomorrow.",
    subheadline: "Advanced battery energy storage systems engineered for reliability, performance, and a cleaner future.",
    primaryCta: "Talk to Our Engineering Team",
    secondaryCta: "Explore Our Technology",
    image: {
      src: "/hero-bess-landscape.png",
      alt: "PowerMetz Industrial Battery System"
    },
    trustStrip: [
      { label: "ISO 9001 Certified", icon: ShieldCheck },
      { label: "25+ Years Excellence", icon: Award },
      { label: "Global Manufacturing", icon: MapPin },
      { label: "500+ Enterprise Clients", icon: Users }
    ]
  },
  intro: {
    label: "ABOUT POWERMETZ",
    headline: "Building the Next Generation of Battery Energy Solutions.",
    paragraph1: "PowerMetz Energy Private Limited is a next-generation Lithium-Ion battery manufacturing and Battery Energy Storage Systems (BESS) company. Backed by Mercury EV-Tech Limited, we combine advanced engineering, intelligent Battery Management Systems (BMS), and large-scale manufacturing to deliver reliable energy solutions for electric mobility, residential, commercial, industrial, and utility-scale applications.",
    paragraph2: "Operating from our state-of-the-art 3.2 GWh manufacturing facility in Vadodara, Gujarat, we engineer high-performance battery systems using premium LFP and NMC technologies. Every solution is designed for maximum safety, efficiency, and long-term reliability while supporting India's clean energy transition.",
    image: {
      src: "/images/Engineering_Flow.JPG",
      alt: "PowerMetz Engineering Facility"
    },
    cta: "Discover Our Story",
    card: {
      title: "Manufacturing Excellence",
      items: [
        "3.2 GWh Annual Capacity",
        "Premium LFP & NMC Cells",
        "Advanced Smart BMS",
        "AIS 156 Phase 2 Compliance"
      ]
    },
    metrics: [
      { value: "3.2 GWh", label: "Manufacturing Capacity" },
      { value: "2022", label: "Established" },
      { value: "LFP & NMC", label: "Battery Technologies" },
      { value: "Made in India", label: "Global Vision" }
    ]
  },
  technology: {
    headline: "Inside PowerMetz Technology.",
    subheadline: "Engineered from the cell level up for unyielding reliability and maximum energy density.",
    image: {
      src: "/images/placeholders/technology.webp",
      alt: "PowerMetz Battery Internal Architecture"
    },
    hotspots: [
      {
        id: 1,
        title: "High-Density Cells",
        description: "Advanced lithium-ion chemistry delivering 30% more energy in the same footprint.",
        position: { top: "35%", left: "45%" }
      },
      {
        id: 2,
        title: "Active Thermal Management",
        description: "Liquid cooling architecture ensuring optimal temperature across all operating states.",
        position: { top: "60%", left: "65%" }
      },
      {
        id: 3,
        title: "Intelligent BMS",
        description: "Proprietary Battery Management System with microsecond fault-detection.",
        position: { top: "25%", left: "20%" }
      },
      {
        id: 4,
        title: "Reinforced Casing",
        description: "IP67-rated aerospace-grade aluminum enclosure protecting against extreme environments.",
        position: { top: "75%", left: "30%" }
      },
      {
        id: 5,
        title: "Scalable Interconnects",
        description: "Low-resistance busbars designed for seamless megawatt-scale expansion.",
        position: { top: "50%", left: "80%" }
      }
    ]
  },
  products: {
    products: [
      {
        id: "pmx-500",
        category: "Industrial Energy Storage System",
        name: "PowerMetz PMX-500",
        description: "500kWh | High Density | Long Life",
        image: {
          src: "/images/placeholders/products.webp",
          alt: "PowerMetz PMX-500"
        },
        link: "/solutions/grid"
      },
      {
        id: "pmx-215",
        category: "Commercial Energy Storage System",
        name: "PowerMetz PMX-215",
        description: "215kWh | Scalable | Reliable",
        image: {
          src: "/images/placeholders/products.webp",
          alt: "PowerMetz PMX-215"
        },
        link: "/solutions/commercial"
      },
      {
        id: "pmx-rack",
        category: "Telecom Power Rack",
        name: "PowerMetz Telecom Rack",
        description: "Backup Power | Compact | Efficient",
        image: {
          src: "/images/placeholders/products.webp",
          alt: "PowerMetz Telecom Rack"
        },
        link: "/solutions/telecom"
      }
    ]
  },
  engineeringProcess: {
    headline: "The PowerMetz Engineering Process",
    subheadline: "Every PowerMetz battery energy storage solution follows a structured engineering and quality process, from application analysis and system design to manufacturing, testing, commissioning and long-term support.",
    steps: [
      {
        id: "01",
        title: "Requirement Analysis",
        description: "We evaluate customer applications across industrial, commercial, solar, and grid scale storage to determine optimal capacity and performance needs for each Industrial Battery Storage project.",
        highlights: [
          "Application Study",
          "Capacity Planning",
          "Industrial Battery Storage"
        ],
        image: {
          src: "/requirement%20analysis.JPG",
          alt: "Requirement Analysis for Industrial Energy Storage"
        }
      },
      {
        id: "02",
        title: "System Engineering & Design",
        description: "Our engineering team customizes system sizing, voltage configuration, capacity selection, thermal design, and cabinet architecture to ensure every Battery Energy Storage System is perfectly tailored.",
        highlights: [
          "System Sizing",
          "Voltage Configuration",
          "Thermal Design"
        ],
        image: {
          src: "/system%20engineering.JPG",
          alt: "System Engineering and Design"
        }
      },
      {
        id: "03",
        title: "Manufacturing & Assembly",
        description: "Operating from our Vadodara facility, we manage precision Lithium Battery Assembly, battery module integration, and electrical wiring using high-quality components for maximum reliability.",
        highlights: [
          "Module Assembly",
          "Cabinet Integration",
          "Precision Manufacturing"
        ],
        image: {
          src: "/manufacturing%20assembly.JPG",
          alt: "Lithium Battery Manufacturing"
        }
      },
      {
        id: "04",
        title: "Battery Management & Safety",
        description: "Each system includes an Intelligent Built-in Battery Management System providing cell balancing, temperature monitoring, system diagnostics, and seamless CAN/RS485 communication protocols.",
        highlights: [
          "Intelligent Smart BMS",
          "Temperature Monitoring",
          "CAN/RS485 Communication"
        ],
        image: {
          src: "/battery%20management.JPG",
          alt: "Intelligent Battery Management System"
        }
      },
      {
        id: "05",
        title: "Testing & Quality Validation",
        description: "We subject every unit to rigorous Battery Testing, including performance testing, load testing, electrical verification, and comprehensive safety inspections before factory acceptance.",
        highlights: [
          "Performance Testing",
          "Electrical Verification",
          "Safety Inspection"
        ],
        image: {
          src: "/testing.JPG",
          alt: "Quality Validation and Testing"
        }
      },
      {
        id: "06",
        title: "Installation & Support",
        description: "Our dedicated support team provides seamless ground or rack-mounted installation, full system commissioning, and ongoing maintenance to guarantee the reliability of your Energy Storage Solutions.",
        highlights: [
          "System Commissioning",
          "Technical Assistance",
          "Long-Term Maintenance"
        ],
        image: {
          src: "/installation.JPG",
          alt: "Installation and Long-Term Support"
        }
      }
    ]
  },
  reliability: {
    headline: "Engineered for Absolute Reliability",
    subheadline: "In critical infrastructure, failure is not an option. We engineer every PowerMetz battery system with premium LFP/NMC cells, intelligent management, and industrial-grade architecture to guarantee long-term performance.",
    badges: [
      "✓ Intelligent Battery Management",
      "✓ Engineered for Critical Infrastructure"
    ],
    pillars: [
      {
        title: "Intelligent Battery Management",
        description: "Our Smart BMS provides microsecond fault-detection and seamless integration for maximum safety.",
        highlights: [
          "Active cell balancing",
          "Real-time thermal monitoring",
          "CAN / RS485 communication"
        ]
      },
      {
        title: "Industrial Grade Architecture",
        description: "Built for extreme environments with rigorous thermal design and heavy-duty enclosures.",
        highlights: [
          "Premium LFP & NMC cell chemistry",
          "Optimized thermal management",
          "High-quality electrical integration"
        ]
      },
      {
        title: "Quality Assurance & Safety",
        description: "Every unit undergoes comprehensive electrical verification and performance testing at our 3.2 GWh facility.",
        highlights: [
          "ISO & AIS 156 Phase 2 compliance",
          "Rigorous performance testing",
          "Comprehensive safety inspections"
        ]
      },
      {
        title: "Application-Specific Design",
        description: "From telecom racks to utility-scale storage, we customize voltage, sizing, and capacity for your exact needs.",
        highlights: [
          "Custom voltage configuration",
          "Scalable energy capacity",
          "Seamless grid integration"
        ]
      }
    ]
  },
  industries: {
    headline: "Powering Every Sector",
    subheadline: "From residential backup to utility-scale stabilization, our systems are versatile enough to power the modern world.",
    items: [
      {
        id: "solar",
        title: "Solar & Renewable",
        description: "Capturing peak generation for round-the-clock clean energy dispatch.",
        image: {
          src: "/images/placeholders/industry-solar.webp",
          alt: "Solar integration"
        },
        isFeatured: true
      },
      {
        id: "telecom",
        title: "Telecommunications",
        description: "Uninterruptible power for mission-critical networks.",
        image: {
          src: "/images/placeholders/industry-telecom.webp",
          alt: "Telecom towers"
        },
        isFeatured: false
      },
      {
        id: "industrial",
        title: "Heavy Industrial",
        description: "Peak shaving and demand-charge management for large facilities.",
        image: {
          src: "/images/placeholders/industry-industrial.webp",
          alt: "Industrial facility"
        },
        isFeatured: false
      },
      {
        id: "ups",
        title: "Data Centers & UPS",
        description: "Zero-latency backup power for enterprise data infrastructure.",
        image: {
          src: "/images/placeholders/industry-ups.webp",
          alt: "Data center"
        },
        isFeatured: false
      },
      {
        id: "marine",
        title: "Marine & EV",
        description: "High-density propulsion and auxiliary power for modern transport.",
        image: {
          src: "/images/placeholders/battery-hero.webp",
          alt: "Marine and transport"
        },
        isFeatured: false
      }
    ]
  },
  projects: {
    headline: "Engineered for Scale",
    subheadline: "Explore how PowerMetz battery systems are transforming energy infrastructure across the globe.",
    items: [
      {
        id: "proj-1",
        name: "Neon City Grid Storage",
        industry: "Utility",
        location: "Nevada, USA",
        description: "A 50MWh grid stabilization project ensuring uninterrupted power for a major metropolitan network.",
        image: {
          src: "/images/placeholders/project-1.webp",
          alt: "Grid storage facility"
        },
        link: "/projects/neon-city"
      },
      {
        id: "proj-2",
        name: "Apex Data Center Backup",
        industry: "Enterprise Tech",
        location: "Frankfurt, DE",
        description: "Zero-latency UPS battery array supporting critical server infrastructure with 99.999% uptime.",
        image: {
          src: "/images/placeholders/project-2.webp",
          alt: "Data center racks"
        },
        link: "/projects/apex-data"
      },
      {
        id: "proj-3",
        name: "SunValley Solar Integration",
        industry: "Renewable Energy",
        location: "Queensland, AU",
        description: "Seamless integration of 20MWh storage to capture peak solar generation for nighttime dispatch.",
        image: {
          src: "/images/placeholders/project-3.webp",
          alt: "Solar farm"
        },
        link: "/projects/sunvalley-solar"
      }
    ]
  },
  statistics: {
    headline: "The Scale of Our Impact",
    items: [
      { label: "Years Experience", value: 25, suffix: "+" },
      { label: "MWh Deployed", value: 500, suffix: "+" },
      { label: "Global Partners", value: 120, suffix: "" },
      { label: "Uptime Reliability", value: 99, suffix: ".9%" }
    ]
  },
  testimonials: {
    headline: "Trusted by Industry Leaders",
    items: [
      {
        id: 1,
        quote: "PowerMetz didn't just sell us batteries; they re-engineered our entire power architecture. The performance and thermal stability are unmatched in the industry.",
        author: "Sarah Jenkins",
        role: "Chief Engineer, Apex Tech",
        company: "Apex Tech"
      },
      {
        id: 2,
        quote: "When dealing with grid-scale storage, reliability is the only metric that matters. PowerMetz systems have exceeded our stress tests by every measure.",
        author: "David Chen",
        role: "Director of Infrastructure, SunValley",
        company: "SunValley Grid"
      }
    ]
  },
  insights: {
    headline: "Engineering Insights",
    items: [
      {
        id: "ins-1",
        category: "Technology",
        date: "Oct 12, 2026",
        title: "The Future of Solid-State Batteries in Grid Storage",
        excerpt: "Exploring how solid-state chemistry will redefine energy density and safety in utility-scale applications.",
        link: "/blog/solid-state-grid"
      },
      {
        id: "ins-2",
        category: "Manufacturing",
        date: "Sep 28, 2026",
        title: "Precision at Scale: Inside Our Automated Assembly",
        excerpt: "A deep dive into the robotic systems that guarantee sub-millimeter tolerances in our PMX series.",
        link: "/blog/precision-assembly"
      },
      {
        id: "ins-3",
        category: "Case Study",
        date: "Sep 15, 2026",
        title: "Solving the 50MWh Dispatch Challenge",
        excerpt: "How we engineered a custom thermal management system to handle rapid dispatch in extreme heat.",
        link: "/blog/50mwh-dispatch"
      }
    ]
  },
  certifications: {
    items: [
      { name: "ISO 9001:2015" },
      { name: "ISO 14001:2015" },
      { name: "UL 1973 Certified" },
      { name: "IEC 62619 Compliant" },
      { name: "CE Marked" }
    ]
  },
  cta: {
    headline: "Ready to Power Your Next Project?",
    subheadline: "Partner with PowerMetz to engineer reliable, high-performance energy solutions tailored to your exact specifications.",
    primaryBtn: "Talk to Our Engineering Team",
    secondaryBtn: "Download Product Catalogue"
  }
}
