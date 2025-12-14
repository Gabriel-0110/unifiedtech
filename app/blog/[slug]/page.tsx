import { prisma } from "@/lib/db";
import { basicMarkdownToHtml } from "@/lib/markdown";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 300;

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  let post: any = null;
  try {
    post = await prisma.blogPost.findUnique({ where: { slug } });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      const message =
        error instanceof Error ? error.message : "Database not available";
      console.warn(`Database not available for blog post: ${message}`);
    }
    post = null;
  }
  if (!post || post.status !== "PUBLISHED") return notFound();
  const html = basicMarkdownToHtml(post.content);
  return (
    <main className="max-w-3xl mx-auto px-4 py-16 prose prose-invert">
      <h1>{post.title}</h1>
      {post.publishedAt && (
        <p className="text-sm text-neutral-500 mb-6">
          {new Date(post.publishedAt).toLocaleDateString()}{" "}
          {post.readTime && `· ${post.readTime} min read`}
        </p>
      )}
      <article dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}
