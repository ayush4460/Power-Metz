"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import crypto from "crypto"
import { sendMail } from "@/lib/mail"
import { getVendorWelcomeEmailHtml } from "./vendor-email-template"

export async function updateVendorStatus(id: string, status: "APPROVED" | "REJECTED" | "PENDING") {
  try {
    const submission = await prisma.vendorSubmission.update({
      where: { id },
      data: { status }
    })

    if (status === "APPROVED") {
      // 1. Generate secure token
      const token = crypto.randomBytes(32).toString("hex")
      const expiresAt = new Date()
      expiresAt.setHours(expiresAt.getHours() + 24) // 24 hour expiry

      // 2. Create the User automatically
      await prisma.user.upsert({
        where: { email: submission.email },
        update: {
          role: "VENDOR",
          vendorSubmissionId: submission.id,
          setupToken: token,
          setupTokenExpiresAt: expiresAt,
        },
        create: {
          email: submission.email,
          role: "VENDOR",
          vendorSubmissionId: submission.id,
          setupToken: token,
          setupTokenExpiresAt: expiresAt,
        }
      })

      // 3. Send email
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      const setupLink = `${appUrl}/vendor/setup?token=${token}`
      
      const html = getVendorWelcomeEmailHtml(submission.companyName, setupLink)
      
      await sendMail({
        to: submission.email,
        subject: "Action Required: Setup Your PowerMetz Vendor Account",
        html
      })
    }
    
    revalidatePath("/admin/submissions/vendors")
    return { success: true }
  } catch (error) {
    console.error("Failed to update vendor status:", error)
    return { success: false, error: "Failed to update status" }
  }
}
