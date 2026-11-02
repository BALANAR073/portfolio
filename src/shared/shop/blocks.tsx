import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { Reveal } from '../Reveal'
import { u } from '../img'
import { useShop, rub } from './cart'
import { ProductCard } from './ProductCard'
import { Rail } from '../sliders'
import type { Product } from './types'

/** Сетка товаров по списку id */
export function Picks({ base, ids, title, link = 'Весь каталог' }: { base: string; ids: string[]; title: ReactNode; link?: string }) {
  const { find } = useShop()
  const list = ids.map(find).filter(Boolean)
  return (
    <section className="s-sec">
      <div className="swrap">
        <div className="s-head"><Reveal><h2 className="s-h2" style={{ margin: 0 }}>{title}</h2></Reveal><Link to={`${base}/catalog`}>{link} →</Link></div>
        <div className="pgrid four">{list.map(p => <ProductCard key={p!.id} p={p!} base={base} />)}</div>
      </div>
    </section>
  )
}

/** Плитки категорий с фото */
export function CatTiles({ base, tiles }: { base: string; tiles: { cat: string; img: string; note?: string }[] }) {
  return (
    <div className="tiles">
      {tiles.map((t, i) => (
        <Reveal key={t.cat} delay={i * 0.06}>
          <Link to={`${base}/catalog?cat=${encodeURIComponent(t.cat)}`} className="tile">
            <img src={u(t.img, 700)} alt="" loading="lazy" />
            <span><b>{t.cat}</b>{t.note && <small>{t.note}</small>}</span>
          </Link>
        </Reveal>
      ))}
    </div>
  )
}

/** Страница «Доставка и оплата» на данных магазина */
export function DeliveryPage({ intro, extra }: { intro: string; extra?: [string, string][] }) {
  const { cfg } = useShop()
  return (
    <section className="s-sec info-page">
      <div className="swrap">
        <h1 className="s-h2">Доставка и оплата</h1>
        <p className="info-intro">{intro}</p>
        <div className="info-grid">
          {cfg.delivery.map(d => <div key={d.id} className="info-card"><h3>{d.label}</h3><p className="info-price">{d.price ? rub(d.price) : 'Бесплатно'}</p><p>{d.note}</p></div>)}
        </div>
        <div className="info-faq">
          <div><h3>Бесплатная доставка</h3><p>При заказе от {rub(cfg.freeFrom)} доставка бесплатна для любого способа.</p></div>
          <div><h3>Оплата</h3><p>Картой онлайн, по СБП или при получении — картой или наличными курьеру.</p></div>
          {(extra || []).map(([h, p]) => <div key={h}><h3>{h}</h3><p>{p}</p></div>)}
        </div>
      </div>
    </section>
  )
}

/** Карусель товаров: по списку id, по категории или по фильтру */
export function ProductRail({ base, title, ids, filter, more = 'Смотреть все', moreTo }: { base: string; title: ReactNode; ids?: string[]; filter?: (p: Product) => boolean; more?: string; moreTo?: string }) {
  const { cfg, find } = useShop()
  const list = ids ? ids.map(find).filter((p): p is Product => !!p) : cfg.products.filter(filter || (() => true))
  return (
    <section className="s-sec">
      <div className="swrap">
        <Rail title={title} more={{ label: more, to: moreTo || `${base}/catalog` }} view={[1.6, 2.6, 4]}>
          {list.map(p => <ProductCard key={p.id} p={p} base={base} />)}
        </Rail>
      </div>
    </section>
  )
}

/** Круглые иконки категорий, как «истории» в приложениях */
export function QuickCats({ base, items }: { base: string; items: { cat: string; img: string; label?: string }[] }) {
  return (
    <div className="swrap qc">
      {items.map((t, i) => (
        <Reveal key={t.cat} delay={i * 0.04}>
          <Link to={`${base}/catalog?cat=${encodeURIComponent(t.cat)}`} className="qc-i"><span><img src={u(t.img, 240)} alt="" loading="lazy" /></span><b>{t.label || t.cat}</b></Link>
        </Reveal>
      ))}
    </div>
  )
}

/** Два промо-баннера рядом */
export function PromoPair({ items }: { items: { img: string; title: string; text: string; to: string; btn: string }[] }) {
  return (
    <section className="s-sec">
      <div className="swrap pp2">
        {items.map((b, i) => (
          <Reveal key={b.title} delay={i * 0.08}>
            <Link to={b.to} className="pp2-i"><img src={u(b.img, 900)} alt="" loading="lazy" /><span><b>{b.title}</b><small>{b.text}</small><em>{b.btn} →</em></span></Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
