import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'

async function getUserFromSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value

  if (!token) {
    return null
  }

  try {
    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) return null

    const secret = new TextEncoder().encode(jwtSecret)
    const { payload } = await jwtVerify(token, secret)
    return payload as { id: string, email: string, role: string }
  } catch {
    return null
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUserFromSession()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    
    const warranty = await prisma.warranty.findUnique({
      where: { id },
      include: {
        createdBy: {
          select: { email: true, role: true }
        }
      }
    })

    if (!warranty) {
      return NextResponse.json({ error: 'Warranty not found' }, { status: 404 })
    }

    // Vendor can only view their own warranties
    if (user.role === 'VENDOR' && warranty.createdById !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json(warranty)
  } catch (error) {
    console.error('Error fetching warranty:', error)
    return NextResponse.json({ error: 'Failed to fetch warranty' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUserFromSession()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const warranty = await prisma.warranty.findUnique({ where: { id } })

    if (!warranty) {
      return NextResponse.json({ error: 'Warranty not found' }, { status: 404 })
    }

    if (user.role === 'VENDOR' && warranty.createdById !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const data = await request.json()
    const { 
      serialNumber, productCategory, productModel, status, warrantyPlan, 
      installDate, expiryDate, customerName, customerPhone, customerEmail, 
      customerLocation, installerName, extensionPending 
    } = data

    const updatedWarranty = await prisma.warranty.update({
      where: { id },
      data: {
        serialNumber,
        productCategory,
        productModel,
        status,
        warrantyPlan,
        installDate: installDate ? new Date(installDate) : null,
        expiryDate: expiryDate ? new Date(expiryDate) : null,
        customerName,
        customerPhone,
        customerEmail,
        customerLocation,
        installerName,
        extensionPending,
      }
    })

    return NextResponse.json(updatedWarranty)
  } catch (error: unknown) {
    console.error('Error updating warranty:', error)
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message || 'Failed to update warranty' }, { status: 500 })
    }
    return NextResponse.json({ error: 'Failed to update warranty' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUserFromSession()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const warranty = await prisma.warranty.findUnique({ where: { id } })

    if (!warranty) {
      return NextResponse.json({ error: 'Warranty not found' }, { status: 404 })
    }

    if (user.role === 'VENDOR' && warranty.createdById !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    await prisma.warranty.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting warranty:', error)
    return NextResponse.json({ error: 'Failed to delete warranty' }, { status: 500 })
  }
}
