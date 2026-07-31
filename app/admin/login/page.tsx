"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Container, Section } from '@/components/layout'
import { H2, Paragraph } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'

export default function AdminLoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
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
        router.push('/admin/blogs')
        router.refresh() // Force refresh to apply new cookies to layout
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
    <Section className="min-h-screen flex items-center justify-center bg-muted/30">
      <Container className="max-w-md w-full">
        <div className="bg-surface border border-border p-8 rounded-2xl shadow-xl">
          <div className="text-center mb-8">
            <H2>Admin Portal</H2>
            <Paragraph className="text-muted-foreground mt-2">Sign in to manage blogs</Paragraph>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg text-center">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-11 px-4 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 px-4 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                required
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full h-11 bg-primary text-white hover:bg-primary/90 font-semibold rounded-lg">
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </div>
      </Container>
    </Section>
  )
}
