import { AppIcon } from '../components/AppIcon'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { Bubble } from '../components/Bubble'
import { ButtonLink, ExternalButton } from '../components/Button'
import { Container } from '../components/Container'
import { CopyField } from '../components/CopyField'
import { Panel } from '../components/Panel'
import { ScreenshotStrip } from '../components/ScreenshotStrip'
import { Tag } from '../components/Tag'
import { useAppFromParams, useCatalog } from '../data/useCatalog'
import { DEVICE_LABELS, STATUS_LABELS, formatDate } from '../lib/format'
import { mailtoHref } from '../lib/mailto'
import { usePageMeta } from '../lib/usePageMeta'
import { NotFoundPage } from './NotFoundPage'

export function AppPage() {
  const app = useAppFromParams()
  const { site } = useCatalog()
  usePageMeta(app?.name ?? 'App not found', app ? `${app.name}: ${app.tagline}` : undefined)

  if (!app) return <NotFoundPage />

  const storeLinks = [
    app.links.appStore && { label: 'App Store', href: app.links.appStore },
    app.links.googlePlay && { label: 'Google Play', href: app.links.googlePlay },
    app.links.website && { label: 'Website', href: app.links.website },
  ].filter((link): link is { label: string; href: string } => Boolean(link))

  const details = [
    { label: 'Version', value: app.version },
    ...app.platforms.map((platform) => ({ label: DEVICE_LABELS[platform.device], value: platform.requires })),
    { label: 'Category', value: app.category },
    ...(app.languages.length > 0 ? [{ label: 'Languages', value: app.languages.join(', ') }] : []),
    { label: 'Status', value: STATUS_LABELS[app.status] },
  ]

  return (
    <Container className="grid gap-10">
      <Breadcrumbs trail={[{ label: 'Apps', to: '/' }, { label: app.name }]} />

      <Panel as="header" tone={app.accent} halftone padding="lg" className="grid items-center gap-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-8">
        <AppIcon app={app} size="lg" />
        <div className="@container grid min-w-0 gap-4">
          {/* Sized to the column so the longest name (12 letters of Bungee ≈ 8.2em) fits on a phone. */}
          <h1 className="font-display text-[clamp(24px,11.5cqi,58px)] leading-[0.95] font-normal break-words uppercase">
            {app.name}
          </h1>
          <p className="max-w-[52ch] text-[18px] leading-snug font-semibold">{app.tagline}</p>
          <ul aria-label="Facts" className="flex flex-wrap gap-2">
            {app.platforms.map((platform) => (
              <li key={platform.device}>
                <Tag>{DEVICE_LABELS[platform.device]}</Tag>
              </li>
            ))}
            <li>
              <Tag>v{app.version}</Tag>
            </li>
            <li>
              <Tag>{app.category}</Tag>
            </li>
            {app.status !== 'available' && (
              <li>
                <Tag tone={app.accent === 'mint' ? 'sky' : 'mint'}>{STATUS_LABELS[app.status]}</Tag>
              </li>
            )}
          </ul>
          <div className="flex flex-wrap gap-3 pt-1">
            {storeLinks.map((link, index) => (
              <ExternalButton key={link.label} href={link.href} tone={index === 0 ? (app.accent === 'mint' ? 'sky' : 'mint') : 'ghost'}>
                {link.label}
              </ExternalButton>
            ))}
            <ButtonLink to={`/apps/${app.slug}/privacy`} tone="ghost">
              Privacy policy
            </ButtonLink>
            <ButtonLink to={`/apps/${app.slug}/support`} tone="ghost">
              Get support
            </ButtonLink>
          </div>
        </div>
      </Panel>

      {app.screenshots.length > 0 && (
        <section aria-labelledby="shots-title" className="grid gap-3">
          <h2 id="shots-title" className="font-mono text-[12px] font-medium tracking-[.12em] text-muted uppercase">
            Screenshots · {app.screenshots.length}
          </h2>
          <ScreenshotStrip app={app} />
        </section>
      )}

      <div className="grid items-start gap-gutter lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
        <Panel as="section" caption="About" captionTone="plain" aria-label={`About ${app.name}`} className="grid gap-7">
          <div className="prose-comic text-[17px] leading-relaxed">
            {app.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="grid gap-4">
            <h2 className="text-[20px] leading-tight font-extrabold">What you can do</h2>
            <ul className="square-list [--bullet:var(--mint)]">
              {app.features.map((feature) => (
                <li key={feature}>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </Panel>

        <div className="grid gap-gutter">
          <Panel as="section" caption={`Privacy · ${formatDate(app.privacy.updated)}`} aria-label="Privacy at a glance" className="grid gap-4">
            <h2 className="text-[20px] leading-tight font-extrabold">Privacy at a glance</h2>
            {app.privacy.glance.length > 0 && (
              <dl className="grid">
                {app.privacy.glance.map((item) => (
                  <div key={item.label} className="grid gap-0.5 border-b-2 border-line py-2.5 first:pt-0 last:border-b-0 last:pb-0">
                    <dt className="font-mono text-[11px] font-medium tracking-[.1em] text-muted uppercase">{item.label}</dt>
                    <dd className="font-semibold">{item.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            <ButtonLink to={`/apps/${app.slug}/privacy`} tone="mint" size="sm" className="w-fit">
              Read the full policy
            </ButtonLink>
          </Panel>

          <Panel as="section" caption="Details" captionTone="plain" aria-label="Details">
            <dl className="grid">
              {details.map((item) => (
                <div
                  key={item.label}
                  className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-3 border-b-2 border-line py-2.5 first:pt-0 last:border-b-0 last:pb-0"
                >
                  <dt className="font-mono text-[11px] leading-6 font-medium tracking-[.1em] text-muted uppercase">{item.label}</dt>
                  <dd className="text-[15px] font-semibold">{item.value}</dd>
                </div>
              ))}
            </dl>
          </Panel>
        </div>
      </div>

      <Panel as="section" tone="paper" caption="Support" captionTone="sky" aria-label="Support" className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
        <div className="grid content-start gap-4">
          <h2 className="text-[22px] leading-tight font-extrabold">Something not working?</h2>
          <Bubble tone="panel">
            Tell me your device, the app version and what you tapped right before it happened. I reply within{' '}
            {site.responseTime}.
          </Bubble>
        </div>
        <div className="grid gap-4">
          <CopyField
            label="Support email"
            value={app.supportEmail}
            mailto={mailtoHref({ to: app.supportEmail, subject: `[${app.name}] Support`, body: '' })}
          />
          <ButtonLink to={`/apps/${app.slug}/support`} tone="sky" className="w-fit">
            Write a support message
          </ButtonLink>
        </div>
      </Panel>
    </Container>
  )
}
