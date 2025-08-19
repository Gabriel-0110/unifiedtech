import { prisma } from '@/lib/db'
import Link from 'next/link'

export const revalidate = 300

export default async function BlogIndexPage() {
  // Handle case where DATABASE_URL is not available during build
  let posts: any[] = []
  
  try {
    if (process.env.DATABASE_URL) {
      posts = await prisma.blogPost.findMany({
        where: { status: 'PUBLISHED' },
        orderBy: { publishedAt: 'desc' },
        take: 25,
        select: { id: true, title: true, slug: true, excerpt: true, publishedAt: true, readTime: true }
      })
    }
  } catch (error) {
    console.warn('Database not available during build:', error)
    posts = []
  }
  
  type Post = { id: string; title: string; slug: string; excerpt: string | null; publishedAt: Date | null; readTime: number | null }
  
  return (
    <main className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Insights & Articles</h1>
      <ul className="space-y-8">
        {posts.map((p: Post) => (
          <li key={p.id} className="border border-neutral-800 rounded-lg p-6 hover:border-neutral-600 transition-colors">
            <h2 className="text-2xl font-semibold mb-2"><Link href={`/blog/${p.slug}`}>{p.title}</Link></h2>
            {p.excerpt && <p className="text-neutral-400 mb-2 line-clamp-3">{p.excerpt}</p>}
            <div className="text-xs text-neutral-500 flex gap-4">
              {p.publishedAt && <span>{new Date(p.publishedAt).toLocaleDateString()}</span>}
              {p.readTime && <span>{p.readTime} min read</span>}
            </div>
          </li>
        ))}
        {posts.length === 0 && <li className="text-neutral-500">No articles yet.</li>}
      </ul>
    </main>
  )
}
