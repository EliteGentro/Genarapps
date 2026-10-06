import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import { Link, type LinkProps } from 'react-router'
import { buttonClasses, type ButtonSize, type ButtonTone } from '../lib/buttonStyles'

interface StyleProps {
  tone?: ButtonTone
  size?: ButtonSize
}

export function Button({ tone, size, className, type = 'button', ...rest }: StyleProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type={type} className={buttonClasses(tone, size, className)} {...rest} />
}

/** In-site navigation styled as a button. */
export function ButtonLink({ tone, size, className, ...rest }: StyleProps & LinkProps) {
  return <Link className={buttonClasses(tone, size, className)} {...rest} />
}

/** Link to another website or a mailto: address, styled as a button. */
export function ExternalButton({ tone, size, className, href, children, ...rest }: StyleProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isWeb = href?.startsWith('http')
  return (
    <a
      href={href}
      className={buttonClasses(tone, size, className)}
      {...(isWeb ? { target: '_blank', rel: 'noreferrer' } : {})}
      {...rest}
    >
      {children}
      {isWeb && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  )
}
