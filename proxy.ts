import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Set standard headers for reading pathnames in server components
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-url', request.url)
  requestHeaders.set('x-pathname', pathname)
  requestHeaders.set('x-invoke-path', pathname) // maintain compatibility

  const isAdminRoute = pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')
  const isApiAdminRoute = pathname.startsWith('/api/admin')
  const isVendorDashboardRoute = pathname.startsWith('/vendor/dashboard')

  // If it's a protected route, verify the token
  if (isAdminRoute || isVendorDashboardRoute || isApiAdminRoute) {
    const token = request.cookies.get('admin_token')?.value

    if (!token) {
      if (isApiAdminRoute) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      return NextResponse.redirect(new URL(isAdminRoute ? '/admin/login' : '/vendor/login', request.url))
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET)
      const { payload } = await jwtVerify(token, secret)
      const userRole = payload.role as string

      // Verify strict role requirements
      if ((isAdminRoute || isApiAdminRoute) && userRole !== 'ADMIN') {
        if (isApiAdminRoute) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        return NextResponse.redirect(new URL('/admin/login', request.url))
      }

      if (isVendorDashboardRoute && userRole !== 'VENDOR') {
        return NextResponse.redirect(new URL('/vendor/login', request.url))
      }

    } catch (error) {
      if (isApiAdminRoute) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      return NextResponse.redirect(new URL(isAdminRoute ? '/admin/login' : '/vendor/login', request.url))
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images|.*\\.JPG|.*\\.png|.*\\.svg).*)',
    '/api/admin/:path*'
  ],
}
