import { motion, AnimatePresence } from 'motion/react'
import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { Check, Users, Clock3, MessageCircle, Award } from 'lucide-react'
import { SiteShell } from '../../shared/SiteShell'
import { Reveal } from '../../shared/Reveal'
import { Jump } from '../../shared/Jump'
import { MobileMenu } from '../../shared/MobileMenu'
import { MobileCTA } from '../../shared/MobileCTA'
import { PhoneInput } from '../../shared/PhoneInput'
import { Accordion } from '../../shared/Accordion'
import { CountUp } from '../../shared/CountUp'
import { Stars } from '../../shared/Stars'
import { useScrolled, useSiteMeta } from '../../shared/hooks'
import { useSubmit } from '../../shared/useForm'
import { u } from '../../shared/img'
import './style.css'

const nav = [{ to: 'level', label: 'Тест уровня' }, { to: 'program', label: 'Программа' }, { to: 'plans', label: 'Цены' }, { to: 'teachers', label: 'Преподаватели' }]
const quiz = [
  { q: 'She ___ to work every day.', a: ['go', 'goes', 'going'], r: 1 },
  { q: 'I ___ this film yet.', a: ["didn't see", "haven't seen", "don't see"], r: 1 },
  { q: 'If I ___ more time, I would travel.', a: ['have', 'had', 'will have'], r: 1 },
  { q: 'The report ___ by Friday.', a: ['must finish', 'must be finished', 'must finishing'], r: 1 },
]
const levels = [
  ['A1', 'Начнём с основ: за курс вы сможете уверенно рассказать о себе и о своём дне.'],
  ['A2', 'Хорошая база. Добавим разговорной практики — через 3 месяца заговорите свободнее.'],
  ['B1', 'Вы уже многое понимаете. Сделаем упор на беглость речи и рабочие ситуации.'],
  ['B1+', 'Сильный уровень. Подойдёт мини-группа с упором на свободные дискуссии.'],
  ['B2', 'Отлично! Вам в группу продвинутого английского для работы и переговоров.'],
]
const program = [
  ['Модуль 1. Знакомство и small talk · недели 1–3', 'Рассказ о себе, работе и увлечениях. Present Simple и Continuous в живой речи. Как поддержать разговор, если не понял собеседника.'],
  ['Модуль 2. Путешествия · недели 4–6', 'Аэропорт, отель, ресторан — реальные диалоги. Past Simple: рассказываем истории. Как решить проблему: потерянный багаж, ошибка в брони.'],
  ['Модуль 3. Английский для работы · недели 7–9', 'Созвоны и переписка с иностранными коллегами. Презентация проекта за 2 минуты. Вежливый отказ, просьба и несогласие.'],
  ['Модуль 4. Свободная речь · недели 10–12', 'Дискуссии на темы новостей и кино. Present Perfect и условные предложения. Итоговый разговор с носителем языка.'],
]
const plans = [
  { n: 'Группа', w: 'до 6 человек, вечером', p: '6 900 ₽', s: '/мес', items: ['12 занятий в месяц', 'Разговорный клуб', 'Проверка домашних заданий'] },
  { n: 'Мини-группа', w: '2–3 человека', p: '11 900 ₽', s: '/мес', items: ['12 занятий в месяц', 'Гибкое расписание', 'Клуб с носителем', 'Персональный план'], main: true },
  { n: 'Индивидуально', w: 'один на один', p: '1 400 ₽', s: '/урок', items: ['Время — под вас', 'Программа под цель: работа, переезд, экзамен', 'Пакеты от 8 уроков'] },
]
const teachers = [
  { photo: '1580489944761-15a19d654956', n: 'Екатерина', r: 'CELTA, 8 лет преподавания', q: 'Ошибки — это нормально. Ненормально молчать из-за страха их сделать.' },
  { photo: '1560250097-0b93528c311a', n: 'James', r: 'Носитель языка, Манчестер', q: 'На разговорном клубе обсуждаем всё: от футбола до того, почему британцы извиняются перед столом.' },
  { photo: '1535713875002-d1d0cf377fde', n: 'Павел', r: 'IELTS 8.5, бизнес-английский', q: 'Учу говорить на созвонах так, чтобы коллеги переспрашивали только про цифры.' },
  { photo: '1494790108377-be9c29b29330', n: 'Анна', r: 'Кембриджский сертификат CPE', q: 'Грамматика нужна, чтобы говорить, а не чтобы сдавать тесты. Так и учим.' },
]
const faq = [
  ['Подойдёт, если я совсем с нуля?', 'Да, есть группы уровня A1. Первые занятия ведутся с опорой на русский, дальше — полностью на английском.'],
  ['Что, если пропущу занятие?', 'Все уроки записываются. Можно посмотреть запись или прийти на занятие параллельной группы на той же неделе.'],
  ['Выдаёте сертификат?', 'Да, именной сертификат об окончании курса с указанием уровня по шкале CEFR.'],
  ['Можно оплатить частями?', 'Да, помесячно. Если оплатить курс целиком сразу — скидка 10%.'],
]

