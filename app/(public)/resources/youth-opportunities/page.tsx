import { Metadata } from 'next'
import Link from 'next/link'
import { RevealWrapper } from '@/components/ui/RevealWrapper'

export const metadata: Metadata = { title: 'Youth Opportunities & Support' }

const SECTIONS = [
  {
    label: 'Programs & recreation',
    resources: [
      { title: 'Youth Sports Programs & Instructional Clinics', source: 'NYC Parks', url: 'https://www.nycgovparks.org/programs/recreation/youth-sports' },
      { title: 'Teen Programs', source: 'NYC Parks', url: 'https://www.nycgovparks.org/programs/recreation/teens' },
      { title: 'NYC Parks Afterschool', source: 'NYC Parks', url: 'https://www.nycgovparks.org/programs/recreation/afterschool' },
    ],
  },
  {
    label: 'Education & development',
    resources: [
      { title: 'Department of Youth & Community Development', source: 'NYC', url: 'https://www.nyc.gov/site/dycd/index.page' },
    ],
  },
  {
    label: 'Mental health & wellness',
    resources: [
      { title: 'Child & Adolescent Mental Health Services in NYC', source: 'NYC Health', url: 'https://www.nyc.gov/site/doh/health/health-topics/child-and-adolescent-mental-health-services.page' },
      { title: 'Administration for Children\'s Services', source: 'NYC ACS', url: 'https://www.nyc.gov/site/acs/index.page' },
    ],
  },
  {
    label: 'Workers\' rights & financial literacy',
    resources: [
      { title: 'Tips for Young Adults — Consumer Rights', source: 'NYC DCWP', url: 'https://www.nyc.gov/site/dca/consumers/young-adults.page' },
    ],
  },
  {
    label: 'Legal & family support',
    resources: [
      { title: 'Family Court Division: Child Support Services', source: 'NYC', url: 'https://www.nyc.gov/site/familycourtdivision/child-support/child-support.page' },
      { title: 'Benefits on Your Block — Mayor\'s Public Engagement Unit', source: 'NYC', url: 'https://www.nyc.gov/site/mayorspeu/resources/benefits-on-your-block.page' },
    ],
  },
  {
    label: 'Volunteering',
    resources: [
      { title: 'Youth Volunteer Opportunities in New York', source: 'Shine in Hearts', url: '/Youth+Volunteer+Opportunities+NYC.pdf' },
      { title: 'VolunteerMatch — Find local opportunities', source: 'VolunteerMatch', url: 'https://www.volunteermatch.org/' },
    ],
  },
]

export default function YouthOpportunitiesPage() {
  return (
    <>
      <div className="page-header">
        <div className="breadcrumb">
          <Link href="/">Home</Link><span style={{ margin: '0 8px', opacity: 0.4 }}>/</span>
          Resources<span style={{ margin: '0 8px', opacity: 0.4 }}>/</span>
          Youth Opportunities &amp; Support
        </div>
        <h1>Youth Opportunities &amp; Support</h1>
      </div>

      {SECTIONS.map((section, si) => (
        <section key={section.label} style={{ padding: si === 0 ? '5rem 10%' : '2rem 10% 5rem', borderTop: si > 0 ? '1px solid var(--color-border)' : 'none' }}>
          <RevealWrapper>
            <span className="label" style={{ paddingTop: si > 0 ? '3rem' : 0, display: 'block' }}>{section.label}</span>
          </RevealWrapper>
          {section.resources.map((r, i) => (
            <RevealWrapper key={r.url} delay={i * 60}>
              <a href={r.url} target={r.url.startsWith('http') ? '_blank' : '_self'} rel="noreferrer" className="resource-row">
                <span style={{ fontSize: 14, color: 'var(--color-text-muted)', flexShrink: 0 }}>→</span>
                <span style={{ fontSize: '0.975rem', fontWeight: 500, color: 'var(--color-text)' }}>{r.title}</span>
                <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginLeft: 'auto', flexShrink: 0 }}>{r.source}</span>
              </a>
            </RevealWrapper>
          ))}
        </section>
      ))}

      {/* Resume section */}
      <section style={{ padding: '2rem 10% 5rem', borderTop: '1px solid var(--color-border)' }}>
        <RevealWrapper>
          <span className="label" style={{ paddingTop: '3rem', display: 'block' }}>Resume & career</span>
          <p style={{ marginBottom: '1.5rem', maxWidth: 560 }}>
            Create a resume that highlights your experience. Start with free templates from{' '}
            <a href="https://www.canva.com/" target="_blank" rel="noreferrer" className="ink-link">Canva</a>,{' '}
            <a href="https://docs.google.com/" className="ink-link">Google Docs</a>, or{' '}
            <a href="https://resumegenius.com/" className="ink-link">ResumeGenius</a> — then ask a teacher or mentor to look it over.
          </p>
          <a href="https://www.bths.edu/guidance_forms/College_Resourse_Data/RESUME_WRITING/Resume%20Writing%20Techniques.pdf" target="_blank" rel="noreferrer" className="resource-row" style={{ maxWidth: 680 }}>
            <span style={{ fontSize: 14, color: 'var(--color-text-muted)', flexShrink: 0 }}>→</span>
            <span style={{ fontSize: '0.975rem', fontWeight: 500, color: 'var(--color-text)' }}>Resume Writing Techniques</span>
            <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginLeft: 'auto', flexShrink: 0 }}>Brooklyn Technical High School</span>
          </a>
          <div style={{ borderBottom: '1px solid var(--color-border)', maxWidth: 680 }} />
        </RevealWrapper>
      </section>
    </>
  )
}
