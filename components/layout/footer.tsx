import React from "react"
import { Container, Stack } from "./index"
import { CompanyLogo, SocialIcons } from "@/components/shared/utilities"
import { companyConfig } from "@/config/company"
import { navigationConfig } from "@/config/navigation"
import { Button } from "@/components/ui/button"

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-border pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Company Info */}
          <div className="space-y-6">
            <CompanyLogo />
            <p className="text-sm text-muted-foreground leading-relaxed">
              PowerMetz Energy delivers premium engineering and sustainable energy solutions for a rapidly changing world.
            </p>
            <div className="space-y-2 text-sm text-foreground">
              <p>{companyConfig.address}</p>
              <p>{companyConfig.phone}</p>
              <p>{companyConfig.email}</p>
            </div>
          </div>

          {/* Solutions Column */}
          <div className="space-y-6">
            <h4 className="font-headings font-semibold text-lg text-foreground">Solutions</h4>
            <Stack spacing="sm">
              <a href="/solutions/solar" className="text-sm text-muted-foreground hover:text-primary transition-colors">Solar Integration</a>
              <a href="/solutions/storage" className="text-sm text-muted-foreground hover:text-primary transition-colors">Energy Storage</a>
              <a href="/solutions/grid" className="text-sm text-muted-foreground hover:text-primary transition-colors">Grid Modernization</a>
              <a href="/solutions/consulting" className="text-sm text-muted-foreground hover:text-primary transition-colors">Energy Consulting</a>
            </Stack>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-6">
            <h4 className="font-headings font-semibold text-lg text-foreground">Quick Links</h4>
            <Stack spacing="sm">
              {navigationConfig.mainNav.map(item => (
                <a key={item.title} href={item.href || "#"} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {item.title}
                </a>
              ))}
            </Stack>
          </div>

          {/* CTA Column */}
          <div className="space-y-6">
            <h4 className="font-headings font-semibold text-lg text-foreground">Stay Updated</h4>
            <p className="text-sm text-muted-foreground">Subscribe to our newsletter for the latest engineering insights.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label="Email address"
              />
              <Button size="sm" className="h-10 px-4">Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border/50 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} PowerMetz Energy. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-primary transition-colors">Terms of Service</a>
            {/* Empty array placeholder for social links, to be configured later */}
            <SocialIcons links={[]} />
          </div>
        </div>
      </Container>
    </footer>
  )
}