function LevelTest() {
  const [i, setI] = useState(0)
  const [score, setScore] = useState(0)
  const [pick, setPick] = useState<number | null>(null)
  const done = i >= quiz.length
  const choose = (k: number) => {
    if (pick !== null) return
    setPick(k)
    setTimeout(() => { if (k === quiz[i].r) setScore(s => s + 1); setPick(null); setI(x => x + 1) }, 650)
  }
  return (
    <Reveal className="quiz">
      <div>
        <h2 className="t">Узнайте свой уровень за минуту</h2>
        <p className="s" style={{ margin: 0 }}>Четыре коротких вопроса — и подберём группу вашего уровня.</p>
      </div>
      <div className="q" aria-live="polite">
        <div className="prog"><motion.i animate={{ width: `${(Math.min(i, quiz.length) / quiz.length) * 100}%` }} /></div>
        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div key={i} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
              <h3>Вопрос {i + 1} из {quiz.length}: <span>{quiz[i].q}</span></h3>
              <div className="ans">{quiz[i].a.map((a, k) => <button key={a} type="button" onClick={() => choose(k)} className={pick === null ? '' : k === quiz[i].r ? 'ok' : pick === k ? 'bad' : ''}>{a}</button>)}</div>
            </motion.div>
          ) : (
            <motion.div key="res" className="res" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <b>{levels[score][0]}</b><p>{levels[score][1]}</p>
              <div className="acts"><Jump to="trial" className="btn b">Записаться на пробный урок</Jump><button type="button" className="btn" onClick={() => { setI(0); setScore(0) }}>Пройти ещё раз</button></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  )
}

