// Copies dist/index.html to every known route (and to 404.html) after `vite build`,
// so links like /apps/medically/privacy load on any static host without rewrite rules.
// Routes come from public/apps.json; an app added later still works through 404.html.
import { copyFileSync, mkdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const index = join(dist, 'index.html')
const catalog = JSON.parse(readFileSync(join(root, 'public', 'apps.json'), 'utf8'))

const routes = ['support', 'privacy']
for (const app of catalog.apps) {
  routes.push(`apps/${app.slug}`, `apps/${app.slug}/privacy`, `apps/${app.slug}/support`)
}

for (const route of routes) {
  const target = join(dist, route, 'index.html')
  mkdirSync(dirname(target), { recursive: true })
  copyFileSync(index, target)
}
copyFileSync(index, join(dist, '404.html'))

console.log(`spa-routes: wrote ${routes.length} route pages and 404.html`)
