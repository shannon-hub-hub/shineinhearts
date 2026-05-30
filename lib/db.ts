import { Pool, QueryResult, QueryResultRow } from 'pg';

declare global {
  var _pgPool: Pool | undefined;
}

/** Vercel Postgres / Neon sets POSTGRES_URL; local dev uses DATABASE_URL. */
export function getDatabaseUrl(): string | undefined {
  return (
    process.env.DATABASE_URL ??
    process.env.POSTGRES_URL ??
    process.env.POSTGRES_URL_NON_POOLING ??
    process.env.DATABASE_URL_UNPOOLED
  );
}

function getPool(): Pool {
  if (!global._pgPool) {
    const connectionString = getDatabaseUrl();
    if (!connectionString) {
      throw new Error(
        'No database URL found. Set DATABASE_URL or connect Vercel Postgres (POSTGRES_URL).'
      );
    }

    const isLocal = /@(localhost|127\.0\.0\.1)(:\d+)?\//.test(connectionString);

    global._pgPool = new Pool({
      connectionString,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
      ssl: isLocal ? undefined : { rejectUnauthorized: false },
    });
    global._pgPool.on('error', (err) => {
      console.error('Unexpected PG pool error', err);
    });
  }
  return global._pgPool;
}

export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: unknown[]
): Promise<QueryResult<T>> {
  const pool = getPool();
  const start = Date.now();
  const result = await pool.query<T>(text, params);
  const duration = Date.now() - start;
  if (process.env.NODE_ENV === 'development') {
    console.log('query', { text: text.slice(0, 80), duration, rows: result.rowCount });
  }
  return result;
}

export async function getOne<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: unknown[]
): Promise<T | null> {
  const result = await query<T>(text, params);
  return result.rows[0] ?? null;
}

export async function getMany<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: unknown[]
): Promise<T[]> {
  const result = await query<T>(text, params);
  return result.rows;
}

/** Alias for getOne — used by older pages */
export const queryOne = getOne;
