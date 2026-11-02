import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Product, ShopConfig } from './types'

export type Line = { id: string; opt?: string; qty: number }
type Ctx = {
  cfg: ShopConfig
  lines: Line[]
  add: (id: string, opt?: string, qty?: number) => void
  set: (id: string, opt: string | undefined, qty: number) => void
  clear: () => void
  count: number
  total: number
  find: (id: string) => Product | undefined
  open: boolean
  setOpen: (v: boolean) => void
  fav: string[]
  toggleFav: (id: string) => void
}
const C = createContext<Ctx | null>(null)
export const useShop = () => { const c = useContext(C); if (!c) throw new Error('useShop вне ShopProvider'); return c }

const load = <T,>(k: string, d: T): T => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) as T : d } catch { return d } }
const save = (k: string, v: unknown) => { try { localStorage.setItem(k, JSON.stringify(v)) } catch { /* приватный режим */ } }

/** Корзина и избранное магазина. Сохраняются в браузере, чтобы не терялись при обновлении страницы. */
export function ShopProvider({ cfg, children }: { cfg: ShopConfig; children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>(() => load(`cart-${cfg.slug}`, []))
  const [fav, setFav] = useState<string[]>(() => load(`fav-${cfg.slug}`, []))
  const [open, setOpen] = useState(false)
  useEffect(() => save(`cart-${cfg.slug}`, lines), [lines, cfg.slug])
  useEffect(() => save(`fav-${cfg.slug}`, fav), [fav, cfg.slug])
  const value = useMemo<Ctx>(() => {
    const find = (id: string) => cfg.products.find(p => p.id === id)
    return {
      cfg, lines, open, setOpen, fav, find,
      add: (id, opt, qty = 1) => setLines(ls => { const i = ls.findIndex(l => l.id === id && l.opt === opt); if (i >= 0) { const n = [...ls]; n[i] = { ...n[i], qty: n[i].qty + qty }; return n } return [...ls, { id, opt, qty }] }),
      set: (id, opt, qty) => setLines(ls => qty <= 0 ? ls.filter(l => !(l.id === id && l.opt === opt)) : ls.map(l => l.id === id && l.opt === opt ? { ...l, qty } : l)),
      clear: () => setLines([]),
      count: lines.reduce((a, l) => a + l.qty, 0),
      total: lines.reduce((a, l) => a + (find(l.id)?.price || 0) * l.qty, 0),
      toggleFav: id => setFav(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]),
    }
  }, [cfg, lines, open, fav])
  return <C.Provider value={value}>{children}</C.Provider>
}

export const rub = (n: number) => n.toLocaleString('ru-RU') + ' ₽'
