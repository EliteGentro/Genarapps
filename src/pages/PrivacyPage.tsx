import { Link } from 'react-router'
import { AppIcon } from '../components/AppIcon'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { Container } from '../components/Container'
import { CopyField } from '../components/CopyField'
import { Panel } from '../components/Panel'
import { useAppFromParams } from '../data/useCatalog'
import { formatDate } from '../lib/format'
import { mailtoHref } from '../lib/mailto'
import { usePageMeta } from '../lib/usePageMeta'
import { NotFoundPage } from './NotFoundPage'

const CONTACT_ID = 'contact'

export function PrivacyPage() {
  const app = useAppFromParams()
  usePageMeta(
    app ? `${app.name} privacy policy` : 'App not found',
    app ? `How ${app.name} handles your data. Last updated ${formatDate(app.privacy.updated)}.` : undefined,
  )

  if (!app) return <NotFoundPage />

  const { privacy } = app
  const toc = [...privacy.sections.map(({ id, title }) => ({ id, title })), { id: CONTACT_ID, title: 'Contact' }]

  return (
    <Container className="grid gap-10">
      <Breadcrumbs trail={[{ label: 'Apps', to: '/' }, { label: app.name, to: `/apps/${app.slug}` }, { label: 'Privacy' }]} />

      <header className="grid gap-5 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center sm:gap-7">
        <AppIcon app={app} size="md" />
        <div className="grid gap-3">
          <h1 className="font-display text-[clamp(28px,5vw,48px)] leading-none font-normal uppercase">
            {app.name} privacy policy
          </h1>
          <p className="font-mono text-[13px] tracking-[.06em] text-muted uppercase">
            Last updated <time dateTime={privacy.updated}>{formatDate(privacy.updated)}</time>
          </p>
        </div>
      </header>

      <div className="grid items-start gap-gutter lg:grid-cols-[230px_minmax(0,1fr)]">
        <nav aria-label="On this page" className="lg:sticky lg:top-6">
          <Panel tone="paper" padding="none" className="p-4">
            <p className="mb-3 font-mono text-[11px] font-medium tracking-[.12em] text-muted uppercase">On this page</p>
            <ol className="grid gap-1.5 text-[15px]">
              {toc.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="font-semibold text-link underline underline-offset-[3px] hover:no-underline">
                    {item.title}
                  </a>
                </li>
              ))}
            </ol>
          </Panel>
        </nav>

        <article className="grid min-w-0 gap-gutter">
          <Panel tone="mint" halftone caption="The short version" captionTone="plain" aria-label="Summary">
            <ul className="square-list text-[17px] font-semibold [--bullet:var(--panel)]">
              {privacy.summary.map((point) => (
                <li key={point}>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel padding="lg" className="grid gap-10">
            {privacy.sections.map((section) => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="grid scroll-mt-6 gap-3">
                <h2 id={`${section.id}-title`} className="text-[22px] leading-tight font-extrabold">
                  {section.title}
                </h2>
                <div className="prose-comic grid gap-3 text-[16px] leading-relaxed">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.items.length > 0 && (
                    <ul className="square-list">
                      {section.items.map((item) => (
                        <li key={item}>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}

            <section id={CONTACT_ID} aria-labelledby="contact-title" className="grid scroll-mt-6 gap-3">
              <h2 id="contact-title" className="text-[22px] leading-tight font-extrabold">
                Contact
              </h2>
              <p className="prose-comic">
                Questions about this policy, or a request about your data? Email me and mention {app.name} in the
                subject.
              </p>
              <CopyField
                label="Privacy contact"
                value={app.supportEmail}
                mailto={mailtoHref({ to: app.supportEmail, subject: `[${app.name}] Privacy request`, body: '' })}
                className="max-w-xl"
              />
            </section>
          </Panel>

          <p className="text-muted">
            Back to <Link to={`/apps/${app.slug}`} className="font-semibold text-link underline underline-offset-[3px] hover:no-underline">{app.name}</Link>
            {' · '}
            <Link to={`/apps/${app.slug}/support`} className="font-semibold text-link underline underline-offset-[3px] hover:no-underline">
              {app.name} support
            </Link>
          </p>
        </article>
      </div>
    </Container>
  )
}
