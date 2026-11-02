import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { Palette, Music, Brain, Languages, Blocks, Footprints } from 'lucide-react'
import { SiteShell } from '../../shared/SiteShell'
import { Reveal } from '../../shared/Reveal'
import { useSiteMeta } from '../../shared/hooks'
import { u } from '../../shared/img'
import { BizLayout, type BizInfo } from '../../shared/biz/BizLayout'
import { PageHead, Sec, Team, Faq, CtaBand, ContactBlock, Gallery, PeopleRail, CardRail, MapReviews } from '../../shared/biz/blocks'
import './style.css'

const base = '/sites/kids'
const info: BizInfo = { phone: '+7 (843) 200-50-50', address: 'Казань, ул. Адоратского, 21', hours: 'Пн–Сб 9:00–20:00', about: 'Детский развивающий центр для детей от 1,5 до 10 лет. Маленькие группы и опытные педагоги.' }
const programs = [
  { icon: Brain, t: 'Подготовка к школе', age: '5–7 лет', min: 5, max: 7, d: 'Чтение, счёт, письмо и логика. Ребёнок придёт в 1 класс уверенным.', p: '5 600 ₽/мес', c: '#FF7A59' },
  { icon: Blocks, t: 'Раннее развитие', age: '1,5–3 года', min: 1.5, max: 3, d: 'Занятия вместе с мамой: моторика, речь, сенсорика.', p: '4 800 ₽/мес', c: '#FFB627' },
  { icon: Palette, t: 'Изостудия', age: '4–10 лет', min: 4, max: 10, d: 'Акварель, гуашь, лепка и выставки работ два раза в год.', p: '4 200 ₽/мес', c: '#3DBE8B' },
  { icon: Languages, t: 'Английский', age: '4–10 лет', min: 4, max: 10, d: 'Через игры и песни с первого урока. Группы до 6 детей.', p: '5 200 ₽/мес', c: '#4D8BFF' },
  { icon: Music, t: 'Музыка и ритмика', age: '3–6 лет', min: 3, max: 6, d: 'Пение, танцы и игра на детских инструментах.', p: '3 900 ₽/мес', c: '#B57BFF' },
  { icon: Footprints, t: 'Мини-сад', age: '3–5 лет', min: 3, max: 5, d: 'Полдня в центре: занятия, прогулка, обед и игры.', p: '18 000 ₽/мес', c: '#FF5D8F' },
]
const teachers = [
  { name: 'Елена Викторовна', role: 'Подготовка к школе', img: '1758685847747-597ce085906e', text: 'Учитель начальных классов, 18 лет стажа.' },
  { name: 'Гульназ Ринатовна', role: 'Раннее развитие', img: '1590650213165-c1fef80648c4', text: 'Детский психолог, методика Монтессори.' },
  { name: 'Анна Сергеевна', role: 'Английский язык', img: '1573496800808-56566a492b63', text: 'CELTA, жила в Великобритании 3 года.' },
  { name: 'Дарья Олеговна', role: 'Изостудия', img: '1758685848142-06e158cf64bc', text: 'Художник-иллюстратор, выпускница КХУ.' },
]

