import { motion } from 'motion/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperT } from 'swiper'
import { A11y, Keyboard } from 'swiper/modules'
import 'swiper/css'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Heart, Minus, Plus, Star, Truck, ShieldCheck, ChevronRight } from 'lucide-react'
import { u } from '../img'
import { useShop, rub } from './cart'
import { useToast } from '../Toast'
import { ProductCard } from './ProductCard'
import { Reviews, word } from './Reviews'

/** Страница товара: галерея, варианты, количество, вкладки, похожие товары. */
export function ProductPage({ base }: { base: string }) {
  const { id } = useParams()
  const { find, add, setOpen, fav, toggleFav, cfg } = useShop()
  const toast = useToast()
  const p = find(id || '')
  const [img, setImg] = useState(0)
  const [sw, setSw] = useState<SwiperT | null>(null)
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
              <Swiper key={p.id} modules={[A11y, Keyboard]} keyboard onSwiper={setSw} onSlideChange={x => setImg(x.activeIndex)} speed={450}>
                {p.imgs.map((x, i) => <SwiperSlide key={x + i}><img src={u(x, 1200)} alt={`${p.name}, фото ${i + 1}`} /></SwiperSlide>)}
              </Swiper>
              {p.badge && <span className="pc-badge">{p.badge}</span>}
              {p.imgs.length > 1 && <div className="pp-dots">{p.imgs.map((_, i) => <i key={i} className={img === i ? 'on' : ''} />)}</div>}
            </div>
            {p.imgs.length > 1 && <div className="pp-thumbs">{p.imgs.map((x, i) => <button key={x + i} type="button" aria-pressed={img === i} onClick={() => sw?.slideTo(i)} aria-label={`Фото ${i + 1}`}><img src={u(x, 200)} alt="" /></button>)}</div>}
          </div>
          <div className="pp-info">
            <p className="pp-cat">{p.cat}</p>
            <h1>{p.name}</h1>
            {p.rating && <a href="#reviews" className="pp-rate" onClick={e => { e.preventDefault(); document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' }) }}><Star size={16} fill="currentColor" /> {p.rating.toFixed(1)} <span>· {p.reviews} {word(p.reviews || 0)}</span></a>}
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
        <Reviews p={p} />
        <h2 className="s-h2">Вам может понравиться</h2>
        <div className="pgrid four">{related.map(r => <ProductCard key={r.id} p={r} base={base} />)}</div>
      </div>
    </section>
  )
}
