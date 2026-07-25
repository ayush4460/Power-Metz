import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export function generateMetadata(override: Partial<Metadata>): Metadata {
  return {
    ...override,
    openGraph: {
      title: override.title ?? siteConfig.name,
      description: override.description ?? siteConfig.description,
      url: siteConfig.url,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
        },
      ],
      type: "website",
      ...override.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title: override.title ?? siteConfig.name,
      description: override.description ?? siteConfig.description,
      images: [siteConfig.ogImage],
      ...override.twitter,
    },
  };
}
