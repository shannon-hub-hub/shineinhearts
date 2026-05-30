'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewPostPage() {
  const [form, setForm] = useState({
    title: '', excerpt: '', content: '', author_name: '', category: 'Community', image_url: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        const { data } = await res.json()
        router.push(`/blog/${data.slug}`)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputStyle = {
    width: '100%', padding: '10px 14px',
    border: '1.5px solid var(--color-border)',
    background: 'transparent', fontSize: 14,
    fontFamily: 'Source Sans 3, sans-serif',
    color: 'var(--color-text)', outline: 'none',
  }
  const labelStyle = {
    fontSize: 11, fontWeight: 700 as const, letterSpacing: '0.12em',
    textTransform: 'uppercase' as const, color: 'var(--color-text-muted)',
    display: 'block' as const, marginBottom: 6,
  }

  return (
    <div style={{ maxWidth: 800 }}>
      <h1 style={{ fontFamily: 'Lora, serif', fontSize: '1.8rem', marginBottom: '2rem', color: 'var(--color-text)' }}>New blog post</h1>
      <p style={{ fontSize: 13, color: 'var(--color-text-muted)', marginBottom: '2rem', padding: '0.75rem 1rem', background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
        ✦ After publishing, the post is automatically embedded with OpenAI for semantic search.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label style={labelStyle}>Title</label>
          <input type="text" required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} style={inputStyle} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={labelStyle}>Author name</label>
            <input type="text" value={form.author_name} onChange={e => setForm(f => ({ ...f, author_name: e.target.value }))} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Category</label>
            <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} style={{ ...inputStyle, cursor: 'pointer' }}>
              {['Community', 'Environment', 'Education', 'Events', 'Advocacy'].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label style={labelStyle}>Excerpt (shown on blog list)</label>
          <textarea required rows={3} value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} style={{ ...inputStyle, resize: 'vertical' }} />
        </div>
        <div>
          <label style={labelStyle}>Content (HTML)</label>
          <textarea required rows={12} value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
            style={{ ...inputStyle, resize: 'vertical', fontFamily: 'monospace', fontSize: 13 }} />
        </div>
        <div>
          <label style={labelStyle}>Hero image URL (optional)</label>
          <input type="text" value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} style={inputStyle} placeholder="/files/photo.jpg" />
        </div>

        {status === 'error' && <p style={{ fontSize: 13, color: '#B76A6A' }}>Something went wrong — check the console.</p>}

        <div style={{ display: 'flex', gap: 12 }}>
          <button type="submit" disabled={status === 'loading'} className="btn btn-filled">
            {status === 'loading' ? 'Publishing…' : 'Publish post'}
          </button>
          <button type="button" onClick={() => router.back()} className="btn">Cancel</button>
        </div>
      </form>
    </div>
  )
}
