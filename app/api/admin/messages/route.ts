export const dynamic = "force-dynamic"

import { NextResponse } from "next/server";
import { getMany, query } from "@/lib/db";

export async function GET() {
  const msgs = await getMany(
    `SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT 50`
  );
  return NextResponse.json(msgs);
}

export async function PATCH(req: Request) {
  const { id } = await req.json();
  await query(`UPDATE contact_submissions SET "read"=true WHERE id=$1`, [id]);
  return NextResponse.json({ success: true });
}
