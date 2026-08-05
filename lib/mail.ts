import nodemailer from "nodemailer"

// Use environment variables for SMTP configuration
// Assuming the user has SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS in .env
// Standard Gmail config uses smtp.gmail.com, port 465 (secure) or 587 (TLS)

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "465", 10),
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, // The gmail address
    pass: process.env.SMTP_PASS, // The gmail app password
  },
})

export async function sendMail({ to, subject, html }: { to: string; subject: string; html: string }) {
  try {
    const info = await transporter.sendMail({
      from: `"PowerMetz Vendor Portal" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    })
    
    console.log("Message sent: %s", info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, error }
  }
}
