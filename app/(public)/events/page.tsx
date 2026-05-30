import { Metadata } from 'next'
import Link from 'next/link'
import { EVENTS } from '@/lib/events-content'
import { RevealWrapper } from '@/components/ui/RevealWrapper'
import { format, parseISO } from 'date-fns'

export const metadata: Metadata = { title: 'Events' }

export default function EventsPage() {
  const byYear = EVENTS.reduce((acc, event) => {
    const year = parseISO(event.date).getFullYear().toString()
    acc[year] = acc[year] ?? []
    acc[year].push(event)
    return acc
  }, {} as Record<string, typeof EVENTS>)

  return (
    <>
      <div className="page-header">
        <div className="breadcrumb"><Link href="/">Home</Link><span style={{ margin: '0 8px', opacity: 0.4 }}>/</span>Events</div>
        <h1>Past Events</h1>
        <p>
          Real moments where young people showed up, created something, and left a mark on their communities.
        </p>
      </div>

      <section style={{ padding: '4rem 10%', borderTop: '1px solid var(--color-border)', maxWidth: 640 }}>
        <RevealWrapper>
          <span className="label">Stay in the loop</span>
          <a href="https://www.instagram.com/shineinhearts/" target="_blank" rel="noreferrer" className="btn">See photos on Instagram</a>
        </RevealWrapper>
      </section>

      {Object.entries(byYear).sort(([a], [b]) => Number(b) - Number(a)).map(([year, yearEvents]) => (
        <section key={year} style={{ padding: '5rem 10%', borderBottom: '1px solid var(--color-border)' }}>
          <RevealWrapper><span className="label">{year}</span></RevealWrapper>
          {yearEvents.map((event, i) => {
            const d = parseISO(event.date)
            return (
              <RevealWrapper key={event.title} delay={i * 80}>
                <div className="event-entry">
                  <div className="event-entry-date">
                    <span className="event-entry-day">{format(d, 'd')}</span>
                    <span className="event-entry-month">{format(d, 'MMM')}</span>
                    <span className="event-entry-location">{event.location}</span>
                  </div>
                  <div>
                    <h3 className="event-entry-title">{event.title}</h3>
                    <div className="event-entry-body">{event.body}</div>
                  </div>
                </div>
              </RevealWrapper>
            )
          })}
        </section>
      ))}
    </>
  )
}
