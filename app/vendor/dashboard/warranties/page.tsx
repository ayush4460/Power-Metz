'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { PageHeader } from '@/components/ui/page-header'
import { PlusCircle, Eye, Pencil, Trash2, Search, Filter } from 'lucide-react'

type Warranty = {
  id: string;
  warrantyId: string;
  customerName: string;
  productModel: string;
  status: string;
  createdBy?: { email: string; role: string };
};

export default function VendorWarrantiesPage() {
  const [warranties, setWarranties] = useState<Warranty[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [openDropdown, setOpenDropdown] = useState<boolean>(false)

  const filteredWarranties = warranties.filter(w => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = (w.warrantyId || '').toLowerCase().includes(searchLower) || 
                          (w.customerName || '').toLowerCase().includes(searchLower);
    const matchesStatus = statusFilter === 'All' || w.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    const fetchWarranties = async () => {
      try {
        const res = await fetch('/api/warranties')
        const data = await res.json()
        setWarranties(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error('Failed to fetch warranties:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchWarranties()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this warranty? This action cannot be undone.')) {
      return
    }
    try {
      const res = await fetch(`/api/warranties/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setWarranties(prev => prev.filter(w => w.id !== id))
      } else {
        alert('Failed to delete warranty')
      }
    } catch (error) {
      console.error('Error deleting warranty:', error)
      alert('Error deleting warranty')
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader 
        title={
          <div className="flex flex-col">
            <span>My Warranties</span>
            <span className="text-sm font-normal text-gray-500 mt-1 hidden sm:block">Manage your customer warranty records</span>
          </div>
        }
        actionButton={
          <Link 
            href="/vendor/dashboard/warranties/new"
            className="flex items-center space-x-2 bg-[#FF6B00] text-white px-4 py-2 rounded-md hover:bg-[#FF6B00]/90 transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Warranty</span>
          </Link>
        }
      />

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm relative z-10">
        {/* Filters */}
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-4 items-center justify-between bg-gray-50/50 rounded-t-lg">
          <div className="relative w-full flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by Warranty ID or Customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00]"
            />
          </div>
          <div className="relative w-full sm:w-56 flex-shrink-0">
            <div 
              onClick={() => setOpenDropdown(!openDropdown)}
              className={`w-full border ${openDropdown ? 'border-[#F58220] ring-2 ring-[#F58220]/20' : 'border-gray-200'} rounded-lg py-2 pl-10 pr-10 bg-white text-slate-800 hover:border-[#F58220]/50 transition-all duration-300 cursor-pointer shadow-sm select-none text-sm h-[38px] flex items-center`}
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 text-gray-400" />
              </div>
              <span className="truncate">{statusFilter === 'All' ? 'All Statuses' : statusFilter}</span>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-[#F58220]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${openDropdown ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>
            
            {openDropdown && (
              <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-lg shadow-[0_12px_40px_rgb(0,0,0,0.08)] overflow-hidden py-1">
                {["All", "Active", "Expiring Soon", "Expired"].map((opt) => (
                  <div 
                    key={opt}
                    onClick={() => { setStatusFilter(opt); setOpenDropdown(false); }}
                    className={`px-4 py-2.5 cursor-pointer transition-colors text-sm ${statusFilter === opt ? 'bg-[#F58220]/10 text-[#F58220] font-medium' : 'text-slate-700 hover:bg-slate-50 hover:text-[#F58220]'}`}
                  >
                    {opt === 'All' ? 'All Statuses' : opt}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto rounded-b-lg">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-900">Warranty ID</th>
                <th className="px-6 py-4 font-semibold text-gray-900">Customer</th>
                <th className="px-6 py-4 font-semibold text-gray-900">Product Model</th>
                <th className="px-6 py-4 font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 font-semibold text-gray-900 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    Loading warranties...
                  </td>
                </tr>
              ) : filteredWarranties.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    {warranties.length === 0 ? "You haven't created any warranties yet." : "No warranties match your search criteria."}
                  </td>
                </tr>
              ) : (
                filteredWarranties.map((warranty) => (
                  <tr key={warranty.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{warranty.warrantyId}</td>
                    <td className="px-6 py-4 text-gray-600">{warranty.customerName}</td>
                    <td className="px-6 py-4 text-gray-600">{warranty.productModel}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        warranty.status === 'Active' ? 'bg-green-100 text-green-800' :
                        warranty.status === 'Expiring Soon' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {warranty.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right flex items-center justify-end space-x-3">
                      <Link 
                        href={`/vendor/dashboard/warranties/${warranty.id}`}
                        className="text-gray-400 hover:text-blue-500 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5 inline" />
                      </Link>
                      <Link 
                        href={`/vendor/dashboard/warranties/${warranty.id}/edit`}
                        className="text-gray-400 hover:text-[#FF6B00] transition-colors"
                        title="Edit Warranty"
                      >
                        <Pencil className="w-5 h-5 inline" />
                      </Link>
                      <button 
                        onClick={() => handleDelete(warranty.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete Warranty"
                      >
                        <Trash2 className="w-5 h-5 inline" />
                      </button>
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
