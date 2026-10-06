import type { AppEntry } from '../data/types'
import { cx } from '../lib/cx'
import { ImageWithFallback } from './ImageWithFallback'

type IconSize = 'sm' | 'md' | 'lg'

const FRAME: Record<IconSize, string> = {
  sm: 'size-12 border-2 shadow-chip',
  md: 'size-16 border-3 shadow-chip',
  lg: 'size-24 sm:size-32 border-3 shadow-[5px_5px_0_0_var(--shadow)]',
}

const LETTER: Record<IconSize, string> = {
  sm: 'text-[22px]',
  md: 'text-[30px]',
  lg: 'text-[44px] sm:text-[60px]',
}

const PIXELS: Record<IconSize, number> = { sm: 48, md: 64, lg: 128 }

/**
 * The app's icon, square with an ink outline (the brand never rounds icons).
 * Until public/apps/<slug>/icon.png exists, a lettered placeholder is shown.
 */
export function AppIcon({ app, size = 'md', className }: { app: Pick<AppEntry, 'name' | 'icon' | 'accent'>; size?: IconSize; className?: string }) {
  const placeholder = (
    <span
      aria-hidden="true"
      className={cx(
        'halftone surface-fill absolute inset-0 grid place-items-center font-display leading-none text-ink',
        app.accent === 'mint' ? 'bg-sky' : 'bg-mint',
        LETTER[size],
      )}
    >
      {app.name.charAt(0).toUpperCase()}
    </span>
  )

  return (
    <span className={cx('relative block shrink-0 overflow-hidden border-line bg-panel', FRAME[size], className)}>
      <ImageWithFallback src={app.icon} alt="" width={PIXELS[size]} height={PIXELS[size]} fallback={placeholder} />
    </span>
  )
}
