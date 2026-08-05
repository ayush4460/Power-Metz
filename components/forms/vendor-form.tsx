"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Turnstile } from "@marsidev/react-turnstile"
import { Button } from "@/components/ui/button"

const vendorSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  contactPerson: z.string().min(2, "Contact person is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  productCategory: z.string().min(2, "Product category is required"),
  experience: z.string().min(1, "Experience is required"),
  message: z.string().optional(),
})

type VendorFormValues = z.infer<typeof vendorSchema>

export function VendorForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm<VendorFormValues>({
    resolver: zodResolver(vendorSchema)
  })

  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const onSubmit = async (data: VendorFormValues) => {
    if (!turnstileToken) {
      setError("Please complete the security check.")
      return
    }

    setIsSubmitting(true)
    setError("")
    
    try {
      const res = await fetch("/api/join-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "vendor", payload: data, turnstileToken })
      })

      if (res.ok) {
        setSuccess(true)
        reset()
      } else {
        const errorData = await res.json()
        setError(errorData.error || "Something went wrong")
      }
    } catch (err) {
      setError("Network error. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg text-center">
        <h4 className="text-xl font-bold mb-2">Thank you for reaching out!</h4>
        <p>Your application has been successfully submitted and our team will get back to you shortly.</p>
        <Button variant="outline" className="mt-4" onClick={() => setSuccess(false)}>Submit Another</Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md border border-red-200">{error}</div>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium mb-1.5 text-slate-700">Company Name <span className="text-red-500">*</span></label>
          <input {...register("companyName")} className="w-full border border-gray-200 rounded-lg p-3 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F58220]/20 focus:border-[#F58220] hover:border-[#F58220]/50 transition-all duration-300 shadow-sm placeholder:text-gray-400" placeholder="e.g. Reliance Energy" />
          {errors.companyName && <span className="text-red-500 text-xs mt-1 block">{errors.companyName.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5 text-slate-700">Contact Person <span className="text-red-500">*</span></label>
          <input {...register("contactPerson")} className="w-full border border-gray-200 rounded-lg p-3 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F58220]/20 focus:border-[#F58220] hover:border-[#F58220]/50 transition-all duration-300 shadow-sm placeholder:text-gray-400" placeholder="e.g. Rajesh Kumar" />
          {errors.contactPerson && <span className="text-red-500 text-xs mt-1 block">{errors.contactPerson.message}</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium mb-1.5 text-slate-700">Email <span className="text-red-500">*</span></label>
          <input type="email" {...register("email")} className="w-full border border-gray-200 rounded-lg p-3 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F58220]/20 focus:border-[#F58220] hover:border-[#F58220]/50 transition-all duration-300 shadow-sm placeholder:text-gray-400" placeholder="e.g. rajesh@company.in" />
          {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5 text-slate-700">Phone <span className="text-red-500">*</span></label>
          <input type="tel" {...register("phone")} className="w-full border border-gray-200 rounded-lg p-3 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F58220]/20 focus:border-[#F58220] hover:border-[#F58220]/50 transition-all duration-300 shadow-sm placeholder:text-gray-400" placeholder="+91 98765 43210" />
          {errors.phone && <span className="text-red-500 text-xs mt-1 block">{errors.phone.message}</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium mb-1.5 text-slate-700">Product Category <span className="text-red-500">*</span></label>
          <div className="relative">
            <div 
              onClick={() => setOpenDropdown(openDropdown === 'category' ? null : 'category')}
              className={`w-full border ${openDropdown === 'category' ? 'border-[#F58220] ring-2 ring-[#F58220]/20' : 'border-gray-200'} rounded-lg p-3 pr-10 bg-white text-slate-800 hover:border-[#F58220]/50 transition-all duration-300 cursor-pointer shadow-sm select-none`}
            >
              <span className={watch("productCategory") ? "text-slate-800" : "text-gray-400"}>
                {watch("productCategory") || "Select a category"}
              </span>
            </div>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#F58220]">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${openDropdown === 'category' ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
            </div>
            
            {openDropdown === 'category' && (
              <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-lg shadow-[0_12px_40px_rgb(0,0,0,0.08)] overflow-hidden py-1">
                {["BESS", "ESS", "UPS / DATA CENTER BATTERY", "OEMS CUSTOMISED", "EV / TRACTION BATTERY SOLUTION"].map((opt) => (
                  <div 
                    key={opt}
                    onClick={() => { setValue("productCategory", opt, { shouldValidate: true }); setOpenDropdown(null); }}
                    className={`px-4 py-2.5 cursor-pointer transition-colors text-sm ${watch("productCategory") === opt ? 'bg-[#F58220]/10 text-[#F58220] font-medium' : 'text-slate-700 hover:bg-slate-50 hover:text-[#F58220]'}`}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>
          {errors.productCategory && <span className="text-red-500 text-xs mt-1 block">{errors.productCategory.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5 text-slate-700">Experience in Battery Industry <span className="text-red-500">*</span></label>
          <div className="relative">
            <div 
              onClick={() => setOpenDropdown(openDropdown === 'experience' ? null : 'experience')}
              className={`w-full border ${openDropdown === 'experience' ? 'border-[#F58220] ring-2 ring-[#F58220]/20' : 'border-gray-200'} rounded-lg p-3 pr-10 bg-white text-slate-800 hover:border-[#F58220]/50 transition-all duration-300 cursor-pointer shadow-sm select-none`}
            >
              <span className={watch("experience") ? "text-slate-800" : "text-gray-400"}>
                {watch("experience") || "Select experience"}
              </span>
            </div>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#F58220]">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${openDropdown === 'experience' ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
            </div>
            
            {openDropdown === 'experience' && (
              <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-lg shadow-[0_12px_40px_rgb(0,0,0,0.08)] overflow-hidden py-1">
                {["No Experience", "1-3 Years", "3-5 Years", "5+ Years"].map((opt) => (
                  <div 
                    key={opt}
                    onClick={() => { setValue("experience", opt, { shouldValidate: true }); setOpenDropdown(null); }}
                    className={`px-4 py-2.5 cursor-pointer transition-colors text-sm ${watch("experience") === opt ? 'bg-[#F58220]/10 text-[#F58220] font-medium' : 'text-slate-700 hover:bg-slate-50 hover:text-[#F58220]'}`}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>
          {errors.experience && <span className="text-red-500 text-xs mt-1 block">{errors.experience.message}</span>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5 text-slate-700">Message</label>
        <textarea {...register("message")} rows={4} className="w-full border border-gray-200 rounded-lg p-3 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F58220]/20 focus:border-[#F58220] hover:border-[#F58220]/50 transition-all duration-300 shadow-sm placeholder:text-gray-400" placeholder="Tell us about your business and why you'd like to partner with PowerMetz..." />
        {errors.message && <span className="text-red-500 text-xs mt-1 block">{errors.message.message}</span>}
      </div>

      <div className="pt-2">
        <Turnstile
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"}
          onSuccess={(token) => setTurnstileToken(token)}
          onError={() => setTurnstileToken(null)}
          onExpire={() => setTurnstileToken(null)}
        />
      </div>

      <Button type="submit" disabled={isSubmitting || !turnstileToken} className={`w-full md:w-auto mt-6 rounded-lg px-8 py-6 text-base font-medium transition-all flex items-center justify-center ${isSubmitting || !turnstileToken ? "bg-slate-300 text-slate-500 cursor-not-allowed shadow-none" : "bg-[#F58220] hover:bg-[#F58220]/90 text-white shadow-md"}`}>
        {isSubmitting ? "Submitting..." : (
          <>
            Submit Registration<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 rotate-45"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
          </>
        )}
      </Button>
    </form>
  )
}
