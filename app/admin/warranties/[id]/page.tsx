'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { PageHeader } from '@/components/ui/page-header'
import { DownloadCertificateButton } from '@/components/warranties/DownloadCertificateButton'
import { ArrowLeft, User, Phone, Mail, MapPin, Wrench, ShieldCheck, CheckCircle } from 'lucide-react'

type WarrantyDetail = {
  id: string;
  warrantyId: string;
  serialNumber: string;
  productCategory: string;
  productModel: string;
  status: string;
  warrantyPlan: string;
  installDate?: string;
  expiryDate?: string;
  extensionPending: boolean;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  customerLocation?: string;
  installerName?: string;
  createdAt: string;
  createdBy?: { email: string; role: string };
};

export default function AdminWarrantyDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [warranty, setWarranty] = useState<WarrantyDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWarranty = async () => {
      try {
        const res = await fetch(`/api/warranties/${id}`)
        if (!res.ok) {
          throw new Error('Warranty not found')
        }
        const data = await res.json()
        setWarranty(data)
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError(String(err))
        }
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchWarranty()
    }
  }, [id])

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading warranty details...</div>
  }

  if (error || !warranty) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500 mb-4">{error || 'Warranty not found'}</p>
        <button onClick={() => router.push('/admin/warranties')} className="text-[#FF6B00] hover:underline">
          Return to Warranties
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-10">
      <PageHeader 
        title={
          <div className="flex items-center gap-3">
            <Link href="/admin/warranties" className="p-1.5 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors shrink-0 flex items-center justify-center">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div className="flex flex-col">
              <span>{`Warranty Record: ${warranty.warrantyId}`}</span>
              <span className="text-sm font-normal text-gray-500 mt-1 hidden sm:block">
                {`Created on ${new Date(warranty.createdAt).toLocaleDateString()}`}
              </span>
            </div>
          </div>
        }
        actionButton={<DownloadCertificateButton warranty={warranty} />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Product & Warranty Status Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 border-b pb-4 mb-4 flex items-center">
              <ShieldCheck className="w-5 h-5 mr-2 text-[#FF6B00]" />
              Product Details
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Serial Number</p>
                <p className="text-gray-900 font-medium">{warranty.serialNumber}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Category</p>
                <p className="text-gray-900 font-medium uppercase">{warranty.productCategory}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Product Model</p>
                <p className="text-gray-900 font-medium">{warranty.productModel}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 border-b pb-4 mb-4 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-[#FF6B00]" />
              Warranty Information
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Status</p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  warranty.status === 'Active' ? 'bg-green-100 text-green-800' :
                  warranty.status === 'Expiring Soon' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {warranty.status}
                </span>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Warranty Plan</p>
                <p className="text-gray-900 font-medium">{warranty.warrantyPlan}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Install Date</p>
                <p className="text-gray-900 font-medium">
                  {warranty.installDate ? new Date(warranty.installDate).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Expiry Date</p>
                <p className="text-gray-900 font-medium">
                  {warranty.expiryDate ? new Date(warranty.expiryDate).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Extension Request</p>
                <p className="text-gray-900 font-medium">
                  {warranty.extensionPending ? 'Yes - Pending Approval' : 'No'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Customer & Installer Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 border-b pb-4 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-[#FF6B00]" />
              Customer Details
            </h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 flex items-center"><User className="w-3 h-3 mr-1" /> Name</p>
                <p className="text-gray-900 font-medium">{warranty.customerName}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 flex items-center"><Phone className="w-3 h-3 mr-1" /> Phone</p>
                <a href={`tel:${warranty.customerPhone}`} className="text-[#FF6B00] hover:underline font-medium">{warranty.customerPhone}</a>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 flex items-center"><Mail className="w-3 h-3 mr-1" /> Email</p>
                {warranty.customerEmail ? (
                  <a href={`mailto:${warranty.customerEmail}`} className="text-[#FF6B00] hover:underline font-medium break-all">{warranty.customerEmail}</a>
                ) : <span className="text-gray-500 italic">Not provided</span>}
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 flex items-center"><MapPin className="w-3 h-3 mr-1" /> Location</p>
                <p className="text-gray-900 font-medium">{warranty.customerLocation || <span className="text-gray-500 italic">Not provided</span>}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 border-b pb-4 mb-4 flex items-center">
              <Wrench className="w-5 h-5 mr-2 text-[#FF6B00]" />
              Installer Details
            </h3>
            
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Installer Name</p>
              <p className="text-gray-900 font-medium">{warranty.installerName || <span className="text-gray-500 italic">Not provided</span>}</p>
            </div>
          </div>
          
        </div>

      </div>
    </div>
  )
}
