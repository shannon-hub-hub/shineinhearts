export const dynamic = "force-dynamic"

import { NextResponse } from "next/server";
import { getMany, getOne } from "@/lib/db";
import type { ImpactMetric, DashboardStats } from "@/types";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const metric = searchParams.get("metric");

  if (metric) {
    // Time-series for a specific metric
    const rows = await getMany<ImpactMetric>(
      `SELECT id, metric_name, value::float AS value, recorded_at::text
       FROM impact_metrics WHERE metric_name = $1
       ORDER BY recorded_at ASC`,
      [metric]
    );
    return NextResponse.json(rows);
  }

  // Latest value for each metric
  const rows = await getMany(
    `SELECT DISTINCT ON (metric_name)
       metric_name, value::float AS value, recorded_at::text
     FROM impact_metrics
     ORDER BY metric_name, recorded_at DESC`
  );
  return NextResponse.json(rows);
}
