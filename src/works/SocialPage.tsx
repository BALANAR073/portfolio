import { useState } from 'react'
import { social, type Social } from './social'
import { WorksShell, Viewer } from './Shell'
import './cards.css'
import './social.css'

const groups: { kinds: Social['kind'][]; title: string; lead: string; cls: string }[] = [
  { kinds: ['post'], title: 'Посты 4:5', lead: 'Для ВКонтакте, Telegram и Instagram. Акции, анонсы, экспертные карусели.', cls: 'sg-post' },
  { kinds: ['story'], title: 'Сторис 9:16', lead: 'Важное — в центре кадра, чтобы не перекрывали кнопки и подписи.', cls: 'sg-story' },
  { kinds: ['banner', 'cover'], title: 'Баннеры и обложки', lead: 'Первый экран сайта, реклама во ВКонтакте, обложка сообщества.', cls: 'sg-banner' },
]

export default function SocialPage() {
  const [view, setView] = useState<{ list: Social[]; i: number } | null>(null)
  return (
    <WorksShell kicker="Соцсети и баннеры" title="Посты, сторис и баннеры для бизнеса" lead={`${social.length} макетов для компаний из портфолио — у каждой свой фирменный стиль. Делаю по брендбуку клиента или собираю стиль с нуля.`}>
      {groups.map(g => {
        const list = social.filter(s => g.kinds.includes(s.kind))
        return (
          <section key={g.title} className="cs">
            <h2 className="text-[clamp(26px,3.4vw,38px)] font-extrabold tracking-[-0.02em]">{g.title}</h2>
            <p className="mt-2 max-w-[640px] text-[16px] text-mute">{g.lead}</p>
            <div className={'sg ' + g.cls}>
              {list.map((s, i) => (
                <figure key={s.id} className="sg-i">
                  <button type="button" className="cs-sl" onClick={() => setView({ list, i })} aria-label={`${s.niche}: ${s.title} — открыть крупно`}>{s.node}</button>
                  <figcaption><b>{s.niche}</b> · {s.title}<span>{s.note}</span></figcaption>
                </figure>
              ))}
            </div>
          </section>
        )
      })}
      {view && <Viewer items={view.list.map(s => s.node)} start={view.i} ar={view.list.map(s => s.ar)} onClose={() => setView(null)} />}
    </WorksShell>
  )
}
