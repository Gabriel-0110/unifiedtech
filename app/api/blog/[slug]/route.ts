import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { blogPostUpdateSchema } from '@/lib/validation'
import { composeRoute, withSecurity, withLogging, withRateLimit, withValidation, withErrorBoundary } from '@/lib/middleware'

const getHandler = withErrorBoundary(async (req: any) => {
  const slug = req.nextUrl.pathname.split('/').pop() as string
  const increment = req.nextUrl.searchParams.get('view') === '1'
  const post = await prisma.blogPost.findUnique({ where: { slug } })
  if (!post || (post.status !== 'PUBLISHED' && req.nextUrl.searchParams.get('preview') !== '1')) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  if (increment) {
    await prisma.blogPost.update({ where: { slug }, data: { views: { increment: 1 } } })
  }
  return NextResponse.json({ success: true, post })
})

const updateHandler = withErrorBoundary(async (req: any) => {
  const data = req.validatedData as any
  const id = data.id
  delete data.id
  if (data.tags) data.tags = data.tags.join(',')
  if (data.status === 'PUBLISHED' && !data.publishedAt) data.publishedAt = new Date()
  const updated = await prisma.blogPost.update({ where: { id }, data })
  return NextResponse.json({ success: true, post: updated })
})

export const GET = composeRoute(withSecurity(), withLogging(), withRateLimit('api'), getHandler)
export const PATCH = composeRoute(withSecurity(), withLogging(), withRateLimit('api'), withValidation(blogPostUpdateSchema), updateHandler)
