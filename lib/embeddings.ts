// lib/embeddings.ts — OpenAI embeddings for blog semantic search
import OpenAI from 'openai'
import { getMany, query } from './db'

function getOpenAI() {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured')
  }
  return new OpenAI({ apiKey })
}

export async function embedText(text: string): Promise<number[]> {
  const openai = getOpenAI()
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text.slice(0, 8000), // token safety
  })
  return response.data[0].embedding
}

export async function embedBlogPost(postId: string, content: string): Promise<void> {
  const embedding = await embedText(content)
  // Store as pgvector array literal
  const vectorStr = `[${embedding.join(',')}]`
  await query(
    `UPDATE blog_posts SET embedding = $1::vector WHERE id = $2`,
    [vectorStr, postId]
  )
}

export async function semanticSearch(
  queryText: string,
  limit = 5
): Promise<{ id: string; title: string; slug: string; excerpt: string; similarity: number }[]> {
  const embedding = await embedText(queryText)
  const vectorStr = `[${embedding.join(',')}]`

  const rows = await getMany<{
    id: string
    title: string
    slug: string
    excerpt: string
    similarity: number
  }>(
    `SELECT
       id, title, slug, excerpt,
       1 - (embedding <=> $1::vector) AS similarity
     FROM blog_posts
     WHERE published = TRUE
       AND embedding IS NOT NULL
     ORDER BY embedding <=> $1::vector
     LIMIT $2`,
    [vectorStr, limit]
  )
  return rows
}

// Hybrid search: combine pgvector similarity with PostgreSQL full-text search
export async function hybridSearch(
  queryText: string,
  limit = 10
): Promise<{ id: string; title: string; slug: string; excerpt: string; score: number }[]> {
  const embedding = await embedText(queryText)
  const vectorStr = `[${embedding.join(',')}]`

  const rows = await getMany<{
    id: string
    title: string
    slug: string
    excerpt: string
    score: number
  }>(
    `SELECT
       id, title, slug, excerpt,
       (
         0.7 * (1 - (embedding <=> $1::vector))
         + 0.3 * ts_rank(
             to_tsvector('english', title || ' ' || excerpt || ' ' || body),
             plainto_tsquery('english', $2)
           )
       ) AS score
     FROM blog_posts
     WHERE published = TRUE
     ORDER BY score DESC
     LIMIT $3`,
    [vectorStr, queryText, limit]
  )
  return rows
}
