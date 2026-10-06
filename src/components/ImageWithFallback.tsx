import { useState, type ReactNode } from 'react'
import { cx } from '../lib/cx'

interface ImageWithFallbackProps {
  src: string
  alt: string
  width: number
  height: number
  /** Shown while the image loads and kept if the file is missing. */
  fallback: ReactNode
  fit?: 'cover' | 'contain'
  loading?: 'lazy' | 'eager'
}

/**
 * Renders the fallback until the image has loaded, then fades the image in on top.
 * A missing file (for example, a screenshot that hasn't been added yet) leaves the fallback in place.
 */
export function ImageWithFallback({ src, alt, width, height, fallback, fit = 'cover', loading = 'lazy' }: ImageWithFallbackProps) {
  const [state, setState] = useState<{ src: string; status: 'loading' | 'loaded' | 'error' }>({ src, status: 'loading' })
  const status = state.src === src ? state.status : 'loading'

  return (
    <>
      {status !== 'loaded' && fallback}
      {status !== 'error' && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          decoding="async"
          onLoad={() => setState({ src, status: 'loaded' })}
          onError={() => setState({ src, status: 'error' })}
          className={cx(
            'absolute inset-0 size-full transition-opacity duration-200',
            fit === 'cover' ? 'object-cover' : 'object-contain',
            status === 'loaded' ? 'opacity-100' : 'opacity-0',
          )}
        />
      )}
    </>
  )
}
