import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react'
import { useMemo, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, A11y } from 'swiper/modules'
import 'swiper/css'
import { SiteShell } from '../../shared/SiteShell'
import { Reveal } from '../../shared/Reveal'
import { Jump } from '../../shared/Jump'
import { MobileMenu } from '../../shared/MobileMenu'
import { MobileCTA } from '../../shared/MobileCTA'
import { PhoneInput } from '../../shared/PhoneInput'
import { useScrolled, useSiteMeta } from '../../shared/hooks'
import { useSubmit } from '../../shared/useForm'
import { useToast } from '../../shared/Toast'
import { u } from '../../shared/img'
import './style.css'

const nav = [{ to: 'zones', label: 'Клуб' }, { to: 'schedule', label: 'Расписание' }, { to: 'plans', label: 'Абонементы' }, { to: 'coaches', label: 'Тренеры' }]
type Cls = [string, string, string, string, string]
const week: Record<string, Cls[]> = {
  Пн: [['7:00', 'Утренняя йога', 'Юлия', 'Все уровни', 'Йога'], ['12:00', 'Функциональный', 'Илья', 'Средний', 'Сила'], ['19:00', 'Сайкл', 'Максим', 'Высокий', 'Кардио'], ['20:30', 'Стретчинг', 'Юлия', 'Все уровни', 'Йога']],
  Вт: [['8:00', 'Аквааэробика', 'Ксения', 'Все уровни', 'Вода'], ['18:30', 'Пилатес', 'Юлия', 'Начальный', 'Йога'], ['20:00', 'Кроссфит', 'Илья', 'Высокий', 'Сила']],
  Ср: [['7:00', 'Утренняя йога', 'Юлия', 'Все уровни', 'Йога'], ['13:00', 'Пресс и спина', 'Максим', 'Средний', 'Сила'], ['19:00', 'Сайкл', 'Максим', 'Высокий', 'Кардио'], ['20:30', 'Аквааэробика', 'Ксения', 'Все уровни', 'Вода']],
  Чт: [['8:00', 'Плавание: техника', 'Ксения', 'Начальный', 'Вода'], ['18:30', 'Функциональный', 'Илья', 'Средний', 'Сила'], ['20:00', 'Пилатес', 'Юлия', 'Начальный', 'Йога']],
  Пт: [['7:00', 'Утренняя йога', 'Юлия', 'Все уровни', 'Йога'], ['19:00', 'Кроссфит', 'Илья', 'Высокий', 'Сила'], ['20:30', 'Бокс', 'Максим', 'Средний', 'Кардио']],
  Сб: [['10:00', 'Детское плавание', 'Ксения', 'Дети 6–12', 'Вода'], ['11:00', 'Функциональный', 'Илья', 'Средний', 'Сила'], ['12:30', 'Йога-флоу', 'Юлия', 'Средний', 'Йога']],
  Вс: [['10:00', 'Сайкл', 'Максим', 'Высокий', 'Кардио'], ['11:30', 'Мягкая йога', 'Юлия', 'Начальный', 'Йога']],
}
const zones = [
  { img: '1689877020200-403d8542d95d', big: '2000 м²', t: 'Тренажёрный зал', p: 'Свободные веса, кардиозона, функциональный тренинг', w2: true },
  { big: '24/7', t: 'Без выходных', p: 'Вход по браслету, парковка для клиентов бесплатно', lime: true },
  { img: '1536922246289-88c42f957773', big: '40', t: 'Групповых в неделю', p: 'Сайкл, функциональные, бокс' },
  { img: '1518611012118-696072aa579a', big: '3', t: 'Студии', p: 'Йога, пилатес, стретчинг' },
  { img: '1776763019146-c1d386b81e27', big: '25 м', t: 'Бассейн и спа', p: '4 дорожки, хаммам, финская сауна', w2: true },
  { img: '1597076537061-a6b58163aa45', big: '18', t: 'Тренеров', p: 'С профильным образованием' },
]
const plans = [
  { n: 'Дневной', m: 2900, items: ['Посещение 7:00–17:00', 'Тренажёрный зал', 'Групповые занятия'] },
  { n: 'Безлимит', m: 4500, hot: true, items: ['Круглосуточно', 'Зал, бассейн, группы, спа', 'Вводная тренировка с тренером', '4 гостевых визита в месяц'] },
  { n: 'С тренером', m: 12900, items: ['Всё из «Безлимита»', '8 персональных тренировок', 'План питания от нутрициолога', 'Замеры раз в месяц'] },
]
const coaches = [
  { photo: '1704223523169-52feeed90365', n: 'Максим Андреев', p: 'Силовой тренинг, пауэрлифтинг', b: 'КМС' },
  { photo: '1717839419301-75b91d4b5f7e', n: 'Юлия Романова', p: 'Йога, пилатес, мобильность', b: 'RYT-500' },
  { photo: '1758875568932-0eefd3e60090', n: 'Илья Петров', p: 'Функциональный тренинг', b: 'CrossFit L2' },
  { photo: '1792009939517-7bef64d8aeeb', n: 'Ксения Волкова', p: 'Плавание, аквааэробика', b: 'МС по плаванию' },
  { photo: '1529025147382-f2d265c8149c', n: 'Артём Лисин', p: 'Бокс, кикбоксинг', b: 'МС по боксу' },
]
const results = [
  { big: '−14 кг', t: 'За полгода с Максимом. Без жёстких диет — просто научилась нормально есть и тренироваться три раза в неделю.', who: 'Мария', since: 'клиентка с 2025 года', photo: '1708098746991-ad0a97313727' },
  { big: '120 кг', t: 'Пришёл с жимом 70. Через год — 120 и первое место на любительских соревнованиях.', who: 'Антон', since: 'клиент с 2024 года', photo: '1522529599102-193c0d76b5b6' },
  { big: '0 болей', t: 'Спина болела пять лет. После курса пилатеса с Юлей забыла, что такое утренняя скованность.', who: 'Елена', since: 'клиентка с 2025 года', photo: '1758600433721-60ff3153f81a' },
]

