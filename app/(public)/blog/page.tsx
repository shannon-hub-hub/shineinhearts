import { Metadata } from 'next'
import Link from 'next/link'
import { getMany } from '@/lib/db'
import { BlogPost } from '@/types'
import { RevealWrapper } from '@/components/ui/RevealWrapper'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Stories, reflections, and honest writing from students who are figuring it out as they go.',
}
export const dynamic = 'force-dynamic'

async function getPosts(): Promise<BlogPost[]> {
  return getMany(
    `SELECT id, title, slug, excerpt, author_name, tags, image_url, published_at
     FROM blog_posts
     WHERE published = TRUE
     ORDER BY published_at DESC`
  )
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <>
      <div className="page-header">
        <div className="breadcrumb"><Link href="/">Home</Link><span style={{ margin: '0 8px', opacity: 0.4 }}>/</span>Blog</div>
        <h1>Blog</h1>
        <p>
          Stories, reflections, and honest writing from students who are figuring it out as they go.
        </p>
      </div>

      <section style={{ padding: '3rem 10% 5rem' }}>
        {posts.map((post, i) => (
          <RevealWrapper key={post.id} delay={i * 80}>
            <article style={{
              borderTop: i > 0 ? '1px solid var(--color-border)' : 'none', padding: '4rem 0',
              display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '5rem', alignItems: 'start',
            }}>
              {post.image_url && (
                <div style={{ overflow: 'hidden' }}>
                  <img src={post.image_url} alt={post.title} style={{ width: '100%', display: 'block', transition: 'transform 0.5s ease' }} />
                </div>
              )}
              <div style={{ gridColumn: post.image_url ? 'auto' : '1 / -1' }}>
                <span className="label">{formatDate(post.published_at ?? '')} &nbsp;·&nbsp; {post.tags?.[0] ?? 'Community'}</span>
                <h2 style={{ marginBottom: '1.25rem' }}>{post.title}</h2>
                <p style={{ marginBottom: '1.5rem', fontSize: '1.05rem' }}>{post.excerpt}</p>
                {post.author_name && (
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '2rem' }}>By {post.author_name}</p>
                )}
                <Link href={`/blog/${post.slug}`} className="btn">Read the full post</Link>
              </div>
            </article>
          </RevealWrapper>
        ))}

        <div style={{ borderTop: '1px solid var(--color-border)', padding: '4rem 0' }}>
          <RevealWrapper>
            <span className="label">Write for us</span>
            <p style={{ maxWidth: 520, marginBottom: '2rem', fontSize: '1.05rem' }}>
              The blog is a place for student voices. If you want to be part of Shine in Hearts, we'd love to publish your writing.
            </p>
            <Link href="/get-involved" className="btn btn-filled">Contribute a piece</Link>
          </RevealWrapper>
        </div>
      </section>
    </>
  )
}
