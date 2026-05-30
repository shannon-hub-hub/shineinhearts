import { Metadata } from 'next'
import Link from 'next/link'
import { getMany, queryOne } from '@/lib/db'
import { Application, ContactSubmission } from '@/types'

export const metadata: Metadata = { title: 'Admin Dashboard' }

async function getDashboardData() {
  const [stats, pendingApps, recentMessages] = await Promise.all([
    queryOne<{
      posts: string; members: string; applications: string
      pending: string; messages: string; unread: string
    }>(
      `SELECT
         (SELECT COUNT(*) FROM blog_posts WHERE published=TRUE)             AS posts,
         (SELECT COUNT(*) FROM members)                                   AS members,
         (SELECT COUNT(*) FROM applications)                              AS applications,
         (SELECT COUNT(*) FROM applications WHERE status='pending')       AS pending,
         (SELECT COUNT(*) FROM contact_submissions)                       AS messages,
         (SELECT COUNT(*) FROM contact_submissions WHERE "read"=FALSE)      AS unread`
    ),
    getMany<Application>(
      `SELECT * FROM applications WHERE status='pending' ORDER BY created_at DESC LIMIT 5`
    ),
    getMany<ContactSubmission>(
      `SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT 5`
    ),
  ])
  return { stats, pendingApps, recentMessages }
}

export default async function AdminDashboard() {
  const { stats, pendingApps, recentMessages } = await getDashboardData()

  const kpis = [
    { label: 'Published posts',   value: stats?.posts ?? 0,       href: '/admin/posts' },
    { label: 'Members',           value: stats?.members ?? 0,      href: '/admin/members' },
    { label: 'Pending apps',      value: stats?.pending ?? 0,      href: '/admin/applications', alert: Number(stats?.pending) > 0 },
    { label: 'Unread messages',   value: stats?.unread ?? 0,       href: '/admin/messages', alert: Number(stats?.unread) > 0 },
  ]

  return (
    <div>
      <h1 style={{ fontFamily: 'Lora, serif', fontSize: '1.8rem', marginBottom: '2rem', color: 'var(--color-text)' }}>Dashboard</h1>

      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '3rem' }}>
        {kpis.map(k => (
          <Link key={k.label} href={k.href} style={{ textDecoration: 'none' }}>
            <div style={{
              padding: '1.25rem 1.5rem',
              background: k.alert ? '#FFF8F0' : 'var(--color-surface)',
              border: `1px solid ${k.alert ? '#C79B5A' : 'var(--color-border)'}`,
              transition: 'border-color 0.2s',
            }}>
              <div style={{ fontSize: '2rem', fontFamily: 'Lora, serif', fontWeight: 700, color: k.alert ? '#C79B5A' : 'var(--color-text)' }}>{k.value}</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 4 }}>{k.label}</div>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Pending applications */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1rem', fontFamily: 'Lora, serif' }}>Pending applications</h2>
            <Link href="/admin/applications" style={{ fontSize: 13, color: 'var(--color-primary)', textDecoration: 'none' }}>View all →</Link>
          </div>
          {pendingApps.length === 0 ? (
            <p style={{ fontSize: 14, color: 'var(--color-text-muted)', padding: '1rem 0', borderTop: '1px solid var(--color-border)' }}>No pending applications</p>
          ) : pendingApps.map(app => (
            <div key={app.id} style={{ padding: '0.875rem 0', borderTop: '1px solid var(--color-border)', fontSize: 14 }}>
              <div style={{ fontWeight: 600, color: 'var(--color-text)' }}>{app.name}</div>
              <div style={{ color: 'var(--color-text-muted)', marginTop: 2 }}>{app.interest} · {app.email}</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 2 }}>{new Date(app.created_at).toLocaleDateString()}</div>
            </div>
          ))}
          {pendingApps.length > 0 && <div style={{ borderTop: '1px solid var(--color-border)' }} />}
        </div>

        {/* Recent messages */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1rem', fontFamily: 'Lora, serif' }}>Recent messages</h2>
            <Link href="/admin/messages" style={{ fontSize: 13, color: 'var(--color-primary)', textDecoration: 'none' }}>View all →</Link>
          </div>
          {recentMessages.length === 0 ? (
            <p style={{ fontSize: 14, color: 'var(--color-text-muted)', padding: '1rem 0', borderTop: '1px solid var(--color-border)' }}>No messages yet</p>
          ) : recentMessages.map(msg => (
            <div key={msg.id} style={{ padding: '0.875rem 0', borderTop: '1px solid var(--color-border)', fontSize: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {!msg.read && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-primary)', flexShrink: 0 }} />}
                <span style={{ fontWeight: 600, color: 'var(--color-text)' }}>{msg.name}</span>
              </div>
              <div style={{ color: 'var(--color-text-muted)', marginTop: 2 }}>{msg.subject ?? msg.message.slice(0, 60)}…</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 2 }}>{new Date(msg.created_at).toLocaleDateString()}</div>
            </div>
          ))}
          {recentMessages.length > 0 && <div style={{ borderTop: '1px solid var(--color-border)' }} />}
        </div>
      </div>

      {/* Quick actions */}
      <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--color-border)', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Link href="/admin/posts/new" className="btn btn-filled" style={{ fontSize: 13 }}>+ New post</Link>
        <Link href="/admin/applications" className="btn" style={{ fontSize: 13 }}>Review applications</Link>
        <Link href="/impact" className="btn" style={{ fontSize: 13 }}>View impact page ↗</Link>
      </div>
    </div>
  )
}
