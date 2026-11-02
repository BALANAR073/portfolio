import './ui.css'

/** Бегущая строка с фразами бренда */
export function Marquee({ items, className = '', speed = 38 }: { items: string[]; className?: string; speed?: number }) {
  const row = items.map((t, i) => <span key={i}>{t}<i aria-hidden>✦</i></span>)
  return (
    <div className={'mq ' + className} aria-label={items.join(', ')}>
      <div style={{ animationDuration: `${speed}s` }} aria-hidden>{row}{row}{row}{row}</div>
    </div>
  )
}
