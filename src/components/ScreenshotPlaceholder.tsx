import { twoDigits } from '../lib/format'
import { cx } from '../lib/cx'

/** Stand-in for a screenshot file that hasn't been added yet: a halftone phone panel with mock UI bars. */
export function ScreenshotPlaceholder({ index, caption, large = false }: { index: number; caption: string; large?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cx('halftone surface-fill absolute inset-0 block text-ink', index % 2 === 0 ? 'bg-sky' : 'bg-mint')}
    >
      <span className={cx('absolute grid content-start gap-2', large ? 'inset-x-8 top-10' : 'inset-x-3 top-4')}>
        <span className={cx('surface block border-2 border-line bg-panel', large ? 'h-20' : 'h-8')} />
        <span className="surface block h-2.5 border-2 border-line bg-panel" />
        <span className="surface block h-2.5 w-3/4 border-2 border-line bg-panel" />
        <span className="surface block h-2.5 w-1/2 border-2 border-line bg-panel" />
      </span>
      <span
        className={cx(
          'surface absolute bottom-2 left-2 max-w-[calc(100%-16px)] border-2 border-line bg-panel px-1.5 py-1 font-mono leading-tight text-ink',
          large ? 'text-[13px]' : 'text-[10px]',
        )}
      >
        {twoDigits(index + 1)} · {caption}
      </span>
    </span>
  )
}
