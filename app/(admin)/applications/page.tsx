import { Metadata } from 'next'
import { getMany } from '@/lib/db'
import { Application } from '@/types'
import { ApplicationActions } from '@/components/admin/ApplicationActions'

export const metadata: Metadata = { title: 'Applications — Admin' }

async function getApplications(): Promise<Application[]> {
  return getMany(`SELECT * FROM applications ORDER BY created_at DESC`)
}

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  pending:  { bg: '#FFF8F0', color: '#C79B5A' },
  approved: { bg: '#E8F5E8', color: '#4A7A4A' },
  rejected: { bg: '#FFF0F0', color: '#9A4A4A' },
}

export default async function AdminApplicationsPage() {
  const apps = await getApplications()
  const pending  = apps.filter(a => a.status === 'pending').length
  const approved = apps.filter(a => a.status === 'approved').length

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'Lora, serif', fontSize: '1.8rem', color: 'var(--color-text)' }}>Applications</h1>
        <p style={{ color: 'var(--color-text-muted)', marginTop: 4, fontSize: 14 }}>
          {pending} pending · {approved} approved · {apps.length} total
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {apps.map(app => {
          const style = STATUS_STYLES[app.status] ?? STATUS_STYLES.pending
          return (
            <div key={app.id} style={{ padding: '1.25rem 0', borderTop: '1px solid var(--color-border)', display: 'grid', gridTemplateColumns: '1fr 160px 200px', gap: '1.5rem', alignItems: 'start' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <span style={{ fontWeight: 600, color: 'var(--color-text)', fontSize: 15 }}>{app.name}</span>
                  <span style={{ fontSize: 11, padding: '2px 8px', fontWeight: 600, background: style.bg, color: style.color }}>
                    {app.status}
                  </span>
                </div>
                <div style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>{app.email} · {app.interest}</div>
                {app.city && (
                  <div style={{ fontSize: 13, color: 'var(--color-text-muted)', marginTop: 2 }}>{app.city}</div>
                )}
                {app.message && (
                  <p style={{ fontSize: 13, marginTop: 8, color: 'var(--color-text-muted)', lineHeight: 1.5 }}>{app.message.slice(0, 180)}{app.message.length > 180 ? '…' : ''}</p>
                )}
              </div>
              <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
                {new Date(app.created_at).toLocaleDateString()}
              </div>
              {app.status === 'pending' && (
                <ApplicationActions applicationId={app.id} />
              )}
            </div>
          )
        })}
        <div style={{ borderTop: '1px solid var(--color-border)' }} />
      </div>
    </div>
  )
}
