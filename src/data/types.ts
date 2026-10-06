export const ACCENTS = ['mint', 'sky'] as const
export type Accent = (typeof ACCENTS)[number]

export const APP_STATUSES = ['available', 'beta', 'coming-soon'] as const
export type AppStatus = (typeof APP_STATUSES)[number]

export const DEVICES = ['iphone', 'ipad', 'mac', 'apple-watch', 'apple-vision', 'android', 'web'] as const
export type Device = (typeof DEVICES)[number]

export interface PlatformSupport {
  device: Device
  /** Human-readable requirement, e.g. "iOS 17.0 or later". */
  requires: string
}

export interface Screenshot {
  src: string
  alt: string
  caption: string
}

export interface GlanceItem {
  label: string
  value: string
}

export interface PrivacySection {
  /** Used as the in-page anchor, e.g. /apps/medically/privacy#permissions */
  id: string
  title: string
  paragraphs: string[]
  items: string[]
}

export interface PrivacyPolicy {
  /** ISO date, YYYY-MM-DD */
  updated: string
  /** The short version, shown first as bullet points. */
  summary: string[]
  /** Short facts for the "privacy at a glance" panel on the app page. */
  glance: GlanceItem[]
  sections: PrivacySection[]
}

export interface FaqEntry {
  question: string
  answer: string
}

export interface StoreLinks {
  appStore?: string
  googlePlay?: string
  website?: string
}

export interface AppEntry {
  slug: string
  name: string
  tagline: string
  description: string[]
  accent: Accent
  status: AppStatus
  isNew: boolean
  version: string
  category: string
  languages: string[]
  platforms: PlatformSupport[]
  features: string[]
  icon: string
  screenshots: Screenshot[]
  supportEmail: string
  links: StoreLinks
  privacy: PrivacyPolicy
  faq: FaqEntry[]
}

export interface SiteInfo {
  name: string
  supportEmail: string
  /** e.g. "two working days" */
  responseTime: string
}

export interface Catalog {
  site: SiteInfo
  apps: AppEntry[]
}
