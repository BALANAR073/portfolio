import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, X } from 'lucide-react'
import { texts, type TextWork } from './texts'
import { WorksShell } from './Shell'
import './texts.css'

function Reader({ t, onClose }: { t: TextWork; onClose: () => void }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', k)
    const o = document.body.style.overflow; document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = o }
  }, [onClose])
  return createPortal(
    <div className="tr" role="dialog" aria-modal="true" aria-label={t.title} onClick={onClose}>
      <article className="tr-doc" onClick={e => e.stopPropagation()}>
        <button type="button" className="tr-x" aria-label="Закрыть" onClick={onClose}><X size={20} /></button>
        <p className="tr-kind">{t.kind} · {t.niche} · {t.size}</p>
        <h2>{t.title}</h2>
        <p className="tr-task"><b>Задача:</b> {t.task}</p>
        <div className="tx">{t.body}</div>
      </article>
    </div>,
    document.body,
  )
}

export default function TextsPage() {
  const [open, setOpen] = useState<TextWork | null>(null)
  return (
    <WorksShell kicker="Тексты" title="Тексты, которые продают и отвечают на вопросы" lead={`${texts.length} примеров: описания для маркетплейсов, SEO-статья, тексты для сайта, контент-план, ответы на отзывы, реклама. Нажмите на карточку, чтобы прочитать целиком.`}>
      <div className="tg">
        {texts.map(t => (
          <button key={t.id} type="button" className="tg-i" onClick={() => setOpen(t)}>
            <span className="tg-k">{t.kind}</span>
            <h3>{t.title}</h3>
            <p className="tg-p">{t.preview}</p>
            <span className="tg-f"><span>{t.niche} · {t.size}</span><ArrowUpRight size={18} /></span>
          </button>
        ))}
      </div>
      {open && <Reader t={open} onClose={() => setOpen(null)} />}
    </WorksShell>
  )
}
