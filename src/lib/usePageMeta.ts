import { useEffect } from 'react'

const SITE_NAME = 'GenarApps'
const DEFAULT_DESCRIPTION = 'Privacy policies, support and screenshots for every GenarApps app.'

/** Sets the document title ("Page · GenarApps") and meta description for the current page. */
export function usePageMeta(title: string | null, description?: string): void {
  useEffect(() => {
    document.title = title ? `${title} · ${SITE_NAME}` : `${SITE_NAME} · Small apps, straight answers`
    document.querySelector('meta[name="description"]')?.setAttribute('content', description ?? DEFAULT_DESCRIPTION)
  }, [title, description])
}
