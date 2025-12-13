import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { newsletterSchema } from '@/lib/validation'
import { composeRoute, withSecurity, withLogging, withRateLimit, withValidation, withErrorBoundary, sanitizeInput } from '@/lib/middleware'
import { emailService } from '@/lib/email'
import { randomUUID } from 'crypto'

const subscribeHandler = withErrorBoundary(async (req: any) => {
  const data = req.validatedData as any
  const email = sanitizeInput.email(data.email)
  const firstName = data.firstName ? sanitizeInput.string(data.firstName, 50) : null
  const lastName = data.lastName ? sanitizeInput.string(data.lastName, 50) : null
  const source = data.source || 'newsletter_form'
  const tags = Array.isArray(data.tags) ? data.tags.join(',') : undefined
  const doubleOptIn = data.doubleOptIn !== false // default true

  const existing = await prisma.newsletter.findUnique({ where: { email } })
  if (existing) {
    if (existing.status === 'CONFIRMED') {
      return NextResponse.json({ success: true, message: 'You are already subscribed.' })
    }
    // Update pending record
    const token = doubleOptIn ? randomUUID() : existing.confirmationToken || randomUUID()
    const updated = await prisma.newsletter.update({
      where: { email },
      data: {
        firstName,
        lastName,
        source,
        tags,
        confirmationToken: token,
        status: doubleOptIn ? 'PENDING' : 'CONFIRMED',
        confirmedAt: doubleOptIn ? null : new Date(),
      },
    })
    if (doubleOptIn) await emailService.sendNewsletterConfirmation(email, token!)
    else await emailService.sendNewsletterWelcome(email)
    return NextResponse.json({ success: true, message: doubleOptIn ? 'Confirmation email sent.' : 'Subscribed successfully.' })
  }

  const token = doubleOptIn ? randomUUID() : undefined
  const created = await prisma.newsletter.create({
    data: {
      email,
      firstName,
      lastName,
      source,
      tags,
      status: doubleOptIn ? 'PENDING' : 'CONFIRMED',
      confirmationToken: token,
      confirmedAt: doubleOptIn ? null : new Date(),
    },
  })
  if (doubleOptIn && token) await emailService.sendNewsletterConfirmation(email, token)
  if (!doubleOptIn) await emailService.sendNewsletterWelcome(email)
  return NextResponse.json({ success: true, message: doubleOptIn ? 'Please confirm your subscription via email.' : 'Subscribed successfully.' }, { status: 201 })
})

export const POST = composeRoute(
  withSecurity(),
  withLogging(),
  withRateLimit('newsletter'),
  withValidation(newsletterSchema),
  subscribeHandler
)
