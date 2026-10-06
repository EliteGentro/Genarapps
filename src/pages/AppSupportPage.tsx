import { Link } from 'react-router'
import { AppIcon } from '../components/AppIcon'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { Bubble } from '../components/Bubble'
import { Container } from '../components/Container'
import { CopyField } from '../components/CopyField'
import { MessageBuilder } from '../components/MessageBuilder'
import { Panel } from '../components/Panel'
import { useAppFromParams, useCatalog } from '../data/useCatalog'
import { mailtoHref } from '../lib/mailto'
import { usePageMeta } from '../lib/usePageMeta'
import { NotFoundPage } from './NotFoundPage'
import { Faq } from '../components/Faq'

export function AppSupportPage() {
  const app = useAppFromParams()
  const { site, apps } = useCatalog()
  usePageMeta(app ? `${app.name} support` : 'App not found', app ? `Get help with ${app.name}.` : undefined)

  if (!app) return <NotFoundPage />

  return (
    <Container className="grid gap-10">
      <Breadcrumbs trail={[{ label: 'Apps', to: '/' }, { label: app.name, to: `/apps/${app.slug}` }, { label: 'Support' }]} />

      <header className="grid gap-5 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center sm:gap-7">
        <AppIcon app={app} size="md" />
        <div className="grid gap-3">
          <h1 className="font-display text-[clamp(28px,5vw,48px)] leading-none font-normal uppercase">{app.name} support</h1>
          <p className="max-w-[60ch] text-[17px] text-muted">
            Questions, bugs and ideas for {app.name}. I read every message and reply within {site.responseTime}.
          </p>
        </div>
      </header>

      <div className="grid items-start gap-gutter lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <Panel as="section" caption="Write a message" aria-label="Write a message" padding="lg" className="grid gap-5">
          <p className="max-w-[60ch] text-muted">
            This site doesn&apos;t send email. Fill in the form, then copy the message or open it in your mail app.
          </p>
          <MessageBuilder apps={apps} fallbackEmail={site.supportEmail} fixedApp={app} />
        </Panel>

        <div className="grid gap-gutter">
          <Panel as="section" tone="sky" halftone caption="Email" captionTone="plain" aria-label="Email">
            <Panel padding="md">
              <CopyField
                label="Support email"
                value={app.supportEmail}
                mailto={mailtoHref({ to: app.supportEmail, subject: `[${app.name}] Support`, body: '' })}
              />
            </Panel>
          </Panel>

          {app.faq.length > 0 && (
            <Panel as="section" caption="Common questions" captionTone="plain" aria-label="Common questions">
              <Faq entries={app.faq} />
            </Panel>
          )}

          <Bubble tone="paper">
            Privacy questions? Read the{' '}
            <Link to={`/apps/${app.slug}/privacy`} className="font-semibold text-link underline underline-offset-[3px] hover:no-underline">
              {app.name} privacy policy
            </Link>
            .
          </Bubble>
        </div>
      </div>
    </Container>
  )
}
