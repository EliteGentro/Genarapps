import { cx } from './cx'

export type ButtonTone = 'mint' | 'sky' | 'ghost'
export type ButtonSize = 'md' | 'sm'

const TONES: Record<ButtonTone, string> = {
  mint: 'surface-fill bg-mint text-ink',
  sky: 'surface-fill bg-sky text-ink',
  ghost: 'surface bg-panel text-ink',
}

const SIZES: Record<ButtonSize, string> = {
  md: 'min-h-11 px-4 pt-3 pb-[11px] text-[15px] shadow-btn hover:shadow-btn-hover',
  sm: 'min-h-9 px-3 pt-2 pb-[7px] text-[13px] shadow-chip hover:shadow-btn',
}

/** Buttons lift on hover and press flat into their shadow when clicked. */
export function buttonClasses(tone: ButtonTone = 'mint', size: ButtonSize = 'md', className?: string): string {
  return cx(
    'inline-flex cursor-pointer items-center justify-center gap-2 border-3 border-line font-sans leading-none font-bold no-underline select-none',
    'transition-[translate,box-shadow] duration-75 ease-out',
    'hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none',
    'disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-0',
    TONES[tone],
    SIZES[size],
    className,
  )
}
