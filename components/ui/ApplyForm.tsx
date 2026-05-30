'use client'
import { useState } from 'react'

interface Props { programs: string[] }

export function ApplyForm({ programs }: Props) {
  const [form, setForm] = useState({
    name: '', email: '', program: programs[0] ?? '', city: '', country: '', message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div style={{ padding: '2rem', border: '1px solid var(--color-border)', maxWidth: 560 }}>
        <h3 style={{ fontFamily: 'Lora, serif', marginBottom: '0.75rem' }}>Application received</h3>
        <p>Thank you, {form.name} — we'll be in touch within a few days.</p>
      </div>
    )
  }

  const inputStyle = {
    width: '100%', padding: '10px 14px',
    border: '1.5px solid var(--color-border)',
    background: 'transparent', fontSize: 15,
    fontFamily: 'Source Sans 3, sans-serif',
    color: 'var(--color-text)', outline: 'none',
  }
  const labelStyle = {
    fontSize: 11, fontWeight: 700 as const, letterSpacing: '0.12em',
    textTransform: 'uppercase' as const, color: 'var(--color-text-muted)',
    display: 'block' as const, marginBottom: 6,
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', maxWidth: 720 }}>
      <div>
        <label style={labelStyle}>Name</label>
        <input type="text" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={inputStyle} />
      </div>
      <div>
        <label style={labelStyle}>Email</label>
        <input type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={inputStyle} />
      </div>
      <div>
        <label style={labelStyle}>Program</label>
        <select value={form.program} onChange={e => setForm(f => ({ ...f, program: e.target.value }))} style={{ ...inputStyle, cursor: 'pointer' }}>
          {programs.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>
      <div>
        <label style={labelStyle}>City</label>
        <input type="text" value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} style={inputStyle} />
      </div>
      <div style={{ gridColumn: '1 / -1' }}>
        <label style={labelStyle}>Country</label>
        <input type="text" value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value }))} style={inputStyle} />
      </div>
      <div style={{ gridColumn: '1 / -1' }}>
        <label style={labelStyle}>Why do you want to join? (optional)</label>
        <textarea rows={4} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          style={{ ...inputStyle, resize: 'vertical' }} />
      </div>
      {status === 'error' && <p style={{ gridColumn: '1 / -1', fontSize: 13, color: '#B76A6A' }}>Something went wrong — please try again.</p>}
      <div style={{ gridColumn: '1 / -1' }}>
        <button type="submit" disabled={status === 'loading'} className="btn btn-filled">
          {status === 'loading' ? 'Submitting…' : 'Apply today'}
        </button>
      </div>
    </form>
  )
}