export default function Page() {
  useSiteMeta({ title: 'Говорим — онлайн-школа английского', color: '#3355FF', letter: 'G', fonts: 'family=Rubik:wght@400;500;700;800' })
  const scrolled = useScrolled()
  const submit = useSubmit('Готово! Куратор напишет вам в течение часа.')
  return (
    <SiteShell slug="school">
      <header className={scrolled ? 'is-scrolled' : ''}>
        <div className="wrap">
          <a href="#/sites/school" className="logo"><span>Hi!</span>Говорим</a>
          <nav aria-label="Основное меню">{nav.map(l => <Jump key={l.to} to={l.to}>{l.label}</Jump>)}</nav>
          <Jump to="trial" className="btn s hbtn">Пробный урок</Jump>
          <MobileMenu links={nav} extra={<Jump to="trial">Пробный урок бесплатно →</Jump>} />
        </div>
      </header>

      <section className="hero">
        <div className="wrap">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1>Заговорите по-английски за 3 месяца</h1>
            <p>70% урока говорите вы, а не преподаватель. Группы до 6 человек, занятия по вечерам, домашние задания — 15 минут в день.</p>
            <div className="acts"><Jump to="trial" className="btn">Попробовать бесплатно</Jump><Jump to="level" className="btn ghost">Узнать свой уровень</Jump></div>
            <div className="avs"><div>{['1580489944761-15a19d654956', '1500648767791-00dcc994a43e', '1534528741775-53994a69daeb', '1506794778202-cad84cf45f1d'].map(id => <img key={id} src={u(id, 80)} alt="" />)}</div><span><Stars size={14} /> 4 200 выпускников</span></div>
          </motion.div>
          <div className="hero-ph">
            <motion.img src={u('1616587894289-86480e533129', 900)} alt="Ученик на онлайн-уроке" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9 }} />
            <div className="chat" aria-hidden>
              {[['Teacher', 'So, what did you do last weekend?', ''], ['Вы, неделя 1', 'I… go to… the park?', 'me'], ['Вы, неделя 10', 'I went to Gorky Park and saw an amazing open-air concert!', 'me']].map(([w, t, c], k) => (
                <motion.div key={k} className={'bubble ' + c} initial={{ opacity: 0, y: 14, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.6 + k * 0.7, type: 'spring', stiffness: 300, damping: 22 }}><small>{w}</small>{t}</motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="stats">
        <div className="wrap">
          <div><b><CountUp to={4200} /></b><span>выпускников</span></div>
          <div><b><CountUp to={6} /></b><span>человек в группе максимум</span></div>
          <div><b><CountUp to={92} suffix="%" /></b><span>доходят до конца курса</span></div>
          <div><b><CountUp to={4.9} decimals={1} /></b><span>средняя оценка урока</span></div>
        </div>
      </div>

      <section className="why">
        <div className="wrap">
          {[[MessageCircle, '70% — ваша речь', 'Преподаватель направляет, а говорите вы.'], [Users, 'До 6 человек', 'Каждый говорит на каждом уроке.'], [Clock3, 'По вечерам', 'Занятия в 19:00, 20:00 и 21:00 по Москве.'], [Award, 'Сертификат', 'С уровнем по международной шкале CEFR.']].map(([I, t, p], k) => {
            const Ic = I as typeof Users
            return <Reveal key={t as string} delay={k * 0.08} className="w"><i><Ic size={22} /></i><h3>{t as string}</h3><p>{p as string}</p></Reveal>
          })}
        </div>
      </section>

      <section id="level" style={{ paddingTop: 0 }}><div className="wrap"><LevelTest /></div></section>

      <section id="program" style={{ paddingTop: 0 }}>
        <div className="wrap prog-wrap">
          <div><Reveal><h2 className="t">Программа курса</h2><p className="s">12 недель, 3 занятия в неделю по 60 минут. Каждый модуль заканчивается разговорным клубом.</p></Reveal>
            <Reveal delay={0.1}><img className="prog-img" src={u('1648128126771-238106c2cc30', 800)} alt="Занятие за компьютером" loading="lazy" /></Reveal></div>
          <Reveal delay={0.1}><Accordion items={program} /></Reveal>
        </div>
      </section>

      <section id="plans" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal><h2 className="t">Форматы и цены</h2><p className="s">Если после первого месяца поймёте, что не подходит, — вернём деньги за оставшиеся занятия.</p></Reveal>
          <div className="plans">{plans.map((p, k) => <Reveal key={p.n} delay={k * 0.1} className={'plan' + (p.main ? ' main' : '')}><h3>{p.n}</h3><p className="who">{p.w}</p><div className="p">{p.p}<small>{p.s}</small></div><ul>{p.items.map(x => <li key={x}><Check size={16} />{x}</li>)}</ul><Jump to="trial" className={'btn' + (p.main ? '' : ' b')}>Записаться</Jump></Reveal>)}</div>
        </div>
      </section>

      <section id="teachers" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal><h2 className="t">Преподаватели</h2><p className="s">Берём одного кандидата из 20. Каждый проходит пробный урок с нашими методистами.</p></Reveal>
          <Swiper modules={[Pagination, A11y]} pagination={{ clickable: true }} spaceBetween={18} slidesPerView={1.1} breakpoints={{ 700: { slidesPerView: 2 }, 1060: { slidesPerView: 3 } }}>
            {teachers.map(t => <SwiperSlide key={t.n}><div className="tc"><img src={u(t.photo, 300)} alt={t.n} loading="lazy" /><div><h3>{t.n}</h3><p>{t.r}</p></div><blockquote>«{t.q}»</blockquote></div></SwiperSlide>)}
          </Swiper>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}><div className="wrap faq"><Reveal><h2 className="t">Вопросы</h2></Reveal><Reveal delay={0.1}><Accordion items={faq} /></Reveal></div></section>

      <section id="trial" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal className="trial">
            <div><h2>Бесплатный пробный урок</h2><p>30 минут с преподавателем: определим уровень, обсудим цель и составим план обучения.</p></div>
            <form onSubmit={submit}>
              <input required placeholder="Имя" aria-label="Имя" autoComplete="name" />
              <PhoneInput required aria-label="Телефон" />
              <select aria-label="Уровень"><option>Не знаю свой уровень</option><option>A1 — начинаю с нуля</option><option>A2 — базовый</option><option>B1 — средний</option><option>B2 — выше среднего</option></select>
              <button className="btn b" type="submit">Записаться на урок</button>
            </form>
          </Reveal>
        </div>
      </section>

      <footer><div className="wrap"><span>© Онлайн-школа «Говорим», 2026</span><span>Демо-сайт для портфолио. Школа вымышленная.</span></div></footer>
      <MobileCTA to="trial">Пробный урок бесплатно</MobileCTA>
    </SiteShell>
  )
}
