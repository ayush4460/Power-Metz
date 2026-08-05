import { getJobs } from "./actions"
import { getDepartments } from "@/app/admin/departments/actions"
import { JobsClient } from "./jobs-client"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin - Career Jobs",
}

export const dynamic = "force-dynamic"

export default async function AdminJobsPage() {
  const jobs = await getJobs()
  const departments = await getDepartments()
  
  return <JobsClient initialJobs={jobs} departments={departments} />
}
