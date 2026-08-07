'use client'

import React, { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { categories } from '@/content/categories'
import { products } from '@/content/products'

interface WarrantyFormProps {
  onSuccess?: () => void
  returnUrl?: string
  isEdit?: boolean
  initialData?: any
}

export function WarrantyForm({ onSuccess, returnUrl = '/admin/warranties', isEdit = false, initialData }: WarrantyFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    warrantyId: initialData?.warrantyId || '',
    serialNumber: initialData?.serialNumber || '',
    productCategory: initialData?.productCategory || '',
    productModel: initialData?.productModel || '',
    status: initialData?.status || 'Active',
    warrantyPlan: initialData?.warrantyPlan || 'Standard 1-Year',
    installDate: initialData?.installDate ? new Date(initialData.installDate).toISOString().split('T')[0] : '',
    expiryDate: initialData?.expiryDate ? new Date(initialData.expiryDate).toISOString().split('T')[0] : '',
    customerName: initialData?.customerName || '',
    customerPhone: initialData?.customerPhone || '',
    customerEmail: initialData?.customerEmail || '',
    customerLocation: initialData?.customerLocation || '',
    installerName: initialData?.installerName || '',
    extensionPending: initialData?.extensionPending || false
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    setFormData(prev => ({ ...prev, [name]: val }))
  }

  const filteredProducts = useMemo(() => {
    if (!formData.productCategory) return []
    return products.filter(p => p.categoryId === formData.productCategory)
  }, [formData.productCategory])

  React.useEffect(() => {
    if (!isEdit && !formData.warrantyId) {
      const randomDigits = Math.floor(100000 + Math.random() * 900000).toString()
      const newId = `PM-${new Date().getFullYear()}-${randomDigits}`
      setFormData(prev => ({ ...prev, warrantyId: newId }))
    }
  }, [isEdit, formData.warrantyId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const url = isEdit && initialData?.id ? `/api/warranties/${initialData.id}` : '/api/warranties'
      const method = isEdit ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || `Failed to ${isEdit ? 'update' : 'create'} warranty`)
      }

      if (onSuccess) {
        onSuccess()
      } else {
        router.push(returnUrl)
      }
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200 w-full">
      <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-6">
        <h2 className="text-2xl font-bold text-slate-800">{isEdit ? 'Edit Warranty Record' : 'New Warranty Record'}</h2>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-md text-sm mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {!isEdit && (
          <div>
            <label className="block text-sm font-medium mb-1.5 text-slate-700">Warranty ID <span className="text-red-500">*</span></label>
            <input
              type="text"
              disabled
              value={formData.warrantyId}
              placeholder="Auto-generating..."
              className="w-full border border-gray-200 rounded-lg p-3 bg-gray-50 text-slate-500 focus:outline-none cursor-not-allowed shadow-sm"
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium mb-1.5 text-slate-700">Serial Number <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="serialNumber"
            required
            value={formData.serialNumber}
            onChange={handleInputChange}
            className="w-full border border-gray-200 rounded-lg p-3 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F58220]/20 focus:border-[#F58220] hover:border-[#F58220]/50 transition-all duration-300 shadow-sm placeholder:text-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5 text-slate-700">Category <span className="text-red-500">*</span></label>
          <div className="relative">
            <div 
              onClick={() => setOpenDropdown(openDropdown === 'category' ? null : 'category')}
              className={`w-full border ${openDropdown === 'category' ? 'border-[#F58220] ring-2 ring-[#F58220]/20' : 'border-gray-200'} rounded-lg p-3 pr-10 bg-white text-slate-800 hover:border-[#F58220]/50 transition-all duration-300 cursor-pointer shadow-sm select-none`}
            >
              <span className={formData.productCategory ? "text-slate-800" : "text-gray-400"}>
                {categories.find(c => c.id === formData.productCategory)?.name || "Select category"}
              </span>
            </div>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#F58220]">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${openDropdown === 'category' ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
            </div>
            
            {openDropdown === 'category' && (
              <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-lg shadow-[0_12px_40px_rgb(0,0,0,0.08)] overflow-hidden py-1 max-h-60 overflow-y-auto">
                {categories.map((cat) => (
                  <div 
                    key={cat.id}
                    onClick={() => { setFormData(prev => ({ ...prev, productCategory: cat.id, productModel: '' })); setOpenDropdown(null); }}
                    className={`px-4 py-2.5 cursor-pointer transition-colors text-sm ${formData.productCategory === cat.id ? 'bg-[#F58220]/10 text-[#F58220] font-medium' : 'text-slate-700 hover:bg-slate-50 hover:text-[#F58220]'}`}
                  >
                    {cat.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5 text-slate-700">Product Model <span className="text-red-500">*</span></label>
          <div className="relative">
            <div 
              onClick={() => {
                if (formData.productCategory) {
                  setOpenDropdown(openDropdown === 'model' ? null : 'model')
                }
              }}
              className={`w-full border ${openDropdown === 'model' ? 'border-[#F58220] ring-2 ring-[#F58220]/20' : 'border-gray-200'} rounded-lg p-3 pr-10 ${formData.productCategory ? 'bg-white text-slate-800 cursor-pointer hover:border-[#F58220]/50' : 'bg-gray-50 text-gray-400 cursor-not-allowed'} transition-all duration-300 shadow-sm select-none`}
            >
              <span className={formData.productModel ? "text-slate-800" : "text-gray-400"}>
                {formData.productModel || "Select model"}
              </span>
            </div>
            <div className={`absolute inset-y-0 right-4 flex items-center pointer-events-none ${formData.productCategory ? 'text-[#F58220]' : 'text-gray-400'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${openDropdown === 'model' ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
            </div>
            
            {openDropdown === 'model' && formData.productCategory && (
              <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-lg shadow-[0_12px_40px_rgb(0,0,0,0.08)] overflow-hidden py-1 max-h-60 overflow-y-auto">
                {filteredProducts.map((p) => (
                  <div 
                    key={p.id}
                    onClick={() => { setFormData(prev => ({ ...prev, productModel: p.modelNumber })); setOpenDropdown(null); }}
                    className={`px-4 py-2.5 cursor-pointer transition-colors text-sm ${formData.productModel === p.modelNumber ? 'bg-[#F58220]/10 text-[#F58220] font-medium' : 'text-slate-700 hover:bg-slate-50 hover:text-[#F58220]'}`}
                  >
                    {p.modelNumber}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5 text-slate-700">Status</label>
          <div className="relative">
            <div 
              onClick={() => setOpenDropdown(openDropdown === 'status' ? null : 'status')}
              className={`w-full border ${openDropdown === 'status' ? 'border-[#F58220] ring-2 ring-[#F58220]/20' : 'border-gray-200'} rounded-lg p-3 pr-10 bg-white text-slate-800 hover:border-[#F58220]/50 transition-all duration-300 cursor-pointer shadow-sm select-none`}
            >
              <span>{formData.status}</span>
            </div>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#F58220]">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${openDropdown === 'status' ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
            </div>
            
            {openDropdown === 'status' && (
              <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-lg shadow-[0_12px_40px_rgb(0,0,0,0.08)] overflow-hidden py-1">
                {["Active", "Expiring Soon", "Expired"].map((opt) => (
                  <div 
                    key={opt}
                    onClick={() => { setFormData(prev => ({ ...prev, status: opt })); setOpenDropdown(null); }}
                    className={`px-4 py-2.5 cursor-pointer transition-colors text-sm ${formData.status === opt ? 'bg-[#F58220]/10 text-[#F58220] font-medium' : 'text-slate-700 hover:bg-slate-50 hover:text-[#F58220]'}`}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5 text-slate-700">Warranty Plan</label>
          <div className="relative">
            <div 
              onClick={() => setOpenDropdown(openDropdown === 'plan' ? null : 'plan')}
              className={`w-full border ${openDropdown === 'plan' ? 'border-[#F58220] ring-2 ring-[#F58220]/20' : 'border-gray-200'} rounded-lg p-3 pr-10 bg-white text-slate-800 hover:border-[#F58220]/50 transition-all duration-300 cursor-pointer shadow-sm select-none`}
            >
              <span>{formData.warrantyPlan}</span>
            </div>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#F58220]">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${openDropdown === 'plan' ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
            </div>
            
            {openDropdown === 'plan' && (
              <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-lg shadow-[0_12px_40px_rgb(0,0,0,0.08)] overflow-hidden py-1">
                {["Standard 1-Year", "Standard 2-Year", "Standard 5-Year", "Extended +1-Year", "Extended +2-Year", "Extended +3-Year", "Premium +5-Year"].map((opt) => (
                  <div 
                    key={opt}
                    onClick={() => { setFormData(prev => ({ ...prev, warrantyPlan: opt })); setOpenDropdown(null); }}
                    className={`px-4 py-2.5 cursor-pointer transition-colors text-sm ${formData.warrantyPlan === opt ? 'bg-[#F58220]/10 text-[#F58220] font-medium' : 'text-slate-700 hover:bg-slate-50 hover:text-[#F58220]'}`}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5 text-slate-700">Install Date</label>
          <input
            type="date"
            name="installDate"
            value={formData.installDate}
            onChange={handleInputChange}
            className="w-full border border-gray-200 rounded-lg p-3 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F58220]/20 focus:border-[#F58220] hover:border-[#F58220]/50 transition-all duration-300 shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5 text-slate-700">Expiry Date</label>
          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleInputChange}
            className="w-full border border-gray-200 rounded-lg p-3 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F58220]/20 focus:border-[#F58220] hover:border-[#F58220]/50 transition-all duration-300 shadow-sm"
          />
        </div>
      </div>

      <div className="pt-2 border-b border-gray-100 pb-6 mb-6">
        <label className="flex items-center space-x-3 text-sm text-slate-700 cursor-pointer w-fit">
          <input
            type="checkbox"
            name="extensionPending"
            checked={formData.extensionPending}
            onChange={handleInputChange}
            className="w-4 h-4 text-[#F58220] border-gray-300 rounded focus:ring-[#F58220] cursor-pointer"
          />
          <span className="font-medium">Extension request pending</span>
        </label>
      </div>

      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-5">Customer Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1.5 text-slate-700">Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="customerName"
              required
              value={formData.customerName}
              onChange={handleInputChange}
              className="w-full border border-gray-200 rounded-lg p-3 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F58220]/20 focus:border-[#F58220] hover:border-[#F58220]/50 transition-all duration-300 shadow-sm placeholder:text-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5 text-slate-700">Phone <span className="text-red-500">*</span></label>
            <input
              type="tel"
              name="customerPhone"
              required
              value={formData.customerPhone}
              onChange={handleInputChange}
              className="w-full border border-gray-200 rounded-lg p-3 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F58220]/20 focus:border-[#F58220] hover:border-[#F58220]/50 transition-all duration-300 shadow-sm placeholder:text-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5 text-slate-700">Email</label>
            <input
              type="email"
              name="customerEmail"
              value={formData.customerEmail}
              onChange={handleInputChange}
              className="w-full border border-gray-200 rounded-lg p-3 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F58220]/20 focus:border-[#F58220] hover:border-[#F58220]/50 transition-all duration-300 shadow-sm placeholder:text-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5 text-slate-700">Location</label>
            <input
              type="text"
              name="customerLocation"
              value={formData.customerLocation}
              onChange={handleInputChange}
              className="w-full border border-gray-200 rounded-lg p-3 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F58220]/20 focus:border-[#F58220] hover:border-[#F58220]/50 transition-all duration-300 shadow-sm placeholder:text-gray-400"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1.5 text-slate-700">Installer Name</label>
            <input
              type="text"
              name="installerName"
              value={formData.installerName}
              onChange={handleInputChange}
              className="w-full border border-gray-200 rounded-lg p-3 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F58220]/20 focus:border-[#F58220] hover:border-[#F58220]/50 transition-all duration-300 shadow-sm placeholder:text-gray-400"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-8 mt-8 border-t border-gray-100">
        <button
          type="button"
          onClick={() => router.push(returnUrl)}
          className="w-full md:w-auto px-8 py-3 bg-white border border-gray-200 rounded-lg text-slate-700 font-medium hover:bg-gray-50 transition-colors shadow-sm"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto px-8 py-3 bg-[#F58220] hover:bg-[#F58220]/90 text-white rounded-lg font-medium transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? 'Saving...' : 'Create Record'}
        </button>
      </div>
    </form>
  )
}
