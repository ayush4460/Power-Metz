import { Loader2 } from "lucide-react"

export function PortalLoader({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="w-full h-full min-h-[50vh] flex flex-col items-center justify-center p-8">
      <div className="relative flex items-center justify-center mb-6">
        {/* Outer subtle glow/pulse */}
        <div className="absolute inset-0 rounded-full bg-[#F58220]/20 blur-xl animate-pulse w-16 h-16 m-auto"></div>
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border border-[#F58220]/30 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
        {/* Inner rotating spinner */}
        <div className="bg-white/80 backdrop-blur-sm p-3.5 rounded-full shadow-lg border border-border relative z-10 flex items-center justify-center text-[#F58220]">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      </div>
      <div className="text-center space-y-1.5 animate-in fade-in slide-in-from-bottom-2 duration-500">
        <h3 className="text-base font-semibold text-slate-800 tracking-wide">{message}</h3>
        <p className="text-xs text-slate-500 font-medium max-w-[200px] mx-auto leading-relaxed">
          Please wait while we prepare your workspace.
        </p>
      </div>
    </div>
  )
}
