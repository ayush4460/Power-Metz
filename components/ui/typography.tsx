import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const headingVariants = cva("font-headings tracking-tight text-foreground", {
  variants: {
    size: {
      h1: "text-4xl sm:text-5xl md:text-6xl lg:text-[var(--text-h1)] font-bold",
      h2: "text-3xl sm:text-4xl md:text-[var(--text-h2)] font-bold",
      h3: "text-2xl sm:text-3xl md:text-[var(--text-h3)] font-semibold",
      h4: "text-xl sm:text-2xl md:text-[var(--text-h4)] font-semibold",
    },
  },
  defaultVariants: {
    size: "h1",
  },
});

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4";
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, size, as, ...props }, ref) => {
    const Comp = as ?? (size as React.ElementType) ?? "h1";
    return (
      <Comp
        ref={ref}
        className={cn(headingVariants({ size, className }))}
        {...props}
      />
    );
  }
);
Heading.displayName = "Heading";

// Exporting individual components for ease of use
export const H1 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <Heading ref={ref} size="h1" as="h1" className={className} {...props} />
));
H1.displayName = "H1";

export const H2 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <Heading ref={ref} size="h2" as="h2" className={className} {...props} />
));
H2.displayName = "H2";

export const H3 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <Heading ref={ref} size="h3" as="h3" className={className} {...props} />
));
H3.displayName = "H3";

export const H4 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <Heading ref={ref} size="h4" as="h4" className={className} {...props} />
));
H4.displayName = "H4";

export const Lead = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-xl text-muted-foreground", className)} {...props} />
));
Lead.displayName = "Lead";

export const Paragraph = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("leading-7 not-first:mt-6", className)} {...props} />
));
Paragraph.displayName = "Paragraph";

export const Caption = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(({ className, ...props }, ref) => (
  <span ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
Caption.displayName = "Caption";

export const GradientText = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(({ className, ...props }, ref) => (
  <span ref={ref} className={cn("bg-clip-text text-transparent bg-linear-to-r from-primary to-primary-hover", className)} {...props} />
));
GradientText.displayName = "GradientText";

export const SectionTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <H2 ref={ref} className={cn("mb-4", className)} {...props} />
));
SectionTitle.displayName = "SectionTitle";

export const SectionSubtitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
  <Lead ref={ref} className={cn("max-w-200", className)} {...props} />
));
SectionSubtitle.displayName = "SectionSubtitle";
