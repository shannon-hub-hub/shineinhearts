import { Metadata } from 'next'
import Link from 'next/link'
import { getMany } from '@/lib/db'
import { CHAPTERS } from '@/lib/chapters-content'
import { Chapter } from '@/types'
import { RevealWrapper } from '@/components/ui/RevealWrapper'

export const metadata: Metadata = { title: 'Get Involved' }
export const dynamic = 'force-dynamic'

const APPLY_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSc-v40NZxHKSc6IEgGYL5SPqWhm6_9FYE4FuhkCIJFwteBGnQ/viewform'

async function getChapters(): Promise<Chapter[]> {
  try {
    const rows = await getMany<Chapter>(`SELECT * FROM chapters ORDER BY country, city`)
    return rows.length > 0 ? rows : CHAPTERS
  } catch (error) {
    console.error('Get Involved page DB fallback:', error)
    return CHAPTERS
  }
}


export default async function GetInvolvedPage() {
  const chapters = await getChapters()

  const programs = [
    { tag: 'Writing &\nStorytelling', label: 'Environmental Writers Collective' },
    { tag: 'Music &\nVisual Arts', label: 'Music & Artworks Spotlight Series' },
    { tag: 'Digital\nLeadership', label: 'Student Ambassadors' },
    { tag: 'Community\nAction', label: 'Green Donation Drives' },
  ]

  return (
    <>
      <div className="page-header">
        <div className="breadcrumb"><Link href="/">Home</Link><span style={{ margin: '0 8px', opacity: 0.4 }}>/</span>Get Involved</div>
        <h1>Get Involved</h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', maxWidth: 560, marginTop: '1.25rem', lineHeight: 1.75 }}>
          There's more than one way to be part of this. Find the one that fits where you are right now.
        </p>
      </div>

      {/* Volunteer section */}
      <section style={{ padding: '5rem 10%', borderBottom: '1px solid var(--color-border)' }}>
        <RevealWrapper><span className="label">For students</span></RevealWrapper>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'start' }}>
          <div>
            <RevealWrapper delay={80}>
              <h2 style={{ marginBottom: '1.75rem' }}>Volunteer with a program.</h2>
              <p style={{ marginBottom: '1.25rem' }}>
                Turn your ideas into action. Create, connect, and inspire change through writing, art, videos, and digital campaigns from anywhere in the world.
              </p>
              <p style={{ marginBottom: '2rem' }}>
                Build real skills, collaborate with youth across the globe, and be part of a movement making a difference for the planet.
              </p>
            </RevealWrapper>
          </div>
          <div>
            {programs.map((p, i) => (
              <RevealWrapper key={p.tag} delay={i * 60}>
                <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '1.5rem', padding: '1.5rem 0', borderTop: '1px solid var(--color-border)' }}>
                  <span className="program-entry-tag">{p.tag}</span>
                  <span style={{ fontFamily: 'Lora, serif', fontSize: '1rem', color: 'var(--color-text)' }}>{p.label}</span>
                </div>
              </RevealWrapper>
            ))}
            <div style={{ borderTop: '1px solid var(--color-border)' }} />
          </div>
        </div>
      </section>

      {/* Apply */}
      <section style={{ padding: '5rem 10%', borderBottom: '1px solid var(--color-border)' }}>
        <RevealWrapper><span className="label">Apply</span></RevealWrapper>
        <RevealWrapper delay={80}>
          <h2 style={{ marginBottom: '1.25rem' }}>Ready to join?</h2>
          <p style={{ marginBottom: '2rem', maxWidth: 560 }}>
            Fill out our application form to volunteer or join a program. It only takes a few minutes.
          </p>
          <a href={APPLY_FORM_URL} target="_blank" rel="noreferrer" className="btn btn-filled">
            Apply today
          </a>
        </RevealWrapper>
      </section>

      {/* Chapters */}
      <section style={{ padding: '5rem 10%', borderBottom: '1px solid var(--color-border)' }}>
        <RevealWrapper><span className="label">Start a chapter</span></RevealWrapper>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'start' }}>
          <div>
            <RevealWrapper delay={80}>
              <h2 style={{ marginBottom: '1.5rem' }}>Bring Shine in Hearts to your city.</h2>
              <p style={{ marginBottom: '2.5rem' }}>We're growing. If your city isn't on this list yet, it could be next.</p>
            </RevealWrapper>
          </div>
          <RevealWrapper delay={160}>
            <span className="label">Current chapters</span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '1px solid var(--color-border)' }}>
              {chapters.map((c, i) => (
                <div key={c.id} style={{
                  padding: '1rem',
                  borderBottom: i < chapters.length - 2 ? '1px solid var(--color-border)' : 'none',
                  borderRight: i % 2 === 0 ? '1px solid var(--color-border)' : 'none',
                }}>
                  <div style={{ fontFamily: 'Lora, serif', fontSize: '0.95rem', color: 'var(--color-text)' }}>{c.city}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: 2 }}>{c.region ?? `${c.country}`}</div>
                </div>
              ))}
              <div style={{ padding: '1rem', borderTop: chapters.length % 2 === 0 ? '1px solid var(--color-border)' : 'none' }}>
                <div style={{ fontFamily: 'Lora, serif', fontSize: '0.95rem', color: 'var(--color-primary)', fontStyle: 'italic' }}>Your city?</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: 2 }}>We're still growing</div>
              </div>
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* Partner */}
      <section style={{ padding: '5rem 10%', maxWidth: 680 }}>
        <RevealWrapper><span className="label">For organizations</span></RevealWrapper>
        <RevealWrapper delay={80}>
          <h2 style={{ marginBottom: '1.5rem' }}>Partner with us.</h2>
          <p style={{ marginBottom: '1.25rem' }}>We're always looking to build meaningful partnerships with organizations and individuals who share our commitment to environmental awareness, youth empowerment, and education.</p>
          <p style={{ marginBottom: '2.5rem' }}>Reach out to <a href="mailto:shineinhearts@gmail.com" className="ink-link">shineinhearts@gmail.com</a> — we'd genuinely love to hear from you.</p>
          <Link href="/contact" className="btn">Contact us</Link>
        </RevealWrapper>
      </section>
    </>
  )
}
