'use client'
import { useState } from 'react'

export function ContactForm() {
  const [form, setForm]       = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus]   = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
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
      <div style={{ padding: '2rem', border: '1px solid var(--color-border)' }}>
        <h3 style={{ fontFamily: 'Lora, serif', marginBottom: '0.75rem' }}>Message sent</h3>
        <p style={{ fontSize: '1rem' }}>Thank you — we'll be in touch soon.</p>
      </div>
    )
  }

  const inputStyle = {
    width: '100%', padding: '10px 14px',
    border: '1.5px solid var(--color-border)',
    background: 'transparent', fontSize: 15,
    fontFamily: 'Source Sans 3, sans-serif',
    color: 'var(--color-text)', outline: 'none',
    transition: 'border-color 0.2s',
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {[
        { field: 'name',    label: 'Name',    type: 'text',  required: true },
        { field: 'email',   label: 'Email',   type: 'email', required: true },
        { field: 'subject', label: 'Subject', type: 'text',  required: false },
      ].map(({ field, label, type, required }) => (
        <div key={field}>
          <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: 6 }}>{label}</label>
          <input type={type} required={required} value={(form as any)[field]}
            onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
            style={inputStyle} />
        </div>
      ))}
      <div>
        <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: 6 }}>Message</label>
        <textarea required rows={5} value={form.message}
          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          style={{ ...inputStyle, resize: 'vertical' as const }} />
      </div>
      {status === 'error' && <p style={{ fontSize: 13, color: '#B76A6A' }}>Something went wrong — please try again or email us directly.</p>}
      <button type="submit" disabled={status === 'loading'} className="btn btn-filled" style={{ alignSelf: 'flex-start' }}>
        {status === 'loading' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}
