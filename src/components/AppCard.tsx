import { Link } from 'react-router'
import type { AppEntry } from '../data/types'
import { cx } from '../lib/cx'
import { DEVICE_LABELS, STATUS_LABELS } from '../lib/format'
import { AppIcon } from './AppIcon'
import { TONE_CLASSES } from '../lib/tones'
import { Sticker } from './Sticker'
import { Tag } from './Tag'

/** Catalog card. The whole card is clickable through the stretched title link. */
export function AppCard({ app }: { app: AppEntry }) {
  return (
    <article
      className={cx(
        'group relative grid min-w-0 grid-rows-[auto_1fr] border-3 border-line shadow-panel',
        'transition-[translate,box-shadow] duration-100 ease-out',
        'hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-panel-hover focus-within:-translate-x-[3px] focus-within:-translate-y-[3px] focus-within:shadow-panel-hover',
        'has-[a:focus-visible]:outline-3 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-link has-[a:focus-visible]:outline-dashed',
        TONE_CLASSES.panel,
      )}
    >
      <div
        className={cx(
          'halftone relative flex min-h-[112px] items-start justify-between gap-3 border-b-3 border-line p-4',
          TONE_CLASSES[app.accent],
        )}
      >
        <AppIcon app={app} size="md" />
        {app.isNew ? (
          <Sticker label="NEW" tone={app.accent === 'sky' ? 'mint' : 'sky'} />
        ) : (
          app.status !== 'available' && <Tag tone="panel">{STATUS_LABELS[app.status]}</Tag>
        )}
      </div>
      <div className="grid content-start gap-2 px-4 pt-3.5 pb-4">
        <h3 className="text-[20px] leading-tight font-extrabold">
          <Link
            to={`/apps/${app.slug}`}
            className="no-underline outline-none after:absolute after:inset-0 after:content-[''] group-hover:underline"
          >
            {app.name}
          </Link>
        </h3>
        <p className="text-[15px] text-muted">{app.tagline}</p>
        <div className="mt-1 flex flex-wrap items-center gap-1.5">
          {app.platforms.map((platform) => (
            <Tag key={platform.device}>{DEVICE_LABELS[platform.device]}</Tag>
          ))}
          <span className="ml-auto font-mono text-[12px] text-muted">v{app.version}</span>
        </div>
      </div>
    </article>
  )
}
