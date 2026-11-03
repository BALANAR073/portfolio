import type { CSSProperties, ReactNode } from 'react'
import { u } from '../shared/img'

/** Рамка макета с фиксированными пропорциями. Внутри все размеры в cqw — макет масштабируется целиком, как картинка. */
export function Frame({ ratio = '3 / 4', className = '', style, children }: { ratio?: string; className?: string; style?: CSSProperties; children: ReactNode }) {
  return <div className="wf" style={{ aspectRatio: ratio }}><div className={'wf-in ' + className} style={style}>{children}</div></div>
}

/** Фото, заполняющее блок. pos — точка фокуса, как в object-position. */
export function Ph({ id, pos = '50% 50%', w = 1000, className = '', style }: { id: string; pos?: string; w?: number; className?: string; style?: CSSProperties }) {
  return <img className={'wf-ph ' + className} src={u(id, w)} alt="" loading="lazy" decoding="async" style={{ objectPosition: pos, ...style }} />
}

export const worksFonts = 'family=Unbounded:wght@500;700;900&family=Manrope:wght@400;600;800&family=Playfair+Display:ital,wght@0,600;0,800;1,600&family=Oswald:wght@500;700&family=Comfortaa:wght@600;700&family=Caveat:wght@600&family=Lora:ital,wght@0,500;1,500'
