'use client'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await signIn('credentials', { email, password, redirect: false })
    if (res?.ok) {
      router.push('/admin/dashboard')
    } else {
      setError('Invalid credentials')
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg)' }}>
      <div style={{ width: '100%', maxWidth: 380, padding: '2.5rem', border: '1px solid var(--color-border)' }}>
        <h1 style={{ fontFamily: 'Lora, serif', fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--color-text)' }}>Admin sign in</h1>
        <p style={{ fontSize: 14, color: 'var(--color-text-muted)', marginBottom: '2rem' }}>Shine in Hearts internal dashboard</p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: 6 }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              style={{ width: '100%', padding: '10px 12px', border: '1.5px solid var(--color-border)', background: 'transparent', fontSize: 14, color: 'var(--color-text)', outline: 'none' }} />
          </div>
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: 6 }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
              style={{ width: '100%', padding: '10px 12px', border: '1.5px solid var(--color-border)', background: 'transparent', fontSize: 14, color: 'var(--color-text)', outline: 'none' }} />
          </div>

          {error && <p style={{ fontSize: 13, color: '#B76A6A' }}>{error}</p>}

          <button type="submit" disabled={loading} className="btn btn-filled" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
