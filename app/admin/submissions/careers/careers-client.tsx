"use client"

import { useState } from "react"
import Link from "next/link"
import { User, Mail, Briefcase, FileText, Search, ChevronDown } from "lucide-react"
import { CoverLetterModal } from "./cover-letter-modal"

type Application = {
  id: string
  jobId: string
  name: string
  email: string
  coverLetter: string | null
  resumeUrl: string
  isRead: boolean
  createdAt: Date
  job: {
    title: string
  }
}

type JobOption = {
  id: string
  title: string
}

export function CareersClient({ initialApplications, activeJobs }: { initialApplications: Application[], activeJobs: JobOption[] }) {
  const [applications, setApplications] = useState<Application[]>(initialApplications)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentJob, setCurrentJob] = useState<string>('all')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Filter applications based on search query and selected job
  const filteredApps = applications.filter(app => {
    if (searchQuery) {
      if (!app.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }
    }
    if (currentJob !== 'all' && app.jobId !== currentJob) {
      return false
    }
    return true
  })

  const jobOptions = [
    { value: 'all', label: `All Jobs (${applications.length})` },
    ...activeJobs.map(job => ({
      value: job.id,
      label: `${job.title} (${applications.filter(a => a.jobId === job.id).length})`
    }))
  ]
  const currentOption = jobOptions.find(o => o.value === currentJob) || jobOptions[0]

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-1 mb-6">
        <div className="relative w-full flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text"
            placeholder="Search applications by applicant name..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#F58220]/20 focus:border-[#F58220] transition-colors shadow-sm placeholder:text-gray-400"
          />
        </div>

        <div className="relative w-full sm:w-48 shrink-0">
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
              {jobOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    setCurrentJob(opt.value)
                    setIsDropdownOpen(false)
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                    currentJob === opt.value
                      ? 'bg-[#F58220]/10 text-[#F58220] font-medium'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-[#F58220]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile/Tablet Card View */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:hidden">
        {filteredApps.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground border border-border rounded-xl col-span-full bg-white">
            <Search className="w-8 h-8 mx-auto mb-3 text-gray-300" />
            No job applications match your search.
          </div>
        ) : (
          filteredApps.map(app => (
            <div key={app.id} className="bg-white border border-border rounded-xl p-4 shadow-sm space-y-3 flex flex-col">
              <div className="border-b border-border pb-3 flex flex-col gap-2">
                <Link 
                  href={`/career/${app.jobId}`} 
                  target="_blank" 
                  className="flex items-start gap-2 font-medium hover:text-[#F58220] transition-colors text-sm"
                >
                  <Briefcase className="w-4 h-4 text-[#F58220] shrink-0 mt-0.5" />
                  <span className="leading-tight break-words">{app.job.title}</span>
                </Link>
                <div className="flex items-center gap-2 text-muted-foreground ml-6">
                  <div className="text-sm font-medium text-foreground">
                    {new Date(app.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                  </div>
                  <span className="text-[10px]">•</span>
                  <div className="text-xs">
                    {new Date(app.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 pt-1 text-sm flex-grow">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="truncate">{app.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                  <a href={`mailto:${app.email}`} className="text-primary hover:underline truncate">{app.email}</a>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border mt-auto">
                <CoverLetterModal coverLetter={app.coverLetter} />
                <a 
                  href={app.resumeUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#F58220] hover:underline font-medium text-sm bg-[#F58220]/10 px-3 py-1.5 rounded-lg transition-colors hover:bg-[#F58220]/20"
                >
                  <FileText className="w-3.5 h-3.5" />
                  Resume
                </a>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden xl:block overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
            <tr>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Job Title</th>
              <th className="px-4 py-3 font-medium">Applicant Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Cover Letter</th>
              <th className="px-4 py-3 font-medium">Resume</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-white">
            {filteredApps.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">No job applications match your search.</td></tr>
            ) : (
              filteredApps.map(app => (
                <tr key={app.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      <div className="text-sm text-foreground">
                        {new Date(app.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(app.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Link 
                      href={`/career/${app.jobId}`} 
                      target="_blank" 
                      className="flex items-center gap-2 font-medium hover:text-[#F58220] transition-colors"
                    >
                      <Briefcase className="w-4 h-4 text-[#F58220]" />
                      {app.job.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      {app.name}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <a href={`mailto:${app.email}`} className="text-primary hover:underline">{app.email}</a>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <CoverLetterModal coverLetter={app.coverLetter} />
                  </td>
                  <td className="px-4 py-3">
                    <a 
                      href={app.resumeUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-[#F58220] hover:underline font-medium"
                    >
                      <FileText className="w-4 h-4" />
                      View Resume
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
