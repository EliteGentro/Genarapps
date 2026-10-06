import type { ReactNode } from 'react'
import { cx } from '../lib/cx'

type BubbleTone = 'panel' | 'paper' | 'mint' | 'sky'

const TONES: Record<BubbleTone, string> = {
  panel: 'surface text-ink [--bubble-bg:var(--panel)]',
  paper: 'surface text-ink [--bubble-bg:var(--paper)]',
  mint: 'surface-fill text-ink [--bubble-bg:var(--mint)]',
  sky: 'surface-fill text-ink [--bubble-bg:var(--sky)]',
}

/** Square speech bubble for short notes from the developer. */
export function Bubble({ children, tone = 'panel', className }: { children: ReactNode; tone?: BubbleTone; className?: string }) {
  return <div className={cx('bubble text-[15px] leading-relaxed', TONES[tone], className)}>{children}</div>
}
