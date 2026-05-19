import { PrismaClient } from '../generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'
import dotenv from 'dotenv'

// Load environment variables explicitly (Prisma v7 standard)
dotenv.config()

// Connect to your existing DB using the native pg driver pool
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)

// Pass the adapter into the Prisma Client
export const prisma = new PrismaClient({ adapter })

async function main() {
  // You can now query your existing tables securely with full type safety
  const users = await prisma.user.findMany()
  console.log(users)
}

main()
