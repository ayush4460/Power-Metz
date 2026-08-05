"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Turnstile } from "@marsidev/react-turnstile";
import { H1, H3, Paragraph } from "@/components/ui/typography";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";
import { companyConfig } from "@/config/company";
import { Reveal } from "@/components/motion";

const reachUsSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  company: z.string().optional(),
  purpose: z.string().min(1, "Please select a purpose"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

type ReachUsFormValues = z.infer<typeof reachUsSchema>;

export function ReachUsClient() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<ReachUsFormValues>({
    resolver: zodResolver(reachUsSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      purpose: "",
      message: "",
    },
  });

  const onSubmit = async (data: ReachUsFormValues) => {
    if (!turnstileToken) {
      alert("Please complete the security check.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/reach-us", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          turnstileToken,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit inquiry");
      }

      setIsSuccess(true);
      reset();
    } catch (error) {
      console.error("Submission error:", error);
      alert("There was an error submitting your form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const purposes = [
    "General Inquiry",
    "Product Information",
    "Partnership / Vendor",
    "Career",
    "Support / Service",
    "Other",
  ];

  return (
    <div className="w-full bg-background min-h-screen">
      {/* Hero Section */}
      <div
        className="relative bg-primary/5 py-24 md:py-32 text-center px-4 flex flex-col items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url('/Reach%20Us%20Cover%20Background.JPG')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent z-0"></div>
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center space-y-6">
          <H1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ color: "#F58220" }}>
            Reach Us
          </H1>
          <Paragraph className="max-w-3xl mx-auto !text-white/90 text-lg md:text-xl leading-relaxed">
            Have questions about our Battery Energy Storage Systems or want to partner with us? Our team is here to help you power progress.
          </Paragraph>
          <div className="w-16 h-1 bg-primary mx-auto mt-8 rounded-full" />
        </div>
      </div>

      <Container className="py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16">
          {/* Left Column: Map */}
          <div className="lg:col-span-7 h-full min-h-[400px] order-2 lg:order-1">
            <div className="rounded-3xl overflow-hidden border border-border shadow-sm h-full w-full">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83641.21397943066!2d73.08919134208888!3d22.108646058602194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc3122161d103%3A0x9dc18094f5e99167!2sMercury%20Ev-Tech%20Limited!5e0!3m2!1sen!2sin!4v1785958202369!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, minHeight: '400px' }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Right Column: Contact Info */}
          <div className="lg:col-span-5 space-y-10 order-1 lg:order-2">
            <div>
              <H3 className="text-3xl font-bold mb-4">Contact Information</H3>
              <Paragraph className="text-muted-foreground">
                Reach out to us through any of the following channels or fill out the form, and we'll get back to you promptly.
              </Paragraph>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Phone</h4>
                  <a href={`tel:${companyConfig.phone.replace(/[^+\d]/g, "")}`} className="text-muted-foreground hover:text-primary transition-colors">
                    {companyConfig.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Email</h4>
                  <a href={`mailto:${companyConfig.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                    {companyConfig.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Office Address</h4>
                  <p className="text-muted-foreground leading-relaxed">{companyConfig.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Working Hours</h4>
                  <p className="text-muted-foreground">Monday to Saturday<br/>9:00 AM to 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Inquiry Form */}
        <div className="w-full">
          <Reveal direction="up" duration={0.6}>
            <div className="bg-surface rounded-3xl p-8 md:p-12 border border-border shadow-sm w-full">
                <H3 className="text-2xl font-bold mb-8">Send an Inquiry</H3>

                {isSuccess ? (
                  <div className="flex flex-col items-center justify-center text-center py-16 space-y-6">
                    <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center">
                      <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-foreground mb-2">Thank you for reaching out!</h4>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        Your message has been successfully sent. Our team will review your inquiry and get back to you shortly.
                      </p>
                    </div>
                    <Button 
                      onClick={() => setIsSuccess(false)}
                      variant="outline" 
                      className="mt-4 rounded-full px-8"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium mb-1.5 text-slate-700">Full Name <span className="text-red-500">*</span></label>
                        <input
                          {...register("name")}
                          className="w-full border border-gray-200 rounded-lg p-3 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F58220]/20 focus:border-[#F58220] hover:border-[#F58220]/50 transition-all duration-300 shadow-sm placeholder:text-gray-400"
                          placeholder="John Doe"
                        />
                        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium mb-1.5 text-slate-700">Email Address <span className="text-red-500">*</span></label>
                        <input
                          {...register("email")}
                          className="w-full border border-gray-200 rounded-lg p-3 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F58220]/20 focus:border-[#F58220] hover:border-[#F58220]/50 transition-all duration-300 shadow-sm placeholder:text-gray-400"
                          placeholder="john@example.com"
                        />
                        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium mb-1.5 text-slate-700">Phone Number <span className="text-red-500">*</span></label>
                        <input
                          {...register("phone")}
                          className="w-full border border-gray-200 rounded-lg p-3 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F58220]/20 focus:border-[#F58220] hover:border-[#F58220]/50 transition-all duration-300 shadow-sm placeholder:text-gray-400"
                          placeholder="+91 9876543210"
                        />
                        {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium mb-1.5 text-slate-700">Company Name</label>
                        <input
                          {...register("company")}
                          className="w-full border border-gray-200 rounded-lg p-3 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F58220]/20 focus:border-[#F58220] hover:border-[#F58220]/50 transition-all duration-300 shadow-sm placeholder:text-gray-400"
                          placeholder="Your Company Ltd."
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium mb-1.5 text-slate-700">Purpose of Inquiry <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <div 
                          onClick={() => setOpenDropdown(openDropdown === 'purpose' ? null : 'purpose')}
                          className={`w-full border ${openDropdown === 'purpose' ? 'border-[#F58220] ring-2 ring-[#F58220]/20' : 'border-gray-200'} rounded-lg p-3 pr-10 bg-white text-slate-800 hover:border-[#F58220]/50 transition-all duration-300 cursor-pointer shadow-sm select-none`}
                        >
                          <span className={watch("purpose") ? "text-slate-800" : "text-gray-400"}>
                            {watch("purpose") || "Select a purpose..."}
                          </span>
                        </div>
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#F58220]">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${openDropdown === 'purpose' ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
                        </div>
                        
                        {openDropdown === 'purpose' && (
                          <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-lg shadow-[0_12px_40px_rgb(0,0,0,0.08)] overflow-hidden py-1">
                            {purposes.map((opt) => (
                              <div 
                                key={opt}
                                onClick={() => { setValue("purpose", opt, { shouldValidate: true }); setOpenDropdown(null); }}
                                className={`px-4 py-2.5 cursor-pointer transition-colors text-sm ${watch("purpose") === opt ? 'bg-[#F58220]/10 text-[#F58220] font-medium' : 'text-slate-700 hover:bg-slate-50 hover:text-[#F58220]'}`}
                              >
                                {opt}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      {errors.purpose && <p className="text-sm text-red-500 mt-1">{errors.purpose.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium mb-1.5 text-slate-700">Message / Query <span className="text-red-500">*</span></label>
                      <textarea
                        {...register("message")}
                        rows={5}
                        className="w-full border border-gray-200 rounded-lg p-3 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F58220]/20 focus:border-[#F58220] hover:border-[#F58220]/50 transition-all duration-300 shadow-sm placeholder:text-gray-400 resize-none"
                        placeholder="How can we help you?"
                      />
                      {errors.message && <p className="text-sm text-red-500">{errors.message.message}</p>}
                    </div>

                    <div className="pt-2">
                      <Turnstile
                        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"}
                        onSuccess={(token) => setTurnstileToken(token)}
                        onError={() => setTurnstileToken(null)}
                        onExpire={() => setTurnstileToken(null)}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className={`w-full sm:w-auto px-8 py-6 rounded-full text-lg shadow-md transition-all ${
                        isSubmitting || !turnstileToken 
                          ? "bg-slate-300 text-slate-500 cursor-not-allowed hover:shadow-md" 
                          : "hover:shadow-lg bg-primary text-primary-foreground"
                      }`}
                      disabled={isSubmitting || !turnstileToken}
                    >
                      {isSubmitting ? "Sending..." : (
                        <span className="flex items-center gap-2">
                          Send Message <Send className="w-5 h-5" />
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
      </Container>
    </div>
  );
}
