import { getVendorSubmissions, getCustomerSubmissions, getJobApplications } from "./actions"
import { SubmissionsClient } from "./submissions-client"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin - Submissions",
}

export const dynamic = "force-dynamic"

export default async function AdminSubmissionsPage() {
  const [vendors, customers, applications] = await Promise.all([
    getVendorSubmissions(),
    getCustomerSubmissions(),
    getJobApplications(),
  ])
  
  return <SubmissionsClient vendors={vendors} customers={customers} applications={applications} />
}
