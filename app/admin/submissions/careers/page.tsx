import prisma from "@/lib/prisma"
import { H3, Paragraph } from "@/components/ui/typography"
import { User, Mail, Calendar, Briefcase, FileText } from "lucide-react"
import Link from "next/link"
import { CoverLetterModal } from "./cover-letter-modal"

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

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-border">
        <H3>Career Submissions</H3>
        <p className="text-muted-foreground text-sm">Review all job applications.</p>
        
        {/* Mobile/Tablet Card View */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 xl:hidden">
          {applications.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground border border-border rounded-xl col-span-full">No job applications yet.</div>
          ) : (
            applications.map(app => (
              <div key={app.id} className="bg-white border border-border rounded-xl p-4 shadow-sm space-y-3 flex flex-col">
                <div className="border-b border-border pb-3 flex flex-col gap-2">
                  <Link 
                    href={`/career/${app.jobId}`} 
                    target="_blank" 
                    className="flex items-start gap-2 font-medium hover:text-[#F58220] transition-colors text-sm"
                  >
                    <Briefcase className="w-4 h-4 text-[#F58220] shrink-0 mt-0.5" />
                    <span className="leading-tight break-words">{app.job.title}</span>
                  </Link>
                  <div className="flex items-center gap-2 text-muted-foreground ml-6">
                    <div className="text-sm font-medium text-foreground">
                      {new Date(app.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                    </div>
                    <span className="text-[10px]">•</span>
                    <div className="text-xs">
                      {new Date(app.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 pt-1 text-sm flex-grow">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground shrink-0" />
                    <span className="truncate">{app.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                    <a href={`mailto:${app.email}`} className="text-primary hover:underline truncate">{app.email}</a>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border mt-auto">
                  <CoverLetterModal coverLetter={app.coverLetter} />
                  <a 
                    href={app.resumeUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#F58220] hover:underline font-medium text-sm bg-[#F58220]/10 px-3 py-1.5 rounded-lg transition-colors hover:bg-[#F58220]/20"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Resume
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop Table View */}
        <div className="mt-8 hidden xl:block overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
              <tr>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Job Title</th>
                <th className="px-4 py-3 font-medium">Applicant Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Cover Letter</th>
                <th className="px-4 py-3 font-medium">Resume</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {applications.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">No job applications yet.</td></tr>
              ) : (
                applications.map(app => (
                  <tr key={app.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <div className="text-sm text-foreground">
                          {new Date(app.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(app.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Link 
                        href={`/career/${app.jobId}`} 
                        target="_blank" 
                        className="flex items-center gap-2 font-medium hover:text-[#F58220] transition-colors"
                      >
                        <Briefcase className="w-4 h-4 text-[#F58220]" />
                        {app.job.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        {app.name}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <a href={`mailto:${app.email}`} className="text-primary hover:underline">{app.email}</a>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <CoverLetterModal coverLetter={app.coverLetter} />
                    </td>
                    <td className="px-4 py-3">
                      <a 
                        href={app.resumeUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-[#F58220] hover:underline font-medium"
                      >
                        <FileText className="w-4 h-4" />
                        View Resume
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
