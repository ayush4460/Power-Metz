import prisma from "@/lib/prisma"
import { H3, Paragraph } from "@/components/ui/typography"
import { PageHeader } from "@/components/ui/page-header"
import { VendorsClient } from "./vendors-client"

export const metadata = {
  title: "Admin - Vendor Submissions",
}

export default async function VendorSubmissionsPage() {
  // Mark all unread vendor submissions as read when this page is visited
  await prisma.vendorSubmission.updateMany({
    where: { isRead: false },
    data: { isRead: true }
  })

  const vendors = await prisma.vendorSubmission.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="space-y-6">
      <PageHeader title="Vendor Submissions" />
      <VendorsClient initialVendors={vendors} />
    </div>
  )
}
