import { cx } from '../lib/cx'

type WordmarkSize = 'sm' | 'md' | 'xl'

const TEXT: Record<WordmarkSize, string> = {
  sm: 'text-[19px]',
  md: 'text-[clamp(22px,6vw,30px)]',
  // Sized by the parent's width; the parent must be an @container.
  xl: 'text-[clamp(28px,13cqi,92px)]',
}

const BOX: Record<WordmarkSize, string> = {
  sm: 'border-2 shadow-[2px_2px_0_0_var(--shadow)]',
  md: 'border-3 shadow-chip',
  xl: 'border-4 shadow-[5px_5px_0_0_var(--shadow)]',
}

/** "GENAR" plus "APPS" in a sky box with an ink outline. */
export function Wordmark({ size = 'sm', className }: { size?: WordmarkSize; className?: string }) {
  return (
    <span className={cx('inline-flex', className)}>
      <span aria-hidden="true" className={cx('inline-flex items-center whitespace-nowrap font-display leading-none', TEXT[size])}>
        GENAR
        <span className={cx('ml-[.12em] inline-block border-line bg-sky px-[.16em] pt-[.1em] pb-[.04em] text-on-fill', BOX[size])}>
          APPS
        </span>
      </span>
      <span className="sr-only">GenarApps</span>
    </span>
  )
}
