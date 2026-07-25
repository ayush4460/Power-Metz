import type { Metadata } from "next";
import { Inter, Space_Grotesk, Manrope } from "next/font/google";
import "@/styles/globals.css";
import { siteConfig } from "@/config/site";
import { Providers } from "@/components/providers";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

import { PageTransition } from "@/components/shared/global/page-transition";
import { ScrollProgress } from "@/components/shared/global/scroll-progress";
import { BackToTop } from "@/components/shared/global/back-to-top";
import { Background } from "@/components/shared/global/background";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { TrustStrip } from "@/components/layout/trust-strip";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth overflow-x-hidden">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${manrope.variable} font-sans antialiased bg-background text-foreground overflow-x-hidden`}>
        <Providers>
          <Background noise />
          <ScrollProgress />
          <Header />
          <main id="main-content" className="flex-1 flex flex-col">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
          <TrustStrip />
          <Footer />
          <BackToTop />
        </Providers>
      </body>
    </html>
  );
}
