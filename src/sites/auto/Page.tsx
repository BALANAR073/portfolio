import { motion, AnimatePresence } from 'motion/react'
import { useMemo, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { Eye, PackageOpen, Wrench, Check, MapPin, Clock } from 'lucide-react'
import { SiteShell } from '../../shared/SiteShell'
import { Reveal } from '../../shared/Reveal'
import { Jump } from '../../shared/Jump'
import { MobileMenu } from '../../shared/MobileMenu'
import { MobileCTA } from '../../shared/MobileCTA'
import { PhoneInput } from '../../shared/PhoneInput'
import { Accordion } from '../../shared/Accordion'
import { Stars } from '../../shared/Stars'
import { useScrolled, useSiteMeta } from '../../shared/hooks'
import { useSubmit } from '../../shared/useForm'
import { u } from '../../shared/img'
import * as d from './data'
import './style.css'

const rub = (n: number) => (Math.round(n / 50) * 50).toLocaleString('ru-RU') + ' ₽'

function ToCalc() {
  const [brand, setBrand] = useState(0)
  const [km, setKm] = useState(15)
  const [part, setPart] = useState(1)
  const rows = useMemo(() => {
    const k = d.brands[brand].k, pk = d.parts[part].k
    const r: [string, number][] = [
      ['Работа', (km >= 60 ? 4800 : km >= 30 ? 3600 : 2600) * k],
      ['Масло 4–5 л', 3800 * k * pk],
      ['Фильтры', (km >= 30 ? 2600 : 1500) * k * pk],
    ]
    if (km >= 45) r.push([km >= 60 ? 'Свечи и тормозная жидкость' : 'Тормозная жидкость', (km >= 60 ? 4200 : 1800) * k * pk])
    return r
  }, [brand, km, part])
  const total = rows.reduce((a, r) => a + r[1], 0)
  return (
    <Reveal className="toc">
      <div className="toc-l">
        <h2 className="t">Сколько стоит ТО вашей машины</h2>
        <label className="lbl" htmlFor="brand">Марка</label>
        <select id="brand" value={brand} onChange={e => setBrand(+e.target.value)}>{d.brands.map((b, i) => <option key={b.label} value={i}>{b.label}</option>)}</select>
        <span className="lbl">Пробег, км</span>
        <div className="chips">{d.mileage.map(m => <button key={m} type="button" aria-pressed={km === m} onClick={() => setKm(m)}>{m === 90 ? '90 000+' : (m * 1000).toLocaleString('ru-RU')}</button>)}</div>
        <span className="lbl">Запчасти</span>
        <div className="chips">{d.parts.map((p, i) => <button key={p.id} type="button" aria-pressed={part === i} onClick={() => setPart(i)}>{p.label}</button>)}</div>
      </div>
      <div className="toc-r" aria-live="polite">
        <small>Итого за ТО{part === 2 ? ' (только работа)' : ' с запчастями'}</small>
        <motion.div key={total} className="sum" initial={{ opacity: 0.4, y: 8 }} animate={{ opacity: 1, y: 0 }}>{rub(total)}</motion.div>
        <ul>{rows.map(([n, v]) => <li key={n}><span>{n}</span><b>{v ? rub(v) : 'ваши'}</b></li>)}</ul>
        <Jump to="book" className="btn">Записаться на ТО</Jump>
      </div>
    </Reveal>
  )
}

function Prices() {
  const keys = Object.keys(d.prices)
  const [tab, setTab] = useState(keys[0])
  return (
    <section id="prices" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="head"><Reveal><h2 className="t">Цены на основные работы</h2></Reveal><Reveal delay={0.1}><p className="s">Для кроссоверов и премиум-класса — коэффициент 1,2. Цена работы не меняется после согласования.</p></Reveal></div>
        <div className="tabs" role="tablist">
          {keys.map(k => (
            <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)}>
              {tab === k && <motion.span layoutId="auto-tab" className="tab-bg" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
              <span className="tab-tx">{d.prices[k].tab}</span>
            </button>
          ))}
        </div>
        <div className="panel" role="tabpanel">
          <AnimatePresence mode="wait">
            <motion.table key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
              <tbody>{d.prices[tab].rows.map(r => <tr key={r[0]}><td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td></tr>)}</tbody>
            </motion.table>
          </AnimatePresence>
        </div>
        <p className="note">Можно приехать со своими запчастями — гарантия на работу сохраняется.</p>
      </div>
    </section>
  )
}

