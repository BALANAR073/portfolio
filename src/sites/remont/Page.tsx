import { motion } from 'motion/react'
import { useMemo, useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { Ruler, ShieldCheck, Camera, Banknote, Timer, Wrench } from 'lucide-react'
import { SiteShell } from '../../shared/SiteShell'
import { Reveal } from '../../shared/Reveal'
import { Jump } from '../../shared/Jump'
import { MobileMenu } from '../../shared/MobileMenu'
import { MobileCTA } from '../../shared/MobileCTA'
import { PhoneInput } from '../../shared/PhoneInput'
import { Accordion } from '../../shared/Accordion'
import { BeforeAfter } from '../../shared/BeforeAfter'
import { useScrolled, useSiteMeta } from '../../shared/hooks'
import { useSubmit } from '../../shared/useForm'
import { u } from '../../shared/img'
import './style.css'

const nav = [{ to: 'calc', label: 'Калькулятор' }, { to: 'result', label: 'До и после' }, { to: 'stages', label: 'Этапы' }, { to: 'projects', label: 'Объекты' }, { to: 'cta', label: 'Контакты' }]
const types = [{ l: 'Косметический', r: 6500, w: 0.55 }, { l: 'Капитальный', r: 12500, w: 1 }, { l: 'Дизайнерский', r: 19000, w: 1.35 }]
const houses = [{ l: 'Вторичка', k: 1 }, { l: 'Новостройка', k: 0.9 }, { l: 'Сталинка', k: 1.15 }]
const stages = [
  ['этап 1 · 1 день', 'Замер и смета', 'Инженер приезжает бесплатно, через 2 дня — подробная смета.'],
  ['этап 2 · 2–3 нед.', 'Черновые работы', 'Демонтаж, перегородки, электрика, сантехника, штукатурка.'],
  ['этап 3 · 1 нед.', 'Стяжка и потолки', 'Выравнивание пола, натяжные или гипсокартонные потолки.'],
  ['этап 4 · 2–4 нед.', 'Чистовая отделка', 'Плитка, обои или покраска, напольные покрытия, двери.'],
  ['этап 5 · 2 дня', 'Сдача', 'Установка сантехники, клининг и финальная приёмка.'],
]
const projects = [
  { id: '1502005097973-6a7082348e28', t: 'Кухня-гостиная на Профсоюзной', m: '58 м² · капитальный · 9 нед.' },
  { id: '1522708323590-d24dbb6b0267', t: 'Евродвушка в ЖК «Сердце»', m: '46 м² · дизайнерский · 12 нед.' },
  { id: '1560448204-e02f11c3d0e2', t: 'Сталинка на Соколе', m: '84 м² · капитальный · 14 нед.' },
  { id: '1512918728675-ed5a9ecdebfd', t: 'Спальня в Хамовниках', m: '22 м² · дизайнерский · 5 нед.' },
  { id: '1586023492125-27b2c045efd7', t: 'Студия на Таганке', m: '31 м² · косметический · 3 нед.' },
  { id: '1484154218962-a197022b5858', t: 'Кухня в Кунцеве', m: '12 м² · капитальный · 4 нед.' },
]
const guar = [
  [Banknote, 'Фиксированная цена', 'Если смета выросла по нашей ошибке — разницу оплачиваем мы.'],
  [Timer, 'Штраф за просрочку', '0,1% от стоимости этапа за каждый день задержки.'],
  [ShieldCheck, 'Гарантия 3 года', 'Трещины, отслоения, протечки — исправляем бесплатно.'],
  [Camera, 'Фотоотчёт', 'Каждую пятницу — фото и видео с объекта в мессенджер.'],
] as const
const faq = [
  ['Нужно ли согласовывать перепланировку?', 'Если переносите стены или мокрые зоны — да. Подготовим проект и пройдём согласование в МЖИ за вас: от 45 000 ₽, срок 1–2 месяца.'],
  ['Кто закупает материалы?', 'Черновые материалы закупаем мы по оптовым ценам с чеками. Чистовые можете выбрать сами или с нашим дизайнером — привезём и поднимем.'],
  ['Можно жить в квартире во время ремонта?', 'При косметическом ремонте — да, работаем по комнатам. При капитальном лучше переехать: пыль и шум неизбежны.'],
  ['Как оплачивать?', 'Поэтапно: после приёмки каждого этапа по акту. Аванс — только на закупку черновых материалов.'],
]

function Calc() {
  const [area, setArea] = useState(54)
  const [type, setType] = useState(1)
  const [house, setHouse] = useState(0)
  const [mat, setMat] = useState(false)
  const { sum, weeks } = useMemo(() => {
    let s = area * types[type].r * houses[house].k
    if (mat) s += area * 2200
    return { sum: Math.round(s / 1000) * 1000, weeks: Math.max(3, Math.round((area / 54) * types[type].w * 9)) }
  }, [area, type, house, mat])
  return (
    <motion.form className="calc" id="calc" onSubmit={e => { e.preventDefault(); document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' }) }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
      <span className="sheet">РАСЧЁТ / ЛИСТ 1</span>
      <h2>Сколько будет стоить ремонт</h2>
      <label className="f-l" htmlFor="area">Площадь квартиры <output className="mono">{area} м²</output></label>
      <input id="area" type="range" min={20} max={200} value={area} onChange={e => setArea(+e.target.value)} style={{ ['--p' as string]: `${((area - 20) / 180) * 100}%` }} />
      <span className="f-l">Тип ремонта</span>
      <div className="seg">{types.map((t, i) => <button key={t.l} type="button" aria-pressed={type === i} onClick={() => setType(i)}>{t.l}</button>)}</div>
      <span className="f-l">Дом</span>
      <div className="seg">{houses.map((h, i) => <button key={h.l} type="button" aria-pressed={house === i} onClick={() => setHouse(i)}>{h.l}</button>)}</div>
      <label className="chk"><input type="checkbox" checked={mat} onChange={e => setMat(e.target.checked)} /> Черновые материалы закупаем мы</label>
      <div className="out" aria-live="polite">
        <div><small>Стоимость работ</small><motion.b key={sum} className="mono" initial={{ opacity: 0.3 }} animate={{ opacity: 1 }}>{sum.toLocaleString('ru-RU')} ₽</motion.b></div>
        <div><small>Срок</small><b className="mono">{weeks} нед.</b></div>
      </div>
      <button className="btn" type="submit">Получить точную смету</button>
    </motion.form>
  )
}

export default function Page() {
  useSiteMeta({ title: 'Квадрат — ремонт квартир по смете', color: '#1F4E8C', letter: 'К', fonts: 'family=IBM+Plex+Sans:wght@400;500;700&family=IBM+Plex+Mono:wght@400;500' })
  const scrolled = useScrolled()
  const submit = useSubmit('Готово! Инженер позвонит, чтобы согласовать время замера.')
  const [lb, setLb] = useState(-1)
  return (
    <SiteShell slug="remont">
      <header className={scrolled ? 'is-scrolled' : ''}>
        <div className="wrap">
          <a href="#/sites/remont" className="logo"><b />Квадрат</a>
          <nav aria-label="Основное меню">{nav.map(l => <Jump key={l.to} to={l.to}>{l.label}</Jump>)}</nav>
          <a href="tel:+79000000000" className="mono hphone">+7 900 000-00-00</a>
          <MobileMenu links={nav} extra={<a href="tel:+79000000000">+7 900 000-00-00</a>} />
        </div>
      </header>

      <section className="hero">
        <div className="hero-ph" aria-hidden><img src={u('1583847268964-b28dc8f51f92', 1600)} alt="" /></div>
        <div className="wrap">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="dim mono">ремонт квартир · Москва и область</div>
            <h1>Смета, которая не вырастет посреди ремонта</h1>
            <p className="lead">Считаем всё до начала работ, фиксируем цену в договоре и платим за этапы, а не авансом за весь ремонт.</p>
            <ul className="promise">
              <li><span className="mono">±0 ₽</span>Отклонение от сметы в 2025 году по 87 объектам</li>
              <li><span className="mono">3 года</span>Гарантия на все работы по договору</li>
              <li><span className="mono">1 раз/нед</span>Фотоотчёт и встреча на объекте с прорабом</li>
            </ul>
          </motion.div>
          <Calc />
        </div>
      </section>

      <section className="white" id="result">
        <div className="wrap ba-wrap">
          <div>
            <Reveal><h2 className="t">Было — стало</h2><p className="s">Сталинка 84 м² на Соколе. Тяните разделитель, чтобы сравнить квартиру до начала работ и после сдачи.</p></Reveal>
            <Reveal delay={0.1}><dl className="spec">
              <div><dt className="mono">площадь</dt><dd>84 м²</dd></div><div><dt className="mono">срок</dt><dd>14 недель</dd></div>
              <div><dt className="mono">смета</dt><dd>1 260 000 ₽</dd></div><div><dt className="mono">итог</dt><dd>1 260 000 ₽</dd></div>
            </dl></Reveal>
          </div>
          <Reveal delay={0.1}><BeforeAfter before={u('1634586648651-f1fb9ec10d90', 1400)} after={u('1554995207-c18c203602cb', 1400)} /></Reveal>
        </div>
      </section>

      <section id="stages">
        <div className="wrap">
          <Reveal><h2 className="t">Как идёт ремонт</h2><p className="s">Оплата — после приёмки каждого этапа. На каждом этапе вы подписываете акт.</p></Reveal>
          <div className="stages">{stages.map(([m, t, p], i) => <Reveal key={t} delay={i * 0.08} className="stage"><span className="mono">{m}</span><h3>{t}</h3><p>{p}</p></Reveal>)}</div>
          <div className="work">
            {[['1768839725085-829e6ac7ac26', 'Штукатурка по маякам'], ['1731168273756-e02cae42265b', 'Резка керамогранита'], ['1517581177682-a085bb7ffb15', 'Монтаж потолка']].map(([id, c], i) => (
              <Reveal key={id} delay={i * 0.1} className="work-i"><img src={u(id, 700)} alt={c} loading="lazy" /><span className="mono">{c}</span></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="white" id="projects">
        <div className="wrap">
          <div className="head"><Reveal><h2 className="t">Последние объекты</h2></Reveal><Reveal delay={0.1}><p className="s">Нажмите на фото, чтобы посмотреть крупнее. Любой объект можно посмотреть вживую.</p></Reveal></div>
          <div className="proj">
            {projects.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 0.08} className={'pj' + (i === 0 ? ' big' : '')}>
                <button type="button" onClick={() => setLb(i)} aria-label={`Открыть фото: ${p.t}`}><img src={u(p.id, i === 0 ? 1200 : 700)} alt={p.t} loading="lazy" /></button>
                <div><h3>{p.t}</h3><p className="mono">{p.m}</p></div>
              </Reveal>
            ))}
          </div>
          <Lightbox open={lb >= 0} index={lb} close={() => setLb(-1)} slides={projects.map(p => ({ src: u(p.id, 1800), alt: p.t, title: p.t }))} />
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal><h2 className="t">Что прописано в договоре</h2><p className="s">Не устные обещания, а пункты, за которые мы отвечаем деньгами.</p></Reveal>
          <div className="guar">{guar.map(([I, t, p], i) => <Reveal key={t} delay={i * 0.08}><I size={26} /><h3>{t}</h3><p>{p}</p></Reveal>)}</div>
        </div>
      </section>

      <section className="white">
        <div className="wrap faq">
          <Reveal><h2 className="t">Вопросы</h2><p className="s"><Wrench size={16} style={{ display: 'inline', verticalAlign: '-3px' }} /> Отвечает главный инженер Олег Васильев, 22 года в ремонте.</p></Reveal>
          <Reveal delay={0.1}><Accordion items={faq} /></Reveal>
        </div>
      </section>

      <section className="cta" id="cta">
        <div className="wrap">
          <Reveal><h2 className="t">Вызовите инженера на замер</h2><p><Ruler size={18} style={{ display: 'inline', verticalAlign: '-3px' }} /> Бесплатно. Через 2 дня после замера — смета с ценой каждой работы.</p></Reveal>
          <Reveal delay={0.1}>
            <form onSubmit={submit}>
              <input required placeholder="Имя" aria-label="Имя" autoComplete="name" />
              <PhoneInput required aria-label="Телефон" />
              <input placeholder="Адрес или район" aria-label="Адрес" className="full" />
              <button className="btn full" type="submit">Вызвать замерщика</button>
            </form>
          </Reveal>
        </div>
      </section>

      <footer><div className="wrap"><span>© Квадрат, 2026</span><span>Демо-сайт для портфолио. Компания вымышленная.</span></div></footer>
      <MobileCTA to="calc">Рассчитать ремонт</MobileCTA>
    </SiteShell>
  )
}
