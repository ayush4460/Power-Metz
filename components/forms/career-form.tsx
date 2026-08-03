"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
]

const careerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  coverLetter: z.string().optional(),
  resume: z
    .any()
    .refine((files) => files?.length == 1, "Resume is required.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, "Max file size is 10MB.")
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
      "Only .pdf, .doc and .docx formats are supported."
    ),
})

type CareerFormValues = z.infer<typeof careerSchema>

export function CareerForm({ jobId, jobTitle }: { jobId: string, jobTitle: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const { register, handleSubmit, formState: { errors }, reset } = useForm<CareerFormValues>({
    resolver: zodResolver(careerSchema)
  })

  const onSubmit = async (data: CareerFormValues) => {
    setIsSubmitting(true)
    setError("")
    
    try {
      const formData = new FormData()
      formData.append("jobId", jobId)
      formData.append("name", data.name)
      formData.append("email", data.email)
      if (data.coverLetter) formData.append("coverLetter", data.coverLetter)
      formData.append("resume", data.resume[0])

      const res = await fetch("/api/join-us/career", {
        method: "POST",
        body: formData // No Content-Type header so browser sets multipart/form-data with boundary
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
        <h4 className="text-xl font-bold mb-2">Thank you for applying!</h4>
        <p>Your application for {jobTitle} has been successfully submitted and our team will get back to you shortly.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md border border-red-200">{error}</div>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name <span className="text-red-500">*</span></label>
          <input {...register("name")} className="w-full border rounded-md p-2 bg-background" />
          {errors.name && <span className="text-red-500 text-xs">{errors.name.message as string}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email <span className="text-red-500">*</span></label>
          <input type="email" {...register("email")} className="w-full border rounded-md p-2 bg-background" />
          {errors.email && <span className="text-red-500 text-xs">{errors.email.message as string}</span>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Upload Resume (PDF, DOC, DOCX - Max 10MB) <span className="text-red-500">*</span></label>
        <input 
          type="file" 
          accept=".pdf,.doc,.docx" 
          {...register("resume")} 
          className="w-full border rounded-md p-2 bg-background file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90" 
        />
        {errors.resume && <span className="text-red-500 text-xs">{errors.resume.message as string}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Cover Letter</label>
        <textarea {...register("coverLetter")} rows={5} className="w-full border rounded-md p-2 bg-background" placeholder="Tell us why you are a great fit..." />
        {errors.coverLetter && <span className="text-red-500 text-xs">{errors.coverLetter.message as string}</span>}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
        {isSubmitting ? "Submitting Application..." : "Submit Application"}
      </Button>
    </form>
  )
}
