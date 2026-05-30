export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from 'next/server'
import { hybridSearch } from '@/lib/embeddings'
import { getMany } from '@/lib/db'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q')?.trim()

  if (!q || q.length < 2) {
    return NextResponse.json({ data: [], query: q })
  }

  try {
    // Try semantic search if embeddings available
    const results = await hybridSearch(q, 8)
    return NextResponse.json({ data: results, query: q, mode: 'semantic' })
  } catch {
    // Fallback: pure full-text search (no OpenAI key needed)
    const rows = await getMany(
      `SELECT id, title, slug, excerpt,
              ts_rank(to_tsvector('english', title || ' ' || COALESCE(excerpt, '')), plainto_tsquery('english', $1)) AS score
       FROM blog_posts
       WHERE published = TRUE
         AND to_tsvector('english', title || ' ' || COALESCE(excerpt, '') || ' ' || body) @@ plainto_tsquery('english', $1)
       ORDER BY score DESC
       LIMIT 8`,
      [q]
    )
    return NextResponse.json({ data: rows, query: q, mode: 'fulltext' })
  }
}
