import { AppCard } from '../components/AppCard'
import { Bubble } from '../components/Bubble'
import { ButtonLink } from '../components/Button'
import { Container } from '../components/Container'
import { CopyField } from '../components/CopyField'
import { Mark } from '../components/Mark'
import { Panel } from '../components/Panel'
import { SectionHeading } from '../components/SectionHeading'
import { Wordmark } from '../components/Wordmark'
import { useCatalog } from '../data/useCatalog'
import { twoDigits } from '../lib/format'
import { mailtoHref } from '../lib/mailto'
import { usePageMeta } from '../lib/usePageMeta'

export function HomePage() {
  const { site, apps } = useCatalog()
  usePageMeta(null, 'Privacy policies, support and screenshots for every GenarApps app.')

  return (
    <Container className="grid gap-16 sm:gap-20">
      <section aria-labelledby="cover-title" className="grid gap-gutter lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
        <Panel padding="lg" className="@container grid content-start gap-7">
          <div className="surface inline-grid w-fit justify-items-center border-3 border-line bg-paper px-3 py-2 text-center font-mono text-[11px] leading-tight tracking-[.1em] uppercase">
            <span>Catalog</span>
            <span className="font-display text-[24px] leading-none tracking-normal">{twoDigits(apps.length)}</span>
            <span>{apps.length === 1 ? 'App' : 'Apps'}</span>
          </div>
          <Wordmark size="xl" />
          <h1 id="cover-title" className="max-w-[24ch] text-[clamp(22px,2.6vw,30px)] leading-tight font-bold">
            Small apps, straight answers.
          </h1>
          <p className="max-w-[56ch] text-[17px] text-muted">
            Every app I make has a page here with what it does, its privacy policy and how to reach me when something
            breaks.
          </p>
        </Panel>
        <Panel tone="sky" halftone padding="lg" className="hidden min-h-[300px] place-items-center sm:grid">
          <Mark size={220} className="max-w-full" />
        </Panel>
      </section>

      <section aria-labelledby="apps-title" className="grid gap-8">
        <SectionHeading
          id="apps-title"
          description="Tap an app for its screenshots, privacy policy and support."
        >
          All apps
        </SectionHeading>
        <ul className="grid gap-gutter sm:grid-cols-2 lg:grid-cols-3">
          {apps.map((app) => (
            <li key={app.slug} className="grid">
              <AppCard app={app} />
            </li>
          ))}
        </ul>
      </section>

      <Panel as="section" tone="mint" halftone padding="lg" aria-labelledby="help-title" className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
        <div className="grid content-start gap-4">
          <h2 id="help-title" className="font-display text-[clamp(24px,4vw,34px)] leading-none font-normal uppercase">
            Need help?
          </h2>
          <Bubble tone="panel">
            Write to me with the app name and what went wrong. I reply within {site.responseTime}.
          </Bubble>
        </div>
        <Panel padding="md" className="grid gap-4">
          <CopyField
            label="Support email"
            value={site.supportEmail}
            mailto={mailtoHref({ to: site.supportEmail, subject: 'GenarApps support', body: '' })}
          />
          <ButtonLink to="/support" tone="sky" className="w-fit">
            Write a support message
          </ButtonLink>
        </Panel>
      </Panel>
    </Container>
  )
}
