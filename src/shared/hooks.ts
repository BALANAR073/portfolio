import { useEffect, useState } from 'react'

/** true, когда страница прокручена дальше offset пикселей */
export function useScrolled(offset = 10) {
  const [s, set] = useState(false)
  useEffect(() => {
    const on = () => set(window.scrollY > offset)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [offset])
  return s
}

/** Заголовок вкладки, иконка и шрифты Google для конкретного сайта */
export function useSiteMeta(opts: { title: string; color: string; letter: string; fonts?: string }) {
  const { title, color, letter, fonts } = opts
  useEffect(() => {
    const prevTitle = document.title
    document.title = title
    const icon = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
    const prevIcon = icon?.href
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='16' fill='${color}'/><text x='32' y='44' font-family='Arial,sans-serif' font-size='34' font-weight='700' text-anchor='middle' fill='#fff'>${letter}</text></svg>`
    if (icon) icon.href = 'data:image/svg+xml,' + encodeURIComponent(svg)
    let link: HTMLLinkElement | null = null
    if (fonts) {
      link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = `https://fonts.googleapis.com/css2?${fonts}&display=swap`
      document.head.appendChild(link)
    }
    return () => {
      document.title = prevTitle
      if (icon && prevIcon) icon.href = prevIcon
      link?.remove()
    }
  }, [title, color, letter, fonts])
}
