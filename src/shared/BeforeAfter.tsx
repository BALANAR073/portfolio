import { useRef, useState, type PointerEvent, type KeyboardEvent, type ReactNode } from 'react'

/** Слайдер «до / после»: тяните разделитель мышью, пальцем или стрелками на клавиатуре. */
export function BeforeAfter({ before, after, afterNode, labels = ['До', 'После'] }: { before: string; after: string | null; afterNode?: ReactNode; labels?: [string, string] }) {
  const [pos, setPos] = useState(50)
  const box = useRef<HTMLDivElement>(null)
  const drag = useRef(false)
  const move = (x: number) => {
    const r = box.current?.getBoundingClientRect()
    if (r) setPos(Math.min(100, Math.max(0, ((x - r.left) / r.width) * 100)))
  }
  const down = (e: PointerEvent) => { drag.current = true; (e.target as Element).setPointerCapture?.(e.pointerId); move(e.clientX) }
  const key = (e: KeyboardEvent) => { if (e.key === 'ArrowLeft') setPos(p => Math.max(0, p - 5)); if (e.key === 'ArrowRight') setPos(p => Math.min(100, p + 5)) }
  return (
    <div className="ba" ref={box} onPointerDown={down} onPointerMove={e => drag.current && move(e.clientX)} onPointerUp={() => (drag.current = false)} style={{ touchAction: 'pan-y' }}>
      {afterNode ? <div className="ba-node">{afterNode}</div> : <img src={after ?? ''} alt={labels[1]} draggable={false} />}
      <div className="ba-before" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}><img src={before} alt={labels[0]} draggable={false} /></div>
      <span className="ba-l">{labels[0]}</span><span className="ba-r">{labels[1]}</span>
      <div className="ba-handle" style={{ left: `${pos}%` }} role="slider" tabIndex={0} aria-label="Сравнение до и после" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pos)} onKeyDown={key}>
        <i />
      </div>
    </div>
  )
}
