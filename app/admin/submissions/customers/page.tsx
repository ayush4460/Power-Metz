import prisma from "@/lib/prisma"
import { H3, Paragraph } from "@/components/ui/typography"
import { User, Mail, Phone, Calendar, MapPin, Package } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"

export const metadata = {
  title: "Admin - Customer Submissions",
}

export default async function CustomerSubmissionsPage() {
  // Mark all unread customer submissions as read when this page is visited
  await prisma.customerSubmission.updateMany({
    where: { isRead: false },
    data: { isRead: true }
  })

  const customers = await prisma.customerSubmission.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="space-y-6">
      <PageHeader title="Customer Submissions" />
      <div>
        {/* Mobile/Tablet Card View */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:hidden">
          {customers.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground border border-border rounded-xl col-span-full">No customer submissions yet.</div>
          ) : (
            customers.map(c => (
              <div key={c.id} className="bg-white border border-border rounded-xl p-4 shadow-sm space-y-3 flex flex-col">
                <div className="border-b border-border pb-3 flex flex-col gap-2">
                  <div className="flex items-start gap-2 font-semibold text-[#F58220] text-sm">
                    <User className="w-4 h-4 shrink-0 mt-0.5" />
                    <span className="leading-tight break-words">{c.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground ml-6">
                    <div className="text-sm font-medium text-foreground">
                      {new Date(c.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                    </div>
                    <span className="text-[10px]">•</span>
                    <div className="text-xs">
                      {new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-1 text-sm flex-grow">
                  <div className="flex items-start gap-2">
                    <Package className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{c.productInterest}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{c.location}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 pt-3 border-t border-border mt-auto text-sm bg-muted/30 -mx-4 -mb-4 p-4 rounded-b-xl">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                    <a href={`mailto:${c.email}`} className="text-primary hover:underline truncate">{c.email}</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                    <a href={`tel:${c.phone}`} className="text-primary hover:underline">{c.phone}</a>
                  </div>
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
                <th className="px-4 py-3 font-medium">Customer Name</th>
                <th className="px-4 py-3 font-medium">Contact Info</th>
                <th className="px-4 py-3 font-medium">Location</th>
                <th className="px-4 py-3 font-medium">Product Interest</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {customers.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No customer submissions yet.</td></tr>
              ) : (
                customers.map(c => (
                  <tr key={c.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <div className="text-sm text-foreground">
                          {new Date(c.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 font-medium">
                        <User className="w-4 h-4 text-[#F58220]" />
                        {c.name}
                      </div>
                    </td>
                    <td className="px-4 py-3 space-y-1">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <a href={`mailto:${c.email}`} className="text-primary hover:underline">{c.email}</a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <a href={`tel:${c.phone}`} className="text-primary hover:underline">{c.phone}</a>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        {c.location}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-muted-foreground" />
                        {c.productInterest}
                      </div>
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
