# GenarApps

The website for GenarApps apps: a catalog with one page per app, plus each app's privacy policy and support page. It is frontend only (React, TypeScript, Tailwind CSS v4, Vite). All app content comes from one JSON file.

```bash
npm install
npm run dev      # local server
npm run check    # typecheck, lint and tests
npm run build    # production build in dist/
```

## Pages

| Path | Page |
| --- | --- |
| `/` | Catalog of every app |
| `/apps/<slug>` | App page: icon, screenshots, features, privacy summary, support |
| `/apps/<slug>/privacy` | Full privacy policy. Use this as the **Privacy Policy URL** in App Store Connect and Google Play. |
| `/apps/<slug>/support` | Support page with a message builder. Use this as the **Support URL**. |
| `/support` | Support for all apps |
| `/privacy` | Privacy notice for the website itself |

The site can't send email. The support form builds a message that the visitor copies or opens in their own mail app.

## Adding or editing an app

Everything lives in [`public/apps.json`](public/apps.json). The file is checked when the site loads. If a field is wrong, the page shows which one (for example `apps[1].accent must be one of "mint", "sky"`), and `npm test` fails too.

```jsonc
{
  "site": { "name": "GenarApps", "supportEmail": "elitegentro@gmail.com", "responseTime": "a few days" },
  "apps": [
    {
      "slug": "medically",                 // lowercase-with-dashes, used in every URL
      "name": "Medically",
      "tagline": "One sentence.",
      "description": ["Paragraph", "Paragraph"],
      "accent": "sky",                     // "mint" | "sky"
      "status": "coming-soon",             // "available" | "beta" | "coming-soon"
      "isNew": false,                      // optional: shows the NEW sticker
      "version": "1.0",
      "category": "Medical",
      "languages": ["English", "Spanish"], // optional
      "platforms": [{ "device": "iphone", "requires": "iOS 17.0 or later" }],
      "features": ["…"],
      "icon": "/apps/medically/icon.png",
      "screenshots": [{ "src": "/apps/medically/screenshots/01.png", "caption": "Lab results", "alt": "…" }],
      "supportEmail": "…",                 // optional: defaults to site.supportEmail
      "links": { "appStore": "https://…", "googlePlay": "https://…", "website": "https://…" }, // all optional
      "privacy": {
        "updated": "2026-10-06",
        "summary": ["Short bullet points shown first"],
        "glance": [{ "label": "Data collected", "value": "None" }],
        "sections": [{ "id": "permissions", "title": "Permissions", "paragraphs": ["…"], "items": ["…"] }]
      },
      "faq": [{ "question": "…", "answer": "…" }] // optional
    }
  ]
}
```

`device` is one of `iphone`, `ipad`, `mac`, `apple-watch`, `apple-vision`, `android`, `web`. Each privacy section's `id` becomes a link anchor, like `/apps/medically/privacy#permissions`.

When an app goes live, set `"status": "available"` and add its store link under `links`.

## Images

Each app has a folder named after its slug:

```
public/apps/<slug>/
  icon.png              1024 × 1024 PNG, square, no rounded corners or transparency needed
  screenshots/
    01.png              portrait phone screenshots, e.g. 1290 × 2796 (PNG or JPG)
    02.png
```

Until a file exists, the site shows a placeholder in the brand colors: a lettered tile for the icon and a halftone panel with the caption for each screenshot. Drop the files in with the names listed in `apps.json` and they appear. No code changes are needed. Up to 10 screenshots per app, the same limit as the App Store.

## Hosting and deploys

The site is on Firebase Hosting at https://genarapp.web.app (site `genarapp`, project `genarapps-ce63a`). GitHub Actions deploys it:

- **Push to `main`:** runs `npm run check` (typecheck, lint, tests) and `npm run build`, then deploys to the live site. If any step fails, nothing is deployed. You can also start a deploy by hand from the Actions tab.
- **Pull request:** runs the same checks and build, then posts a link to a temporary preview of the site in the PR. Pull requests from forks get the checks but no preview.

CI uses the Node version in `.nvmrc`. Deploys sign in with the `FIREBASE_SERVICE_ACCOUNT_GENARAPPS_CE63A` repository secret.

Cache rules in `firebase.json`: hashed files in `/assets/` are cached for a year. Everything else, including pages and `apps.json`, uses `no-cache`, so the browser checks for a newer copy and changes show up right after a deploy.

`npm run build` also copies `index.html` into a folder for every page (`dist/apps/medically/privacy/index.html`, and so on) and to `dist/404.html`. Direct links therefore work on any static host, including GitHub Pages, Netlify, Cloudflare Pages, Vercel and S3, without rewrite rules. If you add an app, rebuild so its pages get their own copies. Until then they are served through `404.html`.

## Brand

Colors, type, shapes and voice are documented in [`docs/brand-guidelines.md`](docs/brand-guidelines.md). The tokens live in `src/index.css`.
