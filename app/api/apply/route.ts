export const dynamic = "force-dynamic"

import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { z } from "zod";

const schema = z.object({
  name:     z.string().min(1).max(100),
  email:    z.string().email(),
  interest: z.string().min(1),
  message:  z.string().max(3000).optional(),
  city:     z.string().max(100).optional(),
});

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const { name, email, interest, message, city } = parsed.data;
  await query(
    `INSERT INTO applications (name, email, interest, message, city) VALUES ($1,$2,$3,$4,$5)`,
    [name, email, interest, message ?? null, city ?? null]
  );
  return NextResponse.json({ success: true });
}
