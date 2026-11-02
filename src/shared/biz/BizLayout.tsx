import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Phone, MapPin, Clock } from 'lucide-react'
import { useScrolled } from '../hooks'
import './biz.css'

export type BizInfo = { phone: string; address: string; hours: string; about: string }
type Props = { base: string; logo: ReactNode; links: { to: string; label: string }[]; cta: { label: string; to: string }; info: BizInfo; children: ReactNode }

/** Каркас многостраничного сайта-визитки: шапка с разделами, мобильное меню, переходы страниц, подвал. */
export function BizLayout({ base, logo, links, cta, info, children }: Props) {
  const [menu, setMenu] = useState(false)
  const loc = useLocation()
  const scrolled = useScrolled(20)
  useEffect(() => { setMenu(false); window.scrollTo(0, 0) }, [loc.pathname])
  useEffect(() => { document.body.style.overflow = menu ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [menu])
  const all = [{ to: '', label: 'Главная' }, ...links]
  const href = (to: string) => (to ? `${base}/${to}` : base)
  return (
    <div className="biz">
      <header className={'bh' + (scrolled ? ' is-scrolled' : '')}>
        <div className="bwrap bh-in">
          <Link to={base} className="bh-logo">{logo}</Link>
          <nav className="bh-nav">{all.map(l => <NavLink key={l.to} to={href(l.to)} end={!l.to}>{l.label}</NavLink>)}</nav>
          <a className="bh-phone" href={`tel:${info.phone.replace(/[^\d+]/g, '')}`}>{info.phone}</a>
          <Link to={href(cta.to)} className="bbtn bh-cta">{cta.label}</Link>
          <button type="button" className="bh-burger" aria-label="Открыть меню" aria-expanded={menu} onClick={() => setMenu(true)}><Menu /></button>
        </div>
      </header>
      <AnimatePresence>
        {menu && (
          <motion.div className="bm" role="dialog" aria-label="Меню" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button type="button" className="bm-x" aria-label="Закрыть меню" onClick={() => setMenu(false)}><X size={28} /></button>
            <nav>{all.map((l, i) => <motion.div key={l.to} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.05 }}><NavLink to={href(l.to)} end={!l.to}>{l.label}</NavLink></motion.div>)}</nav>
            <div className="bm-foot"><a href={`tel:${info.phone.replace(/[^\d+]/g, '')}`}>{info.phone}</a><Link to={href(cta.to)} className="bbtn">{cta.label}</Link></div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.main key={loc.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>{children}</motion.main>
      <footer className="bf">
        <div className="bwrap bf-grid">
          <div><div className="bf-logo">{logo}</div><p>{info.about}</p></div>
          <div><h4>Разделы</h4>{all.map(l => <Link key={l.to} to={href(l.to)}>{l.label}</Link>)}</div>
          <div><h4>Контакты</h4><p><Phone size={16} /> {info.phone}</p><p><MapPin size={16} /> {info.address}</p><p><Clock size={16} /> {info.hours}</p></div>
        </div>
        <div className="bwrap bf-bottom"><span>© {new Date().getFullYear()}</span><span>Демо-сайт для портфолио. Компания вымышленная.</span></div>
      </footer>
    </div>
  )
}
