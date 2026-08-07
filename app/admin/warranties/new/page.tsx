import { PageHeader } from '@/components/ui/page-header'
import { WarrantyForm } from '@/components/warranties/WarrantyForm'

export default function NewAdminWarrantyPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title={
          <div className="flex flex-col">
            <span>Create Warranty</span>
            <span className="text-sm font-normal text-gray-500 mt-1 hidden sm:block">Add a new customer warranty record</span>
          </div>
        }
      />
      <div className="pt-4">
        <WarrantyForm returnUrl="/admin/warranties" />
      </div>
    </div>
  )
}
