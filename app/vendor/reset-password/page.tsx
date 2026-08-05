import prisma from "@/lib/prisma"
import { H3, Paragraph } from "@/components/ui/typography"
import { CompanyLogo } from "@/components/shared/utilities"
import { ResetPasswordForm } from "./reset-password-form"

export default async function ResetPasswordPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const token = (await searchParams).token

  let leftContent;
  
  if (!token) {
    leftContent = (
      <div className="w-full max-w-sm mx-auto text-center">
        <div className="text-red-500 mb-4 flex justify-center">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <H3 className="mb-2">Invalid Reset Link</H3>
        <Paragraph className="text-slate-500 text-sm mb-6">
          This password reset link is invalid or missing the security token. Please check the link in your email and try again.
        </Paragraph>
        <a href="/vendor/forgot-password" className="inline-block bg-[#F58220] hover:bg-[#d9731b] text-white font-medium py-2 px-6 rounded-lg transition-colors">
          Request a new link
        </a>
      </div>
    );
  } else {
    const user = await prisma.user.findUnique({
      where: { resetToken: token }
    })
  
    const isExpired = user?.resetTokenExpiresAt ? user.resetTokenExpiresAt < new Date() : false
  
    if (!user || isExpired) {
      leftContent = (
        <div className="w-full max-w-sm mx-auto text-center">
          <div className="text-red-500 mb-4 flex justify-center">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <H3 className="mb-2">Link Expired</H3>
          <Paragraph className="text-slate-500 text-sm mb-6">
            For security reasons, this password reset link has expired after 1 hour or has already been used.
          </Paragraph>
          <a href="/vendor/forgot-password" className="inline-block bg-[#F58220] hover:bg-[#d9731b] text-white font-medium py-2 px-6 rounded-lg transition-colors">
            Request a new link
          </a>
        </div>
      );
    } else {
      leftContent = (
        <div className="w-full max-w-sm mx-auto">
          <div className="mb-10 text-center lg:text-left">
            <H3 className="text-3xl font-extrabold text-slate-800 tracking-tight">Set New Password</H3>
            <Paragraph className="text-slate-500 mt-2 text-sm font-medium">
              Create a new secure password for <strong>{user.email}</strong>.
            </Paragraph>
          </div>
          <ResetPasswordForm token={token} />
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row">
      <div className="w-full lg:w-5/12 xl:w-2/5 min-h-screen bg-white flex flex-col justify-center px-8 md:px-12 lg:px-16 xl:px-24 border-r border-gray-100">
        {leftContent}
        <div className="mt-16 text-center text-xs text-slate-400 font-medium">
          © {new Date().getFullYear()} PowerMetz Energy. All rights reserved.
        </div>
      </div>

      <div className="hidden lg:flex w-full lg:w-7/12 xl:w-3/5 relative items-center justify-center bg-black">
        <div 
          className="absolute inset-0 z-0 opacity-60" 
          style={{
            backgroundImage: "url('/Set%20Up%20Account.JPG')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
        
        <div className="relative z-20 text-center flex flex-col items-center">
          <div className="mb-6 flex flex-col items-center">
            <CompanyLogo className="text-white drop-shadow-xl scale-150 origin-bottom" />
          </div>
          
          <div className="mt-12 text-center text-white/90">
            <p className="text-xl font-light tracking-wide">Welcome to the PowerMetz Vendor Network –</p>
            <p className="text-2xl font-bold text-[#F58220] mt-2 tracking-wide drop-shadow-md">Powering the Future.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
