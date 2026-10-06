import type { ReactNode } from 'react'
import { Link, NavLink, Outlet, ScrollRestoration, useLocation } from 'react-router'
import { cx } from '../lib/cx'
import { Container } from './Container'
import { Mark } from './Mark'
import { ThemeToggle } from './ThemeToggle'
import { Wordmark } from './Wordmark'

const NAV = [
  { to: '/', label: 'Apps', end: true },
  { to: '/support', label: 'Support', end: false },
]

function navClasses(isActive: boolean) {
  return cx(
    'inline-flex min-h-9 items-center border-3 px-2.5 pt-1 pb-[3px] text-[15px] font-bold no-underline',
    isActive ? 'surface-fill border-line bg-mint text-ink shadow-chip' : 'border-transparent text-ink hover:border-line',
  )
}

function SiteHeader() {
  const { pathname } = useLocation()
  // App pages live under /apps/, so they keep "Apps" highlighted.
  const isActive = (to: string, active: boolean) => active || (to === '/' && pathname.startsWith('/apps/'))

  return (
    <header className="border-b-3 border-line bg-paper">
      <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-4">
        <Link to="/" className="inline-flex items-center gap-3 no-underline">
          <Mark size={40} />
          <Wordmark size="sm" />
        </Link>
        <div className="flex flex-wrap items-center gap-4">
          <nav aria-label="Main">
            <ul className="flex items-center gap-2">
              {NAV.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} end={item.end} className={({ isActive: active }) => navClasses(isActive(item.to, active))}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </Container>
    </header>
  )
}

function SiteFooter() {
  return (
    <footer className="mt-20 border-t-3 border-line bg-paper">
      <Container className="grid gap-8 py-10 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="grid content-start gap-3">
          <Link to="/" className="inline-flex w-fit items-center gap-3 no-underline">
            <Mark size={32} />
            <Wordmark size="sm" />
          </Link>
          <p className="max-w-[46ch] text-muted">
            Small apps made by one independent developer. They run on your device and don&apos;t collect your data.
          </p>
        </div>
        <nav aria-label="Footer" className="grid content-start gap-2 sm:justify-self-end">
          <p className="font-mono text-[11px] font-medium tracking-[.12em] text-muted uppercase">Site</p>
          <ul className="grid gap-1.5">
            <li>
              <Link to="/" className="font-semibold text-link underline underline-offset-[3px] hover:no-underline">
                All apps
              </Link>
            </li>
            <li>
              <Link to="/support" className="font-semibold text-link underline underline-offset-[3px] hover:no-underline">
                Support
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="font-semibold text-link underline underline-offset-[3px] hover:no-underline">
                Website privacy
              </Link>
            </li>
          </ul>
        </nav>
        <p className="font-mono text-[12px] text-muted sm:col-span-2">© {new Date().getFullYear()} GenarApps</p>
      </Container>
    </footer>
  )
}

/** Header, footer and skip link shared by every page. */
export function SiteFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="surface-fill sr-only z-50 border-3 border-line bg-mint px-3 py-2 font-bold text-ink focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="flex-1 pt-8 pb-4 outline-none sm:pt-10">
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}

/** Root layout route. */
export function Layout() {
  return (
    <SiteFrame>
      <Outlet />
      <ScrollRestoration />
    </SiteFrame>
  )
}
