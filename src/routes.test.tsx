import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RouterProvider, createMemoryRouter } from 'react-router'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import shippedCatalog from '../public/apps.json?raw'
import { routes } from './routes'

function respondWith(body: string, status = 200) {
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => new Response(body, { status, headers: { 'Content-Type': 'application/json' } })),
  )
}

function renderAt(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  render(<RouterProvider router={router} />)
  return router
}

beforeEach(() => respondWith(shippedCatalog))
afterEach(() => vi.unstubAllGlobals())

describe('home page', () => {
  it('lists every app in the catalog with a link to its page', async () => {
    renderAt('/')
    expect(await screen.findByRole('heading', { level: 1, name: 'Small apps, straight answers.' })).toBeInTheDocument()
    const list = screen.getByRole('heading', { name: 'All apps' }).closest('section')!
    const links = within(list).getAllByRole('link')
    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      '/apps/frible',
      '/apps/medically',
      '/apps/offlineplays',
    ])
    expect(screen.getAllByText('elitegentro@gmail.com').length).toBeGreaterThan(0)
    expect(document.title).toBe('GenarApps · Small apps, straight answers')
  })
})

describe('app page', () => {
  it('shows the app, its screenshots and links to privacy and support', async () => {
    renderAt('/apps/medically')
    expect(await screen.findByRole('heading', { level: 1, name: 'Medically' })).toBeInTheDocument()
    expect(screen.getByRole('list', { name: 'Medically screenshots' }).children).toHaveLength(5)
    expect(screen.getAllByRole('link', { name: 'Privacy policy' })[0]).toHaveAttribute('href', '/apps/medically/privacy')
    expect(screen.getByRole('link', { name: 'Get support' })).toHaveAttribute('href', '/apps/medically/support')
    expect(screen.getByText('English, Spanish')).toBeInTheDocument()
    expect(document.title).toBe('Medically · GenarApps')
  })

  it('shows the not-found panel for an unknown app', async () => {
    renderAt('/apps/does-not-exist')
    expect(await screen.findByRole('heading', { level: 1, name: 'Panel missing' })).toBeInTheDocument()
  })
})

describe('privacy page', () => {
  it('renders every policy section with a table of contents and the contact email', async () => {
    renderAt('/apps/offlineplays/privacy')
    expect(await screen.findByRole('heading', { level: 1, name: 'OfflinePlays privacy policy' })).toBeInTheDocument()
    expect(screen.getByText('October 6, 2026')).toHaveAttribute('datetime', '2026-10-06')
    const toc = screen.getByRole('navigation', { name: 'On this page' })
    expect(within(toc).getByRole('link', { name: 'Playing with nearby devices' })).toHaveAttribute('href', '#nearby-play')
    expect(screen.getByRole('heading', { level: 2, name: 'Playing with nearby devices' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'Contact' })).toBeInTheDocument()
    expect(screen.getByText('elitegentro@gmail.com')).toBeInTheDocument()
  })
})

describe('support pages', () => {
  it('builds a mailto link from the form and asks for a message first', async () => {
    const user = userEvent.setup()
    renderAt('/apps/frible/support')
    expect(await screen.findByRole('heading', { level: 1, name: 'Frible support' })).toBeInTheDocument()

    const copyButton = screen.getByRole('button', { name: 'Copy message' })
    const mailLink = within(copyButton.closest('form')!).getByRole('link', { name: 'Open in mail app' })
    await user.click(copyButton)
    expect(screen.getByText('Write a few words about the problem first.')).toBeInTheDocument()
    expect(screen.getByLabelText('Message')).toHaveFocus()

    await user.type(screen.getByLabelText('Device'), 'iPhone 16')
    await user.type(screen.getByLabelText('Message'), 'The widget is blank')
    expect(screen.queryByText('Write a few words about the problem first.')).not.toBeInTheDocument()

    const href = decodeURIComponent(mailLink.getAttribute('href')!)
    expect(href).toContain('mailto:elitegentro@gmail.com?subject=[Frible] Bug report')
    expect(href).toContain('The widget is blank')
    expect(href).toContain('App: Frible 1.0')
    expect(href).toContain('Device: iPhone 16')
  })

  it('lets the general support page pick an app', async () => {
    const user = userEvent.setup()
    renderAt('/support')
    expect(await screen.findByRole('heading', { level: 1, name: 'Support' })).toBeInTheDocument()
    await user.selectOptions(screen.getByLabelText('App'), 'medically')
    expect(screen.getByLabelText('App version')).toHaveValue('1.0')
    expect(screen.getByText(/Subject: \[Medically\] Bug report/)).toBeInTheDocument()
  })
})

describe('site pages', () => {
  it('renders the website privacy notice', async () => {
    renderAt('/privacy')
    expect(await screen.findByRole('heading', { level: 1, name: 'Website privacy' })).toBeInTheDocument()
  })

  it('renders the not-found page for unknown paths', async () => {
    renderAt('/nope')
    expect(await screen.findByRole('heading', { level: 1, name: 'Panel missing' })).toBeInTheDocument()
  })
})

describe('catalog errors', () => {
  it('names the broken field when apps.json is invalid', async () => {
    respondWith(JSON.stringify({ site: { name: 'x', supportEmail: 'a@b.co', responseTime: 'soon' }, apps: [{}] }))
    renderAt('/')
    expect(await screen.findByRole('heading', { name: 'The app list has a mistake' })).toBeInTheDocument()
    expect(screen.getByText('In public/apps.json: apps[0].slug must be a non-empty string.')).toBeInTheDocument()
  })

  it('explains when apps.json cannot be downloaded', async () => {
    respondWith('Not found', 404)
    renderAt('/')
    expect(await screen.findByText('The app list could not be downloaded (HTTP 404).')).toBeInTheDocument()
  })
})
