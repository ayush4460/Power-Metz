"use client"

import { useState } from "react"
import Link from "next/link"
import { Briefcase, ArrowRight, MapPin, Clock, Search } from "lucide-react"

type Job = {
  id: string
  title: string
  location: string
  type: string
  description: string
  department: { name: string } | null
}

type Department = {
  id: string
  name: string
}

export function CareerJobsList({ initialJobs, departments }: { initialJobs: Job[], departments: Department[] }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("ALL")
  const [typeFilter, setTypeFilter] = useState("ALL")
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  // Extract unique job types for the dropdown based on currently available jobs
  const jobTypes = Array.from(new Set(initialJobs.map(job => job.type))).filter(Boolean)

  const filteredJobs = initialJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment = departmentFilter === "ALL" || job.department?.name === departmentFilter
    const matchesType = typeFilter === "ALL" || job.type === typeFilter

    return matchesSearch && matchesDepartment && matchesType
  })

  return (
    <div className="space-y-8">
      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-5">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-200 rounded-lg p-3 pl-10 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F58220]/20 focus:border-[#F58220] hover:border-[#F58220]/50 transition-all duration-300 shadow-sm placeholder:text-gray-400"
          />
        </div>
        
        {/* Department Dropdown */}
        <div className="w-full md:w-56 relative">
          <div 
            onClick={() => setOpenDropdown(openDropdown === 'department' ? null : 'department')}
            className={`w-full border ${openDropdown === 'department' ? 'border-[#F58220] ring-2 ring-[#F58220]/20' : 'border-gray-200'} rounded-lg p-3 pr-10 bg-white text-slate-800 hover:border-[#F58220]/50 transition-all duration-300 cursor-pointer shadow-sm select-none h-full flex items-center`}
          >
            <span className="truncate">
              {departmentFilter === "ALL" ? "All Departments" : departmentFilter}
            </span>
          </div>
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#F58220]">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${openDropdown === 'department' ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
          </div>
          
          {openDropdown === 'department' && (
            <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-lg shadow-[0_12px_40px_rgb(0,0,0,0.08)] overflow-hidden py-1 max-h-60 overflow-y-auto">
              <div 
                className="px-4 py-2 hover:bg-[#F58220]/10 hover:text-[#F58220] cursor-pointer transition-colors text-sm"
                onClick={() => { setDepartmentFilter("ALL"); setOpenDropdown(null); }}
              >
                All Departments
              </div>
              {departments.map(dept => (
                <div 
                  key={dept.id}
                  className="px-4 py-2 hover:bg-[#F58220]/10 hover:text-[#F58220] cursor-pointer transition-colors text-sm"
                  onClick={() => { setDepartmentFilter(dept.name); setOpenDropdown(null); }}
                >
                  {dept.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Type Dropdown */}
        <div className="w-full md:w-56 relative">
          <div 
            onClick={() => setOpenDropdown(openDropdown === 'type' ? null : 'type')}
            className={`w-full border ${openDropdown === 'type' ? 'border-[#F58220] ring-2 ring-[#F58220]/20' : 'border-gray-200'} rounded-lg p-3 pr-10 bg-white text-slate-800 hover:border-[#F58220]/50 transition-all duration-300 cursor-pointer shadow-sm select-none h-full flex items-center`}
          >
            <span className="truncate">
              {typeFilter === "ALL" ? "All Job Types" : typeFilter}
            </span>
          </div>
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#F58220]">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${openDropdown === 'type' ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
          </div>
          
          {openDropdown === 'type' && (
            <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-lg shadow-[0_12px_40px_rgb(0,0,0,0.08)] overflow-hidden py-1 max-h-60 overflow-y-auto">
              <div 
                className="px-4 py-2 hover:bg-[#F58220]/10 hover:text-[#F58220] cursor-pointer transition-colors text-sm"
                onClick={() => { setTypeFilter("ALL"); setOpenDropdown(null); }}
              >
                All Job Types
              </div>
              {jobTypes.map(type => (
                <div 
                  key={type}
                  className="px-4 py-2 hover:bg-[#F58220]/10 hover:text-[#F58220] cursor-pointer transition-colors text-sm"
                  onClick={() => { setTypeFilter(type); setOpenDropdown(null); }}
                >
                  {type}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Jobs List */}
      <div className="flex flex-col gap-4">
        {filteredJobs.length === 0 ? (
          <div className="py-16 text-center text-muted-foreground bg-muted/30 rounded-2xl border border-dashed">
            <Briefcase className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p>No open positions match your search criteria.</p>
            <button 
              onClick={() => {
                setSearchQuery("")
                setDepartmentFilter("ALL")
                setTypeFilter("ALL")
              }}
              className="mt-4 text-[#F58220] hover:underline font-medium text-sm"
            >
              Clear filters
            </button>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <Link 
              key={job.id} 
              href={`/career/${job.id}`}
              className="group block bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-[0_8px_30px_rgb(245,130,32,0.08)] hover:border-[#F58220]/30 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                {/* Left content */}
                <div className="flex-1 space-y-3">
                  {/* Title with Mobile Arrow */}
                  <div className="flex items-center justify-between gap-3">
                    <h4 className="font-bold text-xl text-slate-800">{job.title}</h4>
                    <div className="md:hidden shrink-0 flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 text-gray-400 group-hover:border-[#F58220] group-hover:text-[#F58220] group-hover:bg-[#F58220]/5 transition-all duration-300">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-muted-foreground text-sm line-clamp-2 max-w-4xl">
                    {job.description.replace(/<[^>]+>/g, '')}
                  </p>
                  
                  {/* Meta Info Row */}
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-600 pt-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#F58220]" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#F58220]" />
                      {job.type}
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-[#F58220]" />
                      {job.department?.name || 'General'}
                    </div>
                  </div>
                </div>
                
                {/* Right Arrow Button (Desktop) */}
                <div className="hidden md:flex shrink-0 items-center justify-center w-12 h-12 rounded-full border border-gray-200 text-gray-400 group-hover:border-[#F58220] group-hover:text-[#F58220] group-hover:bg-[#F58220]/5 transition-all duration-300">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
