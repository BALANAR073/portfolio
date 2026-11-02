import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Jump } from './Jump'

type Link = { to: string; label: string }

/** Кнопка-бургер и полноэкранное меню для телефонов. Цвета: --mnav-bg, --mnav-fg */
export function MobileMenu({ links, extra }: { links: Link[]; extra?: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const btn = useRef<HTMLButtonElement>(null)
  // Меню рендерим в корень сайта: у шапки может быть backdrop-filter, который ломает position: fixed
  const root = (btn.current?.closest('.site') as HTMLElement | null) ?? (typeof document !== 'undefined' ? document.body : null)
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', esc)
    return () => { window.removeEventListener('keydown', esc); document.body.style.overflow = '' }
  }, [open])
  return (
    <>
      <button
        ref={btn}
        type="button"
        className={'ui-burger' + (open ? ' is-open' : '')}
        aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span />
      </button>
      {root && createPortal(<AnimatePresence>
        {open && (
          <motion.div
            role="navigation"
            className="ui-mnav"
            aria-label="Мобильное меню"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.45, ease: [0.7, 0, 0.2, 1] }}
          >
            {links.map((l, i) => (
              <motion.div key={l.to} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.05 }}>
                <Jump to={l.to} onClick={() => setOpen(false)}>{l.label}</Jump>
              </motion.div>
            ))}
            {extra && <div className="ui-mnav-extra" onClick={() => setOpen(false)}>{extra}</div>}
          </motion.div>
        )}
      </AnimatePresence>, root)}
    </>
  )
}
