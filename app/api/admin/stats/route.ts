export const dynamic = "force-dynamic"

import { NextResponse } from "next/server";
import { getOne } from "@/lib/db";

export async function GET() {
  const stats = await getOne(`
    SELECT
      (SELECT COALESCE(value,0) FROM impact_metrics WHERE metric_name='people_served'
       ORDER BY recorded_at DESC LIMIT 1)::int           AS "totalPeopleServed",
      (SELECT COALESCE(value,0) FROM impact_metrics WHERE metric_name='volunteer_hours'
       ORDER BY recorded_at DESC LIMIT 1)::int           AS "totalVolunteerHours",
      (SELECT COALESCE(value,0) FROM impact_metrics WHERE metric_name='cities_reached'
       ORDER BY recorded_at DESC LIMIT 1)::int           AS "citiesReached",
      (SELECT COALESCE(value,0) FROM impact_metrics WHERE metric_name='events_hosted'
       ORDER BY recorded_at DESC LIMIT 1)::int           AS "eventsHosted",
      (SELECT COUNT(*) FROM members)::int                AS "totalMembers",
      (SELECT COUNT(*) FROM chapters)::int               AS "totalChapters",
      (SELECT COUNT(*) FROM applications WHERE status='pending')::int AS "pendingApplications",
      (SELECT COUNT(*) FROM contact_submissions WHERE read=false)::int AS "unreadMessages",
      (SELECT COUNT(*) FROM blog_posts WHERE published=true)::int AS "publishedPosts"
  `);
  return NextResponse.json(stats);
}
