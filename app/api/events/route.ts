export const dynamic = "force-dynamic"

import { NextResponse } from "next/server";
import { getMany } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const year = searchParams.get("year");
  const params: unknown[] = [];
  let where = "";
  if (year) { params.push(parseInt(year)); where = `WHERE EXTRACT(YEAR FROM event_date) = $1`; }

  const events = await getMany(
    `SELECT id, title, description, event_date::text, location,
            is_virtual, partner_org, partner_url, image_url, attendee_count
     FROM events ${where}
     ORDER BY event_date DESC`,
    params
  );
  return NextResponse.json(events);
}
