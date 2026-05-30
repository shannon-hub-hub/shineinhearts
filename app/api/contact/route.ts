export const dynamic = "force-dynamic"

import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { z } from "zod";

const schema = z.object({
  name:    z.string().min(1).max(100),
  email:   z.string().email(),
  subject: z.string().max(200).optional(),
  message: z.string().min(10).max(5000),
});

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input", issues: parsed.error.issues }, { status: 400 });

  const { name, email, subject, message } = parsed.data;
  await query(
    `INSERT INTO contact_submissions (name, email, subject, message) VALUES ($1,$2,$3,$4)`,
    [name, email, subject ?? null, message]
  );
  return NextResponse.json({ success: true });
}
