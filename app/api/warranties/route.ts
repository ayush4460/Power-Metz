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

async function generateUniqueWarrantyId() {
  const prefix = `PM-${new Date().getFullYear()}-`
  let isUnique = false
  let warrantyId = ''
  let attempts = 0

  while (!isUnique && attempts < 10) {
    const randomDigits = Math.floor(100000 + Math.random() * 900000).toString()
    warrantyId = `${prefix}${randomDigits}`
    
    const existing = await prisma.warranty.findUnique({
      where: { warrantyId }
    })
    
    if (!existing) {
      isUnique = true
    }
    attempts++
  }
  
  if (!isUnique) {
    throw new Error('Failed to generate a unique warranty ID')
  }
  
  return warrantyId
}

export async function GET() {
  try {
    const user = await getUserFromSession()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const whereClause = user.role === 'ADMIN' ? {} : { createdById: user.id }

    const warranties = await prisma.warranty.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      include: {
        createdBy: {
          select: { email: true, role: true } 
        }
      }
    })

    return NextResponse.json(warranties)
  } catch (error) {
    console.error('Error fetching warranties:', error)
    return NextResponse.json({ error: 'Failed to fetch warranties' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const user = await getUserFromSession()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    const { 
      serialNumber, productCategory, productModel, status, warrantyPlan, 
      installDate, expiryDate, customerName, customerPhone, customerEmail, 
      customerLocation, installerName, extensionPending, warrantyId: providedWarrantyId 
    } = data

    if (!serialNumber || !productCategory || !productModel || !customerName || !customerPhone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    let warrantyId = providedWarrantyId
    if (warrantyId) {
      const existing = await prisma.warranty.findUnique({ where: { warrantyId } })
      if (existing) {
        warrantyId = await generateUniqueWarrantyId()
      }
    } else {
      warrantyId = await generateUniqueWarrantyId()
    }

    const warranty = await prisma.warranty.create({
      data: {
        warrantyId,
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
        createdById: user.id
      }
    })

    return NextResponse.json(warranty)
  } catch (error: unknown) {
    console.error('Error creating warranty:', error)
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message || 'Failed to create warranty' }, { status: 500 })
    }
    return NextResponse.json({ error: 'Failed to create warranty' }, { status: 500 })
  }
}
