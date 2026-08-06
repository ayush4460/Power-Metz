import prisma from "@/lib/prisma"
import { H3, Paragraph } from "@/components/ui/typography"
import { User, Mail, Phone, MapPin, MessageSquare, Briefcase } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"

export const metadata = {
  title: "Admin - Reach Us Submissions",
}

export default async function ReachUsSubmissionsPage() {
  // Mark all unread reach us submissions as read when this page is visited
  await prisma.reachUsSubmission.updateMany({
    where: { isRead: false },
    data: { isRead: true }
  })

  const submissions = await prisma.reachUsSubmission.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="space-y-6">
      <PageHeader title="Reach Us Submissions" />
      <div>
        {/* Mobile/Tablet Card View */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:hidden">
          {submissions.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground border border-border rounded-xl col-span-full">No submissions yet.</div>
          ) : (
            submissions.map(s => (
              <div key={s.id} className="bg-white border border-border rounded-xl p-4 shadow-sm space-y-3 flex flex-col">
                <div className="border-b border-border pb-3 flex flex-col gap-2">
                  <div className="flex items-start gap-2 font-semibold text-[#F58220] text-sm">
                    <User className="w-4 h-4 shrink-0 mt-0.5" />
                    <span className="leading-tight break-words">{s.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground ml-6">
                    <div className="text-sm font-medium text-foreground">
                      {new Date(s.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                    </div>
                    <span className="text-[10px]">•</span>
                    <div className="text-xs">
                      {new Date(s.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-1 text-sm flex-grow">
                  <div className="flex items-start gap-2">
                    <Briefcase className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{s.company || '-'}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                    <span className="line-clamp-1 font-medium">{s.purpose}</span>
                  </div>
                  <div className="flex items-start gap-2 mt-2">
                    <MessageSquare className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                    <span className="line-clamp-3 text-muted-foreground italic">&quot;{s.message}&quot;</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 pt-3 border-t border-border mt-auto text-sm bg-muted/30 -mx-4 -mb-4 p-4 rounded-b-xl">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                    <a href={`mailto:${s.email}`} className="text-primary hover:underline truncate">{s.email}</a>
                  </div>
                  {s.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                      <a href={`tel:${s.phone}`} className="text-primary hover:underline">{s.phone}</a>
                    </div>
                  )}
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
                <th className="px-4 py-3 font-medium">Name & Company</th>
                <th className="px-4 py-3 font-medium">Contact Info</th>
                <th className="px-4 py-3 font-medium">Purpose</th>
                <th className="px-4 py-3 font-medium w-1/3">Message</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {submissions.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No submissions yet.</td></tr>
              ) : (
                submissions.map(s => (
                  <tr key={s.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <div className="text-sm text-foreground">
                          {new Date(s.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(s.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-foreground">{s.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{s.company || '—'}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1 text-xs">
                        <a href={`mailto:${s.email}`} className="text-primary hover:underline">{s.email}</a>
                        {s.phone && (
                          <a href={`tel:${s.phone}`} className="text-primary hover:underline">{s.phone}</a>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-foreground">
                      {s.purpose}
                    </td>
                    <td className="px-4 py-3">
                      <p className="line-clamp-2 text-muted-foreground italic" title={s.message}>
                        &quot;{s.message}&quot;
                      </p>
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
