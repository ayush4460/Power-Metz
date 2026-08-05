"use client"

import { useState } from "react"
import { resetVendorPassword } from "../forgot-password/actions"
import { Button } from "@/components/ui/button"
import { Loader2, Eye, EyeOff, CheckCircle2, Circle } from "lucide-react"

export function ResetPasswordForm({ token }: { token: string }) {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Validation checks
  const validations = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
    match: password !== "" && password === confirmPassword
  }

  const allValid = Object.values(validations).every(Boolean)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!allValid) {
      setError("Please ensure all password requirements are met.")
      return
    }

    setIsPending(true)
    const result = await resetVendorPassword(token, password)
    setIsPending(false)

    if (result.success) {
      setIsSuccess(true)
    } else {
      setError(result.error || "Failed to reset password")
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
        <h2 className="text-2xl font-bold text-gray-900">Password Reset!</h2>
        <p className="text-muted-foreground">
          Your new secure password has been successfully saved.
        </p>
        <div className="pt-4">
          <a href="/vendor/login" className="inline-block bg-[#F58220] hover:bg-[#d9731b] text-white font-medium py-2 px-6 rounded-lg transition-colors">
            Proceed to Login
          </a>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">New Password</label>
        <div className="relative">
          <input 
            type={showPassword ? "text" : "password"} 
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setError(null)
            }}
            className="w-full pl-3 pr-10 py-2 border rounded-md outline-none focus:ring-2 focus:ring-[#F58220]/20 focus:border-[#F58220]"
            placeholder="Enter secure password"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Confirm Password</label>
        <div className="relative">
          <input 
            type={showConfirmPassword ? "text" : "password"} 
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value)
              setError(null)
            }}
            className={`w-full pl-3 pr-10 py-2 border rounded-md outline-none focus:ring-2 focus:ring-[#F58220]/20 ${
              confirmPassword.length > 0 ? (validations.match ? 'border-green-500 focus:border-green-500' : 'border-red-400 focus:border-red-400') : 'focus:border-[#F58220]'
            }`}
            placeholder="Repeat password"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Validation Checklist */}
      <div className="bg-slate-50 p-4 rounded-lg text-sm border border-slate-100">
        <p className="font-medium text-slate-700 mb-2">Password must contain:</p>
        <div className="grid grid-cols-2 gap-2 text-slate-600">
          <div className="flex items-center gap-2">
            {validations.length ? <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> : <Circle className="w-4 h-4 text-slate-300 shrink-0" />}
            <span>At least 8 characters</span>
          </div>
          <div className="flex items-center gap-2">
            {validations.uppercase ? <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> : <Circle className="w-4 h-4 text-slate-300 shrink-0" />}
            <span>1 uppercase letter</span>
          </div>
          <div className="flex items-center gap-2">
            {validations.lowercase ? <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> : <Circle className="w-4 h-4 text-slate-300 shrink-0" />}
            <span>1 lowercase letter</span>
          </div>
          <div className="flex items-center gap-2">
            {validations.number ? <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> : <Circle className="w-4 h-4 text-slate-300 shrink-0" />}
            <span>1 number</span>
          </div>
          <div className="flex items-center gap-2">
            {validations.special ? <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> : <Circle className="w-4 h-4 text-slate-300 shrink-0" />}
            <span>1 special character</span>
          </div>
          <div className="flex items-center gap-2">
            {validations.match ? <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> : <Circle className="w-4 h-4 text-slate-300 shrink-0" />}
            <span>Passwords match</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-100 font-medium">
          {error}
        </div>
      )}

      <Button 
        type="submit" 
        className="w-full bg-[#F58220] hover:bg-[#d9731b]" 
        disabled={isPending || !allValid}
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Saving...
          </>
        ) : (
          "Save New Password"
        )}
      </Button>
    </form>
  )
}
