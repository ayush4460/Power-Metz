"use server"

import { headers } from "next/headers"

import prisma from "@/lib/prisma"


import nodemailer from 'nodemailer'
import * as bcrypt from 'bcryptjs'
import { Role } from '../../../prisma/generated/prisma/client'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function approveVendor(id: string) {
  const vendor = await prisma.vendorSubmission.findUnique({ where: { id } })
  if (!vendor) throw new Error("Vendor not found")

  // Generate a secure 8-character password
  const password = Math.random().toString(36).slice(-8)
  const passwordHash = await bcrypt.hash(password, 10)

  // Update status and create User account
  await prisma.$transaction([
    prisma.vendorSubmission.update({
      where: { id },
      data: { status: "APPROVED" }
    }),
    prisma.user.upsert({
      where: { email: vendor.email },
      update: {
        passwordHash,
        role: Role.VENDOR,
        vendorSubmissionId: id
      },
      create: {
        email: vendor.email,
        passwordHash,
        role: Role.VENDOR,
        vendorSubmissionId: id
      }
    })
  ])

  const headersList = await headers()
  const host = headersList.get('host') || 'localhost:3000'
  const protocol = host.includes('localhost') ? 'http' : 'https'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || `${protocol}://${host}`

  // Send approval email with credentials
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: vendor.email,
    subject: 'Welcome to the PowerMetz Vendor Portal',
    text: `Hello ${vendor.contactPerson},

Your vendor application has been approved! 
You can now log in to the PowerMetz Vendor Portal.

Login URL: ${siteUrl}/vendor/login
Email: ${vendor.email}
Password: ${password}

Please change your password upon logging in.

Best,
The PowerMetz Team`,
  }
  
  await transporter.sendMail(mailOptions)
  return { success: true }
}

export async function rejectVendor(id: string) {
  await prisma.vendorSubmission.update({
    where: { id },
    data: { status: "REJECTED" }
  })
  return { success: true }
}

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
