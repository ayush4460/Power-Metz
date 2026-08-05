import prisma from "@/lib/prisma"
import { H3, Paragraph } from "@/components/ui/typography"
import { Building2, Mail, Phone, Calendar, User, LayoutDashboard, MessageSquare } from "lucide-react"
import { VendorStatusSelect } from "./vendor-status-select"
import { VendorMessageModal } from "./message-modal"

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
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-border">
        <H3>Vendor Submissions</H3>
        <p className="text-muted-foreground text-sm">Review all vendor application requests.</p>
        
        {/* Mobile/Tablet Card View */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 xl:hidden">
          {vendors.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground border border-border rounded-xl col-span-full">No vendor submissions yet.</div>
          ) : (
            vendors.map(v => (
              <div key={v.id} className="bg-white border border-border rounded-xl p-4 shadow-sm space-y-3 flex flex-col">
                <div className="border-b border-border pb-3 flex flex-col gap-2">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex items-start gap-2 font-semibold text-[#F58220] text-sm">
                      <Building2 className="w-4 h-4 shrink-0 mt-0.5" />
                      <span className="leading-tight break-words">{v.companyName}</span>
                    </div>
                    <VendorStatusSelect id={v.id} currentStatus={v.status} />
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground ml-6">
                    <div className="text-sm font-medium text-foreground">
                      {new Date(v.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                    </div>
                    <span className="text-[10px]">•</span>
                    <div className="text-xs">
                      {new Date(v.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-1 text-sm flex-grow">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground shrink-0" />
                    <span className="truncate">{v.contactPerson}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <LayoutDashboard className="w-4 h-4 text-muted-foreground shrink-0" />
                    <span className="truncate">{v.productCategory}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 pt-3 border-t border-border mt-auto text-sm bg-muted/30 -mx-4 -mb-4 p-4 rounded-b-xl">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                    <a href={`mailto:${v.email}`} className="text-primary hover:underline truncate">{v.email}</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                    <a href={`tel:${v.phone}`} className="text-primary hover:underline">{v.phone}</a>
                  </div>
                  <div className="mt-1.5 pt-2 border-t border-border/50">
                    <VendorMessageModal message={v.message} companyName={v.companyName} />
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
                <th className="px-4 py-3 font-medium">Company</th>
                <th className="px-4 py-3 font-medium">Contact Person</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Contact Info</th>
                <th className="px-4 py-3 font-medium">Message</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {vendors.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">No vendor submissions yet.</td></tr>
              ) : (
                vendors.map(v => (
                  <tr key={v.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <div className="text-sm text-foreground">
                          {new Date(v.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(v.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 font-medium">
                        <Building2 className="w-4 h-4 text-[#F58220]" />
                        {v.companyName}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        {v.contactPerson}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <LayoutDashboard className="w-4 h-4 text-muted-foreground" />
                        {v.productCategory}
                      </div>
                    </td>
                    <td className="px-4 py-3 space-y-1">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <a href={`mailto:${v.email}`} className="text-primary hover:underline">{v.email}</a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <a href={`tel:${v.phone}`} className="text-primary hover:underline">{v.phone}</a>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <VendorMessageModal message={v.message} companyName={v.companyName} />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <VendorStatusSelect id={v.id} currentStatus={v.status} />
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
