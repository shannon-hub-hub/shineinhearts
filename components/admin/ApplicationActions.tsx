'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props { applicationId: string }

export function ApplicationActions({ applicationId }: Props) {
  const [loading, setLoading] = useState<'approve' | 'reject' | null>(null)
  const router = useRouter()

  async function updateStatus(status: 'approved' | 'rejected') {
    setLoading(status === 'approved' ? 'approve' : 'reject')
    try {
      await fetch(`/api/applications/${applicationId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      router.refresh()
    } finally {
      setLoading(null)
    }
  }

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <button
        onClick={() => updateStatus('approved')}
        disabled={loading !== null}
        style={{
          padding: '6px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer',
          background: '#E8F5E8', color: '#4A7A4A', border: '1px solid #4A7A4A',
          opacity: loading ? 0.6 : 1,
        }}
      >
        {loading === 'approve' ? '…' : 'Approve'}
      </button>
      <button
        onClick={() => updateStatus('rejected')}
        disabled={loading !== null}
        style={{
          padding: '6px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer',
          background: '#FFF0F0', color: '#9A4A4A', border: '1px solid #9A4A4A',
          opacity: loading ? 0.6 : 1,
        }}
      >
        {loading === 'reject' ? '…' : 'Decline'}
      </button>
    </div>
  )
}
