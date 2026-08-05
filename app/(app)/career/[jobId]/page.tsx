import { notFound } from "next/navigation"
import prisma from "@/lib/prisma"
import { H2, H3, Paragraph } from "@/components/ui/typography"
import { ArrowLeft, Briefcase, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import { CareerForm } from "@/components/forms/career-form"
import { Metadata } from "next"

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: { params: Promise<{ jobId: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const job = await prisma.jobOpening.findUnique({
    where: { id: resolvedParams.jobId, isActive: true }
  })
  if (!job) return { title: "Job Not Found" }
  return { title: `${job.title} - PowerMetz Careers`, description: job.description.substring(0, 150) }
}

export default async function JobApplicationPage({ params }: { params: Promise<{ jobId: string }> }) {
  const resolvedParams = await params
  const job = await prisma.jobOpening.findUnique({
    where: {
      id: resolvedParams.jobId,
      isActive: true
    },
    include: {
      department: true
    }
  })

  if (!job) {
    return notFound()
  }

  return (
    <div className="w-full bg-background min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative bg-primary/5 py-24 md:py-32 flex flex-col justify-center overflow-hidden"
        style={{
          backgroundImage: "url('/Jobs%20Cover%20Background.JPG')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent z-0"></div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 w-full text-left">
          <H2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-sm" style={{ color: "#F58220" }}>{job.title}</H2>
          <div className="flex flex-wrap justify-start gap-3 md:gap-4 text-sm font-medium text-white">
            <span className="inline-flex items-center gap-2 bg-transparent hover:bg-white/10 transition-colors backdrop-blur-sm px-5 py-2 rounded-full border border-white/40 shadow-sm">
              <Briefcase className="w-4 h-4 text-[#F58220]" />
              {job.department?.name || 'General'}
            </span>
            <span className="inline-flex items-center gap-2 bg-transparent hover:bg-white/10 transition-colors backdrop-blur-sm px-5 py-2 rounded-full border border-white/40 shadow-sm">
              <MapPin className="w-4 h-4 text-[#F58220]" />
              {job.location}
            </span>
            <span className="inline-flex items-center gap-2 bg-transparent hover:bg-white/10 transition-colors backdrop-blur-sm px-5 py-2 rounded-full border border-white/40 shadow-sm">
              <Clock className="w-4 h-4 text-[#F58220]" />
              {job.type}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-8">
          <Link href="/career" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Careers
          </Link>
        </div>

        <div className="mb-12">
          <H3 className="text-2xl font-bold mb-4">Job Description</H3>
          <div 
            className="prose prose-slate max-w-none text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: job.description }}
          />
        </div>

        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-border">
          <div className="mb-6">
            <H3 className="text-2xl font-bold mb-2">Apply for this position</H3>
            <Paragraph className="text-muted-foreground text-sm">
              Please fill out the form below to submit your application for the {job.title} role.
            </Paragraph>
          </div>
          <CareerForm jobId={job.id} jobTitle={job.title} />
        </div>
      </div>
    </div>
  )
}
