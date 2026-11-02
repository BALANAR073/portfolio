import { AnimatePresence, motion } from 'motion/react'
import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react'
import { Check } from 'lucide-react'
import { createPortal } from 'react-dom'

const Ctx = createContext<(msg: string) => void>(() => {})
export const useToast = () => useContext(Ctx)

/** Всплывающее уведомление (провайдер подключён в App.tsx, показывается внутри текущего сайта). Цвета берутся из CSS-переменных сайта: --toast-bg, --toast-fg, --toast-ic */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [msg, setMsg] = useState<string | null>(null)
  const t = useRef<number>(0)
  const show = useCallback((m: string) => {
    setMsg(m)
    window.clearTimeout(t.current)
    t.current = window.setTimeout(() => setMsg(null), 4200)
  }, [])
  return (
    <Ctx.Provider value={show}>
      {children}
      {createPortal(<AnimatePresence>
        {msg && (
          <motion.div
            role="status"
            className="ui-toast"
            initial={{ y: 80, opacity: 0, x: '-50%' }}
            animate={{ y: 0, opacity: 1, x: '-50%' }}
            exit={{ y: 80, opacity: 0, x: '-50%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          >
            <span className="ui-toast-ic"><Check size={16} strokeWidth={3} /></span>
            {msg}
          </motion.div>
        )}
      </AnimatePresence>, document.querySelector('.site') ?? document.body)}
    </Ctx.Provider>
  )
}
