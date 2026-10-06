import type { AppStatus, Device } from '../data/types'

const DATE_FORMAT = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
})

/** "2026-10-06" → "October 6, 2026" */
export function formatDate(isoDate: string): string {
  return DATE_FORMAT.format(new Date(`${isoDate}T00:00:00Z`))
}

export const DEVICE_LABELS: Record<Device, string> = {
  iphone: 'iPhone',
  ipad: 'iPad',
  mac: 'Mac',
  'apple-watch': 'Apple Watch',
  'apple-vision': 'Apple Vision Pro',
  android: 'Android',
  web: 'Web',
}

export const STATUS_LABELS: Record<AppStatus, string> = {
  available: 'Available',
  beta: 'Beta',
  'coming-soon': 'Coming soon',
}

/** "01", "02", … for screenshot and issue numbers. */
export function twoDigits(value: number): string {
  return String(value).padStart(2, '0')
}
