import { AnimatePresence, motion } from 'motion/react'
import { useId, useState } from 'react'

/** Аккордеон «вопрос — ответ» с плавным раскрытием. Стили задаёт сайт: .acc, .acc-item, .acc-q, .acc-ic, .acc-a */
export function Accordion({ items, first = true }: { items: string[][]; first?: boolean }) {
  const [open, setOpen] = useState<number | null>(first ? 0 : null)
  const id = useId()
  return (
    <div className="acc">
      {items.map(([q, a], i) => {
        const on = open === i
        return (
          <div key={q} className={'acc-item' + (on ? ' is-open' : '')}>
            <button type="button" className="acc-q" aria-expanded={on} aria-controls={`${id}-${i}`} onClick={() => setOpen(on ? null : i)}>
              <span>{q}</span><i className="acc-ic" aria-hidden />
            </button>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div id={`${id}-${i}`} key="a" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }} style={{ overflow: 'hidden' }}>
                  <p className="acc-a">{a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
