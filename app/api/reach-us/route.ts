import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";

const reachUsSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  company: z.string().optional(),
  purpose: z.string().min(1, "Please select a purpose"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
  turnstileToken: z.string().min(1, "Security token missing"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = reachUsSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, phone, company, purpose, message, turnstileToken } = result.data;

    // Verify Turnstile Token
    const verifyFormData = new FormData();
    verifyFormData.append("secret", process.env.TURNSTILE_SECRET_KEY || "");
    verifyFormData.append("response", turnstileToken);

    const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: verifyFormData,
    });
    
    const verifyData = await verifyRes.json();
    
    if (!verifyData.success) {
      return NextResponse.json({ error: "Security check failed" }, { status: 400 });
    }

    // Save to Database
    const submission = await prisma.reachUsSubmission.create({
      data: {
        name,
        email,
        phone,
        company,
        purpose,
        message,
      },
    });

    // Send Email using Gmail SMTP
    if (process.env.SMTP_USER && process.env.SMTP_PASS && process.env.TO_ADDRESS) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        const mailOptions = {
          from: process.env.SMTP_USER,
          to: process.env.TO_ADDRESS,
          subject: `New Reach Us Inquiry: ${purpose}`,
          html: `
            <h2>New Reach Us Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Company:</strong> ${company || 'N/A'}</p>
            <p><strong>Purpose:</strong> ${purpose}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          `,
        };

        await transporter.sendMail(mailOptions);
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
        // We don't fail the request if email fails, just log it
      }
    }

    return NextResponse.json({ success: true, submissionId: submission.id });
  } catch (error) {
    console.error("Reach Us Submission Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
