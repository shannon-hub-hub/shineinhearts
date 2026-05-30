import { Metadata } from 'next'
import Link from 'next/link'
import { RevealWrapper } from '@/components/ui/RevealWrapper'

export const metadata: Metadata = { title: 'Youth Climate Resource Hub' }

const GUIDES = [
  {
    title: "Youth Leadership in Climate Policy Workbook & Facilitator's Guide",
    source: 'Plan International',
    url: 'https://plan-international.org/publications/youth-leadership-in-climate-policy-workbook-and-facilitators-guide/',
  },
  {
    title: 'Climate Literacy: the Essential Principles of Climate Science',
    source: 'GlobalChange.gov',
    url: 'https://www.globalchange.gov/reports/climate-literacy-essential-principles-climate-science',
  },
  { title: 'Climate 101', source: 'Climate Kids Connects', url: 'https://www.climatekids.org/climate-101' },
  {
    title: 'Sustainability Toolkit',
    source: 'Engineering Professors Council',
    url: 'https://epc.ac.uk/resources/toolkit/sustainability-toolkit/',
  },
  {
    title: 'Project Activities: Youth Leadership in Environmental Sustainability',
    source: 'fundsforNGOs',
    url: 'https://www.fundsforngos.org/proposals/project-activities-youth-leadership-in-environmental-sustainability/',
  },
]

const NETWORKS = [
  { title: 'Roots & Shoots', source: 'Jane Goodall Institute', url: 'https://rootsandshoots.org/' },
  { title: 'Earth Guardians', source: 'Youth-led movement', url: 'https://www.earthguardians.org/' },
  { title: 'Our Climate Fellowship', source: 'Our Climate', url: 'https://ourclimate.us/fellowship/' },
  { title: 'Green Schools National Network', source: 'GSNN', url: 'https://greenschoolsnationalnetwork.org/' },
  {
    title: "Children's Environmental Literacy Foundation",
    source: 'CELF',
    url: 'https://celfeducation.org/yvfp/',
  },
  {
    title: 'Plastic Pollution Coalition — Youth Ambassadors',
    source: 'PPC',
    url: 'https://www.plasticpollutioncoalition.org/coalition/youth-ambassadors',
  },
  {
    title: 'Youth Climate Action Network',
    source: 'UNESCO',
    url: 'https://www.unesco.org/en/youth/climate-action-network',
  },
  { title: 'VolunteerMatch', source: 'Find local opportunities', url: 'https://www.volunteermatch.org/' },
]

const ACTIONS = [
  {
    title: 'Start a chapter',
    desc: 'Create a climate action chapter at your school or community.',
    link: '/get-involved',
    linkLabel: 'Learn how →',
  },
  {
    title: 'Join our global network',
    desc: 'Collaborate with youth worldwide on shared climate projects.',
    link: 'https://www.instagram.com/shineinhearts/',
    linkLabel: 'Follow us →',
    external: true,
  },
  {
    title: 'Volunteer locally',
    desc: 'Team up with local orgs to plant trees, clean beaches, or run environmental campaigns.',
  },
  {
    title: 'Host a workshop',
    desc: 'Organize a session at your school or community center to raise awareness and share actionable steps.',
  },
  {
    title: 'Create a social campaign',
    desc: 'Use your voice online — posts, videos, threads — to educate your peers about the climate crisis.',
  },
]

function ResourceRow({ title, source, url }: { title: string; source: string; url: string }) {
  return (
    <a href={url} target="_blank" rel="noreferrer" className="resource-row">
      <span className="resource-arrow">→</span>
      <span className="resource-title">{title}</span>
      <span className="resource-source">{source}</span>
    </a>
  )
}

export default function ClimateHubPage() {
  return (
    <>
      <div className="page-header">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span style={{ margin: '0 8px', opacity: 0.4 }}>/</span>
          Resources
          <span style={{ margin: '0 8px', opacity: 0.4 }}>/</span>
          Youth Climate Resource Hub
        </div>
        <h1>Youth Climate Resource Hub</h1>
      </div>

      <section style={{ padding: '5rem 10%', borderBottom: '1px solid var(--color-border)', maxWidth: 1800 }}>
        <RevealWrapper>
          <span className="label">Why this exists</span>
        </RevealWrapper>
        <RevealWrapper delay={80}>
          <p style={{ fontSize: '1.1rem', marginBottom: '1.25rem' }}>
            You don&apos;t have to be an expert or a policymaker to make a real impact. If you are ready to do
            something, you&apos;re already on the right path.
          </p>
          <p style={{ marginBottom: '1.25rem' }}>
            This space is for youth and for changemakers of all kinds. The ones who see a better future and want to
            build it. Whether you&apos;re just learning about climate change or already planning a project, you&apos;ll
            find tools, ideas, and a community that believes in you.
          </p>
          <p>Because real change starts small. And it starts with you.</p>
        </RevealWrapper>
      </section>

      <section style={{ padding: '5rem 10%', borderBottom: '1px solid var(--color-border)' }}>
        <RevealWrapper>
          <span className="label">Guides &amp; toolkits</span>
        </RevealWrapper>
        {GUIDES.map((r, i) => (
          <RevealWrapper key={r.url} delay={i * 60}>
            <ResourceRow {...r} />
          </RevealWrapper>
        ))}
      </section>

      <section style={{ padding: '5rem 10%', borderBottom: '1px solid var(--color-border)' }}>
        <RevealWrapper>
          <span className="label">Youth programs &amp; networks</span>
        </RevealWrapper>
        {NETWORKS.map((r, i) => (
          <RevealWrapper key={r.url} delay={i * 60}>
            <ResourceRow {...r} />
          </RevealWrapper>
        ))}
      </section>

      <section style={{ padding: '5rem 10%', borderBottom: '1px solid var(--color-border)' }}>
        <RevealWrapper>
          <div className="pull-quote">
            <p>&ldquo;No act of kindness, no matter how small, is wasted.&rdquo;</p>
            <cite>— Aesop</cite>
          </div>
        </RevealWrapper>
      </section>

      <section style={{ padding: '5rem 10%' }}>
        <RevealWrapper>
          <span className="label">Take action</span>
        </RevealWrapper>
        <RevealWrapper delay={80}>
          <h2 style={{ marginBottom: '1.5rem' }}>Ways to start.</h2>
        </RevealWrapper>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {ACTIONS.map((a, i) => (
            <RevealWrapper key={a.title} delay={i * 60}>
              <div
                className="climate-action-row"
                style={{
                  padding: '1.75rem 0',
                  borderTop: '1px solid var(--color-border)',
                  borderBottom: i === ACTIONS.length - 1 ? '1px solid var(--color-border)' : undefined,
                }}
              >
                <strong style={{ display: 'block', marginBottom: 6, color: 'var(--color-text)' }}>{a.title}</strong>
                <p style={{ fontSize: '0.95rem' }}>
                  {a.desc}{' '}
                  {a.link &&
                    (a.external ? (
                      <a href={a.link} target="_blank" rel="noreferrer" className="ink-link">
                        {a.linkLabel}
                      </a>
                    ) : (
                      <Link href={a.link} className="ink-link">
                        {a.linkLabel}
                      </Link>
                    ))}
                </p>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </section>
    </>
  )
}
