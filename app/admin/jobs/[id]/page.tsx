import { JobForm } from "../job-form"
import { getDepartments } from "@/app/admin/departments/actions"
import { getJobById } from "../actions"
import { notFound } from "next/navigation"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin - Edit Job Opening",
}

export const dynamic = "force-dynamic"

export default async function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  const [job, departments] = await Promise.all([
    getJobById(id),
    getDepartments()
  ])
  
  if (!job) {
    notFound()
  }
  
  return (
    <div className="flex-1 w-full">
      <JobForm job={job} departments={departments} />
    </div>
  )
}
