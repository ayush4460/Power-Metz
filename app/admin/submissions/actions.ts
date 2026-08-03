"use server"

import prisma from "@/lib/prisma"


export async function getVendorSubmissions() {
  return await prisma.vendorSubmission.findMany({
    orderBy: { createdAt: "desc" },
  })
}

export async function getCustomerSubmissions() {
  return await prisma.customerSubmission.findMany({
    orderBy: { createdAt: "desc" },
  })
}

export async function getJobApplications() {
  return await prisma.jobApplication.findMany({
    include: {
      job: {
        select: {
          title: true,
        }
      }
    },
    orderBy: { createdAt: "desc" },
  })
}
