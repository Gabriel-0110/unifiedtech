import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { composeRoute, withSecurity, withLogging, withRateLimit, withErrorBoundary } from '@/lib/middleware'

const unsubscribeHandler = withErrorBoundary(async (req: any) => {
  const token = req.nextUrl.searchParams.get('token') || undefined
  const email = req.nextUrl.searchParams.get('email') || undefined
  if (!token && !email) return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
  const record = await prisma.newsletter.findFirst({ where: token ? { unsubscribeToken: token } : { email } })
  if (!record) return NextResponse.json({ error: 'Subscription not found' }, { status: 404 })
  if (record.unsubscribedAt) return NextResponse.json({ success: true, message: 'Already unsubscribed.' })
  await prisma.newsletter.update({
    where: { email: record.email },
    data: { unsubscribedAt: new Date(), status: 'UNSUBSCRIBED' },
  })
  return NextResponse.json({ success: true, message: 'You have been unsubscribed.' })
})

export const GET = composeRoute(withSecurity(), withLogging(), withRateLimit('newsletter'), unsubscribeHandler)
