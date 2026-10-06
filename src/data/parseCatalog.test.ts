import { describe, expect, it } from 'vitest'
import shippedCatalog from '../../public/apps.json?raw'
import { CatalogError, parseCatalog } from './parseCatalog'

function validApp(overrides: Record<string, unknown> = {}) {
  return {
    slug: 'drift-timer',
    name: 'Drift Timer',
    tagline: 'A focus timer.',
    description: ['Paragraph.'],
    accent: 'sky',
    status: 'available',
    version: '2.0.1',
    category: 'Productivity',
    platforms: [{ device: 'iphone', requires: 'iOS 17.0 or later' }],
    features: ['Timers'],
    icon: '/apps/drift-timer/icon.png',
    privacy: {
      updated: '2026-09-14',
      summary: ['Nothing collected.'],
      sections: [{ id: 'collected', title: 'Data collected', paragraphs: ['None.'] }],
    },
    ...overrides,
  }
}

function catalog(apps: unknown[]) {
  return { site: { name: 'GenarApps', supportEmail: 'help@example.com', responseTime: 'a few days' }, apps }
}

function errorFor(value: unknown): string {
  try {
    parseCatalog(value)
  } catch (error) {
    expect(error).toBeInstanceOf(CatalogError)
    return (error as Error).message
  }
  throw new Error('expected parseCatalog to throw')
}

describe('parseCatalog', () => {
  it('accepts the apps.json that ships with the site', () => {
    const result = parseCatalog(JSON.parse(shippedCatalog))
    expect(result.apps.map((app) => app.slug)).toEqual(['frible', 'medically', 'offlineplays'])
    for (const app of result.apps) {
      expect(app.supportEmail).toBe('elitegentro@gmail.com')
      expect(app.privacy.sections.length).toBeGreaterThan(3)
      expect(app.screenshots.length).toBeGreaterThan(0)
      expect(app.icon).toBe(`/apps/${app.slug}/icon.png`)
    }
  })

  it('fills in defaults for optional fields', () => {
    const [app] = parseCatalog(catalog([validApp()])).apps
    expect(app.isNew).toBe(false)
    expect(app.screenshots).toEqual([])
    expect(app.faq).toEqual([])
    expect(app.languages).toEqual([])
    expect(app.links).toEqual({})
    expect(app.supportEmail).toBe('help@example.com')
    expect(app.privacy.sections[0].items).toEqual([])
  })

  it('names the field that is wrong', () => {
    expect(errorFor(catalog([validApp({ accent: 'red' })]))).toBe(
      'apps[0].accent must be one of "mint", "sky", got "red"',
    )
    expect(errorFor(catalog([validApp({ name: '' })]))).toBe('apps[0].name must be a non-empty string')
    expect(errorFor(catalog([validApp({ slug: 'Drift Timer' })]))).toMatch(/^apps\[0\]\.slug must be lowercase words/)
    expect(errorFor({ apps: [] })).toBe('site must be an object')
  })

  it('rejects bad dates, links and empty privacy sections', () => {
    const privacy = validApp().privacy
    expect(errorFor(catalog([validApp({ privacy: { ...privacy, updated: '14/09/2026' } })]))).toMatch(
      /^apps\[0\]\.privacy\.updated must be a date/,
    )
    expect(errorFor(catalog([validApp({ links: { appStore: 'apps.apple.com/app' } })]))).toMatch(
      /^apps\[0\]\.links\.appStore must be an http\(s\) URL/,
    )
    expect(
      errorFor(catalog([validApp({ privacy: { ...privacy, sections: [{ id: 'empty', title: 'Empty' }] } })])),
    ).toBe('apps[0].privacy.sections[0] needs at least one paragraph or item')
  })

  it('rejects duplicate slugs and section ids', () => {
    expect(errorFor(catalog([validApp(), validApp()]))).toBe('apps[1].slug "drift-timer" is used by another app')
    const privacy = validApp().privacy
    const twice = { ...privacy, sections: [...privacy.sections, ...privacy.sections] }
    expect(errorFor(catalog([validApp({ privacy: twice })]))).toBe(
      'apps[0].privacy.sections[1].id "collected" is used twice',
    )
  })
})
