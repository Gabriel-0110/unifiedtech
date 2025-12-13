import { PrismaClient } from '@prisma/client'

// If using Prisma Accelerate / Data Proxy the DATABASE_URL already points to the proxy URL.
// No special client options are required unless you want log/query events.
// For local dev with hot reload, reuse a single instance.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

// Fallback for build environment when DATABASE_URL might not be set
const createPrismaClient = () => {
  if (!process.env.DATABASE_URL) {
    // Return a mock client for build time when DATABASE_URL is missing
    console.warn('DATABASE_URL not found, using mock Prisma client for build')
    return {} as PrismaClient
  }
  
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })
}

export const prisma = globalForPrisma.prisma || createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
