import { Container } from '../components/Container'
import { CopyField } from '../components/CopyField'
import { Panel } from '../components/Panel'
import { SectionHeading } from '../components/SectionHeading'
import { useCatalog } from '../data/useCatalog'
import { mailtoHref } from '../lib/mailto'
import { usePageMeta } from '../lib/usePageMeta'

const UPDATED = 'October 6, 2026'

/** Privacy notice for this website itself. Each app has its own policy. */
export function SitePrivacyPage() {
  const { site } = useCatalog()
  usePageMeta('Website privacy', 'How the GenarApps website handles your data.')

  return (
    <Container className="grid gap-10">
      <div className="grid gap-4">
        <SectionHeading as="h1">Website privacy</SectionHeading>
        <p className="font-mono text-[13px] tracking-[.06em] text-muted uppercase">Last updated {UPDATED}</p>
      </div>

      <Panel padding="lg" className="prose-comic grid gap-8 text-[16px] leading-relaxed">
        <section className="grid gap-3">
          <h2 className="text-[22px] leading-tight font-extrabold">What this page covers</h2>
          <p>
            This notice is about the GenarApps website you are reading now. Each app has its own privacy policy, linked
            from its page.
          </p>
        </section>
        <section className="grid gap-3">
          <h2 className="text-[22px] leading-tight font-extrabold">No accounts, cookies or analytics</h2>
          <p>
            The site has no sign-in, sets no cookies and runs no analytics, ads or tracking scripts. Fonts and images
            are served from this site, so your browser doesn&apos;t contact any other company while you read it.
          </p>
        </section>
        <section className="grid gap-3">
          <h2 className="text-[22px] leading-tight font-extrabold">Saved on your device</h2>
          <p>
            If you choose Light or Dark with the theme button, that choice is saved in your browser&apos;s local storage
            so the site remembers it. It never leaves your device. Choose Auto to remove it.
          </p>
        </section>
        <section className="grid gap-3">
          <h2 className="text-[22px] leading-tight font-extrabold">Support messages</h2>
          <p>
            The support form doesn&apos;t send anything. It builds a message in your browser that you copy or open in
            your own mail app. I only receive what you choose to email me, and I use it only to answer you.
          </p>
        </section>
        <section className="grid gap-3">
          <h2 className="text-[22px] leading-tight font-extrabold">Hosting</h2>
          <p>
            Like any website, the company that hosts these files may keep standard server logs, such as IP address,
            browser type and time of visit, to keep the service running and secure.
          </p>
        </section>
        <section className="grid gap-3">
          <h2 className="text-[22px] leading-tight font-extrabold">Contact</h2>
          <CopyField
            label="Email"
            value={site.supportEmail}
            mailto={mailtoHref({ to: site.supportEmail, subject: 'GenarApps website privacy', body: '' })}
            className="max-w-xl"
          />
        </section>
      </Panel>
    </Container>
  )
}
