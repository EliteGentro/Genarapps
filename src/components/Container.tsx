import type { HTMLAttributes } from 'react'
import { cx } from '../lib/cx'

/** Centered page column with the 20 px side gutter. */
export function Container({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('mx-auto w-full max-w-6xl px-5', className)} {...rest} />
}
