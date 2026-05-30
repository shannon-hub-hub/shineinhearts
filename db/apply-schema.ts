import 'dotenv/config'
import { readFileSync } from 'fs'
import { join } from 'path'
import { getDatabaseUrl, query } from '../lib/db.js'

async function applySchema() {
  if (!getDatabaseUrl()) {
    throw new Error('No database URL found. Set DATABASE_URL or POSTGRES_URL.')
  }

  const schemaPath = join(__dirname, 'schema.sql')
  const sql = readFileSync(schemaPath, 'utf8')

  console.log('Applying db/schema.sql...')
  await query(sql)
  console.log('Schema applied.')
}

applySchema()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
