import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ArrowLeft, Check, Copy, Send } from 'lucide-react'
import { contacts } from './contacts'
import './home.css'

/** Анкета-бриф для клиента: собирает ответы в одно сообщение, которое клиент копирует и отправляет в Telegram. */

const types = [
  ['landing', 'Лендинг', 'одна страница, от 8 000 ₽'],
  ['bizcard', 'Сайт-визитка', 'несколько страниц, от 20 000 ₽'],
  ['shop', 'Интернет-магазин', 'каталог и корзина, от 50 000 ₽'],
  ['unknown', 'Пока не знаю', 'подскажу, что подойдёт'],
] as const
const goals = ['Получать заявки', 'Записывать клиентов', 'Продавать товары', 'Показать работы', 'Заменить старый сайт']
const sectionsBy: Record<string, string[]> = {
  common: ['Услуги и цены', 'О компании', 'Портфолио / галерея', 'Отзывы', 'Команда', 'Вопросы и ответы', 'Контакты и карта'],
  extra: ['Форма заявки', 'Онлайн-запись', 'Калькулятор стоимости', 'Квиз', 'Каталог товаров', 'Корзина и оплата', 'Доставка'],
}
const materials = ['Логотип', 'Тексты', 'Фотографии', 'Фирменные цвета', 'Домен', 'Ничего из этого']
const styles = ['Светлый и спокойный', 'Тёмный и премиальный', 'Яркий и смелый', 'Строгий деловой', 'На ваш вкус']
const terms = ['Срочно, до недели', '2–3 недели', 'Месяц и больше', 'Не горит']
const budgets = ['До 10 000 ₽', '10–25 000 ₽', '25–50 000 ₽', 'От 50 000 ₽', 'Пока не знаю']

type State = {
  name: string; business: string; city: string; type: string; goals: string[]; sections: string[]
  materials: string[]; examples: string; style: string; term: string; budget: string; contact: string; comment: string
}
const empty: State = { name: '', business: '', city: '', type: '', goals: [], sections: [], materials: [], examples: '', style: '', term: '', budget: '', contact: '', comment: '' }
const KEY = 'brief-draft'

function load(): State {
  try { const s = localStorage.getItem(KEY); if (s) return { ...empty, ...JSON.parse(s) } } catch { /* хранилище недоступно */ }
  return empty
}

function Chips({ items, value, onPick, multi }: { items: readonly string[]; value: string | string[]; onPick: (v: string) => void; multi?: boolean }) {
  return (
    <div className="flex flex-wrap gap-2" role={multi ? 'group' : 'radiogroup'}>
      {items.map(it => {
        const on = Array.isArray(value) ? value.includes(it) : value === it
        return (
          <button key={it} type="button" role={multi ? 'checkbox' : 'radio'} aria-checked={on} onClick={() => onPick(it)} className={'chip inline-flex items-center gap-1.5 ' + (on ? 'chip-on' : '')}>
            {multi && on && <Check size={15} strokeWidth={3} />}{it}
          </button>
        )
      })}
    </div>
  )
}

function Q({ n, title, hint, children }: { n: number; title: string; hint?: string; children: ReactNode }) {
  return (
    <fieldset className="brief-q">
      <legend className="flex items-baseline gap-3 text-[20px] font-extrabold leading-tight"><span className="text-accent">{String(n).padStart(2, '0')}</span>{title}</legend>
      {hint && <p className="mt-1.5 text-[15px] text-mute">{hint}</p>}
      <div className="mt-4">{children}</div>
    </fieldset>
  )
}

