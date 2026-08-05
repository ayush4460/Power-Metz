"use client"

import { useState } from "react"
import { requestPasswordReset } from "./actions"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [isPending, setIsPending] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsPending(true)

    const result = await requestPasswordReset(email)
    setIsPending(false)

    // We always show success for security purposes (to prevent email enumeration)
    if (result.success) {
      setIsSuccess(true)
    }
  }

  if (isSuccess) {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Request Sent!</h2>
        <p className="text-muted-foreground">
          If <strong>{email}</strong> is registered as a Vendor, a secure password reset link has been sent to your inbox.
        </p>
        <p className="text-sm text-slate-400 mt-2">
          Please check your spam or junk folder if you don't see it within a few minutes.
        </p>
        <div className="pt-4">
          <a href="/vendor/login" className="inline-block border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium py-2 px-6 rounded-lg transition-colors">
            Return to Login
          </a>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Email Address</label>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-[#F58220]/20 focus:border-[#F58220]"
          placeholder="vendor@company.com"
          required
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-[#F58220] hover:bg-[#d9731b]" 
        disabled={isPending || !email}
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Sending link...
          </>
        ) : (
          "Send Reset Link"
        )}
      </Button>

      <div className="text-center pt-2">
        <a href="/vendor/login" className="text-sm text-slate-500 hover:text-[#F58220] transition-colors">
          Back to Login
        </a>
      </div>
    </form>
  )
}
