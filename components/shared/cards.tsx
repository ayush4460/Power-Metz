import React from "react";
import { cn } from "@/lib/cn";
import { H3, H4, Paragraph, Caption } from "@/components/ui/typography";

export const GenericCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all hover:shadow-md",
        className
      )}
      {...props}
    />
  )
);
GenericCard.displayName = "GenericCard";

export const GlassCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-white/20 bg-white/10 backdrop-blur-lg p-6 shadow-lg",
        className
      )}
      {...props}
    />
  )
);
GlassCard.displayName = "GlassCard";

export const FeatureCard = ({ icon, title, description, className }: { icon: React.ReactNode, title: string, description: string, className?: string }) => (
  <GenericCard className={cn("flex flex-col gap-4 hover:-translate-y-1 hover:border-primary/50", className)}>
    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
      {icon}
    </div>
    <H4>{title}</H4>
    <Paragraph className="text-muted-foreground mt-0">{description}</Paragraph>
  </GenericCard>
);

export const ProjectCard = ({ imageSrc, title, category, className }: { imageSrc?: string, title: string, category: string, className?: string }) => (
  <GenericCard className={cn("overflow-hidden p-0 group cursor-pointer hover:border-primary/50", className)}>
    <div className="aspect-video w-full bg-muted relative overflow-hidden">
      {/* Placeholder for Image */}
      {imageSrc && <img src={imageSrc} alt={title} className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />}
    </div>
    <div className="p-6">
      <Caption className="text-primary font-semibold uppercase tracking-wider mb-2 block">{category}</Caption>
      <H3 className="group-hover:text-primary transition-colors">{title}</H3>
    </div>
  </GenericCard>
);

export const SolutionCard = ({ title, description, className }: { title: string, description: string, className?: string }) => (
  <GenericCard className={cn("border-l-4 border-l-primary hover:bg-muted/50 transition-colors", className)}>
    <H4>{title}</H4>
    <Paragraph className="text-muted-foreground">{description}</Paragraph>
  </GenericCard>
);

export const StatCard = ({ value, label, className }: { value: string | React.ReactNode, label: string, className?: string }) => (
  <GenericCard className={cn("text-center flex flex-col justify-center items-center py-8", className)}>
    <div className="font-stats text-5xl font-bold text-foreground mb-2">{value}</div>
    <Caption className="uppercase tracking-wider text-muted-foreground">{label}</Caption>
  </GenericCard>
);

export const BlogCard = ({ date, title, excerpt, className }: { date: string, title: string, excerpt: string, className?: string }) => (
  <GenericCard className={cn("flex flex-col gap-2 hover:-translate-y-1 hover:shadow-lg transition-all cursor-pointer", className)}>
    <Caption>{date}</Caption>
    <H4 className="line-clamp-2 hover:text-primary transition-colors">{title}</H4>
    <Paragraph className="text-muted-foreground line-clamp-3 mt-2">{excerpt}</Paragraph>
  </GenericCard>
);

export const TestimonialCard = ({ quote, author, role, className }: { quote: string, author: string, role: string, className?: string }) => (
  <GenericCard className={cn("bg-muted/30 border-transparent", className)}>
    <Paragraph className="italic text-foreground mb-6">"{quote}"</Paragraph>
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
        {author.charAt(0)}
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground">{author}</p>
        <Caption>{role}</Caption>
      </div>
    </div>
  </GenericCard>
);

export const CertificateCard = ({ title, organization, year, className }: { title: string, organization: string, year: string, className?: string }) => (
  <GenericCard className={cn("flex items-center justify-between p-4 hover:border-primary/50", className)}>
    <div>
      <p className="font-semibold text-foreground">{title}</p>
      <Caption>{organization}</Caption>
    </div>
    <div className="font-stats font-bold text-muted-foreground">{year}</div>
  </GenericCard>
);

export const GalleryCard = ({ imageSrc, alt, className }: { imageSrc: string, alt: string, className?: string }) => (
  <div className={cn("relative overflow-hidden rounded-xl group bg-muted cursor-pointer", className)}>
    <img src={imageSrc} alt={alt} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
      <p className="text-white font-medium">{alt}</p>
    </div>
  </div>
);