function Booking() {
  const submit = useSubmit('Вы записаны! Мастер-приёмщик позвонит, чтобы подтвердить время.')
  const today = new Date().toISOString().slice(0, 10)
  const [date, setDate] = useState(today)
  const [slot, setSlot] = useState<string | null>(null)
  const busy = useMemo(() => { const seed = new Date(date).getDate() || 1; return new Set(d.slots.filter((_, i) => (i * seed) % 3 === 1)) }, [date])
  return (
    <section className="book" id="book">
      <div className="wrap">
        <div>
          <Reveal><h2 className="t">Запишитесь на удобное время</h2><p className="s">Подтвердим запись звонком в течение 15 минут. Диагностика подвески при записи с сайта — бесплатно.</p></Reveal>
          <Reveal delay={0.1} className="mapbox"><iframe src="https://yandex.ru/map-widget/v1/?ll=37.585%2C55.835&z=14&pt=37.585,55.835,pm2orl" title="Карта: автосервис на ул. Северной" loading="lazy" /></Reveal>
          <div className="addr">
            <div><b><MapPin size={16} /> Адрес</b>ул. Северная, 14, стр. 2<br />5 минут от м. Петровско-Разумовская</div>
            <div><b><Clock size={16} /> Часы работы</b>Ежедневно 8:00–21:00<br />Без выходных и праздников</div>
          </div>
        </div>
        <Reveal delay={0.15}>
          <form className="f" onSubmit={e => { submit(e); setSlot(null) }}>
            <h3>Онлайн-запись</h3>
            <label>Имя<input required autoComplete="name" /></label>
            <label>Телефон<PhoneInput required /></label>
            <label>Марка и модель<input placeholder="Kia Rio 2019" /></label>
            <label>Работа<select><option>ТО</option><option>Диагностика</option><option>Подвеска</option><option>Двигатель</option><option>Шиномонтаж</option><option>Другое</option></select></label>
            <label className="full">Дата<input type="date" min={today} value={date} onChange={e => { setDate(e.target.value); setSlot(null) }} required /></label>
            <div className="full">
              <span className="lbl2">Время</span>
              <div className="slots">{d.slots.map(s => <button type="button" key={s} disabled={busy.has(s)} aria-pressed={slot === s} onClick={() => setSlot(s)}>{s}</button>)}</div>
              <p className="hint">Зачёркнуто — время уже занято</p>
            </div>
            <label className="full">Что беспокоит<textarea rows={3} placeholder="Например: стук спереди справа на неровностях" /></label>
            <button className="btn full" type="submit">{slot ? `Записаться на ${slot}` : 'Записаться'}</button>
            <p className="hint full">Нажимая кнопку, вы соглашаетесь с обработкой персональных данных.</p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}

export default function Page() {
  useSiteMeta({ title: 'Гараж на Северной — автосервис', color: '#FF7A1A', letter: 'Г', fonts: 'family=Russo+One&family=PT+Sans:wght@400;700' })
  const scrolled = useScrolled()
  return (
    <SiteShell slug="auto">
      <div className="topbar"><div className="wrap"><span><i className="dot" />Сегодня открыто до <b>21:00</b></span><span>г. Москва, ул. Северная, 14, стр. 2</span></div></div>
      <header className={scrolled ? 'is-scrolled' : ''}>
        <div className="wrap">
          <a className="logo" href="#/sites/auto"><svg viewBox="0 0 36 36" aria-hidden><circle cx="18" cy="18" r="15" fill="none" stroke="#FF7A1A" strokeWidth="4" /><circle cx="18" cy="18" r="5" fill="#FF7A1A" /><path d="M18 3v6M18 27v6M3 18h6M27 18h6" stroke="#FF7A1A" strokeWidth="3" /></svg>Гараж на Северной</a>
          <nav aria-label="Основное меню">{d.nav.map(l => <Jump key={l.to} to={l.to}>{l.label}</Jump>)}</nav>
          <a className="btn s hphone" href="tel:+79000000000">+7 900 000-00-00</a>
          <MobileMenu links={d.nav} extra={<a href="tel:+79000000000">+7 900 000-00-00</a>} />
        </div>
      </header>

      <section className="hero">
        <div className="wrap">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1>Ремонт без <em>сюрпризов</em> в чеке</h1>
            <p>Сначала диагностика и смета, потом работа. Нашли что-то ещё — звоним и спрашиваем, прежде чем делать.</p>
            <div className="badges">{['Гарантия 12 месяцев', 'Запчасти с чеком', 'Видео ремонта в WhatsApp'].map(b => <span key={b}><Check size={15} strokeWidth={3} />{b}</span>)}</div>
            <div className="acts"><Jump to="book" className="btn">Записаться на ремонт</Jump><Jump to="to" className="btn ghost">Узнать цену ТО</Jump></div>
          </motion.div>
          <motion.div className="hero-ph" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.15 }}>
            <img src={u('1727893119356-1702fe921cf9', 1100)} alt="Мастера работают в светлом цехе автосервиса" />
            <motion.div className="float b" initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}><small>Средний чек ТО</small><b>от 3 200 ₽</b></motion.div>
            <motion.div className="float a" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}><small>Свободно сегодня</small><div className="slots-today"><i>13:30</i><i>16:00</i><i>18:30</i></div></motion.div>
          </motion.div>
        </div>
      </section>

      <section id="to"><div className="wrap"><ToCalc /></div></section>
      <Prices />

      <section className="why" id="why">
        <div className="wrap">
          <Reveal className="collage">
            <img src={u('1625047509248-ec889cbff17f', 800)} alt="Мастер осматривает двигатель" loading="lazy" />
            <img src={u('1487754180451-c456f719a1fc', 600)} alt="Замена масла" loading="lazy" />
            <img src={u('1486262715619-67b85e0b08d3', 600)} alt="Двигатель автомобиля" loading="lazy" />
          </Reveal>
          <div>
            <Reveal><h2 className="t">Почему 78% клиентов возвращаются</h2></Reveal>
            <div className="why-list">
              {[[Eye, 'Видно, что делают', 'Зона ожидания со стеклом в цех. Или видео замены прямо в мессенджер.'], [PackageOpen, 'Старые детали — вам', 'Все снятые запчасти отдаём в пакете. Можно убедиться, что замена была нужна.'], [Wrench, 'Мастера, а не стажёры', 'Опыт от 8 лет и сертификаты по маркам, которые мастер обслуживает.']].map(([Ic, t, p], i) => {
                const I = Ic as typeof Eye
                return <Reveal key={t as string} delay={i * 0.1} className="why-item"><i><I size={24} /></i><div><h3>{t as string}</h3><p>{p as string}</p></div></Reveal>
              })}
            </div>
            <div className="brands" aria-label="Обслуживаем марки">{['Kia', 'Hyundai', 'Toyota', 'Volkswagen', 'Skoda', 'Lada', 'Haval', 'Chery', 'Geely', 'BMW'].map(b => <span key={b}>{b}</span>)}</div>
          </div>
        </div>
      </section>

      <section id="reviews">
        <div className="wrap">
          <div className="head"><Reveal><h2 className="t">Отзывы с Яндекс Карт</h2></Reveal><Reveal delay={0.1}><p className="s rating"><b>4,9</b> <Stars size={18} /> 486 оценок</p></Reveal></div>
          <Swiper modules={[Pagination, A11y]} pagination={{ clickable: true }} spaceBetween={18} slidesPerView={1.08} breakpoints={{ 700: { slidesPerView: 2 }, 1060: { slidesPerView: 3 } }}>
            {d.reviews.map(r => (
              <SwiperSlide key={r.name}>
                <div className="rev"><div className="top"><img src={u(r.photo, 120)} alt="" loading="lazy" /><div><b>{r.name}</b><Stars size={14} /></div></div><p>{r.text}</p><span className="car">{r.car}</span></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section id="faq" style={{ paddingTop: 0 }}>
        <div className="wrap faq"><Reveal><h2 className="t">Частые вопросы</h2></Reveal><Reveal delay={0.1}><Accordion items={d.faq} /></Reveal></div>
      </section>

      <Booking />

      <footer><div className="wrap"><span>© Гараж на Северной, 2026 · ИП Северов С. С.</span><span>Демо-сайт для портфолио. Компания вымышленная.</span></div></footer>
      <MobileCTA to="book">Записаться на ремонт</MobileCTA>
    </SiteShell>
  )
}
