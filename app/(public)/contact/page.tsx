import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Contact' }

export default function ContactPage() {
  return (
    <>
      <div className="page-header">
        <div className="breadcrumb"><Link href="/">Home</Link><span style={{ margin: '0 8px', opacity: 0.4 }}>/</span>Contact</div>
        <h1>Contact Us</h1>
      </div>

      <section style={{ padding: '5rem 10%', maxWidth: 640 }}>
        <div className="contact-item">
          <span style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 4, display: 'block' }}>Email</span>
          <a href="mailto:shineinhearts@gmail.com" style={{ fontFamily: 'Lora, serif', fontSize: '1.15rem', color: 'var(--color-text)', textDecoration: 'none', transition: 'color 0.2s' }}>
            shineinhearts@gmail.com
          </a>
        </div>
        <div className="contact-item">
          <span style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 4, display: 'block' }}>Instagram</span>
          <a href="https://www.instagram.com/shineinhearts/" target="_blank" rel="noreferrer" style={{ fontFamily: 'Lora, serif', fontSize: '1.15rem', color: 'var(--color-text)', textDecoration: 'none' }}>
            @shineinhearts
          </a>
        </div>
        <div className="contact-item">
          <span style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 4, display: 'block' }}>Volunteer</span>
          <Link href="/get-involved" style={{ fontFamily: 'Lora, serif', fontSize: '1.15rem', color: 'var(--color-text)', textDecoration: 'none' }}>
            Apply to get involved
          </Link>
        </div>
      </section>
    </>
  )
}
