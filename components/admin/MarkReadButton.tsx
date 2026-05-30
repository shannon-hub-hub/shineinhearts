'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function MarkReadButton({ messageId }: { messageId: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function markRead() {
    setLoading(true)
    await fetch(`/api/messages/${messageId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ read: true }),
    })
    router.refresh()
    setLoading(false)
  }

  return (
    <button onClick={markRead} disabled={loading}
      style={{ padding: '6px 14px', fontSize: 12, cursor: 'pointer', background: 'none', border: '1px solid var(--color-border)', color: 'var(--color-text-muted)', opacity: loading ? 0.5 : 1 }}>
      {loading ? '…' : 'Mark read'}
    </button>
  )
}
