import { Metadata } from "next"
import prisma from "@/lib/prisma"
import { VendorForm } from "@/components/forms/vendor-form"
import { CustomerForm } from "@/components/forms/customer-form"
import { H2, H3, Paragraph } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Briefcase } from "lucide-react"

export const metadata: Metadata = {
  title: "Join Us - PowerMetz",
  description: "Partner with us, become a customer, or join our team.",
}


export const dynamic = "force-dynamic"

export default async function JoinUsPage() {
  const jobs = await prisma.jobOpening.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" }
  })

  return (
    <div className="w-full bg-background min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative bg-primary/5 py-24 md:py-32 text-center px-4 flex flex-col items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url('/requirement%20analysis.JPG')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent z-0"></div>
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <H2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ color: "#F58220" }}>Connect With PowerMetz</H2>
          <Paragraph className="max-w-2xl mx-auto !text-white/90 text-lg md:text-xl">
            Whether you want to partner with us, use our products, or build your career—you're in the right place.
          </Paragraph>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        
        {/* Section 1: Vendor */}
        <section id="vendor" className="scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">For Vendors</div>
              <H3 className="text-3xl font-bold">Partner With Us</H3>
              <Paragraph className="text-lg text-muted-foreground">
                Join hands with PowerMetz to deliver high-quality solutions. Become a trusted vendor in our network and grow with an industry leader.
              </Paragraph>
            </div>
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-border">
              <VendorForm />
            </div>
          </div>
        </section>

        {/* Section 2: Customer */}
        <section id="customer" className="scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6 lg:order-last">
              <div className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">For Customers</div>
              <H3 className="text-3xl font-bold">Become a Customer</H3>
              <Paragraph className="text-lg text-muted-foreground">
                Experience reliable and powerful energy solutions customized for your needs. Share your requirements and let us power your next project.
              </Paragraph>
            </div>
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-border">
              <CustomerForm />
            </div>
          </div>
        </section>

        {/* Section 3: Career */}
        <section id="career" className="scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <div className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">Careers</div>
            <H3 className="text-3xl font-bold">Join Our Team</H3>
            <Paragraph className="text-lg text-muted-foreground">
              Start a rewarding career with an industry leader. Explore our open roles and apply today to make an impact.
            </Paragraph>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.length === 0 ? (
              <div className="col-span-full py-16 text-center text-muted-foreground bg-muted/30 rounded-2xl border border-dashed">
                <Briefcase className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>No open positions at the moment. Check back later!</p>
              </div>
            ) : (
              jobs.map((job: { id: string; title: string; department: string; location: string; type: string }) => (
                <div key={job.id} className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-xl mb-3">{job.title}</h4>
                    <div className="space-y-2 text-sm text-muted-foreground mb-6">
                      <p><span className="font-medium text-foreground">Department:</span> {job.department}</p>
                      <p><span className="font-medium text-foreground">Location:</span> {job.location}</p>
                      <p><span className="font-medium text-foreground">Type:</span> {job.type}</p>
                    </div>
                  </div>
                  <Link href={`/join-us/careers/${job.id}`} className="block">
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      Apply Now <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              ))
            )}
          </div>
        </section>

      </div>
    </div>
  )
}
