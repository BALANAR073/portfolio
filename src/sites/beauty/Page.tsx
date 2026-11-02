import { motion, AnimatePresence } from 'motion/react'
import { useMemo, useState, type FormEvent } from 'react'
import { Check, ChevronLeft } from 'lucide-react'
import { SiteShell } from '../../shared/SiteShell'
import { Reveal } from '../../shared/Reveal'
import { Jump } from '../../shared/Jump'
import { MobileMenu } from '../../shared/MobileMenu'
import { MobileCTA } from '../../shared/MobileCTA'
import { PhoneInput } from '../../shared/PhoneInput'
import { Stars } from '../../shared/Stars'
import { useScrolled, useSiteMeta } from '../../shared/hooks'
import { u } from '../../shared/img'
import './style.css'

const nav = [{ to: 'services', label: 'Услуги' }, { to: 'works', label: 'Работы' }, { to: 'masters', label: 'Мастера' }, { to: 'book', label: 'Запись' }]
type Svc = { n: string; t: string; p: string; m: string }
const groups: { g: string; items: Svc[] }[] = [
  { g: 'Ногти', items: [{ n: 'Маникюр с покрытием', t: '1 ч 30 мин', p: '2 800 ₽', m: 'А' }, { n: 'Педикюр с покрытием', t: '1 ч 45 мин', p: '3 500 ₽', m: 'А' }, { n: 'Наращивание', t: '2 ч 30 мин', p: 'от 4 200 ₽', m: 'А' }, { n: 'Японский маникюр', t: '1 ч', p: '2 200 ₽', m: 'А' }] },
  { g: 'Волосы', items: [{ n: 'Женская стрижка', t: '1 ч', p: 'от 3 000 ₽', m: 'В' }, { n: 'Окрашивание в один тон', t: '2 ч', p: 'от 5 500 ₽', m: 'В' }, { n: 'Сложное окрашивание', t: '4–5 ч', p: 'от 12 000 ₽', m: 'В' }, { n: 'Укладка', t: '45 мин', p: '2 000 ₽', m: 'В' }] },
  { g: 'Брови и уход', items: [{ n: 'Архитектура бровей', t: '45 мин', p: '1 800 ₽', m: 'Д' }, { n: 'Ламинирование ресниц', t: '1 ч', p: '2 900 ₽', m: 'Д' }, { n: 'Уходовая чистка лица', t: '1 ч 30 мин', p: '4 500 ₽', m: 'М' }, { n: 'Массаж лица', t: '40 мин', p: '3 000 ₽', m: 'М' }] },
]
const masters: Record<string, { n: string; r: string; photo: string; y: string }> = {
  А: { n: 'Алина', r: 'Маникюр, дизайн ногтей', photo: '1534528741775-53994a69daeb', y: '7 лет' },
  В: { n: 'Вероника', r: 'Колорист, сложное окрашивание', photo: '1531746020798-e6953c6e8e04', y: '9 лет' },
  Д: { n: 'Дарья', r: 'Брови, ресницы', photo: '1544005313-94ddf0286df2', y: '5 лет' },
  М: { n: 'Марина', r: 'Косметолог-эстетист', photo: '1529626455594-4ff0802cfb7e', y: '11 лет' },
}
const works = [
  { id: '1519014816548-bf5fe059798b', t: 'Нюдовый маникюр' },
  { id: '1695527081848-1e46c06e6458', t: 'Окрашивание' },
  { id: '1604654894610-df63bc536371', t: 'Черепаховый дизайн' },
  { id: '1632345031435-8727f6897d53', t: 'Процесс маникюра' },
  { id: '1610992015762-45dca7fa3a85', t: 'Бледно-розовый' },
  { id: '1626383137804-ff908d2753a2', t: 'Наш зал' },
]
const steps = ['Услуга', 'Мастер', 'Время', 'Контакты']

