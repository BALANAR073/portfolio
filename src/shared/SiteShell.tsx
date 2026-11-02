import { MotionConfig } from 'motion/react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useEffect, type ReactNode } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import './ui.css'

/** Обёртка демо-сайта: изолирует стили (класс s-<slug>) и даёт кнопку «назад в портфолио» */
export function SiteShell({ slug, children }: { slug: string; children: ReactNode }) {
  const preview = useLocation().search.includes('preview')
  // Плавная инерционная прокрутка (кроме превью и режима «меньше движения»)
  useEffect(() => {
    if (preview || matchMedia('(prefers-reduced-motion: reduce)').matches || (navigator as Navigator & { webdriver?: boolean }).webdriver) return
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    let id = 0
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); lenis.destroy() }
  }, [preview])
  return (
    <MotionConfig reducedMotion="user">
        <div className={`site s-${slug}` + (preview ? ' is-preview' : '')}>
          {children}
          {!preview && <Link to="/" className="ui-back" aria-label="Вернуться в портфолио"><ArrowLeft size={16} /> Портфолио</Link>}
        </div>
    </MotionConfig>
  )
}
