import { MotionConfig } from 'motion/react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import type { ReactNode } from 'react'
import './ui.css'

/** Обёртка демо-сайта: изолирует стили (класс s-<slug>) и даёт кнопку «назад в портфолио» */
export function SiteShell({ slug, children }: { slug: string; children: ReactNode }) {
  const preview = useLocation().search.includes('preview')
  return (
    <MotionConfig reducedMotion="user">
        <div className={`site s-${slug}` + (preview ? ' is-preview' : '')}>
          {children}
          {!preview && <Link to="/" className="ui-back" aria-label="Вернуться в портфолио"><ArrowLeft size={16} /> Портфолио</Link>}
        </div>
    </MotionConfig>
  )
}
