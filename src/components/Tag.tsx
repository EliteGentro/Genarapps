import type { ReactNode } from 'react'
import { cx } from '../lib/cx'

type TagTone = 'panel' | 'paper' | 'mint' | 'sky'

const TONES: Record<TagTone, string> = {
  panel: 'surface bg-panel text-ink',
  paper: 'surface bg-paper text-ink',
  mint: 'surface-fill bg-mint text-ink',
  sky: 'surface-fill bg-sky text-ink',
}

/** Small mono label: platforms, versions, status. */
export function Tag({ children, tone = 'panel', className }: { children: ReactNode; tone?: TagTone; className?: string }) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1.5 border-2 border-line px-[7px] pt-[5px] pb-1',
        'font-mono text-[11px] leading-none font-medium tracking-[.08em] whitespace-nowrap uppercase',
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
