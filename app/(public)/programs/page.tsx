import { Metadata } from 'next'
import Link from 'next/link'
import { PROGRAMS } from '@/lib/programs-content'
import { RevealWrapper } from '@/components/ui/RevealWrapper'

export const metadata: Metadata = { title: 'Our Programs' }

export default function ProgramsPage() {
  return (
    <>
      <div className="page-header">
        <div className="breadcrumb"><Link href="/">Home</Link><span style={{ margin: '0 8px', opacity: 0.4 }}>/</span>Our Programs</div>
        <h1>Our Programs</h1>
        <p>
          Digital-first programs helping youth everywhere learn, create, and connect.
        </p>
      </div>

      <section style={{ padding: '5rem 10%', borderBottom: '1px solid var(--color-border)' }}>
        <RevealWrapper><span className="label">What we offer</span></RevealWrapper>
        {PROGRAMS.map((p, i) => (
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
        <p className="program-entry-footer">
          Ready to contribute? <Link href="/get-involved" className="ink-link">Find your place here →</Link>
        </p>
      </section>
    </>
  )
}
