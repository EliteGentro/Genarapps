import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '../lib/cx'
import { TONE_CLASSES, type Tone } from '../lib/tones'

type CaptionTone = 'mint' | 'sky' | 'plain'

const CAPTION_TONES: Record<CaptionTone, string> = {
  mint: TONE_CLASSES.mint,
  sky: TONE_CLASSES.sky,
  plain: TONE_CLASSES.panel,
}

/** A comic caption box pinned to the top-left corner of a panel. */
export function Caption({ children, tone = 'mint' }: { children: ReactNode; tone?: CaptionTone }) {
  return (
    <span
      className={cx(
        'absolute -top-[3px] -left-[3px] z-[2] max-w-[calc(100%+6px)] border-3 border-line px-2.5 pt-[7px] pb-[6px]',
        'font-mono text-[11px] leading-none font-medium tracking-[.12em] uppercase',
        CAPTION_TONES[tone],
      )}
    >
      {children}
    </span>
  )
}

type PanelElement = 'div' | 'section' | 'article' | 'aside' | 'header'

interface PanelProps extends HTMLAttributes<HTMLElement> {
  as?: PanelElement
  tone?: Tone
  halftone?: boolean
  caption?: ReactNode
  captionTone?: CaptionTone
  /** "none" for panels that lay out their own inner sections. */
  padding?: 'none' | 'md' | 'lg'
}

const PADDING = {
  none: '',
  md: 'p-5 sm:p-6',
  lg: 'p-6 sm:p-8',
}

/** The basic building block: square corners, 3 px ink outline, hard offset shadow. */
export function Panel({
  as: Element = 'div',
  tone = 'panel',
  halftone = false,
  caption,
  captionTone = 'mint',
  padding = 'md',
  className,
  children,
  ...rest
}: PanelProps) {
  return (
    <Element
      className={cx(
        'relative min-w-0 border-3 border-line shadow-panel',
        TONE_CLASSES[tone],
        halftone && 'halftone',
        PADDING[padding],
        Boolean(caption) && padding !== 'none' && 'pt-13 sm:pt-13',
        className,
      )}
      {...rest}
    >
      {caption && <Caption tone={captionTone}>{caption}</Caption>}
      {children}
    </Element>
  )
}
