import type { CSSProperties } from 'react'
import { cx } from '../lib/cx'

/** Square starburst sticker. Use one per page at most. */
export function Sticker({ label, tone = 'sky', className }: { label: string; tone?: 'mint' | 'sky'; className?: string }) {
  return (
    <span
      className={cx('sticker size-[66px]', className)}
      style={{ '--sticker-bg': `var(--${tone})` } as CSSProperties}
    >
      <span className="relative z-[1] -rotate-[8deg] font-display text-[12px] leading-none text-on-fill">{label}</span>
    </span>
  )
}
