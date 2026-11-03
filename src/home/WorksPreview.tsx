import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { cardSets, cardCount } from '../works/cards'
import { social } from '../works/social'
import { texts } from '../works/texts'
import { worksFonts } from '../works/Frame'
import '../works/cards.css'
import '../works/social.css'

export type WorkKind = 'cards' | 'social' | 'texts'
export const worksCount: Record<WorkKind, number> = { cards: cardCount, social: social.length, texts: texts.length }

/** Подгружает шрифты макетов, пока открыт превью-блок. */
function useWorksFonts() {
  useEffect(() => {
    if (document.getElementById('works-fonts')) return
    const l = document.createElement('link')
    l.id = 'works-fonts'; l.rel = 'stylesheet'; l.href = `https://fonts.googleapis.com/css2?${worksFonts}&display=swap`
    document.head.appendChild(l)
  }, [])
}

const fade = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 } }

export function WorksPreview({ kind }: { kind: WorkKind }) {
  useWorksFonts()
  const more = { cards: `Все карточки — ${cardCount} слайдов`, social: `Все макеты — ${social.length}`, texts: `Все тексты — ${texts.length}` }[kind]
  return (
    <motion.div key={kind} {...fade} transition={{ duration: 0.4 }} className="mt-10">
      {kind === 'cards' && (
        <div className="wp-grid wp-4">
          {cardSets.slice(0, 4).map(s => (
            <Link key={s.id} to={`/works/cards#set-${s.id}`} className="wp-i">{s.slides[0]}<span className="wp-cap"><b>{s.title}</b>{s.niche} · {s.slides.length} слайда</span></Link>
          ))}
        </div>
      )}
      {kind === 'social' && (
        <div className="wp-grid wp-4">
          {social.filter(s => s.kind === 'post').slice(0, 4).map(s => (
            <Link key={s.id} to="/works/social" className="wp-i">{s.node}<span className="wp-cap"><b>{s.niche}</b>{s.title}</span></Link>
          ))}
        </div>
      )}
      {kind === 'texts' && (
        <div className="wp-grid wp-3">
          {texts.slice(0, 6).map(t => (
            <Link key={t.id} to="/works/texts" className="wp-t">
              <span className="wp-k">{t.kind}</span>
              <b>{t.title}</b>
              <p>{t.preview}</p>
            </Link>
          ))}
        </div>
      )}
      <Link to={`/works/${kind}`} className="btn-dark mt-8">{more} <ArrowUpRight size={18} /></Link>
    </motion.div>
  )
}
