import { H3, Paragraph } from "@/components/ui/typography"
import { CompanyLogo } from "@/components/shared/utilities"
import { VendorLoginForm } from "./vendor-login-form"

export default function VendorLoginPage() {
  const leftContent = (
    <div className="w-full max-w-sm mx-auto">
      <div className="mb-10 text-center lg:text-left">
        <H3 className="text-3xl font-extrabold text-slate-800 tracking-tight">Vendor Login</H3>
        <Paragraph className="text-slate-500 mt-2 text-sm font-medium">
          Welcome back to the PowerMetz Vendor Network.
        </Paragraph>
      </div>
      <VendorLoginForm />
    </div>
  );

  return (
    <div className="min-h-screen w-full flex flex-col-reverse lg:flex-row">
      <div className="w-full lg:w-5/12 xl:w-2/5 flex-1 lg:min-h-screen bg-white flex flex-col justify-center px-8 md:px-12 lg:px-16 xl:px-24 border-r border-gray-100 py-12 lg:py-0">
        {leftContent}
        <div className="mt-16 text-center text-xs text-slate-400 font-medium">
          © {new Date().getFullYear()} PowerMetz Energy. All rights reserved.
        </div>
      </div>

      <div className="flex min-h-[40vh] lg:min-h-screen w-full lg:w-7/12 xl:w-3/5 relative items-center justify-center bg-black py-12 lg:py-0">
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
