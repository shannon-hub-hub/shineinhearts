export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { read } = await req.json()
  await query(
    `UPDATE contact_submissions SET "read" = $1 WHERE id = $2`,
    [read, params.id]
  )
  return NextResponse.json({ success: true })
}
