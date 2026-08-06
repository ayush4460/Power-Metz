import { getDepartments } from "./actions"
import { H2 } from "@/components/ui/typography"
import { DepartmentDialog } from "@/components/admin/department-dialog"
import { DeleteDepartmentButton } from "@/components/admin/delete-department-button"
import { Building2 } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"

export const dynamic = 'force-dynamic'

export default async function DepartmentsPage() {
  const departments = await getDepartments()

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Job Departments"
        actionButton={<DepartmentDialog />}
      />

      {departments.length === 0 ? (
        <div className="bg-surface border border-dashed border-border rounded-xl p-12 flex flex-col items-center justify-center space-y-3 text-muted-foreground">
          <Building2 className="w-10 h-10 opacity-20" />
          <p>No departments found. Add one to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-6">
          {departments.map((dept) => (
            <div key={dept.id} className="bg-surface border border-border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group">
              <div className="flex flex-col items-start gap-1.5 overflow-hidden pr-2 flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate w-full" title={dept.name}>
                  {dept.name}
                </h3>
                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium ${
                  dept.isActive ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-slate-50 text-slate-600 border border-slate-200'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${dept.isActive ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                  {dept.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              
              <div className="flex items-center gap-1 shrink-0">
                <DepartmentDialog department={dept} />
                <DeleteDepartmentButton id={dept.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
