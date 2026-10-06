import { cx } from '../lib/cx'

interface MarkProps {
  size?: number
  /** The sky badge. Drop it below 24 px, as the brand guidelines say. */
  badge?: boolean
  /** One-color version for use on Mint backgrounds. */
  mono?: boolean
  /** When set, the mark is announced to screen readers with this name. */
  title?: string
  className?: string
}

/** The GenarApps mark: a blocky G on a mint app tile with a sky badge. */
export function Mark({ size = 48, badge = true, mono = false, title, className }: MarkProps) {
  return (
    <svg
      viewBox={badge ? '0 0 80 80' : '0 8 68 68'}
      width={size}
      height={size}
      className={cx('shrink-0', className)}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title && <title>{title}</title>}
      <rect x="8" y="16" width="60" height="60" className="fill-shadow" />
      <rect x="2" y="10" width="60" height="60" strokeWidth="4" className={cx('stroke-line', mono ? 'fill-panel' : 'fill-mint')} />
      <g className={mono ? 'fill-ink' : 'fill-on-fill'}>
        <rect x="12" y="20" width="40" height="8" />
        <rect x="12" y="20" width="8" height="40" />
        <rect x="12" y="52" width="40" height="8" />
        <rect x="28" y="36" width="24" height="8" />
        <rect x="44" y="36" width="8" height="24" />
      </g>
      {badge && (
        <>
          <rect x="59" y="7" width="19" height="19" className="fill-shadow" />
          <rect x="55" y="3" width="19" height="19" strokeWidth="4" className={cx('stroke-line', mono ? 'fill-panel' : 'fill-sky')} />
        </>
      )}
    </svg>
  )
}
