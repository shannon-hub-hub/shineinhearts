import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { queryOne } from '@/lib/db'
import { BlogPost } from '@/types'
import { formatDate } from '@/lib/utils'

interface Props { params: { slug: string } }

export const dynamic = 'force-dynamic'

async function getPost(slug: string): Promise<BlogPost | null> {
  return queryOne(
    `SELECT bp.*, m.name AS author_display
     FROM blog_posts bp
     LEFT JOIN members m ON m.id = bp.author_id
     WHERE bp.slug = $1 AND bp.published = TRUE`,
    [slug]
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug)
  if (!post) return { title: 'Post not found' }
  return { title: post.title, description: post.excerpt }
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPost(params.slug)
  if (!post) notFound()

  const category = post.tags?.[0] ?? 'Community'
  const heroAlt =
    post.slug === 'notes-from-the-heart'
      ? 'Children at the Harmony of the Earth concert'
      : post.title

  return (
    <>
      <header style={{ padding: 'calc(var(--nav-height) + 5rem) 10% 4rem', borderBottom: '1px solid var(--color-border)', maxWidth: 820 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
          <Link href="/blog" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', borderBottom: '1px solid var(--color-border)' }}>Blog</Link>
          <span style={{ opacity: 0.4 }}>/</span>
          {post.published_at && <span>{formatDate(post.published_at)}</span>}
          <span style={{ opacity: 0.4 }}>·</span>
          <span>{category}</span>
          {post.author_name && <><span style={{ opacity: 0.4 }}>·</span><span>Written by {post.author_name}</span></>}
        </div>
        <h1>{post.title}</h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', marginTop: '1.25rem', maxWidth: 580, lineHeight: 1.75 }}>
          {post.excerpt}
        </p>
      </header>

      {post.image_url && (
        <div style={{ borderBottom: '1px solid var(--color-border)', overflow: 'hidden', maxHeight: 520 }}>
          <img src={post.image_url} alt={heroAlt} style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', objectPosition: 'center' }} />
        </div>
      )}

      <article className="post-body">
        <div dangerouslySetInnerHTML={{ __html: post.body }} />
      </article>

      <footer style={{ padding: '4rem 10%', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
        <Link href="/blog" className="btn">← Back to blog</Link>
        <Link href="/get-involved" className="btn btn-filled">Get involved</Link>
      </footer>
    </>
  )
}
