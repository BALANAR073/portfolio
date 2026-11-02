import { AnimatePresence, motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { Minus, Plus, X, ShoppingBag } from 'lucide-react'
import { u } from '../img'
import { useShop, rub } from './cart'

export function CartDrawer({ base }: { base: string }) {
  const { lines, find, set, total, open, setOpen, cfg } = useShop()
  const left = cfg.freeFrom - total
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="cd-bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
          <motion.aside className="cd" role="dialog" aria-label="Корзина" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 300, damping: 34 }} onClick={e => e.stopPropagation()}>
            <div className="cd-head"><h3>Корзина</h3><button type="button" onClick={() => setOpen(false)} aria-label="Закрыть"><X /></button></div>
            {lines.length === 0 ? (
              <div className="cd-empty"><ShoppingBag size={40} /><p>В корзине пока пусто</p><Link to={`${base}/catalog`} className="sbtn" onClick={() => setOpen(false)}>Перейти в каталог</Link></div>
            ) : (
              <>
                <div className="cd-free">
                  {left > 0 ? <>До бесплатной доставки — <b>{rub(left)}</b></> : <b>Доставка бесплатно 🎉</b>}
                  <i><motion.span animate={{ width: `${Math.min(100, (total / cfg.freeFrom) * 100)}%` }} /></i>
                </div>
                <div className="cd-list">
                  <AnimatePresence initial={false}>
                    {lines.map(l => { const p = find(l.id); if (!p) return null; return (
                      <motion.div layout key={l.id + (l.opt || '')} className="cd-line" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30, height: 0 }}>
                        <img src={u(p.imgs[0], 160)} alt="" />
                        <div><Link to={`${base}/p/${p.id}`} onClick={() => setOpen(false)}>{p.name}</Link>{l.opt && <small>{p.options?.label}: {l.opt}</small>}<b>{rub(p.price * l.qty)}</b></div>
                        <div className="qty"><button type="button" aria-label="Меньше" onClick={() => set(l.id, l.opt, l.qty - 1)}><Minus size={14} /></button><span>{l.qty}</span><button type="button" aria-label="Больше" onClick={() => set(l.id, l.opt, l.qty + 1)}><Plus size={14} /></button></div>
                      </motion.div>
                    ) })}
                  </AnimatePresence>
                </div>
                <div className="cd-foot"><div><span>Итого</span><b>{rub(total)}</b></div><Link to={`${base}/checkout`} className="sbtn full" onClick={() => setOpen(false)}>Оформить заказ</Link></div>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
