import prisma from "@/lib/prisma"
import { H3, Paragraph } from "@/components/ui/typography"
import { PageHeader } from "@/components/ui/page-header"
import { CareersClient } from "./careers-client"

export const metadata = {
  title: "Admin - Career Submissions",
}

export default async function CareerSubmissionsPage() {
  // Mark all unread career submissions as read when this page is visited
  await prisma.jobApplication.updateMany({
    where: { isRead: false },
    data: { isRead: true }
  })

  const applications = await prisma.jobApplication.findMany({
    include: {
      job: {
        select: {
          title: true,
        }
      }
    },
    orderBy: { createdAt: "desc" },
  })

  const activeJobs = await prisma.jobOpening.findMany({
    where: { isActive: true },
    select: { id: true, title: true },
    orderBy: { createdAt: "desc" }
  })

  return (
    <div className="space-y-6">
      <PageHeader title="Career Submissions" />
      <CareersClient initialApplications={applications} activeJobs={activeJobs} />
    </div>
  )
}
