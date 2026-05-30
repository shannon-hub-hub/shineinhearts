'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from 'recharts'
import type { LabelProps } from 'recharts'
import { ImpactSummary, ImpactTimeSeries } from '@/types'

interface Props {
  timeSeries: ImpactTimeSeries[]
  summary: ImpactSummary
}

interface BarShapeProps {
  x?: number
  y?: number
  width?: number
  height?: number
  fill?: string
}

function OrganicBar(props: unknown) {
  const { x = 0, y = 0, width = 0, height = 0, fill } = props as BarShapeProps
  if (height <= 0 || width <= 0) return <g />
  const r = Math.min(10, width / 2.2)
  const d = [
    `M ${x} ${y + height}`,
    `L ${x} ${y + r}`,
    `Q ${x} ${y} ${x + r} ${y}`,
    `L ${x + width - r} ${y}`,
    `Q ${x + width} ${y} ${x + width} ${y + r}`,
    `L ${x + width} ${y + height}`,
    'Z',
  ].join(' ')
  return <path d={d} fill={fill} filter="url(#impactBarShadow)" />
}

function BarValueLabel({ x, y, width, value }: LabelProps) {
  if (x == null || y == null || width == null || value == null) return null
  return (
    <text
      x={Number(x) + Number(width) / 2}
      y={Number(y) - 8}
      textAnchor="middle"
      fill="var(--color-text)"
      fontSize={11}
      fontWeight={600}
      fontFamily="var(--font-source-sans, 'Source Sans 3', sans-serif)"
    >
      {value}
    </text>
  )
}

export function ImpactDashboard({ timeSeries, summary }: Props) {
  const statCards = [
    { label: 'People served', value: `${summary.people_served}+` },
    { label: 'Volunteer hours', value: `${summary.volunteer_hours}+` },
    { label: 'Cities reached', value: `${summary.cities_reached}+` },
  ]

  const chartData = timeSeries.map((row) => ({
    ...row,
    monthShort: row.month.replace(/\s20(\d{2})$/, " '$1"),
  }))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <div className="impact-stat-grid">
        {statCards.map((card) => (
          <div key={card.label} className="impact-stat-card">
            <div className="impact-stat-value">{card.value}</div>
            <div className="impact-stat-label">{card.label}</div>
          </div>
        ))}
      </div>

      {chartData.length > 0 && (
        <div className="impact-chart-panel">
          <div className="impact-chart-header">
            <p className="impact-chart-title">Volunteer hours by month</p>
            <div className="impact-chart-legend">
              <span className="impact-chart-legend-item">
                <span className="impact-chart-swatch impact-chart-swatch--secondary" />
                Volunteer hours
              </span>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={chartData}
              margin={{ top: 28, right: 8, left: -8, bottom: 4 }}
              barCategoryGap="32%"
            >
              <defs>
                <filter id="impactBarShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#2F2A2A" floodOpacity="0.1" />
                </filter>
              </defs>
              <CartesianGrid
                strokeDasharray="4 6"
                stroke="var(--color-border)"
                vertical={false}
              />
              <XAxis
                dataKey="monthShort"
                tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }}
                tickLine={false}
                axisLine={{ stroke: 'var(--color-border)' }}
              />
              <YAxis
                tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }}
                tickLine={false}
                axisLine={false}
                width={36}
              />
              <Tooltip
                cursor={{ fill: 'rgba(111, 125, 92, 0.08)' }}
                contentStyle={{
                  background: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '0.75rem',
                  fontSize: 13,
                  boxShadow: '0 4px 16px rgba(47, 42, 42, 0.08)',
                }}
                labelStyle={{ fontFamily: 'Lora, serif', fontWeight: 600, color: 'var(--color-text)' }}
              />
              <Bar
                dataKey="volunteer_hours"
                name="Volunteer hours"
                fill="var(--color-secondary)"
                shape={OrganicBar}
                maxBarSize={44}
              >
                <LabelList dataKey="volunteer_hours" content={BarValueLabel} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
