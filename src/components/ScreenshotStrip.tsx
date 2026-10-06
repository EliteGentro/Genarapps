import { useState } from 'react'
import type { AppEntry } from '../data/types'
import { ImageWithFallback } from './ImageWithFallback'
import { Lightbox } from './Lightbox'
import { ScreenshotPlaceholder } from './ScreenshotPlaceholder'

/** Horizontal strip of portrait screenshots. Each opens full size in the lightbox. */
export function ScreenshotStrip({ app }: { app: Pick<AppEntry, 'name' | 'screenshots'> }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (app.screenshots.length === 0) return null

  return (
    <>
      <ul
        aria-label={`${app.name} screenshots`}
        className="-mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pt-1 pb-4"
      >
        {app.screenshots.map((shot, index) => (
          <li key={shot.src} className="shrink-0 snap-start">
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={`Open screenshot ${index + 1}: ${shot.caption}`}
              className="group relative block aspect-[9/19.5] w-[132px] cursor-zoom-in overflow-hidden border-3 border-line bg-panel shadow-btn transition-[translate,box-shadow] duration-75 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-btn-hover sm:w-[150px]"
            >
              <ImageWithFallback
                src={shot.src}
                alt={shot.alt}
                width={300}
                height={650}
                fallback={<ScreenshotPlaceholder index={index} caption={shot.caption} />}
              />
            </button>
          </li>
        ))}
      </ul>
      <Lightbox appName={app.name} screenshots={app.screenshots} index={openIndex} onChange={setOpenIndex} />
    </>
  )
}
