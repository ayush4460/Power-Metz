"use client"

import { useState } from "react"
import { useFormStatus } from "react-dom"
import { createDepartment, updateDepartment, deleteDepartment } from "@/app/admin/departments/actions"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2 } from "lucide-react"

function SubmitButton({ isEdit }: { isEdit: boolean }) {
  const { pending } = useFormStatus()
  
  return (
    <Button type="submit" disabled={pending} className="bg-primary text-white hover:bg-primary/90">
      {pending ? "Saving..." : isEdit ? "Save Changes" : "Create Department"}
    </Button>
  )
}

export function DepartmentDialog({ department }: { department?: any }) {
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const isEdit = !!department

  async function clientAction(formData: FormData) {
    setError(null)
    const result = isEdit 
      ? await updateDepartment(department.id, null, formData)
      : await createDepartment(null, formData)

    if (result.success) {
      setIsOpen(false)
    } else {
      setError(result.message || "An error occurred")
    }
  }

  async function handleDelete() {
    if (confirm("Are you sure you want to delete this department?")) {
      setIsDeleting(true)
      const result = await deleteDepartment(department.id)
      if (result.success) {
        setIsOpen(false)
      } else {
        setError(result.message || "Failed to delete department")
        setIsDeleting(false)
      }
    }
  }

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        variant={isEdit ? "ghost" : "default"}
        size={isEdit ? "sm" : "default"}
        className={isEdit ? "text-primary hover:text-primary hover:bg-primary/10" : "bg-primary text-white hover:bg-primary/90"}
      >
        {isEdit ? <Pencil className="w-4 h-4" /> : <><Plus className="w-4 h-4 mr-2" /> Add Department</>}
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-800">
                {isEdit ? "Edit Department" : "Add Department"}
              </h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                ✕
              </button>
            </div>

            <form action={clientAction} className="p-6 space-y-4">
              {error && (
                <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg">
                  {error}
                </div>
              )}

              <div className="space-y-2 text-left">
                <label className="block text-sm font-medium mb-1.5 text-slate-700">Department Name <span className="text-red-500">*</span></label>
                <input 
                  name="name" 
                  defaultValue={department?.name || ""} 
                  required 
                  className="w-full border border-gray-200 rounded-lg p-3 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F58220]/20 focus:border-[#F58220] hover:border-[#F58220]/50 transition-all duration-300 shadow-sm placeholder:text-gray-400"
                  placeholder="e.g. Engineering, Sales"
                />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input 
                  type="checkbox" 
                  id={`isActive-${department?.id || 'new'}`}
                  name="isActive" 
                  defaultChecked={isEdit ? department.isActive : true}
                  className="w-4 h-4 text-primary rounded focus:ring-primary"
                />
                <label htmlFor={`isActive-${department?.id || 'new'}`} className="text-sm font-medium text-slate-700 cursor-pointer">
                  Active
                </label>
              </div>

              <div className="pt-4 flex items-center justify-between">
                {isEdit ? (
                  <Button 
                    type="button" 
                    variant="ghost" 
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={handleDelete}
                    disabled={isDeleting}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    {isDeleting ? "Deleting..." : "Delete"}
                  </Button>
                ) : (
                  <div></div>
                )}
                
                <div className="flex gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <SubmitButton isEdit={isEdit} />
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
