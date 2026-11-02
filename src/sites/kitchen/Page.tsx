import { motion } from 'motion/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import { Marquee } from '../../shared/Marquee'
import { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { Ruler, PenTool, Factory, Wrench } from 'lucide-react'
import { SiteShell } from '../../shared/SiteShell'
import { Reveal } from '../../shared/Reveal'
import { useSiteMeta } from '../../shared/hooks'
import { u } from '../../shared/img'
import { BizLayout, type BizInfo } from '../../shared/biz/BizLayout'
import { PageHead, Sec, Gallery, Faq, CtaBand, ContactBlock, CardRail, MapReviews } from '../../shared/biz/blocks'
import './style.css'

const base = '/sites/kitchen'
const info: BizInfo = { phone: '+7 (843) 200-40-40', address: 'Казань, ул. Сибирский тракт, 34, шоурум', hours: 'Пн–Сб 10:00–20:00', about: 'Кухни на заказ по индивидуальным размерам. Собственное производство в Казани, гарантия 5 лет.' }
const projects = [
  ['1759691337957-ebc9ed54dc44', 'Современные', 'Кухня «Графит», 12 м²'], ['1759691554646-8155da2172ee', 'Классика', 'Кухня «Прованс», 9 м²'], ['1759691337936-ef702afd0714', 'Современные', 'Кухня с островом, 18 м²'],
  ['1781249144275-c04daed37031', 'Скандинавские', 'Кухня «Фьорд», 8 м²'], ['1755624222023-621f7718950b', 'Современные', 'Кухня-гостиная, 24 м²'], ['1630699144641-72fa7a6b8aa1', 'Классика', 'Кухня «Орех», 11 м²'],
  ['1484154218962-a197022b5858', 'Скандинавские', 'Кухня «Лён», 7 м²'], ['1774578342017-3885f7f52825', 'Современные', 'Угловая кухня, 10 м²'], ['1778731525362-d4236da27aa4', 'Скандинавские', 'Кухня «Береза», 9 м²'],
].map(([img, cat, title]) => ({ img, cat, title }))

/** Прикидка стоимости по длине гарнитура и материалу фасадов */
function Estimate() {
  const [len, setLen] = useState(3.2)
  const [mat, setMat] = useState(1)
  const [shape, setShape] = useState(1)
  const mats = [['ЛДСП', 38000], ['Эмаль', 52000], ['Шпон', 68000]] as const
  const shapes = [['Прямая', 1], ['Угловая', 1.15], ['С островом', 1.35]] as const
  const sum = Math.round((len * mats[mat][1] * shapes[shape][1]) / 1000) * 1000
  return (
    <div className="kt-est">
      <div className="kt-est-l">
        <div><span>Форма</span><div className="kt-seg">{shapes.map(([n], i) => <button key={n} type="button" aria-pressed={shape === i} onClick={() => setShape(i)}>{n}</button>)}</div></div>
        <div><span>Фасады</span><div className="kt-seg">{mats.map(([n], i) => <button key={n} type="button" aria-pressed={mat === i} onClick={() => setMat(i)}>{n}</button>)}</div></div>
        <div><span>Длина гарнитура: <b>{len.toFixed(1)} м</b></span><input type="range" min={1.8} max={8} step={0.1} value={len} onChange={e => setLen(+e.target.value)} aria-label="Длина гарнитура" /></div>
      </div>
      <div className="kt-est-r">
        <small>Ориентировочно</small>
        <motion.b key={sum} initial={{ opacity: 0.3 }} animate={{ opacity: 1 }}>от {sum.toLocaleString('ru-RU')} ₽</motion.b>
        <p>Без техники и столешницы. Точную смету дизайнер посчитает после замера — бесплатно.</p>
        <Link to={`${base}/contacts`} className="bbtn full">Вызвать замерщика</Link>
      </div>
    </div>
  )
}

function Home() {
  return (
    <>
      <section className="kt-hero">
        <div className="bwrap">
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>Кухня, которая<br />встанет <span>миллиметр</span><br />в миллиметр</motion.h1>
          <div className="kt-hero-row">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>Проектируем под ваши стены, коммуникации и привычки. Производство в Казани — от замера до установки за 30 дней.</motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="kt-acts"><Link to={`${base}/contacts`} className="bbtn big">Бесплатный замер</Link><Link to={`${base}/projects`} className="bbtn ghost big">Проекты</Link></motion.div>
          </div>
        </div>
        <motion.div className="kt-hero-img bwrap" initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 1 }}>
          <Swiper modules={[Autoplay, EffectFade, Pagination]} effect="fade" speed={1000} loop autoplay={{ delay: 5000, disableOnInteraction: false }} pagination={{ clickable: true }}>
            {[
              ['1759691337936-ef702afd0714', 'Кухня с островом · 18 м²', 'Столешница — кварцевый агломерат', 'Фасады — матовая эмаль'],
              ['1755624222023-621f7718950b', 'Кухня-гостиная · 24 м²', 'Встроенный холодильник Bosch', 'Подсветка рабочей зоны'],
              ['1781249144275-c04daed37031', 'Кухня «Фьорд» · 8 м²', 'Шпон дуба под маслом', 'Фурнитура Blum с доводчиками'],
            ].map(([img, cap, t1, t2]) => (
              <SwiperSlide key={img}>
                <img src={u(img, 2000)} alt={cap} />
                <div className="kt-tag t1"><i />{t1}</div>
                <div className="kt-tag t2"><i />{t2}</div>
                <span className="kt-cap">{cap}</span>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </section>

      <Marquee className="kt-mq" items={['Своё производство в Казани', 'Фурнитура Blum и Hettich', 'Гарантия 5 лет', '3D-проект бесплатно', 'Рассрочка 0% на 12 месяцев']} />

      <section className="kt-nums bwrap">
        {[['30', 'дней от замера до установки'], ['5 лет', 'гарантия на корпус и фурнитуру'], ['1 400+', 'кухонь установлено в Казани'], ['0 ₽', 'замер и 3D-проект']].map(([b, t], i) => <Reveal key={b} delay={i * 0.06}><b>{b}</b><span>{t}</span></Reveal>)}
      </section>

      <Sec>
        <CardRail title="Последние проекты" more={{ label: 'Все проекты', to: `${base}/projects` }} view={[1.1, 1.6, 2.4]} items={[
          { img: '1759691337936-ef702afd0714', title: 'Кухня с островом, ЖК «Сказочный лес»', meta: ['18 м²', 'Эмаль + кварц', '412 000 ₽', '28 дней'] },
          { img: '1759691337957-ebc9ed54dc44', title: 'Кухня «Графит», Ново-Савиновский', meta: ['12 м²', 'ЛДСП Egger', '186 000 ₽', '24 дня'] },
          { img: '1781249144275-c04daed37031', title: 'Кухня «Фьорд», Приволжский', meta: ['8 м²', 'Шпон дуба', '238 000 ₽', '30 дней'] },
          { img: '1755624222023-621f7718950b', title: 'Кухня-гостиная, Вахитовский', meta: ['24 м²', 'Эмаль', '465 000 ₽', '32 дня'] },
          { img: '1759691554646-8155da2172ee', title: 'Кухня «Прованс», Дербышки', meta: ['9 м²', 'МДФ с фрезеровкой', '204 000 ₽', '26 дней'] },
          { img: '1774578342017-3885f7f52825', title: 'Угловая кухня, Азино', meta: ['10 м²', 'ЛДСП + HPL', '158 000 ₽', '21 день'] },
        ]} />
      </Sec>

      <Sec kicker="Калькулятор" title="Сколько стоит кухня" className="kt-soft"><Estimate /></Sec>
      <Sec kicker="Отзывы" title="Кухни, в которых готовят каждый день">
        <MapReviews rating="4,9" count="430" items={[
          { name: 'Алия и Марат', date: '10 октября', text: 'Кухня встала идеально, хотя стены в доме кривые на 3 см. Дизайнер предложил скрытую ручку и выдвижной стол — пользуемся каждый день.', tag: 'Кухня с островом' },
          { name: 'Светлана', date: '30 сентября', text: 'Сделали за 26 дней вместо обещанных 30. Монтажники убрали за собой, подключили мойку и духовку.', tag: 'Кухня «Прованс»' },
          { name: 'Игорь', date: '14 сентября', text: 'Сравнивал с тремя салонами — у «Модуля» вышло на 70 тысяч дешевле с той же фурнитурой Blum.', tag: 'Угловая кухня' },
          { name: 'Регина', date: '2 сентября', text: 'Через полгода отошла кромка на одном фасаде — приехали и заменили бесплатно за два дня.', tag: 'Гарантия' },
        ]} />
      </Sec>

      <CtaBand title="3D-проект в подарок" text="Дизайнер приедет с образцами, сделает замер и покажет кухню в 3D ещё до договора." to={`${base}/contacts`} btn="Записаться на замер" />
    </>
  )
}

function Projects() {
  return (
    <>
      <PageHead kicker="Портфолио" title="Наши кухни" text="Каждая кухня здесь — реальный проект для семьи из Казани. Нажмите на фото, чтобы рассмотреть детали." />
      <Sec><Gallery items={projects} /></Sec>
    </>
  )
}

function Process() {
  const steps = [[Ruler, 'Замер', 'Дизайнер приезжает с образцами фасадов и столешниц, снимает размеры и учитывает розетки, трубы и вытяжку.', '1 день'], [PenTool, '3D-проект', 'Рисуем кухню в 3D, подбираем технику и фурнитуру. Правим, пока вам не понравится.', '2–3 дня'], [Factory, 'Производство', 'Распил, кромка и сборка на нашем станке в Казани. Каждый модуль проверяем перед отгрузкой.', '21 день'], [Wrench, 'Монтаж', 'Собираем, подключаем мойку и технику, вывозим мусор.', '1 день']] as const
  return (
    <>
      <PageHead kicker="Как мы работаем" title="От замера до ужина" text="Фиксируем цену и сроки в договоре. Опоздали с установкой — платим 0,5% от стоимости за каждый день." img="1786053538161-501fbdd89629" />
      <Sec>
        <div className="kt-proc">
          {steps.map(([I, t, d, time], i) => <Reveal key={t} delay={i * 0.06} className="kt-proc-i"><div className="kt-proc-n"><I /><span>0{i + 1}</span></div><h3>{t}</h3><p>{d}</p><small>{time}</small></Reveal>)}
        </div>
      </Sec>
      <Sec title="Материалы" className="kt-soft">
        <div className="kt-mats">
          {[['ЛДСП Egger', 'Австрийская плита класса E1. Сотни декоров под дерево и камень.', 'от 38 000 ₽/м'], ['Эмаль', 'МДФ с покраской в 5 слоёв. Любой цвет по RAL, матовая или глянцевая.', 'от 52 000 ₽/м'], ['Натуральный шпон', 'Дуб и орех. Тёплая фактура, покрытие маслом или лаком.', 'от 68 000 ₽/м']].map(([t, d, p], i) => <Reveal key={t} delay={i * 0.06} className="kt-mat"><h3>{t}</h3><p>{d}</p><b>{p}</b></Reveal>)}
        </div>
      </Sec>
      <Sec title="Вопросы">
        <Faq items={[['Замер действительно бесплатный?', 'Да, по Казани и пригороду до 30 км. Вы ничего не обязаны заказывать после замера.'], ['Можно ли в рассрочку?', 'Да, рассрочка 0% на 12 месяцев без первого взноса через банк-партнёр.'], ['Что входит в гарантию?', 'Корпуса, фасады и фурнитура Blum — 5 лет. Если что-то сломается, приедем и заменим бесплатно.'], ['Поможете с техникой?', 'Подберём и закажем технику со скидкой партнёра до 15% и встроим при монтаже.']]} />
      </Sec>
    </>
  )
}

function About() {
  return (
    <>
      <PageHead kicker="О компании" title="Своё производство в Казани" text="С 2015 года делаем кухни сами: от распила плиты до установки. Без посредников — поэтому дешевле салонов на 20–30%." />
      <Sec>
        <div className="kt-about">
          <Reveal className="kt-about-img"><img src={u('1755624222023-621f7718950b', 1100)} alt="Кухня в интерьере" loading="lazy" /></Reveal>
          <Reveal delay={0.1} className="kt-about-txt">
            <p>Начинали с одной кухни для друзей в гараже на Горках. Сегодня у нас цех на 900 м², немецкий форматно-раскроечный станок и команда из 26 человек.</p>
            <p>Мы не продаём «типовые модули». Каждая кухня проектируется под конкретное помещение — с учётом кривых стен, труб и того, что вы левша и любите печь по выходным.</p>
            <ul><li><b>26</b> человек в команде</li><li><b>900 м²</b> производства</li><li><b>Blum, Hettich</b> — фурнитура</li></ul>
          </Reveal>
        </div>
      </Sec>
      <CtaBand title="Приезжайте в шоурум" text="12 кухонь в натуральную величину на Сибирском тракте. Можно потрогать фасады и пощёлкать ящиками." to={`${base}/contacts`} btn="Как добраться" />
    </>
  )
}

function Contacts() {
  return (
    <>
      <PageHead kicker="Контакты" title="Записаться на замер" text="Оставьте заявку — дизайнер перезвонит и согласует удобное время." />
      <Sec><ContactBlock info={info} title="Бесплатный замер" note="Приедем с образцами фасадов и столешниц." options={{ label: 'Площадь кухни', values: ['до 6 м²', '6–10 м²', '10–15 м²', 'больше 15 м²', 'кухня-гостиная'] }} /></Sec>
    </>
  )
}

export default function Page() {
  useSiteMeta({ title: 'Модуль — кухни на заказ в Казани', color: '#A8743E', letter: 'М', fonts: 'family=Montserrat:wght@300;400;500;600;700&family=Inter:wght@400;500;600' })
  return (
    <SiteShell slug="kitchen">
      <BizLayout base={base} brand="МОДУЛЬ" logo={<span className="kt-logo">МОДУЛЬ<small>кухни на заказ</small></span>} links={[{ to: 'projects', label: 'Проекты' }, { to: 'process', label: 'Как работаем' }, { to: 'about', label: 'О компании' }, { to: 'contacts', label: 'Контакты' }]} cta={{ label: 'Бесплатный замер', to: 'contacts' }} info={info}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="process" element={<Process />} />
          <Route path="about" element={<About />} />
          <Route path="contacts" element={<Contacts />} />
        </Routes>
      </BizLayout>
    </SiteShell>
  )
}
