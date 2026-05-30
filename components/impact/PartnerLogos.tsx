import { PARTNER_LOGOS } from '@/lib/impact-display'

export function PartnerLogos() {
  return (
    <div
      className="partner-logos-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
      }}
    >
      {PARTNER_LOGOS.map((item) => (
        <div key={item.src} className="partner-logo-tile">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.src} alt={item.alt} width={200} height={200} />
        </div>
      ))}
    </div>
  )
}
