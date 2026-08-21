import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LocaleProvider } from './i18n/LocaleContext'

const LandingPage = lazy(() => import('./pages/LandingPage'))
const DocsPage = lazy(() => import('./pages/DocsPage'))
const LegalPage = lazy(() => import('./pages/LegalPage'))
const StatusPage = lazy(() => import('./pages/StatusPage'))

export function App() {
  return (
    <LocaleProvider>
      <Suspense fallback={<div className="page-loader" role="status">Loading Growth AI…</div>}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/docs/:slug" element={<DocsPage />} />
          <Route path="/status" element={<StatusPage />} />
          <Route path="/legal/:slug" element={<LegalPage />} />
          <Route path="/:slug" element={<LegalPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </LocaleProvider>
  )
}