export default function Brief() {
  const [params] = useSearchParams()
  const [s, setS] = useState<State>(() => {
    const st = load(); const t = params.get('type')
    const found = types.find(x => x[0] === t)
    return found && !st.type ? { ...st, type: found[1] } : st
  })
  const [done, setDone] = useState(false)
  const [copied, setCopied] = useState(false)
  const [err, setErr] = useState('')

  useEffect(() => { document.title = 'Бриф на сайт — Дмитрий' }, [])
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(s)) } catch { /* хранилище недоступно */ } }, [s])

  const set = <K extends keyof State>(k: K, v: State[K]) => setS(p => ({ ...p, [k]: v }))
  const toggle = (k: 'goals' | 'sections' | 'materials', v: string) => setS(p => ({ ...p, [k]: p[k].includes(v) ? p[k].filter(x => x !== v) : [...p[k], v] }))

  const text = useMemo(() => {
    const line = (k: string, v: string | string[]) => { const x = Array.isArray(v) ? v.join(', ') : v.trim(); return x ? `${k}: ${x}` : '' }
    return [
      'Здравствуйте, Дмитрий! Заполнил(а) бриф на сайт.',
      '',
      line('Имя', s.name), line('Бизнес', s.business), line('Город', s.city), line('Тип сайта', s.type),
      line('Задача сайта', s.goals), line('Разделы и функции', s.sections), line('Есть материалы', s.materials),
      line('Примеры сайтов', s.examples), line('Стиль', s.style), line('Сроки', s.term), line('Бюджет', s.budget),
      line('Контакт', s.contact), line('Комментарий', s.comment),
    ].filter((l, i) => l || i === 1).join('\n')
  }, [s])

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!s.business.trim()) { setErr('Расскажите хотя бы в паре слов, чем занимаетесь — это главный вопрос.'); document.getElementById('f-business')?.focus(); return }
    setErr(''); setDone(true)
    requestAnimationFrame(() => document.getElementById('brief-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  async function copy() {
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2500) }
    catch { const el = document.getElementById('brief-text') as HTMLTextAreaElement | null; el?.select() }
  }

  const all = [...sectionsBy.common, ...sectionsBy.extra]

  return (
    <div className="home min-h-screen bg-paper">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex h-[68px] max-w-[880px] items-center justify-between gap-4 px-5">
          <a href="#/" className="inline-flex items-center gap-2 text-[15px] font-semibold text-mute hover:text-ink"><ArrowLeft size={18} /> Портфолио</a>
          <a href={contacts.telegramUrl} target="_blank" rel="noopener" className="inline-flex items-center gap-2 text-[15px] font-semibold"><Send size={16} /> {contacts.telegram}</a>
        </div>
      </header>

      <main className="mx-auto max-w-[880px] px-5 pb-24 pt-12">
        <p className="text-[15px] font-semibold uppercase tracking-[.08em] text-accent">Бриф на сайт</p>
        <h1 className="mt-3 text-[clamp(34px,6vw,56px)] font-black leading-[1.02] tracking-[-0.03em]">Расскажите о проекте — назову цену и срок</h1>
        <p className="mt-4 max-w-[600px] text-[18px] leading-relaxed text-mute">5 минут. Обязателен только первый вопрос, остальное — если знаете. Ответы соберутся в одно сообщение, которое останется отправить мне в Telegram.</p>

        <form onSubmit={submit} className="mt-10 grid gap-5" noValidate>
          <Q n={1} title="Чем вы занимаетесь?" hint="Например: «барбершоп в центре Казани» или «продаю свечи ручной работы».">
            <textarea id="f-business" rows={2} className="brief-in" value={s.business} onChange={e => set('business', e.target.value)} aria-invalid={!!err} />
            {err && <p className="mt-2 text-[15px] font-semibold text-[#C2410C]">{err}</p>}
          </Q>
          <Q n={2} title="Как к вам обращаться и где вы находитесь?">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="grid gap-1.5 text-[14px] font-semibold text-mute">Имя<input className="brief-in" value={s.name} onChange={e => set('name', e.target.value)} autoComplete="given-name" /></label>
              <label className="grid gap-1.5 text-[14px] font-semibold text-mute">Город<input className="brief-in" value={s.city} onChange={e => set('city', e.target.value)} autoComplete="address-level2" /></label>
            </div>
          </Q>
          <Q n={3} title="Какой сайт нужен?">
            <div className="grid gap-2 sm:grid-cols-2" role="radiogroup">
              {types.map(([id, t, d]) => {
                const on = s.type === t
                return (
                  <button key={id} type="button" role="radio" aria-checked={on} onClick={() => set('type', on ? '' : t)} className={'brief-card ' + (on ? 'brief-card-on' : '')}>
                    <b className="block text-[17px]">{t}</b><span className="text-[14px] opacity-75">{d}</span>
                  </button>
                )
              })}
            </div>
          </Q>
          <Q n={4} title="Что сайт должен делать?" hint="Можно выбрать несколько.">
            <Chips multi items={goals} value={s.goals} onPick={v => toggle('goals', v)} />
          </Q>
          <Q n={5} title="Какие разделы и функции нужны?" hint="Если не уверены — пропустите, предложу структуру сам.">
            <Chips multi items={all} value={s.sections} onPick={v => toggle('sections', v)} />
          </Q>
          <Q n={6} title="Что уже есть?">
            <Chips multi items={materials} value={s.materials} onPick={v => toggle('materials', v)} />
          </Q>
          <Q n={7} title="Сайты, которые нравятся" hint="Ссылки на конкурентов или любые сайты, и что в них нравится. Можно работы из моего портфолио.">
            <textarea rows={3} className="brief-in" value={s.examples} onChange={e => set('examples', e.target.value)} />
          </Q>
          <Q n={8} title="Какой стиль ближе?">
            <Chips items={styles} value={s.style} onPick={v => set('style', s.style === v ? '' : v)} />
          </Q>
          <Q n={9} title="Сроки и бюджет">
            <p className="mb-2 text-[14px] font-semibold text-mute">Когда нужен сайт</p>
            <Chips items={terms} value={s.term} onPick={v => set('term', s.term === v ? '' : v)} />
            <p className="mb-2 mt-5 text-[14px] font-semibold text-mute">Бюджет</p>
            <Chips items={budgets} value={s.budget} onPick={v => set('budget', s.budget === v ? '' : v)} />
          </Q>
          <Q n={10} title="Что ещё важно знать?">
            <textarea rows={3} className="brief-in" value={s.comment} onChange={e => set('comment', e.target.value)} placeholder="Любые пожелания, вопросы, идеи" />
            <label className="mt-4 grid gap-1.5 text-[14px] font-semibold text-mute">Ваш Telegram или телефон<input className="brief-in" value={s.contact} onChange={e => set('contact', e.target.value)} placeholder="@username" /></label>
          </Q>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button type="submit" className="btn-accent">Собрать сообщение</button>
            <button type="button" className="text-[15px] font-semibold text-mute underline-offset-4 hover:text-ink hover:underline" onClick={() => { setS(empty); setDone(false) }}>Очистить</button>
          </div>
        </form>

        {done && (
          <section id="brief-result" className="mt-12 scroll-mt-6 rounded-[28px] bg-ink p-6 text-white sm:p-10">
            <h2 className="text-[clamp(26px,4vw,36px)] font-black leading-tight tracking-[-0.02em]">Готово! Осталось отправить</h2>
            <ol className="mt-4 grid gap-1.5 text-[16px] text-white/75">
              <li>1. Скопируйте сообщение кнопкой ниже.</li>
              <li>2. Откройте чат со мной в Telegram и вставьте его.</li>
            </ol>
            <textarea id="brief-text" readOnly value={text} rows={Math.min(16, text.split('\n').length + 1)} className="mt-6 w-full resize-none rounded-2xl bg-white/[.07] p-4 font-mono text-[14px] leading-relaxed text-white/90 ring-1 ring-white/10" />
            <div className="mt-5 flex flex-wrap gap-3">
              <button type="button" onClick={copy} className="btn-accent">{copied ? <><Check size={18} /> Скопировано</> : <><Copy size={18} /> Скопировать</>}</button>
              <a href={contacts.telegramUrl} target="_blank" rel="noopener" className="btn-line !border-white/20 !bg-transparent !text-white hover:!border-white"><Send size={18} /> Открыть Telegram {contacts.telegram}</a>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
