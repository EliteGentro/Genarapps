import { ButtonLink } from '../components/Button'
import { Container } from '../components/Container'
import { Panel } from '../components/Panel'
import { usePageMeta } from '../lib/usePageMeta'

export function NotFoundPage() {
  usePageMeta('Page not found')

  return (
    <Container>
      <Panel tone="sky" halftone padding="lg" caption="Error 404" captionTone="plain" className="grid max-w-3xl gap-5">
        <h1 className="font-display text-[clamp(32px,6vw,56px)] leading-none font-normal uppercase">Panel missing</h1>
        <p className="max-w-[52ch] text-[17px]">
          There&apos;s no page at this address. The link may be old, or the app may have a new name.
        </p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink to="/" tone="mint">
            See all apps
          </ButtonLink>
          <ButtonLink to="/support" tone="ghost">
            Get support
          </ButtonLink>
        </div>
      </Panel>
    </Container>
  )
}
