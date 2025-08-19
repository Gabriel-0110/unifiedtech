import { NextResponse, type NextRequest } from 'next/server'
import validator from 'validator'
import { ZodSchema } from 'zod'

// Augmented request (non-invasive – intersection type to avoid structural mismatch)
export type AugmentedRequest = NextRequest & {
  validatedData?: unknown
  rawBodyText?: string
  parsedBody?: unknown
  ip?: string
  userAgent?: string | null
  startTime?: number
  securityHeaders?: Record<string, string>
}

class SimpleRateLimiter {
  private points: number
  private duration: number
  private requests: Map<string, number[]>
  constructor(options: { points: number; duration: number }) {
    this.points = options.points
    this.duration = options.duration
    this.requests = new Map()
  }
  consume(key: string) {
    const now = Date.now()
    const windowStart = now - this.duration * 1000
    const arr = this.requests.get(key) || []
    const valid = arr.filter((t) => t > windowStart)
    if (valid.length >= this.points) throw new Error('Rate limit exceeded')
    valid.push(now)
    this.requests.set(key, valid)
  }
}

const rateLimiters: Record<string, SimpleRateLimiter> = {
  api: new SimpleRateLimiter({
    points: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
    duration: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900', 10),
  }),
  contact: new SimpleRateLimiter({ points: 5, duration: 3600 }),
}

export type Middleware = (req: AugmentedRequest) => Promise<NextResponse | void> | NextResponse | void

export const withRateLimit = (type = 'api'): Middleware => (req) => {
  try {
    const limiter = rateLimiters[type]
    if (!limiter) return
    const ip = getClientIP(req)
    req.ip = ip
    limiter.consume(ip)
  } catch {
    return NextResponse.json({ error: 'Too many requests', code: 'RATE_LIMIT' }, { status: 429 })
  }
}

export const withValidation = (schema: ZodSchema): Middleware => async (req) => {
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
    try {
      const bodyRaw = await req.text()
      ;(req as AugmentedRequest).rawBodyText = bodyRaw
      const parsed: unknown = bodyRaw ? JSON.parse(bodyRaw) : {}
      ;(req as AugmentedRequest).parsedBody = parsed
      const validated = schema.parse(parsed)
      req.validatedData = validated
    } catch (err: any) {
      return NextResponse.json({ error: 'Validation failed', code: 'VALIDATION_ERROR', details: err.errors || err.message }, { status: 400 })
    }
  }
}

export const withSecurity = (): Middleware => (req) => {
  const headers: Record<string, string> = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  }
  req.securityHeaders = headers
}

export const withLogging = (): Middleware => (req) => {
  if (process.env.NODE_ENV === 'development') console.log('[api]', req.method, req.nextUrl.pathname)
  req.startTime = Date.now()
  req.ip = getClientIP(req)
  req.userAgent = req.headers.get('user-agent')
}

export const withErrorBoundary = (handler: (req: AugmentedRequest) => Promise<NextResponse> | NextResponse): Middleware => async (req) => {
  try {
    return await handler(req)
  } catch (err: any) {
    if (process.env.NODE_ENV === 'development') console.error('API Error', err)
    return NextResponse.json({ error: 'Internal server error', code: 'INTERNAL_ERROR' }, { status: 500 })
  }
}

export const composeRoute = (...middlewares: Middleware[]) => {
  return async (req: NextRequest) => {
    const augmented = req as AugmentedRequest
    let response: NextResponse | undefined
    for (const mw of middlewares) {
      const res = await mw(augmented)
      if (res instanceof NextResponse) {
        response = res
        break
      }
    }
    // Ensure we always have a response (last middleware must return one)
    if (!response) {
      return NextResponse.json({ error: 'Handler did not return a response' }, { status: 500 })
    }
    if (augmented.securityHeaders) Object.entries(augmented.securityHeaders).forEach(([k, v]) => response!.headers.set(k, v))
    return response
  }
}

export const getClientIP = (req: NextRequest): string => {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return req.headers.get('x-real-ip') || 'anonymous'
}

export const sanitizeInput = {
  email: (email: unknown) => (typeof email === 'string' ? validator.normalizeEmail(email.trim()) || '' : ''),
  string: (str: unknown, max = 1000) => (typeof str === 'string' ? validator.escape(str.trim().substring(0, max)) : ''),
}
