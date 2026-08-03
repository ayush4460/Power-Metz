import { Metadata } from "next"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import { CareerForm } from "@/components/forms/career-form"
import { H2, H3, Paragraph } from "@/components/ui/typography"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Job Application - PowerMetz",
}


export const dynamic = "force-dynamic"

export default async function JobApplicationPage({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = await params;
  const job = await prisma.jobOpening.findFirst({
    where: { id: jobId, isActive: true },
  })

  if (!job) {
    notFound()
  }

  return (
    <div className="w-full bg-background min-h-screen">
      <div 
        className="relative py-16 md:py-24 px-4 flex flex-col items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url('/manufacturing%20assembly.JPG')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent z-0"></div>
        <div className="relative z-10 max-w-3xl mx-auto w-full">
          <H2 className="text-3xl md:text-5xl font-bold mb-6" style={{ color: "#F58220" }}>{job.title}</H2>
          <div className="flex flex-wrap gap-4 text-sm font-medium text-white/90">
            <span className="bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 shadow-sm">Department: {job.department}</span>
            <span className="bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 shadow-sm">Location: {job.location}</span>
            <span className="bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 shadow-sm">Type: {job.type}</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-8">
          <Link href="/join-us#career" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Careers
          </Link>
        </div>

        <div className="mb-12">
          <H3 className="text-2xl font-bold mb-4">Job Description</H3>
          <div className="prose prose-slate max-w-none text-muted-foreground whitespace-pre-wrap">
            {job.description}
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-border">
          <H3 className="text-2xl font-bold mb-6 border-b pb-4">Apply for this position</H3>
          <CareerForm jobId={job.id} jobTitle={job.title} />
        </div>
      </div>
    </div>
  )
}
