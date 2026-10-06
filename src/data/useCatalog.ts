import { useParams, useRouteLoaderData } from 'react-router'
import type { AppEntry, Catalog } from './types'

export const ROOT_ROUTE_ID = 'root'

export function useCatalog(): Catalog {
  const catalog = useRouteLoaderData(ROOT_ROUTE_ID) as Catalog | undefined
  if (!catalog) throw new Error('useCatalog must be used inside the root route')
  return catalog
}

/** The app named by the :slug route param, or undefined when no app matches. */
export function useAppFromParams(): AppEntry | undefined {
  const { slug } = useParams()
  return useCatalog().apps.find((app) => app.slug === slug)
}
