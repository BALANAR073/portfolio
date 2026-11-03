import { useEffect, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { Maximize2 } from 'lucide-react'
import { BeforeAfter } from '../shared/BeforeAfter'
import { u } from '../shared/img'
import { cardSets, cardCount } from './cards'
import { WorksShell, Viewer } from './Shell'
import './cards.css'

export default function CardsPage() {
  const [view, setView] = useState<{ items: ReactNode[]; i: number } | null>(null)
  const { hash } = useLocation()
  useEffect(() => {
    if (!hash) return
    const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 350)
    return () => clearTimeout(t)
  }, [hash])
  return (
    <WorksShell kicker="Карточки для маркетплейсов" title="Инфографика для Wildberries и Ozon" lead={`${cardSets.length} товаров, ${cardCount} слайдов. Каждый набор в своём стиле под нишу: обложка, которая выделяется в выдаче, и слайды, которые отвечают на вопросы покупателя до того, как он их задаст.`}>
      <div className="mt-10 flex flex-wrap gap-2">
        {cardSets.map(s => <a key={s.id} href={`#/works/cards`} onClick={e => { e.preventDefault(); document.getElementById('set-' + s.id)?.scrollIntoView({ behavior: 'smooth' }) }} className="chip">{s.title}</a>)}
      </div>

      {cardSets.map((s, k) => (
        <section key={s.id} id={'set-' + s.id} className="cs scroll-mt-32">
          <div className="cs-head">
            <div className="min-w-0">
              <p className="text-[14px] font-semibold text-mute">{s.niche} · {s.market} · {s.slides.length} {s.slides.length > 4 ? 'слайдов' : 'слайда'}</p>
              <h2 className="mt-1 text-[clamp(26px,3.4vw,38px)] font-extrabold leading-tight tracking-[-0.02em]">{s.title}</h2>
              <p className="mt-3 max-w-[640px] text-[16px] leading-relaxed text-mute">{s.task}</p>
            </div>
            {k < 2 && (
              <div className="cs-ba">
                <BeforeAfter before={u(s.raw, 700)} after={null} afterNode={s.slides[0]} labels={['Фото от клиента', 'Карточка']} />
              </div>
            )}
          </div>
          <div className="cs-row">
            {s.slides.map((sl, i) => (
              <button key={i} type="button" className="cs-sl" onClick={() => setView({ items: s.slides, i })} aria-label={`${s.title}, слайд ${i + 1} — открыть крупно`}>
                {sl}
                <span className="cs-zoom"><Maximize2 size={16} /></span>
              </button>
            ))}
          </div>
        </section>
      ))}
      {view && <Viewer items={view.items} start={view.i} onClose={() => setView(null)} />}
    </WorksShell>
  )
}
