import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal } from 'lucide-react'
import { useShop } from './cart'
import { ProductCard } from './ProductCard'

/** Каталог: категории, поиск, цена, сортировка, избранное. */
export function Catalog({ base, title = 'Каталог' }: { base: string; title?: string }) {
  const { cfg, fav } = useShop()
  const [sp, setSp] = useSearchParams()
  const cat = sp.get('cat') || 'Все'
  const [q, setQ] = useState('')
  const [sort, setSort] = useState('pop')
  const max = Math.max(...cfg.products.map(p => p.price))
  const [price, setPrice] = useState(max)
  const [onlyFav, setOnlyFav] = useState(sp.get('fav') === '1')
  const [sale, setSale] = useState(false)
  const list = useMemo(() => {
    const r = cfg.products.filter(p => (cat === 'Все' || p.cat === cat) && p.price <= price && (!onlyFav || fav.includes(p.id)) && (!sale || p.old) && (p.name + p.short).toLowerCase().includes(q.toLowerCase().trim()))
    if (sort === 'cheap') r.sort((a, b) => a.price - b.price)
    if (sort === 'exp') r.sort((a, b) => b.price - a.price)
    if (sort === 'rate') r.sort((a, b) => (b.rating || 0) - (a.rating || 0))
    return r
  }, [cfg.products, cat, price, onlyFav, sale, q, sort, fav])
  const setCat = (c: string) => { const n = new URLSearchParams(sp); if (c === 'Все') n.delete('cat'); else n.set('cat', c); setSp(n, { replace: true }) }
  return (
    <section className="cat-page">
      <div className="swrap">
        <div className="cat-top">
          <h1>{title}</h1>
          <span className="cat-n">{list.length} {list.length % 10 === 1 && list.length % 100 !== 11 ? 'товар' : list.length % 10 >= 2 && list.length % 10 <= 4 && (list.length % 100 < 10 || list.length % 100 >= 20) ? 'товара' : 'товаров'}</span>
        </div>
        <div className="chips">{['Все', ...cfg.cats].map(c => <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>)}</div>
        <div className="cat-grid">
          <aside className="filters" aria-label="Фильтры">
            <p className="f-title"><SlidersHorizontal size={16} /> Фильтры</p>
            <label className="f-search"><Search size={16} /><input type="search" placeholder="Поиск" value={q} onChange={e => setQ(e.target.value)} aria-label="Поиск по каталогу" /></label>
            <label className="f-range">Цена до <b>{price.toLocaleString('ru-RU')} ₽</b><input type="range" min={0} max={max} step={50} value={price} onChange={e => setPrice(+e.target.value)} /></label>
            <label className="f-check"><input type="checkbox" checked={sale} onChange={e => setSale(e.target.checked)} /> Со скидкой</label>
            <label className="f-check"><input type="checkbox" checked={onlyFav} onChange={e => setOnlyFav(e.target.checked)} /> Избранное ({fav.length})</label>
            <label className="f-sort">Сортировка<select value={sort} onChange={e => setSort(e.target.value)}><option value="pop">По популярности</option><option value="cheap">Сначала дешевле</option><option value="exp">Сначала дороже</option><option value="rate">По рейтингу</option></select></label>
          </aside>
          <div>
            <motion.div layout className="pgrid">
              <AnimatePresence mode="popLayout">{list.map(p => <ProductCard key={p.id} p={p} base={base} />)}</AnimatePresence>
            </motion.div>
            {!list.length && <div className="nothing"><p>Ничего не нашлось. Попробуйте изменить фильтры.</p><button type="button" className="sbtn ghost" onClick={() => { setQ(''); setPrice(max); setSale(false); setOnlyFav(false); setCat('Все') }}>Сбросить фильтры</button></div>}
          </div>
        </div>
      </div>
    </section>
  )
}
