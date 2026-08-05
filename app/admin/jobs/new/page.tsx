import { JobForm } from "../job-form"
import { getDepartments } from "@/app/admin/departments/actions"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin - New Job Opening",
}

export const dynamic = "force-dynamic"

export default async function NewJobPage() {
  const departments = await getDepartments()
  
  return (
    <div className="flex-1 w-full">
      <JobForm departments={departments} />
    </div>
  )
}
