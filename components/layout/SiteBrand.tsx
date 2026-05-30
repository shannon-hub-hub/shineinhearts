import Link from 'next/link'

export const SITE_LOGO = '/files/logo-original-1000.jpg'

type SiteBrandProps = {
  link?: boolean
  href?: string
  className?: string
  invert?: boolean
  size?: 'sm' | 'md'
}

export function SiteBrand({
  link = true,
  href = '/',
  className = '',
  invert = false,
  size = 'sm',
}: SiteBrandProps) {
  const content = (
    <>
      <img
        src={SITE_LOGO}
        alt=""
        className={`site-brand-logo site-brand-logo--${size}`}
      />
      <span className={`site-brand-name${invert ? ' site-brand-name--invert' : ''}`}>
        Shine in Hearts
      </span>
    </>
  )

  const classes = `site-brand site-brand--${size}${className ? ` ${className}` : ''}`

  if (link) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    )
  }

  return <div className={classes}>{content}</div>
}
