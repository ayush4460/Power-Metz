"use client"

import { useState } from "react"
import { Building2, Mail, Phone, Calendar, User, LayoutDashboard, Search, ChevronDown } from "lucide-react"
import { VendorStatusSelect } from "./vendor-status-select"
import { VendorMessageModal } from "./message-modal"

type Vendor = {
  id: string
  companyName: string
  contactPerson: string
  email: string
  phone: string
  productCategory: string
  experience: string | null
  message: string | null
  status: string
  isRead: boolean
  createdAt: Date
}

export function VendorsClient({ initialVendors }: { initialVendors: Vendor[] }) {
  const [vendors, setVendors] = useState<Vendor[]>(initialVendors)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentStatus, setCurrentStatus] = useState<string>('all')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Filter vendors based on search query and status
  const filteredVendors = vendors.filter(v => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      if (!v.companyName.toLowerCase().includes(query) && !v.contactPerson.toLowerCase().includes(query)) {
        return false
      }
    }
    if (currentStatus !== 'all' && v.status.toLowerCase() !== currentStatus.toLowerCase()) {
      return false
    }
    return true
  })

  const statusOptions = [
    { value: 'all', label: `All (${vendors.length})` },
    { value: 'pending', label: `Pending (${vendors.filter(v => v.status === 'PENDING').length})` },
    { value: 'approved', label: `Approved (${vendors.filter(v => v.status === 'APPROVED').length})` },
    { value: 'rejected', label: `Rejected (${vendors.filter(v => v.status === 'REJECTED').length})` }
  ]
  const currentOption = statusOptions.find(o => o.value === currentStatus) || statusOptions[0]

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-1 mb-6">
        <div className="relative w-full flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text"
            placeholder="Search vendors by company or contact person..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#F58220]/20 focus:border-[#F58220] transition-colors shadow-sm placeholder:text-gray-400"
          />
        </div>

        <div className="relative w-full sm:w-48 shrink-0">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
            className="w-full flex items-center justify-between px-4 py-2 text-sm bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#F58220]/20 focus:border-[#F58220] transition-colors shadow-sm cursor-pointer text-slate-700"
          >
            <span className="font-medium truncate mr-2">{currentOption.label}</span>
            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-[0_12px_40px_rgb(0,0,0,0.08)] py-1 max-h-60 overflow-y-auto">
              {statusOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    setCurrentStatus(opt.value)
                    setIsDropdownOpen(false)
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                    currentStatus === opt.value
                      ? 'bg-[#F58220]/10 text-[#F58220] font-medium'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-[#F58220]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile/Tablet Card View */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:hidden">
        {filteredVendors.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground border border-border rounded-xl col-span-full bg-white">
            <Search className="w-8 h-8 mx-auto mb-3 text-gray-300" />
            No vendor submissions match your search.
          </div>
        ) : (
          filteredVendors.map(v => (
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
      <div className="hidden xl:block overflow-x-auto rounded-xl border border-border">
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
          <tbody className="divide-y divide-border bg-white">
            {filteredVendors.length === 0 ? (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">No vendor submissions match your search.</td></tr>
            ) : (
              filteredVendors.map(v => (
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
  )
}
