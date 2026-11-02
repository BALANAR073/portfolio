import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Heart, Minus, Plus, Star, Truck, ShieldCheck, ChevronRight } from 'lucide-react'
import { u } from '../img'
import { useShop, rub } from './cart'
import { useToast } from '../Toast'
import { ProductCard } from './ProductCard'

/** Страница товара: галерея, варианты, количество, вкладки, похожие товары. */
export function ProductPage({ base }: { base: string }) {
  const { id } = useParams()
  const { find, add, setOpen, fav, toggleFav, cfg } = useShop()
  const toast = useToast()
  const p = find(id || '')
  const [img, setImg] = useState(0)
  const [opt, setOpt] = useState<string | undefined>()
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState<'desc' | 'specs' | 'delivery'>('desc')
  useEffect(() => { setImg(0); setOpt(p?.options?.values[0]); setQty(1); window.scrollTo(0, 0) }, [id, p])
  if (!p) return <section className="swrap pp-404"><h1>Товар не найден</h1><Link to={`${base}/catalog`} className="sbtn">В каталог</Link></section>
  const related = cfg.products.filter(x => x.cat === p.cat && x.id !== p.id).concat(cfg.products.filter(x => x.cat !== p.cat)).slice(0, 4)
  const buy = () => { add(p.id, opt, qty); toast(`Добавлено в корзину: ${p.name}${opt ? ` (${opt})` : ''}${qty > 1 ? ` × ${qty}` : ''}`); setTimeout(() => setOpen(true), 300) }
  const liked = fav.includes(p.id)
  return (
    <section className="pp">
      <div className="swrap">
        <nav className="crumbs" aria-label="Навигация"><Link to={base}>Главная</Link><ChevronRight size={14} /><Link to={`${base}/catalog`}>Каталог</Link><ChevronRight size={14} /><Link to={`${base}/catalog?cat=${encodeURIComponent(p.cat)}`}>{p.cat}</Link></nav>
        <div className="pp-grid">
          <div className="pp-gal">
            <div className="pp-main">
              <AnimatePresence mode="wait"><motion.img key={img} src={u(p.imgs[img], 1200)} alt={p.name} initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} /></AnimatePresence>
              {p.badge && <span className="pc-badge">{p.badge}</span>}
            </div>
            {p.imgs.length > 1 && <div className="pp-thumbs">{p.imgs.map((x, i) => <button key={x + i} type="button" aria-pressed={img === i} onClick={() => setImg(i)} aria-label={`Фото ${i + 1}`}><img src={u(x, 200)} alt="" /></button>)}</div>}
          </div>
          <div className="pp-info">
            <p className="pp-cat">{p.cat}</p>
            <h1>{p.name}</h1>
            {p.rating && <p className="pp-rate"><Star size={16} fill="currentColor" /> {p.rating.toFixed(1)} <span>· {p.reviews} отзывов</span></p>}
            <p className="pp-short">{p.short}</p>
            <p className="pp-price">{rub(p.price)}{p.old && <s>{rub(p.old)}</s>}</p>
            {p.options && <div className="pp-opt"><span>{p.options.label}</span><div>{p.options.values.map(v => <button key={v} type="button" aria-pressed={opt === v} onClick={() => setOpt(v)}>{v}</button>)}</div></div>}
            <div className="pp-buy">
              <div className="qty big"><button type="button" aria-label="Меньше" onClick={() => setQty(Math.max(1, qty - 1))}><Minus size={16} /></button><span>{qty}</span><button type="button" aria-label="Больше" onClick={() => setQty(qty + 1)}><Plus size={16} /></button></div>
              <button type="button" className="sbtn grow" onClick={buy}>В корзину · {rub(p.price * qty)}</button>
              <button type="button" className={'pp-fav' + (liked ? ' on' : '')} aria-pressed={liked} aria-label="В избранное" onClick={() => toggleFav(p.id)}><Heart size={20} fill={liked ? 'currentColor' : 'none'} /></button>
            </div>
            <ul className="pp-perks"><li><Truck size={18} /> Доставка по {cfg.city} — сегодня или завтра. Бесплатно от {rub(cfg.freeFrom)}</li><li><ShieldCheck size={18} /> {cfg.guarantee || 'Оплата при получении или онлайн. Обмен и возврат 14 дней'}</li></ul>
            <div className="pp-tabs" role="tablist">
              {([['desc', 'Описание'], ['specs', 'Характеристики'], ['delivery', 'Доставка']] as const).map(([k, l]) => <button key={k} role="tab" type="button" aria-selected={tab === k} onClick={() => setTab(k)}>{l}{tab === k && <motion.i layoutId={`tab-${cfg.slug}`} />}</button>)}
            </div>
            <div className="pp-tab">
              {tab === 'desc' && <p>{p.desc}</p>}
              {tab === 'specs' && <dl>{(p.specs || []).map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>}
              {tab === 'delivery' && <dl>{cfg.delivery.map(d => <div key={d.id}><dt>{d.label}</dt><dd>{d.price ? rub(d.price) : 'бесплатно'} · {d.note}</dd></div>)}</dl>}
            </div>
          </div>
        </div>
        <h2 className="s-h2">Вам может понравиться</h2>
        <div className="pgrid four">{related.map(r => <ProductCard key={r.id} p={r} base={base} />)}</div>
      </div>
    </section>
  )
}
