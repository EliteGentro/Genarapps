import type { RouteObject } from 'react-router'
import { Layout } from './components/Layout'
import { loadCatalog } from './data/loadCatalog'
import { ROOT_ROUTE_ID } from './data/useCatalog'
import { AppPage } from './pages/AppPage'
import { AppSupportPage } from './pages/AppSupportPage'
import { PageErrorPage, RootErrorPage } from './pages/ErrorPage'
import { HomePage } from './pages/HomePage'
import { LoadingPage } from './pages/LoadingPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { SitePrivacyPage } from './pages/SitePrivacyPage'
import { SupportPage } from './pages/SupportPage'

export const routes: RouteObject[] = [
  {
    id: ROOT_ROUTE_ID,
    path: '/',
    loader: loadCatalog,
    element: <Layout />,
    errorElement: <RootErrorPage />,
    hydrateFallbackElement: <LoadingPage />,
    children: [
      {
        errorElement: <PageErrorPage />,
        children: [
          { index: true, element: <HomePage /> },
          { path: 'apps/:slug', element: <AppPage /> },
          { path: 'apps/:slug/privacy', element: <PrivacyPage /> },
          { path: 'apps/:slug/support', element: <AppSupportPage /> },
          { path: 'support', element: <SupportPage /> },
          { path: 'privacy', element: <SitePrivacyPage /> },
          { path: '*', element: <NotFoundPage /> },
        ],
      },
    ],
  },
]
