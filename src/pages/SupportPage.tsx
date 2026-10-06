import { Link } from 'react-router'
import { AppIcon } from '../components/AppIcon'
import { Container } from '../components/Container'
import { CopyField } from '../components/CopyField'
import { MessageBuilder } from '../components/MessageBuilder'
import { Panel } from '../components/Panel'
import { SectionHeading } from '../components/SectionHeading'
import { useCatalog } from '../data/useCatalog'
import { mailtoHref } from '../lib/mailto'
import { usePageMeta } from '../lib/usePageMeta'

export function SupportPage() {
  const { site, apps } = useCatalog()
  usePageMeta('Support', 'Get help with any GenarApps app.')

  return (
    <Container className="grid gap-10">
      <SectionHeading as="h1" description={`One inbox for every app. I read every message and reply within ${site.responseTime}.`}>
        Support
      </SectionHeading>

      <div className="grid items-start gap-gutter lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <Panel as="section" caption="Write a message" aria-label="Write a message" padding="lg" className="grid gap-5">
          <p className="max-w-[60ch] text-muted">
            This site doesn&apos;t send email. Fill in the form, then copy the message or open it in your mail app.
          </p>
          <MessageBuilder apps={apps} fallbackEmail={site.supportEmail} />
        </Panel>

        <div className="grid gap-gutter">
          <Panel as="section" tone="mint" halftone caption="Email" captionTone="plain" aria-label="Email">
            <Panel padding="md">
              <CopyField
                label="Support email"
                value={site.supportEmail}
                mailto={mailtoHref({ to: site.supportEmail, subject: 'GenarApps support', body: '' })}
              />
            </Panel>
          </Panel>

          <Panel as="section" caption="Help for one app" captionTone="plain" aria-label="Help for one app">
            <ul className="grid">
              {apps.map((app) => (
                <li key={app.slug} className="border-b-2 border-line py-3 first:pt-0 last:border-b-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <AppIcon app={app} size="sm" />
                    <div className="grid min-w-0 gap-0.5">
                      <Link
                        to={`/apps/${app.slug}/support`}
                        className="font-bold text-ink underline underline-offset-[3px] hover:no-underline"
                      >
                        {app.name} support
                      </Link>
                      <Link
                        to={`/apps/${app.slug}/privacy`}
                        className="w-fit text-[14px] font-semibold text-link underline underline-offset-[3px] hover:no-underline"
                      >
                        Privacy policy
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </Container>
  )
}