function Wizard() {
  const [step, setStep] = useState(0)
  const [svc, setSvc] = useState<Svc | null>(null)
  const [master, setMaster] = useState('')
  const [day, setDay] = useState(0)
  const [time, setTime] = useState('')
  const days = useMemo(() => Array.from({ length: 7 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() + i + 1); return d }), [])
  const busy = (t: string) => (t.charCodeAt(0) + t.charCodeAt(1) + day * 3) % 4 === 0
  const finish = (e: FormEvent) => { e.preventDefault(); setStep(4) }
  const reset = () => { setStep(0); setSvc(null); setMaster(''); setTime('') }
  return (
    <div className="wiz">
      <ol className="wsteps">{steps.map((s, i) => <li key={s} className={i < step ? 'done' : i === step ? 'on' : ''}><i>{i < step ? <Check size={14} /> : i + 1}</i><span>{s}</span></li>)}</ol>
      <div className="pane">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}>
            {step === 0 && <>
              <h3>Выберите услугу</h3>
              {groups.map(g => <div key={g.g} className="wg"><small>{g.g}</small><div className="opts">{g.items.map(s => <button key={s.n} type="button" onClick={() => { setSvc(s); setStep(1) }}>{s.n}<small>{s.t} · {s.p}</small></button>)}</div></div>)}
            </>}
            {step === 1 && svc && <>
              <h3>Выберите мастера</h3>
              <div className="opts ms">
                {[svc.m, ''].map(k => <button key={k || 'any'} type="button" onClick={() => { setMaster(k ? masters[k].n : 'Любой свободный'); setStep(2) }}>
                  {k ? <img src={u(masters[k].photo, 120)} alt="" /> : <span className="any">✦</span>}
                  <span>{k ? masters[k].n : 'Любой свободный'}<small>{k ? masters[k].r : 'Подберём ближайшее время'}</small></span>
                </button>)}
              </div>
            </>}
            {step === 2 && <>
              <h3>Дата и время</h3>
              <div className="days">{days.map((d, i) => <button key={i} type="button" aria-pressed={day === i} onClick={() => { setDay(i); setTime('') }}><small>{d.toLocaleDateString('ru-RU', { weekday: 'short' })}</small>{d.getDate()}</button>)}</div>
              <div className="opts times">{['10:00', '11:30', '13:00', '14:30', '16:00', '17:30', '19:00', '20:30'].map(t => <button key={t} type="button" disabled={busy(t)} aria-pressed={time === t} onClick={() => setTime(t)}>{t}</button>)}</div>
              <button type="button" className="btn" disabled={!time} onClick={() => setStep(3)}>Продолжить</button>
            </>}
            {step === 3 && svc && <>
              <h3>Ваши контакты</h3>
              <div className="summary">
                <div><span>Услуга</span><b>{svc.n}</b></div><div><span>Мастер</span><b>{master}</b></div>
                <div><span>Когда</span><b>{days[day].toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}, {time}</b></div><div><span>Стоимость</span><b>{svc.p}</b></div>
              </div>
              <form onSubmit={finish}><input required placeholder="Имя" aria-label="Имя" autoComplete="name" /><PhoneInput required aria-label="Телефон" /><button className="btn" type="submit">Подтвердить запись</button></form>
            </>}
            {step === 4 && svc && <div className="ok">
              <motion.i initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}><Check size={34} /></motion.i>
              <h3>Вы записаны</h3>
              <p>{svc.n}, {days[day].toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })} в {time}. Напомним о визите за день в SMS.</p>
              <button type="button" className="back" onClick={reset}>Записаться ещё</button>
            </div>}
            {step > 0 && step < 4 && <button type="button" className="back" onClick={() => setStep(step - 1)}><ChevronLeft size={16} /> Назад</button>}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function Page() {
  useSiteMeta({ title: 'Сирень — студия красоты', color: '#4A1D3A', letter: 'С', fonts: 'family=Forum&family=Commissioner:wght@300;400;600' })
  const scrolled = useScrolled()
  return (
    <SiteShell slug="beauty">
      <header className={scrolled ? 'is-scrolled' : ''}>
        <div className="wrap">
          <a href="#/sites/beauty" className="logo">Сирень</a>
          <nav aria-label="Основное меню">{nav.map(l => <Jump key={l.to} to={l.to}>{l.label}</Jump>)}</nav>
          <Jump to="book" className="btn s hbtn">Записаться</Jump>
          <MobileMenu links={nav} />
        </div>
      </header>

      <section className="hero">
        <div className="wrap">
          <div>
            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1] }}>Время, которое вы проводите для себя</motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>Маникюр, окрашивание и уход в тихой студии на Патриарших. Четыре кресла, никакой спешки и кофе, который мы варим сами.</motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="acts"><Jump to="book" className="btn">Выбрать время</Jump><span className="rate"><Stars size={15} /> 4,9 · 870 отзывов</span></motion.div>
          </div>
          <motion.div className="arch" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.1 }}>
            <img src={u('1637777277435-3c44f82fd0c9', 900)} alt="Интерьер студии с креслами и зеркалами" />
            <motion.div className="label" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}><b>Свободно сегодня</b>маникюр 16:00 · стрижка 18:30</motion.div>
          </motion.div>
        </div>
      </section>

      <section id="services" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal><h2 className="t">Услуги и цены</h2><p className="s">Профессиональная косметика и одноразовые пилки. Инструменты проходят стерилизацию в сухожаре.</p></Reveal>
          <div className="srv">{groups.map((g, i) => <Reveal key={g.g} delay={i * 0.1} className="grp"><h3>{g.g}</h3>{g.items.map(s => <div key={s.n} className="row"><span>{s.n}<small>{s.t}</small></span><b>{s.p}</b></div>)}</Reveal>)}</div>
        </div>
      </section>

      <section id="works" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal><h2 className="t">Работы мастеров</h2></Reveal>
          <div className="works">{works.map((w, i) => <Reveal key={w.id} delay={(i % 3) * 0.08} className={'wk w' + i}><img src={u(w.id, 700)} alt={w.t} loading="lazy" /><span>{w.t}</span></Reveal>)}</div>
        </div>
      </section>

      <section className="masters" id="masters">
        <div className="wrap">
          <Reveal><h2 className="t">Мастера</h2><p className="s">У каждого мастера — своё направление и не меньше пяти лет практики.</p></Reveal>
          <div className="mgrid">{Object.values(masters).map((m, i) => <Reveal key={m.n} delay={i * 0.08} className="m"><div className="ph"><img src={u(m.photo, 600)} alt={m.n} loading="lazy" /></div><h3>{m.n}</h3><p>{m.r}</p><small>опыт {m.y}</small></Reveal>)}</div>
        </div>
      </section>

      <section className="quote">
        <div className="wrap">
          <Reveal><Stars size={18} /><blockquote>«Первое место, где я действительно отдыхаю во время маникюра. Тихо, вкусный кофе, и никто не пытается продать мне ещё пять процедур».</blockquote><cite>Екатерина, клиентка с 2023 года</cite></Reveal>
        </div>
      </section>

      <section id="book">
        <div className="wrap">
          <Reveal><h2 className="t">Онлайн-запись</h2><p className="s">Четыре шага — и вы записаны. Напомним о визите за день.</p></Reveal>
          <Reveal delay={0.1}><Wizard /></Reveal>
        </div>
      </section>

      <footer><div className="wrap"><span className="logo">Сирень</span><span>© Студия красоты «Сирень», 2026 · Малый Козихинский пер., 8</span><span>Демо-сайт для портфолио. Студия вымышленная.</span></div></footer>
      <MobileCTA to="book">Записаться онлайн</MobileCTA>
    </SiteShell>
  )
}
