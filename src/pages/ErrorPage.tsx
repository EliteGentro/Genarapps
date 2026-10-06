import { isRouteErrorResponse, useRouteError } from 'react-router'
import { Button } from '../components/Button'
import { Container } from '../components/Container'
import { SiteFrame } from '../components/Layout'
import { Panel } from '../components/Panel'
import { CatalogError } from '../data/parseCatalog'
import { usePageMeta } from '../lib/usePageMeta'
import { NotFoundPage } from './NotFoundPage'

function describe(error: unknown): { title: string; detail: string } {
  if (error instanceof CatalogError) {
    return { title: 'The app list has a mistake', detail: `In public/apps.json: ${error.message}.` }
  }
  if (error instanceof Error) return { title: 'Something broke', detail: error.message }
  return { title: 'Something broke', detail: 'An unexpected error stopped this page from loading.' }
}

function ErrorPanel() {
  const error = useRouteError()
  const { title, detail } = describe(error)
  usePageMeta('Error')

  if (isRouteErrorResponse(error) && error.status === 404) return <NotFoundPage />

  return (
    <Container>
      <Panel tone="paper" padding="lg" caption="Error" captionTone="sky" className="grid max-w-3xl gap-5" role="alert">
        <h1 className="font-display text-[clamp(28px,5vw,48px)] leading-none font-normal uppercase">{title}</h1>
        <p className="max-w-[60ch] font-mono text-[14px] leading-relaxed break-words">{detail}</p>
        <Button className="w-fit" onClick={() => window.location.reload()}>
          Reload the page
        </Button>
      </Panel>
    </Container>
  )
}

/** Error boundary for the root route. Keeps the header and footer so the visitor can still find their way. */
export function RootErrorPage() {
  return (
    <SiteFrame>
      <ErrorPanel />
    </SiteFrame>
  )
}

/** Error boundary for a single page inside the layout. */
export function PageErrorPage() {
  return <ErrorPanel />
}
