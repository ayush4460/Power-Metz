import React from "react"
import { Container, Grid } from "./index"
import { ShieldCheck, MapPin, Clock, Cpu } from "lucide-react"

export const TrustStrip = () => {
  const items = [
    {
      icon: <ShieldCheck className="h-6 w-6 text-white" />,
      label: "ISO Certified"
    },
    {
      icon: <MapPin className="h-6 w-6 text-white" />,
      label: "Made in India"
    },
    {
      icon: <Clock className="h-6 w-6 text-white" />,
      label: "10+ Years Design Life"
    },
    {
      icon: <Cpu className="h-6 w-6 text-white" />,
      label: "Advanced BMS Tech"
    }
  ]

  return (
    <div className="bg-primary py-8">
      <Container>
        <Grid cols={4} className="gap-4 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-white/20">
          {items.map((item, i) => (
            <div key={i} className="flex flex-col md:flex-row items-center justify-center gap-3 text-center md:text-left py-4 md:py-0">
              <div className="bg-white/20 p-3 rounded-full">
                {item.icon}
              </div>
              <span className="font-semibold text-sm md:text-base text-white tracking-tight">{item.label}</span>
            </div>
          ))}
        </Grid>
      </Container>
    </div>
  )
}
