import { PageTransition } from "@/components/shared/global/page-transition";
import { ScrollProgress } from "@/components/shared/global/scroll-progress";
import { BackToTop } from "@/components/shared/global/back-to-top";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { TrustStrip } from "@/components/layout/trust-strip";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
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
    </>
  );
}
