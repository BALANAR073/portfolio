import { useEffect, useState, type ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { ArrowLeft, ChevronLeft, ChevronRight, Send, X } from 'lucide-react'
import { contacts } from '../home/contacts'
import { useSiteMeta } from '../shared/hooks'
import { worksFonts } from './Frame'
import '../home/home.css'
import './works.css'

const tabs = [
  ['/works/cards', 'Карточки товаров'],
  ['/works/social', 'Соцсети и баннеры'],
  ['/works/texts', 'Тексты'],
] as const

/** Общая оболочка страниц с дизайном и текстами. */
export function WorksShell({ title, lead, kicker, children }: { title: string; lead: string; kicker: string; children: ReactNode }) {
  useSiteMeta({ title: `${kicker} — Дмитрий`, color: '#0F1720', letter: 'Д', fonts: worksFonts })
  return (
    <div className="home works min-h-screen">
      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-[64px] max-w-[1240px] items-center justify-between gap-4 px-5">
          <a href="#/" className="inline-flex items-center gap-2 text-[15px] font-semibold text-mute hover:text-ink"><ArrowLeft size={18} /> <span>Все работы</span></a>
          <a href={contacts.telegramUrl} target="_blank" rel="noopener" className="btn-dark !py-2.5 !px-4 text-[15px]"><Send size={16} /> <span className="hidden sm:inline">Заказать</span></a>
        </div>
        <nav className="works-tabs mx-auto max-w-[1240px] px-5" aria-label="Разделы">
          {tabs.map(([to, t]) => <NavLink key={to} to={to} className={({ isActive }) => 'wt' + (isActive ? ' wt-on' : '')}>{t}</NavLink>)}
        </nav>
      </header>
      <main className="mx-auto max-w-[1240px] px-5 pb-24 pt-12">
        <p className="text-[14px] font-bold uppercase tracking-[.14em] text-accent">{kicker}</p>
        <h1 className="mt-3 max-w-[900px] text-[clamp(34px,6vw,64px)] font-black leading-[1] tracking-[-0.035em]">{title}</h1>
        <p className="mt-5 max-w-[680px] text-[18px] leading-relaxed text-mute">{lead}</p>
        {children}
      </main>
      <section className="px-5 pb-20">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-6 rounded-[32px] bg-ink px-6 py-10 text-white sm:px-10">
          <div>
            <h2 className="text-[clamp(26px,4vw,40px)] font-black leading-tight tracking-[-0.02em]">Нужно так же для вас?</h2>
            <p className="mt-2 max-w-[520px] text-[17px] text-white/65">Пришлите задачу и материалы в Telegram — отвечу с ценой и сроком в течение пары часов.</p>
          </div>
          <a href={contacts.telegramUrl} target="_blank" rel="noopener" className="btn-accent"><Send size={18} /> {contacts.telegram}</a>
        </div>
      </section>
    </div>
  )
}

/** Полноэкранный просмотр макетов со стрелками и свайпом. */
export function Viewer({ items, start, onClose, ar = 0.75 }: { items: ReactNode[]; start: number; onClose: () => void; ar?: number | number[] }) {
  const [i, setI] = useState(start)
  const n = items.length
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); if (e.key === 'ArrowRight') setI(v => (v + 1) % n); if (e.key === 'ArrowLeft') setI(v => (v - 1 + n) % n) }
    window.addEventListener('keydown', k)
    const o = document.body.style.overflow; document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = o }
  }, [n, onClose])
  const [x0, setX0] = useState<number | null>(null)
  return createPortal(
    <div className="wv" role="dialog" aria-modal="true" aria-label="Просмотр" onClick={onClose}>
      <button type="button" className="wv-x" aria-label="Закрыть" onClick={onClose}><X /></button>
      <div className="wv-stage" style={{ ['--ar' as string]: Array.isArray(ar) ? ar[i] : ar }} onClick={e => e.stopPropagation()}
        onTouchStart={e => setX0(e.touches[0].clientX)}
        onTouchEnd={e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) setI(v => (v + (dx < 0 ? 1 : -1) + n) % n); setX0(null) }}>
        {items[i]}
      </div>
      {n > 1 && <>
        <button type="button" className="wv-a wv-l" aria-label="Назад" onClick={e => { e.stopPropagation(); setI((i - 1 + n) % n) }}><ChevronLeft /></button>
        <button type="button" className="wv-a wv-r" aria-label="Вперёд" onClick={e => { e.stopPropagation(); setI((i + 1) % n) }}><ChevronRight /></button>
        <p className="wv-n">{i + 1} / {n}</p>
      </>}
    </div>,
    document.body,
  )
}
