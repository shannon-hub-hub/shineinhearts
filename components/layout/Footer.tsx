import Link from "next/link";
import { SiteBrand } from "@/components/layout/SiteBrand";

export function Footer() {
  return (
    <footer style={{ background: "var(--color-text)", color: "var(--color-bg)", padding: "5rem 10% 3rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "4rem",
        paddingBottom: "4rem", borderBottom: "1px solid rgba(247,244,239,0.1)", marginBottom: "2.5rem" }}
        className="footer-grid">
        <div>
          <div style={{ marginBottom: '1rem' }}>
            <SiteBrand link={false} invert size="md" />
          </div>
          <p style={{ fontSize: "0.9rem", color: "rgba(247,244,239,0.45)", lineHeight: 1.75,
            marginBottom: "1.75rem", maxWidth: 280 }}>
            A youth-led nonprofit connecting students worldwide through creativity, learning, and action.
          </p>
          <div style={{ display: "flex", gap: 16 }}>
            <a href="https://www.instagram.com/shineinhearts/" target="_blank" rel="noreferrer"
              style={{ fontSize: 13, color: "rgba(247,244,239,0.5)", textDecoration: "none" }}>
              Instagram
            </a>
            <a href="mailto:shineinhearts@gmail.com"
              style={{ fontSize: 13, color: "rgba(247,244,239,0.5)", textDecoration: "none" }}>
              Email
            </a>
          </div>
        </div>
        {[
          { title: "What We Do", links: [
            { label: "Our Programs", href: "/programs" },
            { label: "Events", href: "/events" },
            { label: "Blog", href: "/blog" },
            { label: "Our Impact", href: "/impact" },
          ]},
          { title: "Resources", links: [
            { label: "Climate Resource Hub", href: "/climate-hub" },
            { label: "Youth Opportunities", href: "/youth-opportunities" },
          ]},
          { title: "Organization", links: [
            { label: "About Us", href: "/about" },
            { label: "Contact", href: "/contact" },
            { label: "Get Involved", href: "/get-involved" },
            { label: "shineinhearts@gmail.com", href: "mailto:shineinhearts@gmail.com" },
          ]},
        ].map((col) => (
          <div key={col.title}>
            <h4 style={{ fontFamily: "var(--font-source-sans,sans-serif)", fontSize: 10,
              fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase",
              color: "rgba(247,244,239,0.3)", marginBottom: "1.25rem" }}>
              {col.title}
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} style={{ fontSize: 14, color: "rgba(247,244,239,0.5)",
                    textDecoration: "none" }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
        fontSize: 13, color: "rgba(247,244,239,0.22)" }}>
        <span>&copy; 2025 Shine in Hearts. All rights reserved.</span>
      </div>
      <style>{`
        @media(max-width:900px){ .footer-grid{ grid-template-columns:1fr 1fr!important; gap:2rem!important; } }
        @media(max-width:600px){ .footer-grid{ grid-template-columns:1fr!important; } }
      `}</style>
    </footer>
  );
}
