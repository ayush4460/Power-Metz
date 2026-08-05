import { VendorSidebar } from "@/components/vendor/sidebar"

export default function VendorDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-muted/30 overflow-hidden relative">
      <VendorSidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 pt-16 lg:pt-0">
        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
