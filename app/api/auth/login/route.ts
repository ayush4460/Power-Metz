import { NextResponse } from 'next/server'
import { SignJWT } from 'jose'
import prisma from '@/lib/prisma'
import * as bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()
    const jwtSecret = process.env.JWT_SECRET

    if (!jwtSecret) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    const user = await prisma.user.findUnique({
      where: { email: username }
    })

    if (!user || !user.passwordHash || !(await bcrypt.compare(password, user.passwordHash))) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const secret = new TextEncoder().encode(jwtSecret)
    const token = await new SignJWT({ id: user.id, email: user.email, role: user.role })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('8h')
      .sign(secret)

    const response = NextResponse.json({ success: true, role: user.role })
    
    response.cookies.set({
      name: 'admin_token', // maintaining name to not break existing front-end checks if any
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 8 // 8 hours
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


