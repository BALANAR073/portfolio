import type { AnchorHTMLAttributes, MouseEvent } from 'react'

/** Ссылка на блок внутри страницы. С HashRouter обычный href="#id" сломал бы роутинг. */
export function Jump({ to, onClick, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }) {
  const go = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    document.getElementById(to)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    onClick?.(e)
  }
  return <a href={`#${to}`} onClick={go} {...rest} />
}
