import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import nodemailer from 'nodemailer';
import prisma from "@/lib/prisma";


const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS, // App password
  },
});

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { type, payload } = data;
    
    let subject = '';
    let text = '';
    
    if (type === 'vendor') {
      await prisma.vendorSubmission.create({ data: payload });
      subject = `New Vendor Submission: ${payload.companyName}`;
      text = `
New Vendor Submission received:
Company Name: ${payload.companyName}
Contact Person: ${payload.contactPerson}
Email: ${payload.email}
Phone: ${payload.phone}
Product Category: ${payload.productCategory}
Experience: ${payload.experience || 'N/A'}
Message: ${payload.message || 'N/A'}
      `;
    } else if (type === 'customer') {
      await prisma.customerSubmission.create({ data: payload });
      subject = `New Customer Inquiry: ${payload.name}`;
      text = `
New Customer Inquiry received:
Name: ${payload.name}
Email: ${payload.email}
Phone: ${payload.phone}
Location: ${payload.location}
Product Interest: ${payload.productInterest}
      `;
    } else {
      return NextResponse.json({ error: 'Invalid submission type' }, { status: 400 });
    }

    // Send email to Admin only
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.TO_ADDRESS,
      subject,
      text,
    });

    revalidatePath("/admin", "layout");

    return NextResponse.json({ success: true, message: 'Submission successful' }, { status: 200 });
  } catch (error) {
    console.error('Join Us API Error:', error);
    return NextResponse.json({ error: 'Failed to process submission' }, { status: 500 });
  }
}
