import React from "react"
import { Container, Grid } from "./index"
import { ShieldCheck, MapPin, Clock, Cpu } from "lucide-react"

export const TrustStrip = () => {
  const items = [
    {
      icon: <ShieldCheck className="h-6 w-6 text-primary" />,
      label: "ISO Certified"
    },
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      label: "Made in India"
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      label: "10+ Years Design Life"
    },
    {
      icon: <Cpu className="h-6 w-6 text-primary" />,
      label: "Advanced BMS Tech"
    }
  ]

  return (
    <div className="bg-surface border-y border-border py-8">
      <Container>
        <Grid cols={4} className="gap-4 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-border">
          {items.map((item, i) => (
            <div key={i} className="flex flex-col md:flex-row items-center justify-center gap-3 text-center md:text-left py-4 md:py-0">
              <div className="bg-primary/10 p-3 rounded-full">
                {item.icon}
              </div>
              <span className="font-semibold text-sm md:text-base text-foreground tracking-tight">{item.label}</span>
            </div>
          ))}
        </Grid>
      </Container>
    </div>
  )
}
