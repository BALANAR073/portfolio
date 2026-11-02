import { useState } from 'react'
import { Star, BadgeCheck } from 'lucide-react'
import { useShop } from './cart'
import type { Product, Review } from './types'

const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
const hash = (s: string) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7)
export const word = (n: number) => (n % 10 === 1 && n % 100 !== 11 ? 'отзыв' : [2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100) ? 'отзыва' : 'отзывов')

/** Отзывы на странице товара: сводка с распределением оценок и сами отзывы.
 *  Сначала идут отзывы об этом товаре, затем добираются общие отзывы магазина. */
export function Reviews({ p }: { p: Product }) {
  const { cfg } = useShop()
  const [all, setAll] = useState(false)
  if (!p.rating || !p.reviews) return null
  const h = hash(p.id)
  const pool = cfg.reviewPool || []
  const list: Review[] = [...(p.feedback || [])]
  for (let i = 0; list.length < 4 && i < pool.length; i++) list.push(pool[(h + i * 3) % pool.length])
  const items = list.map((r, i) => ({
    ...r,
    rating: r.rating ?? (i === 2 && p.rating! < 4.9 ? 4 : 5),
    date: r.date ?? `${1 + ((h >> i) % 27)} ${months[(9 - i - (h % 2) + 12) % 12]}`,
    opt: r.opt ?? (p.options ? `${p.options.label}: ${p.options.values[(h + i) % p.options.values.length]}` : undefined),
  }))
  // Распределение оценок, согласованное со средней
  const r5 = Math.min(0.96, Math.max(0.55, (p.rating - 4) * 0.95))
  const r4 = Math.min(1 - r5, 0.6 * (1 - r5) + 0.04)
  const r3 = (1 - r5 - r4) * 0.55
  const r2 = (1 - r5 - r4 - r3) * 0.5
  const dist = [r5, r4, r3, r2, Math.max(0, 1 - r5 - r4 - r3 - r2)]
  const shown = all ? items : items.slice(0, 3)
  return (
    <section className="rv" id="reviews">
      <h2 className="s-h2">Отзывы <span>{p.reviews}</span></h2>
      <div className="rv-grid">
        <aside className="rv-sum">
          <b>{p.rating.toFixed(1)}</b>
          <span className="rv-stars">{[1, 2, 3, 4, 5].map(k => <Star key={k} size={18} fill={k <= Math.round(p.rating!) ? 'currentColor' : 'none'} />)}</span>
          <small>{p.reviews} {word(p.reviews)}</small>
          <ul>{dist.map((d, i) => <li key={i}><span>{5 - i}</span><i><em style={{ width: `${d * 100}%` }} /></i><span>{Math.round(d * p.reviews!)}</span></li>)}</ul>
          <p>Оставить отзыв могут только покупатели — ссылка приходит после получения заказа.</p>
        </aside>
        <div className="rv-list">
          {shown.map((r, i) => (
            <article key={i} className="rv-i">
              <header><b>{r.name}</b><span>{r.date}</span></header>
              <div className="rv-meta"><span className="rv-stars">{[1, 2, 3, 4, 5].map(k => <Star key={k} size={14} fill={k <= r.rating! ? 'currentColor' : 'none'} />)}</span><span className="rv-ok"><BadgeCheck size={14} /> Покупка подтверждена</span>{r.opt && <span>{r.opt}</span>}</div>
              <p>{r.text}</p>
            </article>
          ))}
          {items.length > 3 && !all && <button type="button" className="sbtn ghost" onClick={() => setAll(true)}>Показать ещё</button>}
        </div>
      </div>
    </section>
  )
}
