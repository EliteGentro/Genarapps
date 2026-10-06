import { useEffect, useRef } from 'react'
import type { Screenshot } from '../data/types'
import { twoDigits } from '../lib/format'
import { Button } from './Button'
import { ImageWithFallback } from './ImageWithFallback'
import { ScreenshotPlaceholder } from './ScreenshotPlaceholder'

interface LightboxProps {
  appName: string
  screenshots: Screenshot[]
  /** Index of the open screenshot, or null when closed. */
  index: number | null
  onChange: (index: number | null) => void
}

/** Full-size screenshot viewer built on <dialog>: Esc closes, arrow keys page through. */
export function Lightbox({ appName, screenshots, index, onChange }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const open = index !== null
  const count = screenshots.length

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog || typeof dialog.showModal !== 'function') return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  function step(delta: number) {
    if (index === null) return
    onChange((index + delta + count) % count)
  }

  const shot = index === null ? null : screenshots[index]

  return (
    <dialog
      ref={dialogRef}
      aria-label={`${appName} screenshots`}
      onClose={() => onChange(null)}
      onCancel={() => onChange(null)}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') step(1)
        if (event.key === 'ArrowLeft') step(-1)
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onChange(null)
      }}
      className="surface m-auto max-h-[calc(100dvh-32px)] w-[min(92vw,440px)] border-3 border-line bg-panel p-0 text-ink shadow-panel backdrop:bg-[rgb(10_14_19/0.78)]"
    >
      {shot && index !== null && (
        <div className="grid gap-3 p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-[12px] tracking-[.08em] uppercase">
              {twoDigits(index + 1)} / {twoDigits(count)} · {shot.caption}
            </p>
            <Button size="sm" tone="ghost" onClick={() => onChange(null)} autoFocus>
              Close
            </Button>
          </div>
          <div className="relative mx-auto aspect-[9/19.5] h-[min(64dvh,620px)] max-w-full overflow-hidden border-3 border-line bg-paper">
            <ImageWithFallback
              key={shot.src}
              src={shot.src}
              alt={shot.alt}
              width={1290}
              height={2796}
              loading="eager"
              fit="contain"
              fallback={<ScreenshotPlaceholder index={index} caption={shot.caption} large />}
            />
          </div>
          {count > 1 && (
            <div className="flex justify-between gap-3">
              <Button size="sm" tone="ghost" onClick={() => step(-1)}>
                ← Previous
              </Button>
              <Button size="sm" tone="mint" onClick={() => step(1)}>
                Next →
              </Button>
            </div>
          )}
        </div>
      )}
    </dialog>
  )
}
