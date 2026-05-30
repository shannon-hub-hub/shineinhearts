"use client";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, sectionClass } from "@/lib/nav-links";
import { SiteBrand } from "@/components/layout/SiteBrand";

const DROPDOWN_CLOSE_DELAY_MS = 400;

function NavItemLink({
  href,
  external,
  className,
  children,
  onClick,
}: {
  href: string;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileSection, setMobileSection] = useState<string>("What We Do");
  const closeDropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearDropdownClose = useCallback(() => {
    if (closeDropdownTimeout.current) {
      clearTimeout(closeDropdownTimeout.current);
      closeDropdownTimeout.current = null;
    }
  }, []);

  const openDropdownSection = useCallback(
    (label: string) => {
      clearDropdownClose();
      setOpenDropdown(label);
    },
    [clearDropdownClose]
  );

  const scheduleDropdownClose = useCallback(() => {
    clearDropdownClose();
    closeDropdownTimeout.current = setTimeout(() => {
      setOpenDropdown(null);
      closeDropdownTimeout.current = null;
    }, DROPDOWN_CLOSE_DELAY_MS);
  }, [clearDropdownClose]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => () => clearDropdownClose(), [clearDropdownClose]);

  const mobileActive = NAV_LINKS.find((link) => link.label === mobileSection) ?? NAV_LINKS[0];

  return (
    <>
      <div className={`nav-shell${scrolled ? " is-scrolled" : ""}`}>
        <header className="nav-bar">
          <div className="nav-bar-inner">
          <SiteBrand />

          <ul className="nav-sections hidden-mobile">
            {NAV_LINKS.map((link) =>
              "children" in link ? (
                <li
                  key={link.label}
                  className={`nav-section-item ${sectionClass(link.section)}`}
                  onMouseEnter={() => openDropdownSection(link.label)}
                  onMouseLeave={scheduleDropdownClose}
                >
                  <button
                    type="button"
                    className={`nav-trigger${openDropdown === link.label ? " is-open" : ""}`}
                    aria-expanded={openDropdown === link.label}
                  >
                    {link.label}
                  </button>
                  {openDropdown === link.label && (
                    <div className="nav-dropdown-panel">
                      <div className="nav-dropdown-panel-inner">
                        {link.children.map((c) => (
                          <NavItemLink
                            key={c.href}
                            href={c.href}
                            external={c.external}
                            className="nav-dropdown-link"
                          >
                            {c.label}
                          </NavItemLink>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ) : (
                <li key={link.label} className={sectionClass(link.section)}>
                  <Link href={link.href} className="nav-top-link">
                    {link.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", display: "none" }}
            className="show-mobile"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        </header>

        {mobileOpen && (
          <div className="nav-mobile-menu">
          <div className="nav-mobile-tabs">
            {NAV_LINKS.map((link) =>
              "children" in link ? (
                <button
                  key={link.label}
                  type="button"
                  className={`nav-mobile-tab ${sectionClass(link.section)}${
                    mobileSection === link.label ? " is-active" : ""
                  }`}
                  onClick={() => setMobileSection(link.label)}
                >
                  {link.label}
                </button>
              ) : (
                <NavItemLink
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`nav-mobile-tab ${sectionClass(link.section)}${
                    mobileSection === link.label ? " is-active" : ""
                  }`}
                >
                  {link.label}
                </NavItemLink>
              )
            )}
          </div>

          <div className={sectionClass(mobileActive.section)}>
            {"children" in mobileActive ? (
              <div className="nav-mobile-sub">
                {mobileActive.children.map((c) => (
                  <NavItemLink
                    key={c.href}
                    href={c.href}
                    external={c.external}
                    onClick={() => setMobileOpen(false)}
                    className="nav-mobile-sub-link"
                  >
                    {c.label}
                  </NavItemLink>
                ))}
              </div>
            ) : (
              <NavItemLink
                href={mobileActive.href}
                onClick={() => setMobileOpen(false)}
                className="nav-mobile-direct"
              >
                Go to {mobileActive.label}
              </NavItemLink>
            )}
          </div>
        </div>
        )}
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </>
  );
}
