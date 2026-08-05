import { Metadata } from "next"
import { VendorForm } from "@/components/forms/vendor-form"
import { H2, H3, Paragraph } from "@/components/ui/typography"
import { FAQAccordion } from "@/components/ui/faq-accordion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Crown, Zap, Lightbulb, CircleDollarSign, Battery } from "lucide-react"

export const metadata: Metadata = {
  title: "For Vendors - PowerMetz",
  description: "Partner with PowerMetz and become a trusted vendor.",
}

const vendorFAQs = [
  {
    question: "Are PowerMetz EV batteries compliant with the latest regulations?",
    answer: "Yes. All our automotive battery packs comply fully with the latest Indian AIS 156 (Phase 2) standards, ensuring mechanical and electrical safety."
  },
  {
    question: "Can PowerMetz design batteries to fit custom vehicle chassis?",
    answer: "Absolutely. Our OEM Customization team handles everything from physical packaging design and custom BMS programming to final validation testing."
  },
  {
    question: "What capacity sizes does PowerMetz offer for residential and industrial backup?",
    answer: "Residential ESS: Standard modular wall-mounted or stackable floor-standing units ranging from 5 kWh to 20 kWh (such as our 51.2V LFP systems). Commercial & Industrial (C&I) ESS: Scalable cabinet systems ranging from 50 kWh to 500 kWh designed to support manufacturing plants, offices, and heavy induction machinery."
  },
  {
    question: "What is the lifespan/cycle life of a PowerMetz ESS battery?",
    answer: "Our high-grade LFP battery cells are rated for 4,000 to 6,000 charge-discharge cycles at 80% Depth of Discharge (DoD). For a standard home or industrial facility discharging the battery once daily, this represents 10 to 15+ years of reliable operational life before any significant capacity reduction."
  }
]

export default function VendorPage() {
  return (
    <div className="w-full bg-background min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative bg-primary/5 py-24 md:py-32 text-center px-4 flex flex-col items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url('/Vendor%20Cover%20Background.JPG')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent z-0"></div>
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <H2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ color: "#F58220" }}>Partner With Us</H2>
          <Paragraph className="max-w-2xl mx-auto text-white/90 text-lg md:text-xl mb-8">
            Join hands with PowerMetz to deliver high-quality solutions. Become a trusted vendor in our network and grow with an industry leader.
          </Paragraph>
          <div className="flex justify-center mt-8">
            <Link href="/vendor/login">
              <Button className="bg-transparent text-white border border-[#F58220]/60 hover:bg-[#F58220] hover:border-[#F58220] px-8 py-3 h-auto text-lg rounded-full shadow-[0_4px_20px_rgba(245,130,32,0.15)] transition-all duration-300 font-medium tracking-wide">
                Already a Partner? Vendor Login
              </Button>
            </Link>
          </div>
          <div className="w-16 h-1 bg-primary mx-auto mt-10 rounded-full" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        
        {/* Why PowerMetz Section */}
        <section className="space-y-8">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <div>
              <div className="inline-flex items-center rounded-full bg-[#F58220] px-4 py-1.5 text-sm font-medium text-white mb-2 shadow-sm">Vendor Benefits</div>
            </div>
            <H3 className="text-3xl font-bold mt-2">Why PowerMetz?</H3>
            <Paragraph className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              PowerMetz is your trusted partner for advanced energy storage solutions, offering premium lithium battery systems with high safety, long lifecycle, and smart automation. We ensure better quality, strong margins, and sustainable performance—powering progress across industries and applications.
            </Paragraph>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2 max-w-6xl mx-auto">
            {[
              { title: "Premium\nproduct quality", icon: Crown },
              { title: "Enhanced\nenergy efficiency", icon: Zap },
              { title: "Scalable\nsolutions", icon: Lightbulb },
              { title: "Long\nterm returns", icon: CircleDollarSign }
            ].map((feature, i) => (
              <div key={i} className="group relative p-6 pt-8 mx-auto w-full max-w-[260px] lg:max-w-none rounded-[2rem] bg-white shadow-[0_8px_30px_rgb(245,130,32,0.08)] lg:shadow-[0_4px_24px_rgb(0,0,0,0.03)] lg:hover:shadow-[0_12px_40px_rgb(245,130,32,0.12)] lg:hover:-translate-y-1.5 border border-[#F58220]/10 lg:border-gray-50 lg:hover:border-[#F58220]/20 transition-all duration-500 flex flex-col items-center text-center overflow-hidden">
                
                {/* Subtle top gradient accent */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-[#F58220]/60 to-transparent opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Soft ambient glow behind the icon */}
                <div className="absolute top-12 left-1/2 -translate-x-1/2 w-28 h-28 bg-[#F58220]/15 rounded-full blur-3xl opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0 pointer-events-none"></div>

                {/* Elegant Icon Container */}
                <div className="relative w-20 h-20 mb-6 rounded-2xl shadow-sm text-[#F58220] flex items-center justify-center transition-all duration-500 z-10 border border-[#F58220]/30 lg:border-gray-100 group-hover:border-[#F58220]/30 bg-[#F58220]/5 lg:bg-white group-hover:bg-[#F58220]/5 scale-105 lg:scale-100 group-hover:scale-110 rotate-0 lg:rotate-3 group-hover:rotate-0">
                  <feature.icon className="w-9 h-9 fill-none" strokeWidth={2} />
                </div>

                <h4 className="text-xl font-bold text-slate-800 lg:group-hover:text-[#F58220] whitespace-pre-line leading-tight transition-colors duration-500 z-10">
                  {feature.title}
                </h4>
              </div>
            ))}
          </div>
        </section>

        {/* Form Section */}
        <section className="max-w-4xl mx-auto space-y-10 pt-8">
          <div className="text-center space-y-4">
            <div>
              <div className="inline-flex items-center rounded-full bg-[#F58220] px-4 py-1.5 text-sm font-medium text-white mb-2 shadow-sm">Apply Now</div>
            </div>
            <H3 className="text-3xl font-bold mt-2">Become a Partner</H3>
            <Paragraph className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We are constantly looking for partners who share our vision of a sustainable future. Fill out the form to register your interest in becoming a vendor.
            </Paragraph>
          </div>
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-[0_4px_24px_rgb(0,0,0,0.03)] border border-gray-100">
            <VendorForm />
          </div>
        </section>

        {/* FAQs Section */}
        <section className="bg-slate-50/50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-16 border-t border-border">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <div>
                <div className="inline-flex items-center rounded-full bg-[#F58220] px-4 py-1.5 text-sm font-medium text-white mb-2 shadow-sm">Vendor FAQs</div>
              </div>
              <H3 className="text-3xl font-bold mt-2">Frequently Asked Questions</H3>
              <Paragraph className="text-muted-foreground">Everything you need to know about partnering with PowerMetz.</Paragraph>
            </div>
            <FAQAccordion faqs={vendorFAQs} />
          </div>
        </section>
      </div>
    </div>
  )
}
