import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import prisma from "@/lib/prisma";
import { uploadResumeToCloudinary } from '@/lib/cloudinary';


const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    const jobId = formData.get('jobId') as string;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const coverLetter = formData.get('coverLetter') as string;
    const resumeFile = formData.get('resume') as File;

    const turnstileToken = formData.get('turnstileToken') as string;

    if (!jobId || !name || !email || !resumeFile) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!turnstileToken) {
      return NextResponse.json({ error: "Turnstile token is required" }, { status: 400 });
    }

    const turnstileVerify = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${turnstileToken}`,
    });
    
    const turnstileResult = await turnstileVerify.json();
    if (!turnstileResult.success) {
      return NextResponse.json({ error: "Security check failed. Please try again." }, { status: 400 });
    }

    if (resumeFile.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size exceeds 10MB limit' }, { status: 400 });
    }

    const job = await prisma.jobOpening.findUnique({ where: { id: jobId } });
    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    // Convert File to Buffer for Cloudinary upload
    const arrayBuffer = await resumeFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Upload to Cloudinary
    const resumeUrl = await uploadResumeToCloudinary(buffer, resumeFile.name, job.title);

    // Save to Database
    await prisma.jobApplication.create({
      data: {
        jobId,
        name,
        email,
        coverLetter,
        resumeUrl,
      }
    });

    // Send email to Admin
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.TO_ADDRESS,
      subject: `New Job Application: ${job.title} - ${name}`,
      text: `
New Job Application received for ${job.title}:
Name: ${name}
Email: ${email}
Cover Letter: ${coverLetter || 'N/A'}
Resume URL: ${resumeUrl}
      `,
    });

    return NextResponse.json({ success: true, message: 'Application submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Career Application API Error:', error);
    return NextResponse.json({ error: 'Failed to process application' }, { status: 500 });
  }
}
