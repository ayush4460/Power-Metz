"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { H2, Paragraph } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { CompanyLogo } from '@/components/shared/utilities'
import { Eye, EyeOff } from 'lucide-react'

export default function AdminLoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })

      if (res.ok) {
        const data = await res.json()
        if (data.role !== 'ADMIN') {
          setError('This account is not authorized as an admin.')
        } else {
          router.push('/admin/blogs')
          router.refresh() // Force refresh to apply new cookies to layout
        }
      } else {
        const data = await res.json()
        setError(data.error || 'Login failed')
      }
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col-reverse lg:flex-row">
      {/* Left Form Section */}
      <div className="w-full lg:w-5/12 xl:w-2/5 flex-1 lg:min-h-screen bg-white flex flex-col justify-center px-8 md:px-12 lg:px-16 xl:px-24 border-r border-gray-100 py-12 lg:py-0">
        <div className="w-full max-w-sm mx-auto">
          <div className="mb-10 text-center lg:text-left">
            <H2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Welcome back</H2>
            <Paragraph className="text-slate-500 mt-2 text-sm font-medium">Sign in to access the PowerMetz portal.</Paragraph>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg text-center font-medium">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">User ID</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. admin"
                className="w-full h-12 px-4 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F58220]/20 focus:border-[#F58220] transition-colors text-slate-800 placeholder:text-gray-400 shadow-sm"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-12 pl-4 pr-10 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F58220]/20 focus:border-[#F58220] transition-colors text-slate-800 placeholder:text-gray-400 shadow-sm"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full h-12 bg-[#F58220] text-white hover:bg-[#d9731b] font-bold text-base rounded-lg transition-colors mt-2 shadow-md">
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          <div className="mt-16 text-center text-xs text-slate-400 font-medium">
            © {new Date().getFullYear()} PowerMetz Energy. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="flex min-h-[40vh] lg:min-h-screen w-full lg:w-7/12 xl:w-3/5 relative items-center justify-center bg-black py-12 lg:py-0">
        <div 
          className="absolute inset-0 z-0 opacity-60" 
          style={{
            backgroundImage: "url('/Vendor%20Cover%20Background.JPG')",
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
            <p className="text-xl font-light tracking-wide">Powering India&apos;s Energy Transition –</p>
            <p className="text-2xl font-bold text-[#F58220] mt-2 tracking-wide drop-shadow-md">Advanced Energy Solutions.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
