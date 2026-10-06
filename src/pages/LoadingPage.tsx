import { Container } from '../components/Container'
import { SiteFrame } from '../components/Layout'
import { Mark } from '../components/Mark'

/** Shown while apps.json downloads on the first visit. */
export function LoadingPage() {
  return (
    <SiteFrame>
      <Container>
        <div role="status" className="grid min-h-[40vh] place-items-center content-center gap-4">
          <Mark size={72} className="motion-safe:animate-pulse" />
          <p className="font-mono text-[12px] tracking-[.12em] text-muted uppercase">Loading apps…</p>
        </div>
      </Container>
    </SiteFrame>
  )
}
