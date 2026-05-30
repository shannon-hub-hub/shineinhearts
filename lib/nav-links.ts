export const YOUTH_OPPORTUNITIES_PDF = '/files/Youth+Volunteer+Opportunities+NYC.pdf'

export type NavSection = 'home' | 'work' | 'resources' | 'involved' | 'contact'

export type NavChild = {
  label: string
  href: string
  external?: boolean
}

export type NavLink =
  | { label: string; href: string; section: NavSection }
  | { label: string; section: NavSection; children: NavChild[] }

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/', section: 'home' },
  {
    label: 'What We Do',
    section: 'work',
    children: [
      { label: 'Our Programs', href: '/programs' },
      { label: 'Events', href: '/events' },
      { label: 'Blog', href: '/blog' },
      { label: 'Our Impact', href: '/impact' },
      { label: 'About', href: '/about' },
    ],
  },
  {
    label: 'Resources',
    section: 'resources',
    children: [
      { label: 'Youth Climate Resource Hub', href: '/climate-hub' },
      { label: 'Youth Opportunities & Support', href: YOUTH_OPPORTUNITIES_PDF, external: true },
    ],
  },
  { label: 'Get Involved', href: '/get-involved', section: 'involved' },
  { label: 'Contact', href: '/contact', section: 'contact' },
]

export function sectionClass(section: NavSection) {
  return `nav-section-${section}`
}
