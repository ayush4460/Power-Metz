"use client"

import { useState } from "react"
import Link from "next/link"
import { H3, Paragraph } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Power, Briefcase, Edit2, ExternalLink } from "lucide-react"
import { deleteJob, toggleJobStatus } from "./actions"

type JobDepartment = {
  id: string
  name: string
  isActive: boolean
}

type JobOpening = {
  id: string
  title: string
  departmentId: string | null
  department: JobDepartment | null
  location: string
  type: string
  description: string
  isActive: boolean
  createdAt: Date
}

export function JobsClient({ initialJobs, departments }: { initialJobs: JobOpening[], departments: JobDepartment[] }) {
  const [jobs, setJobs] = useState<JobOpening[]>(initialJobs)
  
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
          <p className="text-muted-foreground mt-1 text-sm">Manage open positions for the Career section</p>
        </div>
        <Link href="/admin/jobs/new">
          <Button className="bg-primary hover:bg-primary/90 text-white">
            <Plus className="w-4 h-4 mr-2" /> Add Job
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-6">
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
                  <h4 className="font-semibold text-lg pr-4 truncate" title={job.title}>{job.title}</h4>
                </div>
                <div className="text-sm text-muted-foreground mt-2 space-y-1">
                  <p><span className="font-medium text-black">Dept:</span> {job.department?.name || <span className="text-red-500 text-xs italic">Unassigned</span>}</p>
                  <p><span className="font-medium text-black">Location:</span> {job.location}</p>
                  <p><span className="font-medium text-black">Type:</span> {job.type}</p>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
                <Link href={`/career/${job.id}`} target="_blank">
                  <Button 
                    variant="outline" 
                    size="sm"
                    title="View Job Post"
                    type="button"
                  >
                    <ExternalLink className="w-4 h-4 text-blue-500" />
                  </Button>
                </Link>
                <Link href={`/admin/jobs/${job.id}`}>
                  <Button 
                    variant="outline" 
                    size="sm"
                    title="Edit"
                    type="button"
                  >
                    <Edit2 className="w-4 h-4 text-gray-500" />
                  </Button>
                </Link>
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
