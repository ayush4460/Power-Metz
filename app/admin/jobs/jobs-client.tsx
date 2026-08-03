"use client"

import { useState } from "react"
import { H3, Paragraph } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Power, Briefcase } from "lucide-react"
import { createJob, deleteJob, toggleJobStatus } from "./actions"

type JobOpening = {
  id: string
  title: string
  department: string
  location: string
  type: string
  description: string
  isActive: boolean
  createdAt: Date
}

export function JobsClient({ initialJobs }: { initialJobs: JobOpening[] }) {
  const [jobs, setJobs] = useState<JobOpening[]>(initialJobs)
  const [isAdding, setIsAdding] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  async function handleAddJob(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)
    
    const res = await createJob(null, formData)
    
    if (res.success) {
      setIsAdding(false)
      // Optimistic or real refresh needed, for now just reload page
      window.location.reload()
    } else {
      setError(res.message || "An error occurred")
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this job?")) return
    const res = await deleteJob(id)
    if (res.success) {
      setJobs(jobs.filter(j => j.id !== id))
    } else {
      alert(res.message)
    }
  }

  async function handleToggleStatus(id: string, currentStatus: boolean) {
    const res = await toggleJobStatus(id, !currentStatus)
    if (res.success) {
      setJobs(jobs.map(j => j.id === id ? { ...j, isActive: !currentStatus } : j))
    } else {
      alert(res.message)
    }
  }

  return (
    <div className="w-full space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <H3>Career Job Openings</H3>
          <Paragraph className="text-muted-foreground mt-1">Manage open positions for the Career section</Paragraph>
        </div>
        <Button onClick={() => setIsAdding(!isAdding)} className="bg-primary hover:bg-primary/90 text-white">
          {isAdding ? "Cancel" : <><Plus className="w-4 h-4 mr-2" /> Add Job</>}
        </Button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
          <form onSubmit={handleAddJob} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Job Title</label>
                <input type="text" name="title" required className="w-full border rounded-md p-2" placeholder="e.g. Senior Software Engineer" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Department</label>
                <input type="text" name="department" required className="w-full border rounded-md p-2" placeholder="e.g. Engineering" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input type="text" name="location" required className="w-full border rounded-md p-2" placeholder="e.g. Remote / Mumbai" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Job Type</label>
                <select name="type" required className="w-full border rounded-md p-2">
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea name="description" required rows={4} className="w-full border rounded-md p-2" placeholder="Describe the role..."></textarea>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" name="isActive" id="isActive" defaultChecked className="w-4 h-4" />
              <label htmlFor="isActive" className="text-sm font-medium">Publish immediately (Active)</label>
            </div>
            
            {error && <p className="text-red-500 text-sm">{error}</p>}
            
            <Button type="submit">Save Job Opening</Button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.length === 0 ? (
          <div className="col-span-full py-12 text-center text-muted-foreground bg-gray-50 rounded-lg border border-dashed">
            <Briefcase className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No job openings found. Create your first one!</p>
          </div>
        ) : (
          jobs.map(job => (
            <div key={job.id} className="bg-white border rounded-lg p-5 flex flex-col justify-between shadow-sm relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-2 h-full ${job.isActive ? 'bg-green-500' : 'bg-gray-300'}`} />
              <div>
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold text-lg pr-4">{job.title}</h4>
                </div>
                <div className="text-sm text-muted-foreground mt-2 space-y-1">
                  <p><span className="font-medium text-black">Dept:</span> {job.department}</p>
                  <p><span className="font-medium text-black">Location:</span> {job.location}</p>
                  <p><span className="font-medium text-black">Type:</span> {job.type}</p>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleToggleStatus(job.id, job.isActive)}
                  title={job.isActive ? "Deactivate" : "Activate"}
                >
                  <Power className={`w-4 h-4 ${job.isActive ? 'text-green-500' : 'text-gray-400'}`} />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={() => handleDelete(job.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
