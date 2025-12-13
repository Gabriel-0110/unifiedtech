import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { blogPostCreateSchema } from '@/lib/validation'
import { composeRoute, withSecurity, withLogging, withRateLimit, withValidation, withErrorBoundary } from '@/lib/middleware'
import { slugify } from '@/lib/slug'

// List & Create blog posts
const listHandler = withErrorBoundary(async (req: any) => {
  const url = req.nextUrl
  const status = url.searchParams.get('status') || 'PUBLISHED'
  const take = Math.min(parseInt(url.searchParams.get('take') || '20', 10), 50)
  const skip = parseInt(url.searchParams.get('skip') || '0', 10)
  const posts = await prisma.blogPost.findMany({
    where: { status },
    orderBy: { publishedAt: 'desc' },
    take,
    skip,
    select: { id: true, title: true, slug: true, excerpt: true, coverImage: true, publishedAt: true, tags: true, category: true, readTime: true },
  })
  return NextResponse.json({ success: true, posts })
})

const createHandler = withErrorBoundary(async (req: any) => {
  const data = req.validatedData as any
  const slug = data.slug ? slugify(data.slug) : slugify(data.title)
  const exists = await prisma.blogPost.findUnique({ where: { slug } })
  if (exists) return NextResponse.json({ error: 'Slug already exists' }, { status: 400 })
  const content = data.content
  const words = content.split(/\s+/).length
  const readTime = Math.max(1, Math.round(words / 200))
  const post = await prisma.blogPost.create({
    data: {
      title: data.title,
      slug,
      content,
      excerpt: data.excerpt || content.slice(0, 180),
      coverImage: data.coverImage,
      status: data.status,
      authorId: data.authorId,
      category: data.category,
      tags: data.tags ? data.tags.join(',') : undefined,
      seoTitle: data.seoTitle || data.title,
      seoDescription: data.seoDescription || data.excerpt || content.slice(0, 160),
      readTime,
      publishedAt: data.status === 'PUBLISHED' ? new Date() : null,
    },
    select: { id: true, slug: true, status: true },
  })
  return NextResponse.json({ success: true, post }, { status: 201 })
})

export const GET = composeRoute(withSecurity(), withLogging(), withRateLimit('api'), listHandler)
export const POST = composeRoute(withSecurity(), withLogging(), withRateLimit('api'), withValidation(blogPostCreateSchema), createHandler)
