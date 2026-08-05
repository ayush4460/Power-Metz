import { Metadata } from "next"
import { CustomerForm } from "@/components/forms/customer-form"
import { H2, H3, Paragraph } from "@/components/ui/typography"
import { FAQAccordion } from "@/components/ui/faq-accordion"

export const metadata: Metadata = {
  title: "For Customers - PowerMetz",
  description: "Experience reliable and powerful energy solutions customized for your needs.",
}

const customerFAQs = [
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

export default function CustomerPage() {
  return (
    <div className="w-full bg-background min-h-screen">
      {/* Hero Section */}
      <div
        className="relative bg-primary/5 py-24 md:py-32 text-center px-4 flex flex-col items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url('/Customer%20Cover%20Background.JPG')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent z-0"></div>
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center space-y-6">
          <H2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ color: "#F58220" }}>Empower Your Future</H2>
          <Paragraph className="max-w-3xl mx-auto !text-white/90 text-lg md:text-xl leading-relaxed">
            PowerMetz provides high-performance energy solutions tailored exactly to your needs. From <span className="font-semibold text-white">Residential & Commercial ESS</span> to <span className="font-semibold text-white">EV / Traction Batteries</span>, <span className="font-semibold text-white">UPS Systems</span>, and <span className="font-semibold text-white">OEM Customizations</span>, we have the reliable technology to power your next project.
          </Paragraph>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        {/* Why Choose PowerMetz Section */}
        <section className="text-center space-y-12">
          <div className="space-y-6 mb-12">
            <div className="inline-block px-5 py-2 bg-[#F58220] text-white rounded-full text-sm font-bold shadow-sm">Our Advantage</div>
            <H2 className="text-3xl md:text-4xl font-bold">Why Choose PowerMetz</H2>
            <Paragraph className="max-w-3xl mx-auto text-lg text-muted-foreground">
              PowerMetz delivers advanced energy storage solutions with high safety, long lifecycle, dependable quality and smart automation — powering progress across industries.
            </Paragraph>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 text-left">
            {/* Card 1 */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 xl:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(245,130,32,0.08)] hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-500 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></svg>
              </div>
              <div className="text-2xl xl:text-3xl font-bold text-red-500 mb-1">99.9%</div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Quality Pass Rate</div>
              <h4 className="text-base xl:text-lg font-bold text-slate-800 mb-2">Premium Product Quality</h4>
              <p className="text-sm text-gray-500 leading-relaxed">Rigorous multi-stage quality control and end-of-line testing ensuring reliable performance across every unit shipped.</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 xl:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(245,130,32,0.08)] hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" /></svg>
              </div>
              <div className="text-2xl xl:text-3xl font-bold text-blue-500 mb-1">10,000+</div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Cycle Life</div>
              <h4 className="text-base xl:text-lg font-bold text-slate-800 mb-2">Superior Energy Efficiency</h4>
              <p className="text-sm text-gray-500 leading-relaxed">Optimised battery chemistry and BMS design delivering maximum energy utilisation and minimum degradation.</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 xl:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(245,130,32,0.08)] hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>
              </div>
              <div className="text-2xl xl:text-3xl font-bold text-emerald-500 mb-1">500Wh-3.5GWh</div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Coverage Range</div>
              <h4 className="text-base xl:text-lg font-bold text-slate-800 mb-2">Fully Scalable Solutions</h4>
              <p className="text-sm text-gray-500 leading-relaxed">Flexible capacity architecture from small residential to large utility-scale — one technology partner for all needs.</p>
            </div>

            {/* Card 4 */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 xl:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(245,130,32,0.08)] hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /></svg>
              </div>
              <div className="text-2xl xl:text-3xl font-bold text-amber-500 mb-1">10+ years</div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Design Life</div>
              <h4 className="text-base xl:text-lg font-bold text-slate-800 mb-2">Long-Term Returns</h4>
              <p className="text-sm text-gray-500 leading-relaxed">Durable, maintenance-minimal battery systems with extended lifecycle delivering strong total cost of ownership.</p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="max-w-4xl mx-auto">
          <div className="text-center space-y-6 mb-12">
            <div className="inline-block px-5 py-2 bg-[#F58220] text-white rounded-full text-sm font-bold shadow-sm">Submit Details</div>
            <H3 className="text-3xl md:text-4xl font-bold">Request a Solution</H3>
            <Paragraph className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you need standard energy storage or customized packs, let us power your next project. Share your requirements below.
            </Paragraph>
          </div>
          <div className="bg-white p-6 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100">
            <CustomerForm />
          </div>
        </section>

        {/* FAQs Section */}
        <section className="bg-slate-50/50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-16 border-t border-border">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-6 mb-12">
              <div className="inline-block px-5 py-2 bg-[#F58220] text-white rounded-full text-sm font-bold shadow-sm">Customer FAQs</div>
              <H3 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</H3>
              <Paragraph className="text-lg text-muted-foreground max-w-2xl mx-auto">Learn more about our energy solutions.</Paragraph>
            </div>
            <FAQAccordion faqs={customerFAQs} />
          </div>
        </section>
      </div>
    </div>
  )
}
