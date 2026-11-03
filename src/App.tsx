import { Suspense, lazy, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { sites } from './sites/registry'
import { ToastProvider } from './shared/Toast'

const Home = lazy(() => import('./home/Home'))
const Brief = lazy(() => import('./home/Brief'))
const CardsPage = lazy(() => import('./works/CardsPage'))
const SocialPage = lazy(() => import('./works/SocialPage'))
const TextsPage = lazy(() => import('./works/TextsPage'))

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function Loader() {
  return <div className="fixed inset-0 grid place-items-center bg-white"><div className="h-9 w-9 animate-spin rounded-full border-4 border-neutral-200 border-t-neutral-900" /></div>
}

export default function App() {
  return (
    <ToastProvider>
      <ScrollTop />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/brief" element={<Brief />} />
          <Route path="/works/cards" element={<CardsPage />} />
          <Route path="/works/social" element={<SocialPage />} />
          <Route path="/works/texts" element={<TextsPage />} />
          <Route path="/works" element={<Navigate to="/works/cards" replace />} />
          {sites.map(s => <Route key={s.slug} path={`/sites/${s.slug}/*`} element={<s.page />} />)}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </ToastProvider>
  )
}
