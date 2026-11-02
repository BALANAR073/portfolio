import { animate, useInView } from 'motion/react'
import { useEffect, useRef } from 'react'

/** Число, которое «набегает» при появлении на экране. */
export function CountUp({ to, decimals = 0, suffix = '', duration = 1.6 }: { to: number; decimals?: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const fmt = (v: number) => v.toLocaleString('ru-RU', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix
  useEffect(() => {
    if (!inView || !ref.current) return
    const c = animate(0, to, { duration, ease: [0.2, 0.7, 0.2, 1], onUpdate: v => { if (ref.current) ref.current.textContent = fmt(v) } })
    return () => c.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, to])
  return <span ref={ref}>{fmt(to)}</span>
}
