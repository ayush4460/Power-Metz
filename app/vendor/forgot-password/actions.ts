"use server"

import prisma from "@/lib/prisma"
import crypto from "crypto"
import nodemailer from "nodemailer"
import bcrypt from "bcryptjs"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function requestPasswordReset(email: string) {
  try {
    // We always return the same generic success message for security to prevent email enumeration
    const successResponse = { success: true, message: "If this email is registered, a reset link has been sent." }

    if (!email) {
      return { success: false, error: "Email is required" }
    }

    // Explicitly check for user with email AND role VENDOR
    const user = await prisma.user.findFirst({
      where: { 
        email: email,
        role: "VENDOR"
      }
    })

    if (!user) {
      // Return success anyway, but do not send email
      return successResponse
    }

    // Generate secure token
    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000) // 1 hour

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken: token,
        resetTokenExpiresAt: expiresAt
      }
    })

    // Prepare email
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/vendor/reset-password?token=${token}`

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: "Password Reset Request - PowerMetz Vendor Network",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #000; padding: 20px; text-align: center;">
            <h2 style="color: #fff; margin: 0;">PowerMetz Energy</h2>
          </div>
          <div style="padding: 30px;">
            <p>Hello,</p>
            <p>We received a request to reset your password for the PowerMetz Vendor Network.</p>
            <p>Click the secure button below to set a new password. This link will safely expire in 1 hour.</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetLink}" style="background-color: #F58220; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Reset Password</a>
            </div>
            <p style="font-size: 14px; color: #666;">If you did not request this password reset, please safely ignore this email.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
            <p style="font-size: 12px; color: #999; text-align: center;">© ${new Date().getFullYear()} PowerMetz Energy. All rights reserved.</p>
          </div>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)

    return successResponse
  } catch (error) {
    console.error("Password reset request error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function resetVendorPassword(token: string, password: string) {
  try {
    if (!token || token.length < 10) {
      return { success: false, error: "Invalid token" }
    }

    // Backend validation logic mimicking industrial frontend checks
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

    const user = await prisma.user.findFirst({
      where: { resetToken: token }
    })

    if (!user) {
      return { success: false, error: "Invalid or expired reset link." }
    }

    if (user.resetTokenExpiresAt && user.resetTokenExpiresAt < new Date()) {
      return { success: false, error: "Reset link has expired. Please request a new one." }
    }

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        resetToken: null, // Wipe token to ensure single use
        resetTokenExpiresAt: null
      }
    })

    return { success: true }
  } catch (error) {
    console.error("Failed to reset password:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}
