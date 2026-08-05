import { Role } from './generated/prisma/client'
import prisma from '../lib/prisma'
import * as bcrypt from 'bcryptjs'

async function main() {
  console.log('Seeding database...')

  const adminEmail = process.env.ADMIN_USERNAME
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminEmail || !adminPassword) {
    console.error('Missing ADMIN_USERNAME or ADMIN_PASSWORD in .env')
    process.exit(1)
  }

  // Check if admin already exists
  const existingAdmin = await prisma.user.findFirst({
    where: { role: Role.ADMIN }
  })

  if (existingAdmin) {
    console.log('Admin account already exists. Skipping seed.')
    return
  }

  console.log(`Creating Admin user: ${adminEmail}...`)

  const passwordHash = await bcrypt.hash(adminPassword, 10)

  await prisma.user.create({
    data: {
      email: adminEmail,
      passwordHash,
      role: Role.ADMIN
    }
  })

  console.log('Default Admin account successfully created!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
