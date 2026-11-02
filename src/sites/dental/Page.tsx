import { motion, AnimatePresence } from 'motion/react'
import { useMemo, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { Check, ShieldCheck, Search, MapPin, Clock } from 'lucide-react'
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

function Installment() {
  const [amt, setAmt] = useState(120000)
  const [m, setM] = useState(12)
  const pay = Math.ceil(amt / m / 10) * 10
  return (
    <Reveal className="inst">
      <div>
        <h2 className="t">Лечение сейчас — оплата частями</h2>
        <p>Рассрочка без переплаты и первого взноса. Оформление в клинике за 15 минут, без справок о доходах.</p>
        <label className="rng-l" htmlFor="amt">Сумма лечения <output>{amt.toLocaleString('ru-RU')} ₽</output></label>
        <input id="amt" type="range" min={30000} max={500000} step={5000} value={amt} onChange={e => setAmt(+e.target.value)} style={{ ['--p' as string]: `${((amt - 30000) / 470000) * 100}%` }} />
        <span className="rng-l">Срок</span>
        <div className="months">{[3, 6, 12].map(x => <button key={x} type="button" aria-pressed={m === x} onClick={() => setM(x)}>{x} мес</button>)}</div>
      </div>
      <div className="pay" aria-live="polite">
        <small>Ежемесячный платёж</small>
        <motion.b key={pay} initial={{ opacity: 0.4, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>{pay.toLocaleString('ru-RU')} ₽</motion.b>
        <p>Переплата — 0 ₽. Досрочное погашение без комиссий.</p>
        <Jump to="book" className="btn mint">Записаться на консультацию</Jump>
      </div>
    </Reveal>
  )
}

function PriceList() {
  const cats = ['Все', ...new Set(d.priceList.map(i => i[0]))]
  const [cat, setCat] = useState('Все')
  const [q, setQ] = useState('')
  const list = useMemo(() => d.priceList.filter(i => (cat === 'Все' || i[0] === cat) && i[1].toLowerCase().includes(q.toLowerCase().trim())), [cat, q])
  return (
    <section className="prices" id="prices">
      <div className="wrap pwrap">
        <div>
          <Reveal><h2 className="t">Прайс-лист</h2><p className="s" style={{ marginTop: 14 }}>Начните вводить название услуги или выберите раздел.</p></Reveal>
          <div className="search"><Search size={18} /><input type="search" value={q} onChange={e => setQ(e.target.value)} placeholder="Например, отбеливание" aria-label="Поиск по прайсу" /></div>
          <div className="cats">{cats.map(c => <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>)}</div>
        </div>
        <div className="plist" aria-live="polite">
          <AnimatePresence initial={false}>
            {list.map(i => (
              <motion.div layout key={i[1]} className="prow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <span>{i[1]}</span><b>{i[2]}</b>
              </motion.div>
            ))}
          </AnimatePresence>
          {!list.length && <p className="empty">Такой услуги в списке нет — уточните у администратора по телефону.</p>}
        </div>
      </div>
    </section>
  )
}

export default function Page() {
  useSiteMeta({ title: 'Белая линия — семейная стоматология', color: '#2BB5A0', letter: 'Б', fonts: 'family=Manrope:wght@400;500;600;700;800' })
  const scrolled = useScrolled()
  const submit = useSubmit('Спасибо! Администратор перезвонит в течение 15 минут.')
  const [lb, setLb] = useState(-1)
  return (
    <SiteShell slug="dental">
      <header className={scrolled ? 'is-scrolled' : ''}>
        <div className="wrap">
          <a href="#/sites/dental" className="logo"><span />Белая линия</a>
          <nav aria-label="Основное меню">{d.nav.map(l => <Jump key={l.to} to={l.to}>{l.label}</Jump>)}</nav>
          <a className="hphone" href="tel:+74950000000">+7 495 000-00-00</a>
          <Jump to="book" className="btn s">Записаться</Jump>
          <MobileMenu links={d.nav} extra={<a href="tel:+74950000000">+7 495 000-00-00</a>} />
        </div>
      </header>

      <section className="hero">
        <div className="wrap">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="pill"><b>0%</b> рассрочка на лечение до 12 месяцев</span>
            <h1>Лечим зубы так, что к нам не страшно возвращаться</h1>
            <p>Анестезия, которую не чувствуешь, план лечения с ценой до начала работ и врачи, которые объясняют каждый шаг.</p>
            <div className="acts"><Jump to="book" className="btn mint">Бесплатная консультация</Jump><Jump to="prices" className="btn line">Цены на лечение</Jump></div>
            <div className="trust"><div><b>4,9 ★</b>рейтинг на картах</div><div><b>11 000+</b>пациентов</div><div><b>14 лет</b>работы клиники</div></div>
          </motion.div>
          <motion.div className="hero-ph" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.1 }}>
            <img src={u('1629909613654-28e377c37b09', 1000)} alt="Светлый кабинет стоматологии" />
            <motion.div className="chip a" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}><i><Check size={20} /></i><div>Без боли<small>компьютерная анестезия</small></div></motion.div>
            <motion.div className="chip b" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 }}><i><ShieldCheck size={20} /></i><div>Гарантия до 3 лет<small>на пломбы и коронки</small></div></motion.div>
          </motion.div>
        </div>
      </section>

      <section id="serv">
        <div className="wrap">
          <div className="head"><Reveal><h2 className="t">С чем приходят к нам</h2></Reveal><Reveal delay={0.1}><p className="s">Всё лечение — в одной клинике: от первого осмотра ребёнка до имплантов для родителей.</p></Reveal></div>
          <div className="serv">
            <Reveal as="article" className="card big"><img src={u('1588776814546-daab30f310ce', 900)} alt="Врачи проводят процедуру" loading="lazy" /><div className="in"><h3>Имплантация под ключ</h3><p>Имплант, абатмент и коронка из циркония. Фиксированная цена в договоре — без доплат по ходу лечения. Пожизненная гарантия на имплант.</p><div className="from">от 49 000 ₽ <small>за зуб под ключ</small></div></div></Reveal>
            {d.services.map((s, i) => <Reveal as="article" key={s.title} delay={(i % 3) * 0.08} className="card"><h3>{s.title}</h3><p>{s.text}</p><div className="from">{s.price}</div></Reveal>)}
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}><div className="wrap"><Installment /></div></section>
      <PriceList />

      <section id="docs">
        <div className="wrap">
          <div className="head"><Reveal><h2 className="t">Врачи</h2></Reveal><Reveal delay={0.1}><p className="s">Каждый врач ведёт пациента от начала до конца лечения. Без передачи «из рук в руки».</p></Reveal></div>
          <div className="docs">{d.doctors.map((doc, i) => <Reveal key={doc.name} delay={i * 0.08} className="doc"><div className="ph"><img src={u(doc.photo, 600)} alt={doc.name} loading="lazy" /><span>{doc.exp}</span></div><h3>{doc.name}</h3><p>{doc.role}</p></Reveal>)}</div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="head"><Reveal><h2 className="t">Клиника</h2></Reveal><Reveal delay={0.1}><p className="s">Пять кабинетов, свой рентген и КТ. Нажмите на фото, чтобы посмотреть крупнее.</p></Reveal></div>
          <Reveal className="strip">{d.gallery.slice(0, 3).map((g, i) => <button key={g.id} type="button" onClick={() => setLb(i)} aria-label={`Открыть фото: ${g.alt}`}><img src={u(g.id, i ? 500 : 900)} alt={g.alt} loading="lazy" /></button>)}</Reveal>
          <Lightbox open={lb >= 0} index={lb} close={() => setLb(-1)} slides={d.gallery.map(g => ({ src: u(g.id, 1800), alt: g.alt }))} />
        </div>
      </section>

      <section id="reviews" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="head"><Reveal><h2 className="t">Отзывы пациентов</h2></Reveal><Reveal delay={0.1}><p className="s rating"><b>4,9</b> <Stars size={18} /> 1 240 отзывов</p></Reveal></div>
          <Swiper modules={[Pagination, A11y]} pagination={{ clickable: true }} spaceBetween={20} slidesPerView={1.08} breakpoints={{ 700: { slidesPerView: 2 }, 1060: { slidesPerView: 3 } }}>
            {d.reviews.map(r => <SwiperSlide key={r.name}><div className="rev"><Stars /><p>«{r.text}»</p><div className="who"><img src={u(r.photo, 120)} alt="" loading="lazy" /><div><b>{r.name}</b><small>{r.what}</small></div></div></div></SwiperSlide>)}
          </Swiper>
        </div>
      </section>

      <section id="faq" style={{ paddingTop: 0 }}>
        <div className="wrap faq">
          <Reveal><h2 className="t">Частые вопросы</h2><p className="s" style={{ marginTop: 14 }}>Не нашли ответ? Администратор ответит в WhatsApp за 5 минут.</p></Reveal>
          <Reveal delay={0.1}><Accordion items={d.faq} /></Reveal>
        </div>
      </section>

      <section id="book" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal className="cta">
            <div><h2>Первая консультация и план лечения — бесплатно</h2><p>Администратор перезвонит в течение 15 минут и подберёт удобное время.</p>
              <div className="contacts"><div><b><MapPin size={16} /> м. Новослободская</b><span>ул. Лесная, 20, 1 этаж</span></div><div><b><Clock size={16} /> Ежедневно</b><span>9:00–21:00</span></div></div></div>
            <form onSubmit={submit}>
              <input required placeholder="Имя" aria-label="Имя" autoComplete="name" />
              <PhoneInput required aria-label="Телефон" />
              <select aria-label="Врач"><option>Любой врач</option><option>Терапевт</option><option>Имплантолог</option><option>Детский стоматолог</option><option>Ортодонт</option></select>
              <button className="btn mint" type="submit">Записаться</button>
              <small>Нажимая кнопку, вы соглашаетесь с обработкой персональных данных</small>
            </form>
          </Reveal>
        </div>
      </section>

      <footer><div className="wrap"><span>© Белая линия, 2026. Лицензия № ЛО-77-01-000000. Имеются противопоказания, необходима консультация специалиста.</span><span>Демо-сайт для портфолио. Клиника вымышленная.</span></div></footer>
      <MobileCTA to="book">Записаться бесплатно</MobileCTA>
    </SiteShell>
  )
}
