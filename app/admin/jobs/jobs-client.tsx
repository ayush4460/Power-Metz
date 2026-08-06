"use client"

import { useState } from "react"
import Link from "next/link"
import { H3, Paragraph } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Power, Briefcase, Edit2, ExternalLink, Search, ChevronDown } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"
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
  const [searchQuery, setSearchQuery] = useState('')
  const [currentDept, setCurrentDept] = useState<string>('all')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
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
      <PageHeader 
        title="Career Job Openings"
        actionButton={
          <Link href="/admin/jobs/new">
            <Button className="w-full sm:w-auto bg-[#F58220] hover:bg-[#d9731b] text-white">
              <Plus className="w-4 h-4 mr-2" /> Add Job
            </Button>
          </Link>
        }
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-1 -mt-2">
        <div className="relative w-full flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text"
            placeholder="Search jobs by title..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#F58220]/20 focus:border-[#F58220] transition-colors shadow-sm placeholder:text-gray-400"
          />
        </div>

        <div className="relative w-full sm:w-48 shrink-0">
          {(() => {
            const options = [
              { value: 'all', label: `All Departments (${jobs.length})` },
              ...departments.map(d => ({
                value: d.id,
                label: `${d.name} (${jobs.filter(j => j.departmentId === d.id).length})`
              }))
            ]
            const currentOption = options.find(o => o.value === currentDept) || options[0]

            return (
              <>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                  className="w-full flex items-center justify-between px-4 py-2 text-sm bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#F58220]/20 focus:border-[#F58220] transition-colors shadow-sm cursor-pointer text-slate-700"
                >
                  <span className="font-medium truncate mr-2">{currentOption.label}</span>
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-[0_12px_40px_rgb(0,0,0,0.08)] py-1 max-h-60 overflow-y-auto">
                    {options.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setCurrentDept(opt.value)
                          setIsDropdownOpen(false)
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                          currentDept === opt.value
                            ? 'bg-[#F58220]/10 text-[#F58220] font-medium'
                            : 'text-slate-700 hover:bg-slate-50 hover:text-[#F58220]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )
          })()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-6">
        {jobs.length === 0 ? (
          <div className="col-span-full py-12 text-center text-muted-foreground bg-gray-50 rounded-lg border border-dashed">
            <Briefcase className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No job openings found. Create your first one!</p>
          </div>
        ) : (
          (() => {
            const filteredJobs = jobs.filter(job => {
              if (searchQuery && !job.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
              if (currentDept !== 'all' && job.departmentId !== currentDept) return false;
              return true;
            });
            
            if (filteredJobs.length === 0) {
              return (
                <div className="col-span-full py-12 text-center text-muted-foreground bg-gray-50 rounded-lg border border-dashed">
                  <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No job openings match your search criteria.</p>
                </div>
              );
            }

            return filteredJobs.map(job => (
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
          })()
        )}
      </div>
    </div>
  )
}
