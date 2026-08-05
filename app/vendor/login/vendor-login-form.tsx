"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, Eye, EyeOff } from "lucide-react"

export function VendorLoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsPending(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password })
      })

      if (res.ok) {
        const data = await res.json()
        if (data.role !== 'VENDOR') {
          setError('This account is not authorized as a Vendor.')
          setIsPending(false)
        } else {
          // Success! Next.js middleware handles cookie check, so we can just redirect
          window.location.href = '/vendor/dashboard'
        }
      } else {
        const data = await res.json()
        setError(data.error || 'Invalid email or password.')
        setIsPending(false)
      }
    } catch {
      setError('An error occurred connecting to the authentication server.')
      setIsPending(false)
    }
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

      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <a href="/vendor/forgot-password" className="text-xs text-[#F58220] hover:underline font-medium">Forgot password?</a>
        </div>
        <div className="relative">
          <input 
            type={showPassword ? "text" : "password"} 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-3 pr-10 py-2 border rounded-md outline-none focus:ring-2 focus:ring-[#F58220]/20 focus:border-[#F58220]"
            placeholder="Enter your password"
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

      {error && (
        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-100 font-medium">
          {error}
        </div>
      )}

      <Button 
        type="submit" 
        className="w-full bg-[#F58220] hover:bg-[#d9731b]" 
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Signing in...
          </>
        ) : (
          "Sign In"
        )}
      </Button>
    </form>
  )
}
