export const dynamic = "force-dynamic"

import { NextResponse } from "next/server";
import { getMany, query } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") ?? "pending";
  const apps = await getMany(
    `SELECT * FROM applications WHERE status = $1 ORDER BY created_at DESC`,
    [status]
  );
  return NextResponse.json(apps);
}

export async function PATCH(req: Request) {
  const { id, status } = await req.json();
  if (!["approved","rejected"].includes(status))
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  await query(
    `UPDATE applications SET status=$1, reviewed_at=NOW() WHERE id=$2`,
    [status, id]
  );
  return NextResponse.json({ success: true });
}
