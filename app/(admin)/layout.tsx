import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  return (
    <div style={{ display: 'flex', minHeight: '100vh', paddingTop: 'var(--nav-height)' }}>
      <aside className="admin-sidebar">
        <div style={{ padding: '1.5rem 20px', borderBottom: '1px solid rgba(247,244,239,0.1)', marginBottom: '0.5rem' }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(247,244,239,0.4)' }}>Admin</div>
          <div style={{ fontSize: 14, color: 'var(--color-bg)', marginTop: 2 }}>{session.user?.email}</div>
        </div>

        {[
          { href: '/admin/dashboard', icon: '▦', label: 'Dashboard' },
          { href: '/admin/posts',     icon: '✎', label: 'Blog posts' },
          { href: '/admin/members',   icon: '◎', label: 'Members' },
          { href: '/admin/applications', icon: '◈', label: 'Applications' },
          { href: '/admin/messages',  icon: '◻', label: 'Messages' },
        ].map(item => (
          <Link key={item.href} href={item.href} className="admin-nav-item">
            <span style={{ fontSize: 14 }}>{item.icon}</span>
            {item.label}
          </Link>
        ))}

        <div style={{ marginTop: 'auto', padding: '20px' }}>
          <Link href="/" className="admin-nav-item" style={{ fontSize: 12 }}>← Back to site</Link>
        </div>
      </aside>

      <div style={{ flex: 1, padding: '2.5rem 3rem', background: 'var(--color-bg)', overflowY: 'auto' }}>
        {children}
      </div>
    </div>
  )
}
