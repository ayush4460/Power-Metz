import { Metadata } from "next"
import prisma from "@/lib/prisma"
import { H2, H3, Paragraph } from "@/components/ui/typography"
import { Briefcase, ArrowRight, MapPin, Clock, Wallet, Users } from "lucide-react"
import Link from "next/link"
import { FAQAccordion } from "@/components/ui/faq-accordion"
import { CareerJobsList } from "./career-jobs-list"

export const metadata: Metadata = {
  title: "Careers - PowerMetz",
  description: "Join our team and build a rewarding career.",
}

export const dynamic = "force-dynamic"

const careerFAQs = [
  {
    question: "How can I apply for a job at PowerMetz?",
    answer: "You can apply directly through the careers page or send your CV to the HR team. Shortlisted candidates are contacted for further process. PowerMetz keeps the hiring process simple and transparent."
  },
  {
    question: "What is the work environment like at PowerMetz?",
    answer: "At PowerMetz, we focus on a practical and growth-oriented work culture. Teamwork, learning, and performance are key parts of the environment."
  },
  {
    question: "Is there job stability and long-term opportunity?",
    answer: "Yes, the battery and energy storage industry is fast-growing with increasing demand. PowerMetz is continuously expanding its projects and team. This provides stable and long-term career opportunities."
  },
  {
    question: "Will I get training if I don't have battery experience?",
    answer: "Yes, basic training and guidance are provided to help you understand the battery industry. You will also learn through real project exposure. PowerMetz focuses on practical learning along with on-the-job experience."
  },
  {
    question: "What is the salary and growth opportunity?",
    answer: "Salary depends on your role, experience, and performance. Some roles include incentives based on targets and results. At PowerMetz, employees get growth opportunities as the company expands in the battery sector."
  }
]

export default async function CareersPage() {
  const jobs = await prisma.jobOpening.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    include: { department: true }
  })

  const departments = await prisma.jobDepartment.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" }
  })

  return (
    <div className="w-full bg-background min-h-screen">
      {/* Hero Section */}
      <div
        className="relative bg-primary/5 py-24 md:py-32 text-center px-4 flex flex-col items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url('/about%20powermetz.JPG')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent z-0"></div>
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <H2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ color: "#F58220" }}>Join Our Team</H2>
          <Paragraph className="max-w-2xl mx-auto !text-white/90 text-lg md:text-xl">
            Start a rewarding career with an industry leader. Explore our open roles and apply today to make an impact.
          </Paragraph>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        {/* Jobs Section */}
        <section>
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-6">
            <div className="inline-block px-5 py-2 bg-[#F58220] text-white rounded-full text-sm font-bold shadow-sm">Open Positions</div>
            <H3 className="text-3xl md:text-4xl font-bold">Current Openings at PowerMetz</H3>
            <Paragraph className="text-lg text-muted-foreground">
              We're looking for driven, capable people to join our growing team across engineering, sales, and field operations.
            </Paragraph>
          </div>

          <CareerJobsList initialJobs={jobs} departments={departments} />
        </section>

        {/* FAQs Section */}
        <section className="bg-slate-50/50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-16 border-t border-border">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-6 mb-12">
              <div className="inline-block px-5 py-2 bg-[#F58220] text-white rounded-full text-sm font-bold shadow-sm">Job FAQs</div>
              <H3 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</H3>
              <Paragraph className="text-lg text-muted-foreground max-w-2xl mx-auto">Everything you need to know about working at PowerMetz.</Paragraph>
            </div>
            <FAQAccordion faqs={careerFAQs} />
          </div>
        </section>
      </div>
    </div>
  )
}
