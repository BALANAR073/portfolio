import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { Reveal } from '../Reveal'
import { u } from '../img'
import { useShop, rub } from './cart'
import { ProductCard } from './ProductCard'

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
