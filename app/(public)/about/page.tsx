import { Metadata } from 'next'
import Link from 'next/link'
import { CORE_TEAM, US_CHAPTERS, INTL_CHAPTERS } from '@/lib/about-content'
import { TeamMemberCard } from '@/components/about/TeamMemberCard'
import { RevealWrapper } from '@/components/ui/RevealWrapper'

export const metadata: Metadata = {
  title: 'About',
  description:
    'A youth-led nonprofit started because we kept seeing students who cared deeply about the world and could not find a space that felt like theirs.',
}

export default function AboutPage() {
  return (
    <>
      <div className="page-header">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span style={{ margin: '0 8px', opacity: 0.4 }}>/</span>
          About
        </div>
        <h1>Who We Are</h1>
        <p>
          A youth-led nonprofit started because we kept seeing students who cared deeply about the world and
          couldn&apos;t find a space that felt like theirs.
        </p>
      </div>

      <section style={{ padding: '5rem 10%', borderBottom: '1px solid var(--color-border)' }}>
        <RevealWrapper>
          <span className="label">Our mission</span>
        </RevealWrapper>
        <RevealWrapper delay={80}>
          <p style={{ marginBottom: '1.25rem' }}>
            Shine in Hearts (SIH) is a youth-led nonprofit connecting young people worldwide through learning,
            creativity, and action. Our digital communities empower students to share resources, stories, and ideas,
            amplify their voices, and take steps that create real, positive impact.
          </p>
          <div className="pull-quote">
            <p>Every voice matters. Every action counts.</p>
          </div>
        </RevealWrapper>
      </section>

      <section style={{ padding: '5rem 10%', borderBottom: '1px solid var(--color-border)' }}>
        <RevealWrapper>
          <span className="label">Core team</span>
        </RevealWrapper>
        <div className="team-grid">
          {CORE_TEAM.map((person, i) => (
            <RevealWrapper key={person.name} delay={i * 60}>
              <TeamMemberCard person={person} />
            </RevealWrapper>
          ))}
        </div>
      </section>

      <section style={{ padding: '5rem 10%', borderBottom: '1px solid var(--color-border)' }}>
        <RevealWrapper>
          <span className="label">U.S. Chapters</span>
        </RevealWrapper>
        <RevealWrapper delay={80}>
          <h2 style={{ marginBottom: '3rem' }}>Across the United States</h2>
        </RevealWrapper>
        <div className="team-grid">
          {US_CHAPTERS.map((person, i) => (
            <RevealWrapper key={person.name} delay={i * 60}>
              <TeamMemberCard person={person} />
            </RevealWrapper>
          ))}
        </div>
      </section>

      <section style={{ padding: '5rem 10%', borderBottom: '1px solid var(--color-border)' }}>
        <RevealWrapper>
          <span className="label">International Chapters</span>
        </RevealWrapper>
        <RevealWrapper delay={80}>
          <h2 style={{ marginBottom: '3rem' }}>Around the world</h2>
        </RevealWrapper>
        <div className="team-grid">
          {INTL_CHAPTERS.map((person, i) => (
            <RevealWrapper key={person.name} delay={i * 60}>
              <TeamMemberCard person={person} />
            </RevealWrapper>
          ))}
        </div>
      </section>

      <section style={{ padding: '5rem 10%' }}>
        <RevealWrapper>
          <span className="label">Join us</span>
        </RevealWrapper>
        <RevealWrapper delay={80}>
          <h2 style={{ marginBottom: '1.5rem' }}>There&apos;s room for you here.</h2>
          <p style={{ marginBottom: '2.5rem' }}>
            We&apos;re always looking for students who care about the planet, about their communities, about doing
            something real.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link href="/get-involved" className="btn btn-filled">
              Get involved
            </Link>
            <Link href="/contact" className="btn">
              Contact us
            </Link>
          </div>
        </RevealWrapper>
      </section>
    </>
  )
}
