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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name <span className="text-red-500">*</span></label>
          <input {...register("name")} className="w-full border rounded-md p-2 bg-background" />
          {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email <span className="text-red-500">*</span></label>
          <input type="email" {...register("email")} className="w-full border rounded-md p-2 bg-background" />
          {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Phone <span className="text-red-500">*</span></label>
          <input type="tel" {...register("phone")} className="w-full border rounded-md p-2 bg-background" />
          {errors.phone && <span className="text-red-500 text-xs">{errors.phone.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Location <span className="text-red-500">*</span></label>
          <input {...register("location")} className="w-full border rounded-md p-2 bg-background" />
          {errors.location && <span className="text-red-500 text-xs">{errors.location.message}</span>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Product Interest / Requirements <span className="text-red-500">*</span></label>
        <textarea {...register("productInterest")} rows={4} className="w-full border rounded-md p-2 bg-background" />
        {errors.productInterest && <span className="text-red-500 text-xs">{errors.productInterest.message}</span>}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
        {isSubmitting ? "Submitting..." : "Submit Inquiry"}
      </Button>
    </form>
  )
}
