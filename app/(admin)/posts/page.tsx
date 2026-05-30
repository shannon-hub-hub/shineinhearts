import { Metadata } from 'next'
import Link from 'next/link'
import { getMany } from '@/lib/db'
import { BlogPost } from '@/types'

export const metadata: Metadata = { title: 'Blog Posts — Admin' }

async function getPosts(): Promise<BlogPost[]> {
  return getMany(
    `SELECT id, title, slug, author_name, published, published_at, created_at
     FROM blog_posts
     ORDER BY created_at DESC`
  )
}

export default async function AdminPostsPage() {
  const posts = await getPosts()

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'Lora, serif', fontSize: '1.8rem', color: 'var(--color-text)' }}>Blog posts</h1>
        <Link href="/admin/posts/new" className="btn btn-filled" style={{ fontSize: 13 }}>+ New post</Link>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
            {['Title', 'Author', 'Status', 'Date', ''].map(h => (
              <th key={h} style={{ textAlign: 'left', padding: '0.75rem 0.5rem', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 700 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
              <td style={{ padding: '0.875rem 0.5rem', fontFamily: 'Lora, serif', color: 'var(--color-text)', maxWidth: 280 }}>
                <div style={{ fontWeight: 600 }}>{post.title}</div>
                <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 2 }}>/blog/{post.slug}</div>
              </td>
              <td style={{ padding: '0.875rem 0.5rem', color: 'var(--color-text-muted)' }}>{post.author_name ?? '—'}</td>
              <td style={{ padding: '0.875rem 0.5rem' }}>
                <span style={{
                  fontSize: 11, fontWeight: 600, padding: '3px 8px',
                  background: post.published ? '#E8F5E8' : '#F5F0E8',
                  color: post.published ? '#4A7A4A' : '#7A6A4A',
                }}>
                  {post.published ? 'Published' : 'Draft'}
                </span>
              </td>
              <td style={{ padding: '0.875rem 0.5rem', color: 'var(--color-text-muted)', fontSize: 13 }}>
                {post.published_at ? new Date(post.published_at).toLocaleDateString() : new Date(post.created_at).toLocaleDateString()}
              </td>
              <td style={{ padding: '0.875rem 0.5rem' }}>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Link href={`/blog/${post.slug}`} style={{ fontSize: 13, color: 'var(--color-primary)', textDecoration: 'none' }}>View ↗</Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
