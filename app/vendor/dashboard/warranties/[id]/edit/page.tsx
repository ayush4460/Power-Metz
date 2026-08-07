'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { PageHeader } from '@/components/ui/page-header'
import { WarrantyForm } from '@/components/warranties/WarrantyForm'
import { ArrowLeft } from 'lucide-react'

export default function VendorEditWarrantyPage() {
  const { id } = useParams()
  const router = useRouter()
  const [initialData, setInitialData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWarranty = async () => {
      try {
        const res = await fetch(`/api/warranties/${id}`)
        if (!res.ok) throw new Error('Warranty not found')
        const data = await res.json()
        setInitialData(data)
      } catch (err: any) {
        setError(err.message || 'Error fetching warranty')
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchWarranty()
  }, [id])

  if (loading) return <div className="p-8 text-center text-gray-500">Loading warranty...</div>
  if (error || !initialData) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500 mb-4">{error || 'Warranty not found'}</p>
        <button onClick={() => router.push('/vendor/dashboard/warranties')} className="text-[#F58220] hover:underline">
          Return to My Warranties
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-10">
      <PageHeader 
        title={
          <div className="flex items-center gap-3">
            <Link href="/vendor/dashboard/warranties" className="p-1.5 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors shrink-0 flex items-center justify-center">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <span>Edit Warranty: {initialData.warrantyId}</span>
          </div>
        }
      />
      <div className="bg-white rounded-lg border border-gray-200 p-6 sm:p-8">
        <WarrantyForm 
          isEdit={true}
          initialData={initialData}
          onSuccess={() => router.push('/vendor/dashboard/warranties')}
          returnUrl="/vendor/dashboard/warranties"
        />
      </div>
    </div>
  )
}