function Schedule() {
  const toast = useToast()
  const days = Object.keys(week)
  const [day, setDay] = useState(['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'][new Date().getDay()])
  const [flt, setFlt] = useState('Все')
  const [booked, setBooked] = useState<Set<string>>(new Set())
  const list = useMemo(() => week[day].filter(c => flt === 'Все' || c[4] === flt), [day, flt])
  const toggle = (k: string) => setBooked(prev => { const n = new Set(prev); if (n.has(k)) n.delete(k); else { n.add(k); toast('Отметили! Напомним за 2 часа до занятия.') } return n })
  return (
    <section id="schedule" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="head"><Reveal><h2 className="t">Расписание</h2></Reveal><Reveal delay={0.1}><p className="s">Групповые занятия входят в любой абонемент. Отметьтесь заранее — придёт напоминание.</p></Reveal></div>
        <div className="days">{days.map(x => <button key={x} type="button" aria-pressed={day === x} onClick={() => setDay(x)}><span>{x}</span></button>)}</div>
        <div className="filters">{['Все', 'Сила', 'Кардио', 'Йога', 'Вода'].map(f => <button key={f} type="button" aria-pressed={flt === f} onClick={() => setFlt(f)}>{f}</button>)}</div>
        <div className="sched" aria-live="polite">
          <AnimatePresence mode="popLayout">
            {list.map(c => {
              const k = day + c[0]
              return (
                <motion.div layout key={k} className="cls" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.25 }}>
                  <time>{c[0]}</time><b>{c[1]}</b><span>{c[2]}</span><span className="lvl">{c[3]}</span>
                  <button type="button" className={booked.has(k) ? 'on' : ''} onClick={() => toggle(k)}>{booked.has(k) ? 'Вы идёте ✓' : 'Я приду'}</button>
                </motion.div>
              )
            })}
          </AnimatePresence>
          {!list.length && <p className="nocls">В этот день нет занятий выбранного типа.</p>}
        </div>
      </div>
    </section>
  )
}

