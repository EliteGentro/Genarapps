import type { ReactNode } from 'react'
import { cx } from '../lib/cx'

interface SectionHeadingProps {
  id?: string
  children: ReactNode
  description?: ReactNode
  /** Right-aligned extra, such as a count. */
  aside?: ReactNode
  as?: 'h1' | 'h2'
  className?: string
}

/** Display-face title set in an outlined box, like a comic chapter heading. */
export function SectionHeading({ id, children, description, aside, as: Heading = 'h2', className }: SectionHeadingProps) {
  return (
    <div className={cx('flex flex-wrap items-end gap-x-6 gap-y-3', className)}>
      <Heading
        id={id}
        className="surface border-3 border-line bg-panel px-3.5 pt-2.5 pb-2 font-display text-[clamp(24px,4vw,34px)] leading-none font-normal text-ink uppercase shadow-chip"
      >
        {children}
      </Heading>
      {description && <p className="max-w-[58ch] text-muted">{description}</p>}
      {aside && <div className="ml-auto">{aside}</div>}
    </div>
  )
}
