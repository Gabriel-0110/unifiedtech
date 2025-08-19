import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { composeRoute, withSecurity, withLogging, withRateLimit, withErrorBoundary } from '@/lib/middleware'

const confirmHandler = withErrorBoundary(async (req: any) => {
  const token = req.nextUrl.searchParams.get('token')
  if (!token) return NextResponse.json({ error: 'Missing token' }, { status: 400 })
  const record = await prisma.newsletter.findFirst({ where: { confirmationToken: token, status: 'PENDING' } })
  if (!record) return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 })
  await prisma.newsletter.update({
    where: { email: record.email },
    data: { status: 'CONFIRMED', confirmedAt: new Date(), confirmationToken: null },
  })
  return NextResponse.json({ success: true, message: 'Subscription confirmed.' })
})

export const GET = composeRoute(withSecurity(), withLogging(), withRateLimit('newsletter'), confirmHandler)
