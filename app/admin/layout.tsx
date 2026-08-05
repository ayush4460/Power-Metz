import { AdminSidebar } from "@/components/admin/sidebar"
import prisma from "@/lib/prisma"

import { AdminLayoutClient } from "./layout-client"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Fetch unread counts
  const [vendorsCount, customersCount, careersCount, reachUsCount] = await Promise.all([
    prisma.vendorSubmission.count({ where: { isRead: false } }),
    prisma.customerSubmission.count({ where: { isRead: false } }),
    prisma.jobApplication.count({ where: { isRead: false } }),
    prisma.reachUsSubmission.count({ where: { isRead: false } }),
  ])

  const sidebar = (
    <AdminSidebar 
      vendorsCount={vendorsCount} 
      customersCount={customersCount} 
      careersCount={careersCount}
      reachUsCount={reachUsCount}
    />
  )

  return <AdminLayoutClient sidebar={sidebar}>{children}</AdminLayoutClient>
}