export default function Page() {
  useSiteMeta({ title: 'Пульс — фитнес-клуб 24/7', color: '#22093F', letter: 'П', fonts: 'family=Unbounded:wght@500;700;800;900&family=Inter:wght@400;500;600' })
  const scrolled = useScrolled()
  const submit = useSubmit('Записали! Менеджер позвонит, чтобы выбрать время.')
  const [year, setYear] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const titleX = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])
  return (
    <SiteShell slug="fitness">
      <header className={scrolled ? 'is-scrolled' : ''}>
        <div className="wrap">
          <a href="#/sites/fitness" className="logo"><i />ПУЛЬС</a>
          <nav aria-label="Основное меню">{nav.map(l => <Jump key={l.to} to={l.to}>{l.label}</Jump>)}</nav>
          <Jump to="trial" className="btn s hbtn">Пробная тренировка</Jump>
          <MobileMenu links={nav} extra={<Jump to="trial">Пробная тренировка →</Jump>} />
        </div>
      </header>

      <section className="hero" ref={heroRef}>
        <motion.img src={u('1517130038641-a774d04afb3c', 2000)} alt="" style={{ y: imgY }} />
        <div className="wrap">
          <motion.h1 style={{ x: titleX }} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1] }}>Держи<span>ритм</span></motion.h1>
          <svg className="ecg" viewBox="0 0 1200 90" preserveAspectRatio="none" aria-hidden><path d="M0 50 H360 L390 50 L410 10 L440 85 L465 30 L480 50 H760 L790 50 L810 10 L840 85 L865 30 L880 50 H1200" /></svg>
          <motion.div className="row" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            <p><b>Открыто 24/7.</b> 2 000 м² зала, 40 групповых занятий в неделю и бассейн 25 метров. В 3 минутах от метро «Динамо».</p>
            <Jump to="trial" className="btn">Прийти бесплатно</Jump>
          </motion.div>
        </div>
      </section>
      <div className="marq" aria-hidden><div>{[0, 1].map(k => ['Тренажёрный зал', 'Бассейн 25 м', 'Сайкл', 'Йога', 'Кроссфит', 'Пилатес', 'Бокс'].map(t => <span key={k + t}>{t}</span>))}</div></div>

      <section id="zones">
        <div className="wrap">
          <div className="head"><Reveal><h2 className="t">Всё для тренировки — в одном клубе</h2></Reveal><Reveal delay={0.1}><p className="s">Оборудование Technogym и Hammer Strength. Обновляем зал каждые три года.</p></Reveal></div>
          <div className="zones">
            {zones.map((z, i) => (
              <Reveal key={z.t} delay={(i % 3) * 0.08} className={'zone' + (z.w2 ? ' w2' : '') + (z.lime ? ' lime' : '')}>
                {z.img && <img src={u(z.img, z.w2 ? 1000 : 600)} alt="" loading="lazy" />}
                <b>{z.big}</b><div><h3>{z.t}</h3><p>{z.p}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Schedule />

      <section id="plans" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="head"><Reveal><h2 className="t">Абонементы</h2></Reveal><Reveal delay={0.1}><p className="s">Заморозка до 30 дней в каждом абонементе. Оплата частями — без переплаты.</p></Reveal></div>
          <div className="toggle" role="group" aria-label="Период оплаты">
            {[false, true].map(y => <button key={String(y)} type="button" aria-pressed={year === y} onClick={() => setYear(y)}><span>{y ? 'Сразу на год −25%' : 'Помесячно'}</span></button>)}
          </div>
          <div className="plans">
            {plans.map((p, i) => {
              const price = year ? Math.round(p.m * 0.75) : p.m
              return (
                <Reveal key={p.n} delay={i * 0.1} className={'plan' + (p.hot ? ' hot' : '')}>
                  <h3>{p.n}</h3>
                  <div className="old">{year ? p.m.toLocaleString('ru-RU') + ' ₽' : ''}</div>
                  <div className="p"><motion.span key={price} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>{price.toLocaleString('ru-RU')}</motion.span><span>&nbsp;₽</span><small>/мес</small></div>
                  <ul>{p.items.map(x => <li key={x}>{x}</li>)}</ul>
                  <Jump to="trial" className="btn">Выбрать</Jump>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section id="coaches" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="head"><Reveal><h2 className="t">Тренеры</h2></Reveal><Reveal delay={0.1}><p className="s">Первая тренировка с тренером — бесплатно. Листайте, чтобы увидеть всех.</p></Reveal></div>
          <Swiper modules={[FreeMode, A11y]} freeMode spaceBetween={16} slidesPerView={1.3} breakpoints={{ 600: { slidesPerView: 2.3 }, 1000: { slidesPerView: 4 } }}>
            {coaches.map(c => <SwiperSlide key={c.n}><div className="coach"><div className="av"><img src={u(c.photo, 600)} alt={c.n} loading="lazy" /><span>{c.b}</span></div><h3>{c.n}</h3><p>{c.p}</p></div></SwiperSlide>)}
          </Swiper>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="head"><Reveal><h2 className="t">Результаты клиентов</h2></Reveal></div>
          <div className="res">{results.map((r, i) => <Reveal key={r.who} delay={i * 0.1} className="r"><b>{r.big}</b><p>«{r.t}»</p><div className="who"><img src={u(r.photo, 120)} alt="" loading="lazy" /><div>{r.who}<small>{r.since}</small></div></div></Reveal>)}</div>
        </div>
      </section>

      <section id="trial" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal className="trial">
            <div><h2>Первая тренировка — бесплатно</h2><p>Покажем клуб, проведём замеры и составим программу на первый месяц. Без обязательств.</p></div>
            <form onSubmit={submit}>
              <input required placeholder="Имя" aria-label="Имя" autoComplete="name" />
              <PhoneInput required aria-label="Телефон" />
              <select aria-label="Цель"><option>Цель: похудеть</option><option>Цель: набрать форму</option><option>Цель: здоровая спина</option><option>Просто посмотреть клуб</option></select>
              <button className="btn dark" type="submit">Записаться</button>
            </form>
          </Reveal>
        </div>
      </section>

      <footer><div className="wrap"><span>© Фитнес-клуб «Пульс», 2026 · Ленинградский пр-т, 36</span><span>Демо-сайт для портфолио. Клуб вымышленный.</span></div></footer>
      <MobileCTA to="trial">Прийти бесплатно</MobileCTA>
    </SiteShell>
  )
}
