"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"


const JobSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  department: z.string().min(2, "Department is required."),
  location: z.string().min(2, "Location is required."),
  type: z.string().min(2, "Job Type is required."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  isActive: z.boolean().default(true),
})

export async function getJobs() {
  return await prisma.jobOpening.findMany({
    orderBy: { createdAt: "desc" },
  })
}

export async function createJob(prevState: any, formData: FormData) {
  try {
    const rawData = {
      title: formData.get("title") as string,
      department: formData.get("department") as string,
      location: formData.get("location") as string,
      type: formData.get("type") as string,
      description: formData.get("description") as string,
      isActive: formData.get("isActive") === "true" || formData.get("isActive") === "on",
    }

    const validatedData = JobSchema.parse(rawData)

    await prisma.jobOpening.create({
      data: validatedData,
    })

    revalidatePath("/admin/jobs")
    return { success: true, message: "Job created successfully." }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten().fieldErrors, message: "Validation error" }
    }
    return { success: false, message: "Failed to create job." }
  }
}

export async function deleteJob(id: string) {
  try {
    await prisma.jobOpening.delete({
      where: { id },
    })
    revalidatePath("/admin/jobs")
    return { success: true, message: "Job deleted successfully." }
  } catch (error) {
    return { success: false, message: "Failed to delete job." }
  }
}

export async function toggleJobStatus(id: string, isActive: boolean) {
  try {
    await prisma.jobOpening.update({
      where: { id },
      data: { isActive },
    })
    revalidatePath("/admin/jobs")
    return { success: true, message: "Job status updated." }
  } catch (error) {
    return { success: false, message: "Failed to update job status." }
  }
}
