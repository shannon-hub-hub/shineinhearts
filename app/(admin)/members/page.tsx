import { Metadata } from 'next'
import Link from 'next/link'
import { getMany } from '@/lib/db'

export const metadata: Metadata = { title: 'Members — Admin' }

export default async function AdminMembersPage() {
  const members = await getMany<{
    id: string; name: string; role: string; email: string | null
    is_core_team: boolean; is_advisor: boolean; city: string | null; country: string | null
    created_at: string
  }>(
    `SELECT m.id, m.name, m.role, m.email, m.is_core_team, m.is_advisor,
            c.city, c.country, m.created_at
     FROM members m
     LEFT JOIN chapters c ON c.id = m.chapter_id
     ORDER BY m.is_core_team DESC, m.is_advisor DESC, c.country NULLS LAST, m.name`
  )

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'Lora, serif', fontSize: '1.8rem', color: 'var(--color-text)' }}>Members</h1>
        <span style={{ fontSize: 14, color: 'var(--color-text-muted)' }}>{members.length} total</span>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
            {['Name', 'Role', 'Location', 'Email', 'Type', 'Joined'].map(h => (
              <th key={h} style={{ textAlign: 'left', padding: '0.75rem 0.5rem', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 700 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {members.map(m => (
            <tr key={m.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
              <td style={{ padding: '0.875rem 0.5rem', fontFamily: 'Lora, serif', color: 'var(--color-text)', fontWeight: 600 }}>{m.name}</td>
              <td style={{ padding: '0.875rem 0.5rem', color: 'var(--color-text-muted)' }}>{m.role}</td>
              <td style={{ padding: '0.875rem 0.5rem', color: 'var(--color-text-muted)' }}>{m.city && m.country ? `${m.city}, ${m.country}` : '—'}</td>
              <td style={{ padding: '0.875rem 0.5rem', color: 'var(--color-text-muted)', fontSize: 13 }}>{m.email ?? '—'}</td>
              <td style={{ padding: '0.875rem 0.5rem' }}>
                {m.is_core_team && <span style={{ fontSize: 11, padding: '2px 8px', background: 'var(--color-accent-soft)', color: 'var(--color-primary-deep)', fontWeight: 600 }}>Core</span>}
                {m.is_advisor  && <span style={{ fontSize: 11, padding: '2px 8px', background: '#EEE8E1', color: 'var(--color-text-muted)', fontWeight: 600 }}>Advisor</span>}
                {!m.is_core_team && !m.is_advisor && <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>Chapter</span>}
              </td>
              <td style={{ padding: '0.875rem 0.5rem', color: 'var(--color-text-muted)', fontSize: 13 }}>{new Date(m.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
