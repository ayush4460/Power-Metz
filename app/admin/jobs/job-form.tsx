"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { H3 } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"
import { createJob, updateJob } from "./actions"
import { RichTextEditor } from "@/components/admin/rich-text-editor"
import { PageHeader } from "@/components/ui/page-header"
import { ArrowLeft } from "lucide-react"

type JobDepartment = {
  id: string
  name: string
  isActive: boolean
}

type JobOpening = {
  id: string
  title: string
  departmentId: string | null
  location: string
  type: string
  description: string
  isActive: boolean
}

export function JobForm({ 
  job, 
  departments 
}: { 
  job?: JobOpening | null
  departments: JobDepartment[] 
}) {
  const router = useRouter()
  const isEditing = !!job
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(job?.departmentId || "")
  const [selectedType, setSelectedType] = useState(job?.type || "")
  const [description, setDescription] = useState(job?.description || "")
  
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)
    
    const formData = new FormData(e.currentTarget)
    
    // Add default active state since we removed the checkbox
    formData.set("isActive", "on")
    // Add the rich text description
    formData.set("description", description)
    
    let res;
    if (isEditing && job) {
      res = await updateJob(job.id, formData)
    } else {
      res = await createJob(null, formData)
    }
    
    if (res.success) {
      router.push("/admin/jobs")
      router.refresh()
    } else {
      setError(res.message || "An error occurred")
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full space-y-8">
      {/* ── Header ── */}
      <PageHeader 
        title={
          <div className="flex items-center gap-2">
            <Link href="/admin/jobs" className="p-1 hover:bg-muted rounded-full transition-colors text-muted-foreground mr-1">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            {isEditing ? "Edit Job Opening" : "Create New Job Opening"}
          </div>
        }
      />

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-border shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-slate-700">Job Title <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                name="title" 
                required 
                className="w-full border border-gray-200 rounded-lg p-3 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F58220]/20 focus:border-[#F58220] hover:border-[#F58220]/50 transition-all duration-300 shadow-sm placeholder:text-gray-400" 
                placeholder="e.g. Senior Software Engineer" 
                defaultValue={job?.title || ""} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-slate-700">Department <span className="text-red-500">*</span></label>
              <input type="hidden" name="departmentId" value={selectedDepartmentId} required />
              <div className="relative">
                <div 
                  onClick={() => setOpenDropdown(openDropdown === 'department' ? null : 'department')}
                  className={`w-full border ${openDropdown === 'department' ? 'border-[#F58220] ring-2 ring-[#F58220]/20' : 'border-gray-200'} rounded-lg p-3 pr-10 bg-white text-slate-800 hover:border-[#F58220]/50 transition-all duration-300 cursor-pointer shadow-sm select-none`}
                >
                  <span className={selectedDepartmentId ? "text-slate-800" : "text-gray-400"}>
                    {selectedDepartmentId ? departments.find(d => d.id === selectedDepartmentId)?.name : "Select a department..."}
                  </span>
                </div>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#F58220]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${openDropdown === 'department' ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
                </div>
                
                {openDropdown === 'department' && (
                  <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-lg shadow-[0_12px_40px_rgb(0,0,0,0.08)] overflow-hidden py-1">
                    {departments.filter(d => d.isActive).map(d => (
                      <div 
                        key={d.id}
                        onClick={() => { setSelectedDepartmentId(d.id); setOpenDropdown(null); }}
                        className={`px-4 py-2.5 cursor-pointer transition-colors text-sm ${selectedDepartmentId === d.id ? 'bg-[#F58220]/10 text-[#F58220] font-medium' : 'text-slate-700 hover:bg-slate-50 hover:text-[#F58220]'}`}
                      >
                        {d.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-slate-700">Location <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                name="location" 
                required 
                className="w-full border border-gray-200 rounded-lg p-3 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F58220]/20 focus:border-[#F58220] hover:border-[#F58220]/50 transition-all duration-300 shadow-sm placeholder:text-gray-400" 
                placeholder="e.g. Remote / Mumbai" 
                defaultValue={job?.location || ""} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-slate-700">Job Type <span className="text-red-500">*</span></label>
              <input type="hidden" name="type" value={selectedType} required />
              <div className="relative">
                <div 
                  onClick={() => setOpenDropdown(openDropdown === 'type' ? null : 'type')}
                  className={`w-full border ${openDropdown === 'type' ? 'border-[#F58220] ring-2 ring-[#F58220]/20' : 'border-gray-200'} rounded-lg p-3 pr-10 bg-white text-slate-800 hover:border-[#F58220]/50 transition-all duration-300 cursor-pointer shadow-sm select-none`}
                >
                  <span className={selectedType ? "text-slate-800" : "text-gray-400"}>
                    {selectedType ? selectedType : "Select job type..."}
                  </span>
                </div>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#F58220]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${openDropdown === 'type' ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
                </div>
                
                {openDropdown === 'type' && (
                  <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-lg shadow-[0_12px_40px_rgb(0,0,0,0.08)] overflow-hidden py-1">
                    {["Full-time", "Part-time", "Contract", "Internship"].map((opt) => (
                      <div 
                        key={opt}
                        onClick={() => { setSelectedType(opt); setOpenDropdown(null); }}
                        className={`px-4 py-2.5 cursor-pointer transition-colors text-sm ${selectedType === opt ? 'bg-[#F58220]/10 text-[#F58220] font-medium' : 'text-slate-700 hover:bg-slate-50 hover:text-[#F58220]'}`}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1.5 text-slate-700">Description <span className="text-red-500">*</span></label>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <RichTextEditor 
                content={description} 
                onChange={setDescription}
                slug={job?.id ? `job-${job.id}` : 'new-job'}
              />
            </div>
          </div>
          
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 text-sm font-medium">
              {error}
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => router.push("/admin/jobs")}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-primary hover:bg-primary/90 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : isEditing ? "Save Changes" : "Publish"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
