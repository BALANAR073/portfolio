import { useEffect, useRef, useState } from 'react'
import { u } from '../shared/img'

/** Живое превью сайта: настоящая страница в уменьшенном iframe (на компьютере).
 *  На телефоне — лёгкая обложка-фото, чтобы не грузить 10 сайтов сразу. */
export function LivePreview({ slug, cover, name }: { slug: string; cover: string; name: string }) {
  const box = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0)
  const [live, setLive] = useState(false)
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    setLive(window.matchMedia('(min-width: 768px)').matches)
    const el = box.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / 1440))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return (
    <div ref={box} className="lp">
      <img src={u(cover, 900)} alt="" loading="lazy" className={loaded ? 'is-hidden' : ''} />
      {live && scale > 0 && (
        <iframe
          title={`Превью сайта «${name}»`}
          src={`#/sites/${slug}?preview=1`}
          loading="lazy"
          tabIndex={-1}
          aria-hidden
          onLoad={() => setTimeout(() => setLoaded(true), 900)}
          style={{ width: 1440, height: 900, transform: `scale(${scale})` }}
        />
      )}
    </div>
  )
}
