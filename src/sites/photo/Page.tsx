import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react'
import { useMemo, useRef, useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/captions.css'
import { SiteShell } from '../../shared/SiteShell'
import { Reveal } from '../../shared/Reveal'
import { Jump } from '../../shared/Jump'
import { MobileMenu } from '../../shared/MobileMenu'
import { PhoneInput } from '../../shared/PhoneInput'
import { useScrolled, useSiteMeta } from '../../shared/hooks'
import { useSubmit } from '../../shared/useForm'
import { u } from '../../shared/img'
import './style.css'

const nav = [{ to: 'works', label: 'Работы' }, { to: 'prices', label: 'Стоимость' }, { to: 'about', label: 'Обо мне' }, { to: 'contact', label: 'Связаться' }]
const photos = [
  { id: '1506863530036-1efeddceb993', c: 'Портрет', w: 3, h: 4 }, { id: '1517462964-21fdcec3f25b', c: 'Портрет', w: 4, h: 5 },
  { id: '1529626455594-4ff0802cfb7e', c: 'Стиль', w: 4, h: 3 }, { id: '1524502397800-2eeaad7c3fe5', c: 'Портрет', w: 3, h: 4 },
  { id: '1531746020798-e6953c6e8e04', c: 'Стиль', w: 4, h: 5 }, { id: '1526510747491-58f928ec870f', c: 'Портрет', w: 1, h: 1 },
  { id: '1514960919797-5ff58c52e5ba', c: 'Стиль', w: 3, h: 4 }, { id: '1606143412458-acc5f86de897', c: 'Студия', w: 4, h: 5 },
  { id: '1527201987695-67c06571957e', c: 'Студия', w: 4, h: 3 }, { id: '1581841064838-a470c740e8ee', c: 'Стиль', w: 3, h: 4 },
  { id: '1438761681033-6461ffad8d80', c: 'Портрет', w: 4, h: 5 }, { id: '1614204424926-196a80bf0be8', c: 'Студия', w: 3, h: 4 },
]
const packs = [
  ['Портрет', 'от 9 000 ₽', ['1 час съёмки', '30 фото в цвете и ч/б', '5 фото с детальной ретушью', 'Помощь с образом и локацией']],
  ['Love story', 'от 15 000 ₽', ['2 часа, 2 локации', '60 фото', '10 фото с ретушью', 'Короткое видео-слайдшоу']],
  ['Студийная', 'от 12 000 ₽', ['Аренда студии включена', '1,5 часа, 2 образа', '40 фото', 'Визажист — по желанию']],
] as const

export default function Page() {
  useSiteMeta({ title: 'Анна Ветрова — фотограф', color: '#161616', letter: 'А', fonts: 'family=Prata&family=Golos+Text:wght@400;500' })
  const scrolled = useScrolled()
  const submit = useSubmit('Спасибо! Напишу вам сегодня.')
  const [cat, setCat] = useState('Все')
  const [lb, setLb] = useState(-1)
  const list = useMemo(() => photos.filter(p => cat === 'Все' || p.c === cat), [cat])
  const strip = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: strip, offset: ['start end', 'end start'] })
  const x1 = useTransform(scrollYProgress, [0, 1], ['4%', '-8%'])
  const x2 = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  return (
    <SiteShell slug="photo">
      <header className={scrolled ? 'is-scrolled' : ''}>
        <div className="wrap">
          <a className="logo" href="#/sites/photo">Анна Ветрова</a>
          <nav aria-label="Основное меню">{nav.map(l => <Jump key={l.to} to={l.to}>{l.label}</Jump>)}</nav>
          <MobileMenu links={nav} />
        </div>
      </header>

      <section className="hero">
        <div className="wrap">
          <h1>{'Снимаю людей такими, какими их знают близкие'.split(' ').map((w, i) => <motion.span key={i} initial={{ opacity: 0, y: '0.6em' }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.07, duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}>{w}&nbsp;</motion.span>)}</h1>
          <motion.div className="row" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
            <p>Портреты, love story и студийные съёмки. Без постановочных поз — работаю со светом, местом и разговором. Москва и выезд по России.</p>
            <Jump to="contact" className="btn">Обсудить съёмку</Jump>
          </motion.div>
        </div>
      </section>

      <div className="strip" ref={strip}>
        <motion.div style={{ x: x1 }} className="srow">{photos.slice(0, 4).map(p => <img key={p.id} src={u(p.id, 700)} alt="" loading="eager" />)}</motion.div>
        <motion.div style={{ x: x2 }} className="srow">{photos.slice(4, 8).map(p => <img key={p.id} src={u(p.id, 700)} alt="" />)}</motion.div>
      </div>

      <section id="works">
        <div className="wrap">
          <div className="head">
            <Reveal><h2 className="t">Работы</h2></Reveal>
            <div className="filters">{['Все', 'Портрет', 'Стиль', 'Студия'].map(c => <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>)}</div>
          </div>
          <motion.div layout className="gallery">
            <AnimatePresence>
              {list.map((p, i) => (
                <motion.button layout key={p.id} type="button" onClick={() => setLb(i)} aria-label={`Открыть фото ${i + 1}`} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.35 }}>
                  <img src={u(p.id, 700)} alt={`${p.c}, фото ${i + 1}`} loading="lazy" style={{ aspectRatio: `${p.w}/${p.h}` }} />
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
          <Lightbox open={lb >= 0} index={lb} close={() => setLb(-1)} plugins={[Captions]} slides={list.map((p, i) => ({ src: u(p.id, 2000), title: `${p.c} · ${i + 1} / ${list.length}` }))} />
        </div>
      </section>

      <section id="prices">
        <div className="wrap">
          <Reveal><h2 className="t">Стоимость</h2><p className="s">Готовые фото — через 7 дней в онлайн-галерее. Предоплата 30% для бронирования даты.</p></Reveal>
          <div className="packs">{packs.map(([n, p, items], i) => <Reveal key={n} delay={i * 0.1} className="pack"><h3>{n}</h3><p className="pr">{p}</p><ul>{items.map(x => <li key={x}>{x}</li>)}</ul></Reveal>)}</div>
        </div>
      </section>

      <section id="about">
        <div className="wrap about">
          <Reveal><img src={u('1422015347944-9dd46d16bd0b', 900)} alt="Фотограф с плёночной камерой" loading="lazy" /></Reveal>
          <Reveal delay={0.1}>
            <h2 className="t">Обо мне</h2>
            <p>Снимаю 9 лет. Начинала с репортажей для городского издания — там научилась быть незаметной и ловить момент, а не выстраивать его.</p>
            <p>Сейчас снимаю частных клиентов и небольшие компании. Перед каждой съёмкой мы созваниваемся: мне важно понять, какие фото вы будете хранить и кому показывать.</p>
            <blockquote>«Хорошая фотография — та, которую через десять лет достают из альбома первой».</blockquote>
          </Reveal>
        </div>
      </section>

      <div className="contact" id="contact">
        <div className="wrap">
          <Reveal>
            <h2 className="t">Давайте обсудим вашу съёмку</h2>
            <p>Отвечаю в течение дня. Даты на ближайший месяц уточняйте заранее — выходные разбирают быстро.</p>
            <div className="links"><a href="https://t.me/">Telegram</a><a href="https://vk.com/">ВКонтакте</a><a href="tel:+79000000000">+7 900 000-00-00</a></div>
          </Reveal>
          <Reveal delay={0.1}>
            <form onSubmit={submit}>
              <input required placeholder="Как вас зовут" aria-label="Имя" autoComplete="name" />
              <PhoneInput required aria-label="Телефон" placeholder="Телефон" />
              <select aria-label="Тип съёмки"><option>Портрет</option><option>Love story</option><option>Студийная</option><option>Для бизнеса</option></select>
              <textarea rows={3} placeholder="Желаемая дата и пара слов об идее" aria-label="Описание" />
              <button className="btn" type="submit">Отправить</button>
            </form>
          </Reveal>
        </div>
      </div>
      <footer><div className="wrap"><span>© Анна Ветрова, 2026</span><span>Демо-сайт для портфолио. Фотограф вымышленный, фото — Unsplash.</span></div></footer>
    </SiteShell>
  )
}
