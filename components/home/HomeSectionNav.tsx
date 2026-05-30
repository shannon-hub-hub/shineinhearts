'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { NAV_LINKS, sectionClass } from '@/lib/nav-links'

const DROPDOWN_CLOSE_DELAY_MS = 400

function HomeNavLink({
  href,
  external,
  className,
  children,
  onClick,
}: {
  href: string
  external?: boolean
  className?: string
  children: React.ReactNode
  onClick?: () => void
}) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className} onClick={onClick}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  )
}

export function HomeSectionNav() {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearClose = useCallback(() => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current)
      closeTimeout.current = null
    }
  }, [])

  const showSection = useCallback(
    (label: string) => {
      clearClose()
      setHoveredSection(label)
    },
    [clearClose]
  )

  const scheduleClose = useCallback(() => {
    clearClose()
    closeTimeout.current = setTimeout(() => {
      setHoveredSection(null)
      closeTimeout.current = null
    }, DROPDOWN_CLOSE_DELAY_MS)
  }, [clearClose])

  useEffect(() => () => clearClose(), [clearClose])

  return (
    <nav className="home-section-nav" aria-label="Site sections">
      <div className="home-section-nav-tabs">
        {NAV_LINKS.filter((link) => link.label !== 'Home').map((link) =>
          'children' in link ? (
            <div
              key={link.label}
              className={`home-section-nav-group ${sectionClass(link.section)}`}
              onMouseEnter={() => showSection(link.label)}
              onMouseLeave={scheduleClose}
            >
              <button
                type="button"
                className={`home-section-nav-tab${hoveredSection === link.label ? ' is-active' : ''}`}
                onClick={() => {
                  clearClose()
                  setHoveredSection(hoveredSection === link.label ? null : link.label)
                }}
                aria-expanded={hoveredSection === link.label}
              >
                {link.label}
              </button>
              {hoveredSection === link.label && (
                <div className="home-section-nav-sub">
                  {link.children.map((item) => (
                    <HomeNavLink
                      key={item.href}
                      href={item.href}
                      external={item.external}
                      className="home-section-nav-sub-link"
                    >
                      {item.label}
                    </HomeNavLink>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <HomeNavLink
              key={link.label}
              href={link.href}
              className={`home-section-nav-tab ${sectionClass(link.section)}`}
            >
              {link.label}
            </HomeNavLink>
          )
        )}
      </div>
    </nav>
  )
}
