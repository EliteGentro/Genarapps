import { parseCatalog } from './parseCatalog'
import type { Catalog } from './types'

export const CATALOG_URL = `${import.meta.env.BASE_URL}apps.json`

/** Thrown when apps.json cannot be downloaded or is not valid JSON. */
export class CatalogFetchError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CatalogFetchError'
  }
}

/** Route loader: downloads public/apps.json and validates it. */
export async function loadCatalog(): Promise<Catalog> {
  let response: Response
  try {
    response = await fetch(CATALOG_URL, { headers: { Accept: 'application/json' } })
  } catch {
    throw new CatalogFetchError('The app list could not be downloaded. Check your connection and try again.')
  }
  if (!response.ok) {
    throw new CatalogFetchError(`The app list could not be downloaded (HTTP ${response.status}).`)
  }

  let json: unknown
  try {
    json = await response.json()
  } catch {
    throw new CatalogFetchError('apps.json is not valid JSON. Check for a missing comma or quote.')
  }
  return parseCatalog(json)
}
