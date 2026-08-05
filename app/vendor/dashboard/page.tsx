import { H2, Paragraph } from "@/components/ui/typography"

export default function VendorDashboardPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <H2 className="text-3xl font-bold tracking-tight">Vendor Portal</H2>
        <Paragraph className="text-muted-foreground mt-2">
          Welcome to your secure Vendor Portal. This dashboard will be populated with your performance metrics, documents, and tools shortly.
        </Paragraph>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder cards for future content */}
        <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm flex items-center justify-center min-h-[200px] border-dashed">
          <p className="text-sm font-medium text-slate-400">Content coming soon...</p>
        </div>
        <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm flex items-center justify-center min-h-[200px] border-dashed">
          <p className="text-sm font-medium text-slate-400">Content coming soon...</p>
        </div>
        <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm flex items-center justify-center min-h-[200px] border-dashed">
          <p className="text-sm font-medium text-slate-400">Content coming soon...</p>
        </div>
      </div>
    </div>
  )
}
