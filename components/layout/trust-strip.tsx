import React from "react"
import { Container, Grid } from "./index"
import { ShieldCheck, MapPin, Award, Factory } from "lucide-react"

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
      icon: <Award className="h-6 w-6 text-primary" />,
      label: "25+ Years Experience"
    },
    {
      icon: <Factory className="h-6 w-6 text-primary" />,
      label: "500+ Projects"
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
