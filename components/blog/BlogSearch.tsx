'use client'
import { useState, useCallback } from 'react'
import Link from 'next/link'

interface SearchResult {
  id: string
  title: string
  slug: string
  excerpt: string
  score: number
}

export function BlogSearch() {
  const [query, setQuery]     = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [mode, setMode]       = useState<'semantic' | 'fulltext' | null>(null)
  const [searched, setSearched] = useState(false)

  const search = useCallback(async (q: string) => {
    if (q.length < 2) { setResults([]); setSearched(false); return }
    setLoading(true)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
      const json = await res.json()
      setResults(json.data ?? [])
      setMode(json.mode)
      setSearched(true)
    } finally {
      setLoading(false)
    }
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') search(query)
  }

  return (
    <div style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', maxWidth: 560 }}>
        <input
          type="text"
          placeholder="Search posts by meaning, not just keywords…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            padding: '12px 16px',
            border: '1.5px solid var(--color-border)',
            background: 'transparent',
            fontSize: 14,
            fontFamily: 'Source Sans 3, sans-serif',
            color: 'var(--color-text)',
            outline: 'none',
          }}
        />
        <button
          onClick={() => search(query)}
          disabled={loading}
          className="btn"
          style={{ padding: '12px 20px', flexShrink: 0 }}
        >
          {loading ? '…' : 'Search'}
        </button>
        {searched && (
          <button
            onClick={() => { setQuery(''); setResults([]); setSearched(false) }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', fontSize: 13 }}
          >
            Clear
          </button>
        )}
      </div>

      {mode && (
        <p style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 6, letterSpacing: '0.08em' }}>
          {mode === 'semantic' ? '✦ Semantic search (pgvector)' : '✦ Full-text search'}
        </p>
      )}

      {searched && results.length === 0 && (
        <p style={{ marginTop: '1rem', fontSize: 14, color: 'var(--color-text-muted)' }}>No posts found for "{query}"</p>
      )}

      {results.length > 0 && (
        <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: 0, maxWidth: 680 }}>
          {results.map(r => (
            <Link key={r.id} href={`/blog/${r.slug}`} style={{ textDecoration: 'none', padding: '1rem 0', borderTop: '1px solid var(--color-border)', display: 'block' }}>
              <div style={{ fontFamily: 'Lora, serif', fontWeight: 600, color: 'var(--color-text)', marginBottom: 4 }}>{r.title}</div>
              <div style={{ fontSize: 14, color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{r.excerpt}</div>
            </Link>
          ))}
          <div style={{ borderTop: '1px solid var(--color-border)' }} />
        </div>
      )}
    </div>
  )
}
