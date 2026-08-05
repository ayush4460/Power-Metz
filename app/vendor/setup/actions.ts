"use server"

import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function setupVendorPassword(token: string, password: string) {
  try {
    if (!token || token.length < 10) {
      return { success: false, error: "Invalid token" }
    }

    if (password.length < 8) {
      return { success: false, error: "Password must be at least 8 characters long." }
    }
    if (!/[A-Z]/.test(password)) {
      return { success: false, error: "Password must contain at least one uppercase letter." }
    }
    if (!/[a-z]/.test(password)) {
      return { success: false, error: "Password must contain at least one lowercase letter." }
    }
    if (!/[0-9]/.test(password)) {
      return { success: false, error: "Password must contain at least one number." }
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      return { success: false, error: "Password must contain at least one special character." }
    }

    const user = await prisma.user.findUnique({
      where: { setupToken: token }
    })

    if (!user) {
      return { success: false, error: "Invalid or expired setup link." }
    }

    if (user.setupTokenExpiresAt && user.setupTokenExpiresAt < new Date()) {
      return { success: false, error: "Setup link has expired. Please contact support." }
    }

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        setupToken: null, // Wipe token to ensure single use
        setupTokenExpiresAt: null
      }
    })

    return { success: true }
  } catch (error) {
    console.error("Failed to setup password:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}
