"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"

const vendorSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  contactPerson: z.string().min(2, "Contact person is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  productCategory: z.string().min(2, "Product category is required"),
  message: z.string().optional(),
})

type VendorFormValues = z.infer<typeof vendorSchema>

export function VendorForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const { register, handleSubmit, formState: { errors }, reset } = useForm<VendorFormValues>({
    resolver: zodResolver(vendorSchema)
  })

  const onSubmit = async (data: VendorFormValues) => {
    setIsSubmitting(true)
    setError("")
    
    try {
      const res = await fetch("/api/join-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "vendor", payload: data })
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Company Name <span className="text-red-500">*</span></label>
          <input {...register("companyName")} className="w-full border rounded-md p-2 bg-background" />
          {errors.companyName && <span className="text-red-500 text-xs">{errors.companyName.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Contact Person <span className="text-red-500">*</span></label>
          <input {...register("contactPerson")} className="w-full border rounded-md p-2 bg-background" />
          {errors.contactPerson && <span className="text-red-500 text-xs">{errors.contactPerson.message}</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email <span className="text-red-500">*</span></label>
          <input type="email" {...register("email")} className="w-full border rounded-md p-2 bg-background" />
          {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone <span className="text-red-500">*</span></label>
          <input type="tel" {...register("phone")} className="w-full border rounded-md p-2 bg-background" />
          {errors.phone && <span className="text-red-500 text-xs">{errors.phone.message}</span>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Product Category <span className="text-red-500">*</span></label>
        <select {...register("productCategory")} className="w-full border rounded-md p-2 bg-background">
          <option value="">Select a category</option>
          <option value="BESS">BESS</option>
          <option value="ESS">ESS</option>
          <option value="UPS / DATA CENTER BATTERY">UPS / DATA CENTER BATTERY</option>
          <option value="OEMS CUSTOMISED">OEMS CUSTOMISED</option>
          <option value="EV / TRACTION BATTERY SOLUTION">EV / TRACTION BATTERY SOLUTION</option>
        </select>
        {errors.productCategory && <span className="text-red-500 text-xs">{errors.productCategory.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Message</label>
        <textarea {...register("message")} rows={4} className="w-full border rounded-md p-2 bg-background" placeholder="Tell us more about your requirements..." />
        {errors.message && <span className="text-red-500 text-xs">{errors.message.message}</span>}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
        {isSubmitting ? "Submitting..." : "Submit Vendor Application"}
      </Button>
    </form>
  )
}
