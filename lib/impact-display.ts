/** Headline impact numbers shown across the site */
export const IMPACT_DISPLAY = {
  peopleServed: 400,
  volunteerHours: 500,
} as const;

/**
 * Partner logos for /impact — add files under public/impact/ with these names.
 * Example: public/impact/partner-1.jpg
 */
export const PARTNER_LOGOS = [
  { src: '/impact/partner-1.jpg', alt: 'Partner organization 1' },
  { src: '/impact/partner-2.jpg', alt: 'Partner organization 2' },
  { src: '/impact/partner-3.jpg', alt: 'Partner organization 3' },
  { src: '/impact/partner-4.jpg', alt: 'Partner organization 4' },
  { src: '/impact/partner-5.jpg', alt: 'Partner organization 5' },
] as const;
