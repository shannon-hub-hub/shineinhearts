import { Metadata } from 'next'
import { getMany } from '@/lib/db'
import { ContactSubmission } from '@/types'
import { MarkReadButton } from '@/components/admin/MarkReadButton'

export const metadata: Metadata = { title: 'Messages — Admin' }

export default async function AdminMessagesPage() {
  const messages = await getMany<ContactSubmission>(
    `SELECT * FROM contact_submissions ORDER BY created_at DESC`
  )
  const unread = messages.filter(m => !m.read).length

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'Lora, serif', fontSize: '1.8rem', color: 'var(--color-text)' }}>Messages</h1>
        <p style={{ color: 'var(--color-text-muted)', marginTop: 4, fontSize: 14 }}>{unread} unread · {messages.length} total</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {messages.map(msg => (
          <div key={msg.id} style={{
            padding: '1.25rem 0', borderTop: '1px solid var(--color-border)',
            display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'start',
            opacity: msg.read ? 0.7 : 1,
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                {!msg.read && <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--color-primary)', flexShrink: 0 }} />}
                <span style={{ fontWeight: 600, color: 'var(--color-text)', fontSize: 15 }}>{msg.name}</span>
                <span style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>&lt;{msg.email}&gt;</span>
              </div>
              {msg.subject && <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text)', marginBottom: 4 }}>{msg.subject}</div>}
              <p style={{ fontSize: 14, color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{msg.message}</p>
              <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 8 }}>{new Date(msg.created_at).toLocaleString()}</div>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <a href={`mailto:${msg.email}?subject=Re: ${msg.subject ?? 'Your message to Shine in Hearts'}`}
                className="btn" style={{ fontSize: 12, padding: '6px 14px' }}>Reply ↗</a>
              {!msg.read && <MarkReadButton messageId={msg.id} />}
            </div>
          </div>
        ))}
        <div style={{ borderTop: '1px solid var(--color-border)' }} />
      </div>
    </div>
  )
}
