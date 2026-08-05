"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"

const customerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  location: z.string().min(2, "Location is required"),
  productInterest: z.string().min(2, "Product interest/requirements are required"),
})

type CustomerFormValues = z.infer<typeof customerSchema>

export function CustomerForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const { register, handleSubmit, formState: { errors }, reset } = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema)
  })

  const onSubmit = async (data: CustomerFormValues) => {
    setIsSubmitting(true)
    setError("")
    
    try {
      const res = await fetch("/api/join-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "customer", payload: data })
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
        <p>Your inquiry has been successfully submitted and our team will get back to you shortly.</p>
        <Button variant="outline" className="mt-4" onClick={() => setSuccess(false)}>Submit Another Inquiry</Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md border border-red-200">{error}</div>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium mb-1.5 text-slate-700">Name <span className="text-red-500">*</span></label>
          <input {...register("name")} className="w-full border border-gray-200 rounded-lg p-3 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F58220]/20 focus:border-[#F58220] hover:border-[#F58220]/50 transition-all duration-300 shadow-sm placeholder:text-gray-400" placeholder="e.g. Rajesh Kumar" />
          {errors.name && <span className="text-red-500 text-xs mt-1 block">{errors.name.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5 text-slate-700">Email <span className="text-red-500">*</span></label>
          <input type="email" {...register("email")} className="w-full border border-gray-200 rounded-lg p-3 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F58220]/20 focus:border-[#F58220] hover:border-[#F58220]/50 transition-all duration-300 shadow-sm placeholder:text-gray-400" placeholder="e.g. rajesh@company.in" />
          {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email.message}</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium mb-1.5 text-slate-700">Phone <span className="text-red-500">*</span></label>
          <input type="tel" {...register("phone")} className="w-full border border-gray-200 rounded-lg p-3 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F58220]/20 focus:border-[#F58220] hover:border-[#F58220]/50 transition-all duration-300 shadow-sm placeholder:text-gray-400" placeholder="+91 98765 43210" />
          {errors.phone && <span className="text-red-500 text-xs mt-1 block">{errors.phone.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5 text-slate-700">Location <span className="text-red-500">*</span></label>
          <input {...register("location")} className="w-full border border-gray-200 rounded-lg p-3 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F58220]/20 focus:border-[#F58220] hover:border-[#F58220]/50 transition-all duration-300 shadow-sm placeholder:text-gray-400" placeholder="e.g. Mumbai, Maharashtra" />
          {errors.location && <span className="text-red-500 text-xs mt-1 block">{errors.location.message}</span>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5 text-slate-700">Product Interest / Requirements <span className="text-red-500">*</span></label>
        <textarea {...register("productInterest")} rows={4} className="w-full border border-gray-200 rounded-lg p-3 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F58220]/20 focus:border-[#F58220] hover:border-[#F58220]/50 transition-all duration-300 shadow-sm placeholder:text-gray-400" placeholder="e.g. I need a 100kWh ESS system for my manufacturing plant..." />
        {errors.productInterest && <span className="text-red-500 text-xs mt-1 block">{errors.productInterest.message}</span>}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto mt-6 bg-[#F58220] hover:bg-[#F58220]/90 text-white rounded-lg px-8 py-6 text-base font-medium shadow-md transition-all flex items-center justify-center">
        {isSubmitting ? "Submitting..." : (
          <>
            Submit Inquiry<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 rotate-45"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
          </>
        )}
      </Button>
    </form>
  )
}
