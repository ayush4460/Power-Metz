import { H2, Paragraph } from "@/components/ui/typography"
import { PageHeader } from "@/components/ui/page-header"

export default function VendorDashboardPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <PageHeader title="Vendor Portal" />

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
