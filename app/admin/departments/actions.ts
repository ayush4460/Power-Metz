"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const DepartmentSchema = z.object({
  name: z.string().min(2, "Department name must be at least 2 characters."),
  isActive: z.boolean().default(true),
})

export async function getDepartments() {
  return await prisma.jobDepartment.findMany({
    orderBy: { createdAt: "asc" },
  })
}

export async function createDepartment(prevState: any, formData: FormData) {
  try {
    const rawData = {
      name: formData.get("name") as string,
      isActive: formData.get("isActive") === "true" || formData.get("isActive") === "on",
    }

    const validatedData = DepartmentSchema.parse(rawData)

    await prisma.jobDepartment.create({
      data: validatedData,
    })

    revalidatePath("/admin/departments")
    return { success: true, message: "Department created successfully." }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten().fieldErrors, message: "Validation error" }
    }
    return { success: false, message: "Failed to create department. Make sure the name is unique." }
  }
}

export async function updateDepartment(id: string, prevState: any, formData: FormData) {
  try {
    const rawData = {
      name: formData.get("name") as string,
      isActive: formData.get("isActive") === "true" || formData.get("isActive") === "on",
    }

    const validatedData = DepartmentSchema.parse(rawData)

    await prisma.jobDepartment.update({
      where: { id },
      data: validatedData,
    })

    revalidatePath("/admin/departments")
    return { success: true, message: "Department updated successfully." }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten().fieldErrors, message: "Validation error" }
    }
    return { success: false, message: "Failed to update department. Make sure the name is unique." }
  }
}

export async function deleteDepartment(id: string) {
  try {
    // Check if any jobs are using this department
    const jobsCount = await prisma.jobOpening.count({
      where: { departmentId: id },
    })

    if (jobsCount > 0) {
      return { success: false, message: `Cannot delete department because it is currently assigned to ${jobsCount} job(s). Please reassign or delete those jobs first.` }
    }

    await prisma.jobDepartment.delete({
      where: { id },
    })
    
    revalidatePath("/admin/departments")
    return { success: true, message: "Department deleted successfully." }
  } catch (error) {
    return { success: false, message: "Failed to delete department." }
  }
}
