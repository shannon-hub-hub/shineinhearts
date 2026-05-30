import Link from 'next/link'
import type { ReactNode } from 'react'

export type EventContent = {
  date: string
  location: string
  title: string
  body: ReactNode
}

export const EVENTS: EventContent[] = [
  {
    date: '2026-04-12',
    location: 'virtual',
    title: 'Audition Prep and Ensemble Teamwork',
    body: (
      <>
        <p>
          A hands-on workshop with{' '}
          <a href="https://www.backtobachproject.org/" target="_blank" rel="noreferrer" className="ink-link">
            Back to Bach
          </a>{' '}
          centered on audition preparation and collaborative ensemble skills. Students worked through mock audition
          settings, peer feedback, and group rehearsals designed to strengthen both confidence and communication.
        </p>
        <p>
          The session focused on the balance between individual preparation and collective harmony, showing how
          teamwork in music reflects broader lessons in leadership, listening, and trust.
        </p>
      </>
    ),
  },
  {
    date: '2026-01-16',
    location: 'virtual',
    title: 'Breaking into Product Management',
    body: (
      <>
        <p>
          Our speaker session featured Nahiole&apos;a Kau, who shared insights from his academic and professional
          journey in technology and product management. Drawing from his experience in the field, he discussed the role
          of empathy, curiosity, and structured thinking in building products that address meaningful user needs and
          real-world challenges.
        </p>
      </>
    ),
  },
  {
    date: '2026-01-15',
    location: 'virtual',
    title: 'Music Education and Community Impact',
    body: (
      <>
        <p>
          A collaborative session with{' '}
          <a href="https://www.backtobachproject.org/" target="_blank" rel="noreferrer" className="ink-link">
            Back to Bach
          </a>{' '}
          focused on how music education can extend beyond performance into community building and emotional expression.
          Students and educators came together to reflect on how music shapes identity, discipline, and connection.
        </p>
        <p>
          The program emphasized access, inclusion, and the idea that music can serve as both a personal practice and a
          shared language across diverse communities.
        </p>
      </>
    ),
  },
  {
    date: '2025-05-10',
    location: 'San Jose, CA',
    title: 'Harmony of the Earth',
    body: (
      <>
        <p>
          A heartfelt collaboration with{' '}
          <a
            href="https://www.facebook.com/people/Virtuosi-Music-Art-Foundation/100094429847820/"
            target="_blank"
            rel="noreferrer"
            className="ink-link"
          >
            Virtuosi Music &amp; Art Foundation
          </a>
          , presented in honor of Mental Health Awareness Month and Mother&apos;s Day. We engaged over 100 elementary
          school students through 4 interactive concerts, a community raffle, and a reflection booth where children
          shared what music means to them.
        </p>
        <p>
          The program explored how music connects imagination with healing — featuring works by Kapustin, Debussy, Liszt,
          and Dvořák. For many of the children, it was their first classical concert. Their notes are now part of our{' '}
          <Link href="/blog/notes-from-the-heart" className="ink-link">
            Notes from the Heart
          </Link>{' '}
          blog post.
        </p>
      </>
    ),
  },
  {
    date: '2025-04-16',
    location: 'New York, NY',
    title: 'Sustainability on the Side',
    body: (
      <>
        <p>
          In honor of Earth Month, we launched our first food donation initiative — donating sustainably packaged
          sandwiches and vegan donuts from Mangia NYC to{' '}
          <a href="https://www.bowery.org" target="_blank" rel="noreferrer" className="ink-link">
            The Bowery Mission
          </a>
          , supporting people experiencing homelessness in New York City.
        </p>
        <p>
          Each meal came with a simple card on sustainable eating practices. Because caring for people and caring for the
          planet shouldn&apos;t be separate things.
        </p>
      </>
    ),
  },
]