function AgePicker() {
  const ages = [2, 3, 4, 5, 6, 7, 8]
  const [age, setAge] = useState(5)
  const list = programs.filter(p => age >= p.min && age <= p.max)
  return (
    <div className="kd-age">
      <div className="kd-age-row"><span>Сколько лет ребёнку?</span><div>{ages.map(a => <button key={a} type="button" aria-pressed={age === a} onClick={() => setAge(a)}>{a === 8 ? '8+' : a}</button>)}</div></div>
      <motion.div layout className="kd-progs">
        <AnimatePresence mode="popLayout">
          {list.map(p => (
            <motion.div layout key={p.t} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="kd-prog" style={{ '--c': p.c } as React.CSSProperties}>
              <span className="kd-ic"><p.icon /></span><small>{p.age}</small><h3>{p.t}</h3><p>{p.d}</p><b>{p.p}</b>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

function Home() {
  return (
    <>
      <section className="kd-hero">
        <div className="bwrap kd-hero-in">
          <div>
            <motion.p className="kd-kick" initial={{ opacity: 0, rotate: -6 }} animate={{ opacity: 1, rotate: -3 }}>от 1,5 до 10 лет</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>Здесь детям <span className="kd-hl">интересно</span>, а родителям — спокойно</motion.h1>
            <motion.p className="kd-lead" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>Развивающий центр на Адоратского: группы до 6 детей, педагоги с профильным образованием и видео с занятий в родительском чате.</motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="kd-acts"><Link to={`${base}/contacts`} className="bbtn big">Пробное занятие бесплатно</Link><Link to={`${base}/programs`} className="bbtn ghost big">Направления</Link></motion.div>
          </div>
          <div className="kd-hero-art">
            <motion.img initial={{ opacity: 0, scale: 0.9, rotate: 4 }} animate={{ opacity: 1, scale: 1, rotate: 2 }} transition={{ duration: 0.9 }} src={u('1578349035260-9f3d4042f1f7', 900)} alt="Дети рисуют на занятии" />
            <motion.span className="kd-shape s1" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} />
            <motion.span className="kd-shape s2" animate={{ y: [0, -14, 0] }} transition={{ duration: 3, repeat: Infinity }} />
            <motion.span className="kd-shape s3" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 4, repeat: Infinity }} />
          </div>
        </div>
      </section>

      <Sec kicker="Подберите занятие" title="Что подойдёт вашему ребёнку"><AgePicker /></Sec>

      <section className="kd-band">
        <div className="bwrap kd-band-in">
          {[['6', 'детей максимум в группе'], ['12', 'педагогов с профильным образованием'], ['850', 'выпускников пошли в школу с нами'], ['0 ₽', 'пробное занятие']].map(([b, t], i) => <Reveal key={b} delay={i * 0.06}><b>{b}</b><span>{t}</span></Reveal>)}
        </div>
      </section>

      <Sec>
        <CardRail title="Как проходят занятия" view={[1.2, 2.2, 3.2]} items={[
          { img: '1578349035260-9f3d4042f1f7', title: 'Изостудия', text: 'Рисуем гуашью и акварелью, раз в полгода — выставка для родителей.', meta: ['4–10 лет'] },
          { img: '1588075592446-265fd1e6e76f', title: 'Подготовка к школе', text: 'Читаем по слогам, решаем примеры, учимся держать ручку.', meta: ['5–7 лет'] },
          { img: '1484820540004-14229fe36ca4', title: 'Раннее развитие', text: 'Моторика, речь и первые друзья — вместе с мамой.', meta: ['1,5–3 года'] },
          { img: '1605627079912-97c3810a11a4', title: 'Творческая мастерская', text: 'Лепим, клеим, мастерим поделки к праздникам.', meta: ['3–6 лет'] },
          { img: '1761403942462-04b8b97f1fe9', title: 'Английский', text: 'Песни, игры и карточки — без зубрёжки и домашних заданий.', meta: ['4–10 лет'] },
        ]} />
      </Sec>

      <Sec className="kd-soft">
        <PeopleRail title="Педагоги" more={{ label: 'Все педагоги', to: `${base}/teachers` }} people={teachers.map((t, i) => ({ ...t, meta: ['Стаж 18 лет', 'Стаж 9 лет', 'Стаж 7 лет', 'Стаж 5 лет'][i] }))} />
      </Sec>

      <Sec kicker="Отзывы" title="Что говорят родители">
        <MapReviews rating="5,0" count="318" items={[
          { name: 'Эльмира, мама Самира', date: '11 октября', text: 'Ходим на подготовку к школе с сентября. Сын сам садится читать вечером — для нас это чудо.', tag: 'Подготовка к школе' },
          { name: 'Анна, мама Вари', date: '2 октября', text: 'Дочка стеснительная, но в группе из пяти детей быстро освоилась. Видео с занятий в чате — очень спокойно.', tag: 'Изостудия' },
          { name: 'Руслан, папа Амира', date: '20 сентября', text: 'Мини-сад выручает: забираем в обед, ребёнок накормлен и доволен. Педагоги внимательные.', tag: 'Мини-сад' },
          { name: 'Ольга, мама Миши', date: '9 сентября', text: 'Английский без скучной зубрёжки — Миша поёт песенки и сам называет предметы дома.', tag: 'Английский' },
        ]} />
      </Sec>
      <CtaBand title="Приходите на пробное занятие" text="Бесплатно, 45 минут. Познакомитесь с педагогом и посмотрите, понравится ли ребёнку." to={`${base}/contacts`} btn="Записаться" />
    </>
  )
}

function Programs() {
  return (
    <>
      <PageHead kicker="Направления" title="Занятия и цены" text="Абонемент на 8 занятий в месяц. Пропуск по болезни переносим на следующий месяц." />
      <Sec>
        <div className="kd-progs">
          {programs.map((p, i) => <Reveal key={p.t} delay={(i % 3) * 0.06} className="kd-prog" ><div style={{ '--c': p.c } as React.CSSProperties} className="kd-prog-in"><span className="kd-ic"><p.icon /></span><small>{p.age}</small><h3>{p.t}</h3><p>{p.d}</p><b>{p.p}</b></div></Reveal>)}
        </div>
      </Sec>
      <Sec title="Вопросы родителей" className="kd-soft">
        <Faq items={[['Можно ли присутствовать на занятии?', 'На раннем развитии — обязательно, занятия проходят вместе с мамой. На остальных — первые 2–3 раза можно, чтобы ребёнок привык.'], ['Что если ребёнок заболел?', 'Сообщите до начала занятия — перенесём его на любой другой день или на следующий месяц.'], ['Есть ли скидки?', 'Второй ребёнок или второе направление — скидка 10%. Многодетным семьям — 15%.'], ['Как узнать, что было на занятии?', 'После каждого урока педагог отправляет фото, видео и домашнее задание в чат группы.']]} />
      </Sec>
    </>
  )
}

function Teachers() {
  return (
    <>
      <PageHead kicker="Команда" title="Наши педагоги" text="У каждого педагога профильное образование, медкнижка и справка об отсутствии судимости." />
      <Sec><Team people={teachers} /></Sec>
      <Sec title="Как проходят занятия" className="kd-soft">
        <Gallery items={[['1484820540004-14229fe36ca4', 'Занятия'], ['1605627079912-97c3810a11a4', 'Творчество'], ['1761403942462-04b8b97f1fe9', 'Занятия'], ['1786667395574-8121327f52c8', 'Творчество'], ['1578349035260-9f3d4042f1f7', 'Творчество'], ['1588075592446-265fd1e6e76f', 'Занятия']].map(([img, cat]) => ({ img, cat }))} />
      </Sec>
    </>
  )
}

function Schedule() {
  const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
  const grid: Record<string, string[]> = {
    '10:00': ['Раннее развитие', 'Музыка', 'Раннее развитие', 'Музыка', 'Раннее развитие', 'Изостудия'],
    '11:00': ['Мини-сад', 'Мини-сад', 'Мини-сад', 'Мини-сад', 'Мини-сад', 'Английский'],
    '16:00': ['Подготовка к школе', 'Английский', 'Подготовка к школе', 'Английский', 'Подготовка к школе', ''],
    '17:00': ['Изостудия', 'Подготовка к школе', 'Изостудия', 'Подготовка к школе', 'Английский', ''],
    '18:00': ['Английский', 'Изостудия', 'Английский', 'Изостудия', 'Музыка', ''],
  }
  const color = (n: string) => programs.find(p => p.t.startsWith(n.split(' ')[0]))?.c || '#ccc'
  return (
    <>
      <PageHead kicker="Расписание" title="Когда занятия" text="Расписание на текущий учебный год. Места в группах уточняйте у администратора." />
      <Sec>
        <div className="kd-sched-wrap">
          <table className="kd-sched">
            <thead><tr><th />{days.map(d => <th key={d}>{d}</th>)}</tr></thead>
            <tbody>{Object.entries(grid).map(([t, row]) => <tr key={t}><th>{t}</th>{row.map((n, i) => <td key={i}>{n && <span style={{ '--c': color(n) } as React.CSSProperties}>{n}</span>}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </Sec>
    </>
  )
}

function Contacts() {
  return (
    <>
      <PageHead kicker="Контакты" title="Записаться на пробное" text="Оставьте заявку — администратор перезвонит, подберёт группу по возрасту и удобное время." />
      <Sec><ContactBlock info={info} title="Пробное занятие" note="Бесплатно, 45 минут." options={{ label: 'Направление', values: programs.map(p => p.t) }} /></Sec>
    </>
  )
}

export default function Page() {
  useSiteMeta({ title: 'Солнышко — детский центр в Казани', color: '#FF7A59', letter: 'С', fonts: 'family=Comfortaa:wght@500;600;700&family=Nunito:wght@400;600;700;800' })
  return (
    <SiteShell slug="kids">
      <BizLayout base={base} logo={<span className="kd-logo"><i />солнышко</span>} links={[{ to: 'programs', label: 'Направления' }, { to: 'teachers', label: 'Педагоги' }, { to: 'schedule', label: 'Расписание' }, { to: 'contacts', label: 'Контакты' }]} cta={{ label: 'Пробное занятие', to: 'contacts' }} info={info}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="programs" element={<Programs />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="contacts" element={<Contacts />} />
        </Routes>
      </BizLayout>
    </SiteShell>
  )
}
