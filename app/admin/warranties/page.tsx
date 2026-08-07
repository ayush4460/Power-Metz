'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { PageHeader } from '@/components/ui/page-header'
import { PlusCircle, Eye, Pencil, Trash2 } from 'lucide-react'

type Warranty = {
  id: string;
  warrantyId: string;
  customerName: string;
  productModel: string;
  status: string;
  createdBy?: { email: string; role: string };
};

export default function AdminWarrantiesPage() {
  const [warranties, setWarranties] = useState<Warranty[]>([])
  const [loading, setLoading] = useState(true)

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
            <span>Warranties</span>
            <span className="text-sm font-normal text-gray-500 mt-1 hidden sm:block">Manage customer warranty records</span>
          </div>
        }
        actionButton={
          <Link 
            href="/admin/warranties/new"
            className="flex items-center space-x-2 bg-[#FF6B00] text-white px-4 py-2 rounded-md hover:bg-[#FF6B00]/90 transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Warranty</span>
          </Link>
        }
      />

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-900">Warranty ID</th>
                <th className="px-6 py-4 font-semibold text-gray-900">Customer</th>
                <th className="px-6 py-4 font-semibold text-gray-900">Product Model</th>
                <th className="px-6 py-4 font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 font-semibold text-gray-900">Created By</th>
                <th className="px-6 py-4 font-semibold text-gray-900 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    Loading warranties...
                  </td>
                </tr>
              ) : warranties.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No warranties found.
                  </td>
                </tr>
              ) : (
                warranties.map((warranty) => (
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
                    <td className="px-6 py-4 text-gray-600">
                      {warranty.createdBy?.email ? (
                        <div className="flex flex-col">
                          <span>{warranty.createdBy.email}</span>
                          <span className="text-xs text-gray-400 capitalize">{warranty.createdBy.role.toLowerCase()}</span>
                        </div>
                      ) : 'System'}
                    </td>
                    <td className="px-6 py-4 text-right flex items-center justify-end space-x-3">
                      <Link 
                        href={`/admin/warranties/${warranty.id}`}
                        className="text-gray-400 hover:text-blue-500 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5 inline" />
                      </Link>
                      <Link 
                        href={`/admin/warranties/${warranty.id}/edit`}
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
