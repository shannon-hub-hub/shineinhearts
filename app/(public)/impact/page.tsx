import { Metadata } from 'next'
import Link from 'next/link'
import { getMany } from '@/lib/db'
import { ImpactDashboard } from '@/components/charts/ImpactDashboard'
import { PartnerLogos } from '@/components/impact/PartnerLogos'
import { RevealWrapper } from '@/components/ui/RevealWrapper'
import { IMPACT_DISPLAY } from '@/lib/impact-display'

export const metadata: Metadata = { title: 'Our Impact' }
export const dynamic = 'force-dynamic'

async function getImpactData() {
  const timeSeries = await getMany<{ month: string; people_served: number; volunteer_hours: number }>(
      `SELECT
         TO_CHAR(DATE_TRUNC('month', recorded_at), 'Mon YYYY') AS month,
         SUM(CASE WHEN metric_name='people_served'   THEN value ELSE 0 END)::int AS people_served,
         SUM(CASE WHEN metric_name='volunteer_hours' THEN value ELSE 0 END)::int AS volunteer_hours
       FROM impact_metrics
       GROUP BY DATE_TRUNC('month', recorded_at)
       ORDER BY DATE_TRUNC('month', recorded_at) ASC`
    )
  return { timeSeries }
}

export default async function ImpactPage() {
  const { timeSeries } = await getImpactData()

  return (
    <>
      <div className="page-header">
        <div className="breadcrumb">
          <Link href="/">Home</Link><span style={{ margin: '0 8px', opacity: 0.4 }}>/</span>Our Impact
        </div>
        <h1>Our Impact</h1>
      </div>

      {/* Growth & engagement */}
      <section style={{ padding: '5rem 10%', borderBottom: '1px solid var(--color-border)' }}>
        <RevealWrapper>
          <span className="label">Activity over time</span>
          <h2 style={{ marginBottom: '3rem' }}>Growth & engagement</h2>
        </RevealWrapper>
        <ImpactDashboard timeSeries={timeSeries} summary={{
          people_served: IMPACT_DISPLAY.peopleServed,
          volunteer_hours: IMPACT_DISPLAY.volunteerHours,
          members_count: 0,
          events_count: 0,
          cities_reached: 10,
          countries_count: 0,
        }} />
      </section>

      {/* Partner logos — add files to public/impact/partner-1.jpg … partner-5.jpg */}
      <section style={{ padding: '5rem 10%', borderBottom: '1px solid var(--color-border)' }}>
        <RevealWrapper>
          <span className="label">Partners &amp; organizations we&apos;ve supported</span>
        </RevealWrapper>
        <RevealWrapper delay={80}>
          <PartnerLogos />
        </RevealWrapper>
      </section>
    </>
  )
}
