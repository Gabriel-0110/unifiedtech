import { PrismaClient } from '@prisma/client'

// If using Prisma Accelerate / Data Proxy the DATABASE_URL already points to the proxy URL.
// No special client options are required unless you want log/query events.
// For local dev with hot reload, reuse a single instance.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

function stripOptionalQuotes(value: string) {
  const trimmed = value.trim()
  if (trimmed.startsWith('"') && trimmed.endsWith('"')) return trimmed.slice(1, -1)
  if (trimmed.startsWith("'") && trimmed.endsWith("'")) return trimmed.slice(1, -1)
  return trimmed
}

function isLikelyPlaceholderDatabaseUrl(url: string) {
  // Common placeholder patterns that are syntactically invalid or not intended for runtime use.
  if (/[\[\]<>]/.test(url)) return true
  const lower = url.toLowerCase()
  return lower.includes('your_project_ref') || lower.includes('project-ref') || lower.includes('your_password')
}

function validateDatabaseUrl(raw: string | undefined): { ok: true; url: string } | { ok: false; reason: string } {
  if (!raw) return { ok: false, reason: 'missing DATABASE_URL' }
  const url = stripOptionalQuotes(raw)
  if (!url) return { ok: false, reason: 'empty DATABASE_URL' }
  if (isLikelyPlaceholderDatabaseUrl(url)) return { ok: false, reason: 'placeholder DATABASE_URL' }
  try {
    // Node's URL supports custom schemes like postgresql://
    // This is a syntactic validation only (not connectivity).
    // eslint-disable-next-line no-new
    new URL(url)
  } catch {
    return { ok: false, reason: 'invalid DATABASE_URL' }
  }
  return { ok: true, url }
}

function createUnavailablePrismaClient(reason: string): PrismaClient {
  const throwUnavailable = () => {
    throw new Error(`Database not available: ${reason}`)
  }

  const modelProxy = new Proxy(
    {},
    {
      get: () => throwUnavailable,
    },
  )

  return new Proxy(
    {},
    {
      get: (_target, prop) => {
        // Common Prisma methods that callers might access.
        if (prop === '$connect' || prop === '$disconnect') return async () => {}
        if (prop === '$on' || prop === '$use') return () => {}
        if (prop === '$transaction') return throwUnavailable
        // Treat any model access (e.g., prisma.blogPost) as unavailable.
        return modelProxy
      },
    },
  ) as PrismaClient
}

const createPrismaClient = () => {
  const validation = validateDatabaseUrl(process.env.DATABASE_URL)
  if (!validation.ok) {
    // During local builds / CI it's common to have a placeholder DATABASE_URL.
    // Returning an unavailable client allows pages to catch errors and still build.
    console.warn(`${validation.reason}; using unavailable Prisma client`) // eslint-disable-line no-console
    return createUnavailablePrismaClient(validation.reason)
  }

  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })
}

export const prisma = globalForPrisma.prisma || createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
