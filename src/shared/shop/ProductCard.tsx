import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { Heart, Plus, Star } from 'lucide-react'
import { u } from '../img'
import { useShop, rub } from './cart'
import { useToast } from '../Toast'
import type { Product } from './types'

/** Карточка товара: второе фото при наведении, избранное, быстрая покупка. */
export function ProductCard({ p, base }: { p: Product; base: string }) {
  const { add, fav, toggleFav, setOpen } = useShop()
  const toast = useToast()
  const liked = fav.includes(p.id)
  const quick = () => {
    add(p.id, p.options?.values[0])
    toast(`«${p.name}» в корзине`)
    setTimeout(() => setOpen(true), 250)
  }
  return (
    <motion.article layout className="pc" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.4 }}>
      <Link to={`${base}/p/${p.id}`} className="pc-img" aria-label={p.name}>
        <img src={u(p.imgs[0], 600)} alt={p.name} loading="lazy" />
        {p.imgs[1] && <img className="pc-img2" src={u(p.imgs[1], 600)} alt="" loading="lazy" />}
        {(p.badge || p.old) && <span className="pc-badge">{p.old ? `−${Math.round((1 - p.price / p.old) * 100)}%` : p.badge}</span>}
      </Link>
      <button type="button" className={'pc-fav' + (liked ? ' on' : '')} aria-pressed={liked} aria-label={liked ? 'Убрать из избранного' : 'В избранное'} onClick={() => toggleFav(p.id)}><Heart size={18} fill={liked ? 'currentColor' : 'none'} /></button>
      <div className="pc-body">
        <Link to={`${base}/p/${p.id}`} className="pc-name">{p.name}</Link>
        <p className="pc-short">{p.short}</p>
        {p.rating && <p className="pc-rate"><Star size={13} fill="currentColor" /> {p.rating.toFixed(1)} <span>· {p.reviews} отзывов</span></p>}
        <div className="pc-foot">
          <span className="pc-price">{rub(p.price)}{p.old && <s>{rub(p.old)}</s>}</span>
          <button type="button" className="pc-add" onClick={quick} aria-label={`Добавить «${p.name}» в корзину`}><Plus size={18} /></button>
        </div>
      </div>
    </motion.article>
  )
}
