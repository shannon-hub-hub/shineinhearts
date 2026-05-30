import { Metadata } from 'next'
import Link from 'next/link'
import { getMany, queryOne } from '@/lib/db'
import { IMPACT_DISPLAY } from '@/lib/impact-display'
import { PROGRAMS } from '@/lib/programs-content'
import { RevealWrapper } from '@/components/ui/RevealWrapper'
import { HomeSectionNav } from '@/components/home/HomeSectionNav'

export const metadata: Metadata = { title: 'Home' }
export const dynamic = 'force-dynamic'

async function getHomeData() {
  try {
    const [summary, programs, recentPost] = await Promise.all([
      queryOne<{ people_served: string; volunteer_hours: string; events_count: string }>(
        `SELECT
           (SELECT COALESCE(SUM(value),0) FROM impact_metrics WHERE metric_name='people_served')   AS people_served,
           (SELECT COALESCE(SUM(value),0) FROM impact_metrics WHERE metric_name='volunteer_hours') AS volunteer_hours,
           (SELECT COUNT(*) FROM events)                                                           AS events_count`
      ),
      getMany<{ name: string; category: string; description: string }>(
        `SELECT name, category, description FROM programs WHERE is_active=TRUE ORDER BY created_at LIMIT 4`
      ),
      queryOne<{ title: string; slug: string; excerpt: string; published_at: string }>(
        `SELECT title, slug, excerpt, published_at FROM blog_posts WHERE published=TRUE ORDER BY published_at DESC LIMIT 1`
      ),
    ])
    return {
      programs: programs.length > 0 ? programs : [...PROGRAMS],
      recentPost,
    }
  } catch (error) {
    console.error('Home page DB fallback:', error)
    return { programs: [...PROGRAMS], recentPost: null }
  }
}

export default async function HomePage() {
  const { programs, recentPost } = await getHomeData()

  const stats = [
    { num: `${IMPACT_DISPLAY.peopleServed}+`, label: 'People Served' },
    { num: `${IMPACT_DISPLAY.volunteerHours}+`, label: 'Volunteer Hours' },
    { num: '10+', label: 'Cities Reached' },
  ]

  return (
    <>
      {/* HERO */}
      <section className="home-hero">
        <HomeSectionNav />
        <RevealWrapper>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '2rem', display: 'block' }}>
            Youth-led &nbsp;·&nbsp; Global &nbsp;·&nbsp; Est. 2025
          </span>
        </RevealWrapper>
        <RevealWrapper delay={80}>
          <h1 style={{ maxWidth: 780, fontSize: 'clamp(2.6rem, 6vw, 5rem)', fontWeight: 700, marginBottom: '2rem', lineHeight: 1.1 }}>
            Connecting youth.<br /><em>Sparking change.</em>
          </h1>
        </RevealWrapper>
        <RevealWrapper delay={160}>
          <p style={{ fontSize: '1.15rem', color: 'var(--color-text-muted)', maxWidth: 520, lineHeight: 1.8, marginBottom: '3rem' }}>
            Shine in Hearts helps youth worldwide build knowledge, creativity, and digital connections. We believe every young person has something worth sharing and a world worth protecting.
          </p>
        </RevealWrapper>
        <RevealWrapper delay={240}>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            <Link href="/get-involved" className="btn btn-filled">Join the movement</Link>
            <Link href="/about" className="btn">Who we are</Link>
          </div>
        </RevealWrapper>
      </section>

      {/* STATS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderBottom: '1px solid var(--color-border)' }}>
        {stats.map((s, i) => (
          <RevealWrapper key={s.label} delay={i * 80}>
            <div style={{ padding: '3.5rem 10%', borderRight: i < 2 ? '1px solid var(--color-border)' : 'none' }}>
              <span className="stat-num">{s.num}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          </RevealWrapper>
        ))}
      </div>

      {/* MISSION */}
      <section style={{ padding: '7rem 10%', borderBottom: '1px solid var(--color-border)', maxWidth: 780 }}>
        <RevealWrapper><span className="label">Our story</span></RevealWrapper>
        <RevealWrapper delay={80}><h2 style={{ marginBottom: '1.75rem' }}>Helping youth learn, create, and take action.</h2></RevealWrapper>
        <RevealWrapper delay={160}>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.85, marginBottom: '1.25rem' }}>
            Young people want to make a difference, but opportunities often feel scattered or out of reach. Through our digital communities, students everywhere can create, connect, and take action.
          </p>
        </RevealWrapper>
        <RevealWrapper delay={240}>
          <p style={{ marginBottom: '2.5rem' }}>
            Our programs are digital-first and free because geography and money shouldn't determine who gets to lead.
          </p>
          <Link href="/about" className="btn">Who We Are</Link>
        </RevealWrapper>
      </section>

      {/* PROGRAMS */}
      <section style={{ padding: '6rem 10%', borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem', marginBottom: '4rem' }}>
          <div>
            <RevealWrapper><span className="label">What we do</span></RevealWrapper>
            <RevealWrapper delay={80}><h2>4 ways to get involved</h2></RevealWrapper>
          </div>
          <RevealWrapper><Link href="/programs" className="btn">See all programs</Link></RevealWrapper>
        </div>
        {programs.map((p, i) => (
          <RevealWrapper key={p.name} delay={i * 80}>
            <div className="program-entry">
              <div className="program-entry-tag">{p.category}</div>
              <div>
                <h3>{p.name}</h3>
                <p>{p.description}</p>
              </div>
            </div>
          </RevealWrapper>
        ))}
      </section>

      {/* LATEST POST */}
      {recentPost && (
        <section style={{ padding: '6rem 10%', borderBottom: '1px solid var(--color-border)' }}>
          <RevealWrapper><span className="label">Latest from the blog</span></RevealWrapper>
          <RevealWrapper delay={80}>
            <h2 style={{ marginBottom: '1rem' }}>{recentPost.title}</h2>
            <p style={{ maxWidth: 560, marginBottom: '2rem', fontSize: '1.05rem' }}>{recentPost.excerpt}</p>
            <Link href={`/blog/${recentPost.slug}`} className="btn">Read the post</Link>
          </RevealWrapper>
        </section>
      )}

      {/* GET INVOLVED CTA */}
      <section style={{ padding: '6rem 10%' }}>
        <RevealWrapper><span className="label">Find your place</span></RevealWrapper>
        <RevealWrapper delay={80}>
          <h2 style={{ marginBottom: '1.5rem' }}>There's more than one way to make a difference.</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: '2.5rem', marginTop: '1.5rem' }}>
            {['Volunteer with a program', 'Start a chapter in your city', 'Partner with us', 'Explore climate resources'].map(item => (
              <p key={item} style={{ padding: '0.75rem 0', borderTop: '1px solid var(--color-border)', fontSize: '1rem', color: 'var(--color-text)' }}>→ &nbsp;{item}</p>
            ))}
          </div>
          <Link href="/get-involved" className="btn btn-filled">Get involved</Link>
        </RevealWrapper>
      </section>
    </>
  )
}
