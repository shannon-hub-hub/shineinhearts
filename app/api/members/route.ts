export const dynamic = "force-dynamic"

import { NextResponse } from "next/server";
import { getMany } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const chapter = searchParams.get("chapter");
  const params: unknown[] = [];
  let where = "";
  if (chapter) { params.push(chapter); where = `WHERE c.city ILIKE $1`; }

  const members = await getMany(
    `SELECT m.id, m.name, m.role, m.photo_url, m.bio, m.joined_at::text,
            c.city AS chapter_city, c.country AS chapter_country
     FROM members m
     LEFT JOIN chapters c ON m.chapter_id = c.id
     ${where}
     ORDER BY m.is_admin DESC, m.joined_at ASC`,
    params
  );
  return NextResponse.json(members);
}
