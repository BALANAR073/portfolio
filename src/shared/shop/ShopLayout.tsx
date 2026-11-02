import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Heart, Search, ShoppingBag, Menu, X } from 'lucide-react'
import { useShop } from './cart'
import { CartDrawer } from './CartDrawer'
import './shop.css'

type Props = { base: string; logo: ReactNode; announce: string; children: ReactNode; footerNote: string; overlay?: boolean }

/** Каркас магазина: объявление, шапка с корзиной, мобильное меню, подвал. */
export function ShopLayout({ base, logo, announce, children, footerNote, overlay }: Props) {
  const { count, setOpen, fav, cfg } = useShop()
  const [menu, setMenu] = useState(false)
  const [bump, setBump] = useState(false)
  const loc = useLocation()
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => { const on = () => setScrolled(scrollY > 40); on(); addEventListener('scroll', on, { passive: true }); return () => removeEventListener('scroll', on) }, [])
  const over = !!overlay && loc.pathname === base && !scrolled
  useEffect(() => { setMenu(false); setOpen(false) }, [loc.pathname, setOpen])
  useEffect(() => { if (!count) return; setBump(true); const t = setTimeout(() => setBump(false), 450); return () => clearTimeout(t) }, [count])
  const links = [{ to: base, label: 'Главная', end: true }, { to: `${base}/catalog`, label: 'Каталог' }, ...cfg.nav.map(n => ({ to: `${base}/${n.to}`, label: n.label, end: false }))]
  return (
    <div className="shop">
      <div className="announce">{announce}</div>
      <header className={'sh' + (overlay && loc.pathname === base ? ' has-over' : '') + (over ? ' over' : '')}>
        <div className="swrap sh-in">
          <button type="button" className="sh-burger" aria-label="Меню" onClick={() => setMenu(true)}><Menu /></button>
          <Link to={base} className="sh-logo">{logo}</Link>
          <nav className="sh-nav">{links.map(l => <NavLink key={l.to} to={l.to} end={l.end}>{l.label}</NavLink>)}</nav>
          <div className="sh-icons">
            <Link to={`${base}/catalog`} aria-label="Поиск по каталогу"><Search size={21} /></Link>
            <Link to={`${base}/catalog?fav=1`} aria-label={`Избранное: ${fav.length}`} className="sh-ic"><Heart size={21} />{fav.length > 0 && <i>{fav.length}</i>}</Link>
            <button type="button" className={'sh-ic' + (bump ? ' bump' : '')} aria-label={`Корзина: ${count}`} onClick={() => setOpen(true)}><ShoppingBag size={21} />{count > 0 && <i>{count}</i>}</button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {menu && (
          <motion.div className="sm-bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMenu(false)}>
            <motion.nav className="sm" initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', stiffness: 300, damping: 34 }} onClick={e => e.stopPropagation()} aria-label="Меню магазина">
              <button type="button" className="sm-x" aria-label="Закрыть" onClick={() => setMenu(false)}><X /></button>
              {links.map(l => <NavLink key={l.to} to={l.to} end={l.end}>{l.label}</NavLink>)}
              <p>{cfg.phone}<br />{cfg.city}</p>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.main key={loc.pathname} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>{children}</motion.main>
      <footer className="sf">
        <div className="swrap sf-grid">
          <div><Link to={base} className="sh-logo">{logo}</Link><p>{footerNote}</p></div>
          <div><h4>Покупателям</h4><Link to={`${base}/catalog`}>Каталог</Link>{cfg.nav.map(n => <Link key={n.to} to={`${base}/${n.to}`}>{n.label}</Link>)}<Link to={`${base}/checkout`}>Оформление заказа</Link></div>
          <div><h4>Категории</h4>{cfg.cats.slice(0, 5).map(c => <Link key={c} to={`${base}/catalog?cat=${encodeURIComponent(c)}`}>{c}</Link>)}</div>
          <div><h4>Контакты</h4><a href={`tel:${cfg.phone.replace(/[^\d+]/g, '')}`}>{cfg.phone}</a><span>{cfg.address}</span><span>{cfg.hours}</span></div>
        </div>
        <div className="wordmark sf-word" aria-hidden>{cfg.brand}</div>
        <div className="swrap sf-bot"><span>© {cfg.brand}, 2026</span><span>Демо-магазин для портфолио. Товары и компания вымышленные.</span></div>
      </footer>
      <CartDrawer base={base} />
    </div>
  )
}
