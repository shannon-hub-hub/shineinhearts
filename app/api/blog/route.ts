export const dynamic = "force-dynamic"

import { NextResponse } from "next/server";
import { getMany } from "@/lib/db";

export async function GET() {
  const posts = await getMany(
    `SELECT id, title, slug, excerpt, author_name, image_url,
            tags, published_at::text, created_at::text
     FROM blog_posts WHERE published = true
     ORDER BY published_at DESC`
  );
  return NextResponse.json(posts);
}
