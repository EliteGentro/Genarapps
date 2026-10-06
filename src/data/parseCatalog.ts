import {
  ACCENTS,
  APP_STATUSES,
  DEVICES,
  type AppEntry,
  type Catalog,
  type FaqEntry,
  type GlanceItem,
  type PlatformSupport,
  type PrivacyPolicy,
  type PrivacySection,
  type Screenshot,
  type SiteInfo,
  type StoreLinks,
} from './types'

/** Thrown when apps.json does not match the expected shape. The message names the bad field. */
export class CatalogError extends Error {
  readonly path: string

  constructor(path: string, problem: string) {
    super(`${path} ${problem}`)
    this.name = 'CatalogError'
    this.path = path
  }
}

type Json = Record<string, unknown>

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const ANCHOR = /^[a-z0-9-]+$/

function object(value: unknown, path: string): Json {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new CatalogError(path, 'must be an object')
  }
  return value as Json
}

function string(value: unknown, path: string): string {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new CatalogError(path, 'must be a non-empty string')
  }
  return value
}

function matching(value: unknown, path: string, pattern: RegExp, hint: string): string {
  const text = string(value, path)
  if (!pattern.test(text)) throw new CatalogError(path, `must be ${hint}, got "${text}"`)
  return text
}

function oneOf<T extends string>(value: unknown, path: string, options: readonly T[]): T {
  const text = string(value, path)
  if (!(options as readonly string[]).includes(text)) {
    throw new CatalogError(path, `must be one of ${options.map((o) => `"${o}"`).join(', ')}, got "${text}"`)
  }
  return text as T
}

function list<T>(value: unknown, path: string, read: (item: unknown, path: string) => T): T[] {
  if (!Array.isArray(value)) throw new CatalogError(path, 'must be an array')
  return value.map((item, index) => read(item, `${path}[${index}]`))
}

function optionalList<T>(value: unknown, path: string, read: (item: unknown, path: string) => T): T[] {
  return value === undefined ? [] : list(value, path, read)
}

function optionalUrl(value: unknown, path: string): string | undefined {
  if (value === undefined) return undefined
  return matching(value, path, /^https?:\/\//, 'an http(s) URL')
}

function readSite(value: unknown): SiteInfo {
  const site = object(value, 'site')
  return {
    name: string(site.name, 'site.name'),
    supportEmail: matching(site.supportEmail, 'site.supportEmail', EMAIL, 'an email address'),
    responseTime: string(site.responseTime, 'site.responseTime'),
  }
}

function readPlatform(value: unknown, path: string): PlatformSupport {
  const platform = object(value, path)
  return {
    device: oneOf(platform.device, `${path}.device`, DEVICES),
    requires: string(platform.requires, `${path}.requires`),
  }
}

function readScreenshot(value: unknown, path: string): Screenshot {
  const shot = object(value, path)
  return {
    src: string(shot.src, `${path}.src`),
    alt: string(shot.alt, `${path}.alt`),
    caption: string(shot.caption, `${path}.caption`),
  }
}

function readGlance(value: unknown, path: string): GlanceItem {
  const item = object(value, path)
  return { label: string(item.label, `${path}.label`), value: string(item.value, `${path}.value`) }
}

function readSection(value: unknown, path: string): PrivacySection {
  const section = object(value, path)
  const result: PrivacySection = {
    id: matching(section.id, `${path}.id`, ANCHOR, 'lowercase letters, digits and dashes'),
    title: string(section.title, `${path}.title`),
    paragraphs: optionalList(section.paragraphs, `${path}.paragraphs`, string),
    items: optionalList(section.items, `${path}.items`, string),
  }
  if (result.paragraphs.length === 0 && result.items.length === 0) {
    throw new CatalogError(path, 'needs at least one paragraph or item')
  }
  return result
}

function readPrivacy(value: unknown, path: string): PrivacyPolicy {
  const privacy = object(value, path)
  const sections = list(privacy.sections, `${path}.sections`, readSection)
  const ids = new Set<string>()
  sections.forEach((section, index) => {
    if (ids.has(section.id)) throw new CatalogError(`${path}.sections[${index}].id`, `"${section.id}" is used twice`)
    ids.add(section.id)
  })
  return {
    updated: matching(privacy.updated, `${path}.updated`, ISO_DATE, 'a date like 2026-10-06'),
    summary: list(privacy.summary, `${path}.summary`, string),
    glance: optionalList(privacy.glance, `${path}.glance`, readGlance),
    sections,
  }
}

function readFaq(value: unknown, path: string): FaqEntry {
  const entry = object(value, path)
  return { question: string(entry.question, `${path}.question`), answer: string(entry.answer, `${path}.answer`) }
}

function readLinks(value: unknown, path: string): StoreLinks {
  if (value === undefined) return {}
  const links = object(value, path)
  return {
    appStore: optionalUrl(links.appStore, `${path}.appStore`),
    googlePlay: optionalUrl(links.googlePlay, `${path}.googlePlay`),
    website: optionalUrl(links.website, `${path}.website`),
  }
}

function readApp(value: unknown, path: string, site: SiteInfo): AppEntry {
  const app = object(value, path)
  if (app.isNew !== undefined && typeof app.isNew !== 'boolean') {
    throw new CatalogError(`${path}.isNew`, 'must be true or false')
  }
  return {
    slug: matching(app.slug, `${path}.slug`, SLUG, 'lowercase words joined by dashes, like "drift-timer"'),
    name: string(app.name, `${path}.name`),
    tagline: string(app.tagline, `${path}.tagline`),
    description: list(app.description, `${path}.description`, string),
    accent: oneOf(app.accent, `${path}.accent`, ACCENTS),
    status: oneOf(app.status, `${path}.status`, APP_STATUSES),
    isNew: app.isNew === true,
    version: string(app.version, `${path}.version`),
    category: string(app.category, `${path}.category`),
    languages: optionalList(app.languages, `${path}.languages`, string),
    platforms: list(app.platforms, `${path}.platforms`, readPlatform),
    features: list(app.features, `${path}.features`, string),
    icon: string(app.icon, `${path}.icon`),
    screenshots: optionalList(app.screenshots, `${path}.screenshots`, readScreenshot),
    supportEmail:
      app.supportEmail === undefined
        ? site.supportEmail
        : matching(app.supportEmail, `${path}.supportEmail`, EMAIL, 'an email address'),
    links: readLinks(app.links, `${path}.links`),
    privacy: readPrivacy(app.privacy, `${path}.privacy`),
    faq: optionalList(app.faq, `${path}.faq`, readFaq),
  }
}

/** Validates the raw contents of apps.json and fills in defaults. */
export function parseCatalog(value: unknown): Catalog {
  const root = object(value, 'apps.json')
  const site = readSite(root.site)
  const apps = list(root.apps, 'apps', (item, path) => readApp(item, path, site))

  const slugs = new Set<string>()
  apps.forEach((app, index) => {
    if (slugs.has(app.slug)) throw new CatalogError(`apps[${index}].slug`, `"${app.slug}" is used by another app`)
    slugs.add(app.slug)
  })

  return { site, apps }
}
