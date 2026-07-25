import React from "react";
import { cn } from "@/lib/cn";
import { SectionTitle, SectionSubtitle, H1, Lead } from "@/components/ui/typography";

export const Container = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("mx-auto w-full max-w-[1700px] px-6 md:px-12 lg:px-16", className)}
      {...props}
    />
  )
);
Container.displayName = "Container";

export const Section = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <section
      ref={ref}
      className={cn("py-16 md:py-24 lg:py-32", className)}
      {...props}
    />
  )
);
Section.displayName = "Section";

export interface SectionHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center" | "right";
}

export const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ className, title, subtitle, align = "left", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mb-12 md:mb-16",
          align === "center" && "text-center flex flex-col items-center",
          align === "right" && "text-right flex flex-col items-end",
          className
        )}
        {...props}
      >
        <SectionTitle>{title}</SectionTitle>
        {subtitle && <SectionSubtitle>{subtitle}</SectionSubtitle>}
      </div>
    );
  }
);
SectionHeader.displayName = "SectionHeader";

export const Grid = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12 }>(
  ({ className, cols = 1, ...props }, ref) => {
    const gridCols = {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
      5: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
      6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
      12: "grid-cols-12",
    }[cols];

    return (
      <div
        ref={ref}
        className={cn("grid gap-6 md:gap-8", gridCols, className)}
        {...props}
      />
    );
  }
);
Grid.displayName = "Grid";

export const Stack = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { direction?: "row" | "col", spacing?: string }>(
  ({ className, direction = "col", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex",
        direction === "col" ? "flex-col" : "flex-row",
        className
      )}
      {...props}
    />
  )
);
Stack.displayName = "Stack";

export const Divider = React.forwardRef<HTMLHRElement, React.HTMLAttributes<HTMLHRElement>>(
  ({ className, ...props }, ref) => (
    <hr
      ref={ref}
      className={cn("w-full border-t border-border", className)}
      {...props}
    />
  )
);
Divider.displayName = "Divider";

export const Spacer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { size?: "sm" | "md" | "lg" | "xl" }>(
  ({ className, size = "md", ...props }, ref) => {
    const sizes = {
      sm: "h-8",
      md: "h-16",
      lg: "h-24",
      xl: "h-32",
    };
    return <div ref={ref} className={cn(sizes[size], className)} aria-hidden="true" {...props} />;
  }
);
Spacer.displayName = "Spacer";

export interface PageHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
}

export const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ className, title, subtitle, ...props }, ref) => (
    <header
      ref={ref}
      className={cn("bg-muted py-24 lg:py-32 border-b border-border", className)}
      {...props}
    >
      <Container>
        <H1 className="mb-4">{title}</H1>
        {subtitle && <Lead className="max-w-200">{subtitle}</Lead>}
      </Container>
    </header>
  )
);
PageHeader.displayName = "PageHeader";
