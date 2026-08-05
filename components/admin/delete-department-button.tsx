"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { deleteDepartment } from "@/app/admin/departments/actions"

export function DeleteDepartmentButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDelete() {
    if (confirm("Are you sure you want to delete this department?")) {
      setIsDeleting(true)
      const result = await deleteDepartment(id)
      if (!result.success) {
        alert(result.message || "Failed to delete department")
        setIsDeleting(false)
      }
    }
  }

  return (
    <Button 
      onClick={handleDelete}
      disabled={isDeleting}
      variant="ghost"
      size="sm"
      className="text-red-500 hover:text-red-600 hover:bg-red-50 ml-1"
      title="Delete Department"
    >
      <Trash2 className="w-4 h-4" />
    </Button>
  )
}
