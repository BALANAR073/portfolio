import { motion, AnimatePresence } from 'motion/react'
import { useState } from 'react'
import { SiteShell } from '../../shared/SiteShell'
import { Reveal } from '../../shared/Reveal'
import { Jump } from '../../shared/Jump'
import { MobileMenu } from '../../shared/MobileMenu'
import { MobileCTA } from '../../shared/MobileCTA'
import { PhoneInput } from '../../shared/PhoneInput'
import { Accordion } from '../../shared/Accordion'
import { CountUp } from '../../shared/CountUp'
import { useScrolled, useSiteMeta } from '../../shared/hooks'
import { useSubmit } from '../../shared/useForm'
import { u } from '../../shared/img'
import './style.css'

const nav = [{ to: 'areas', label: 'Практика' }, { to: 'check', label: 'Оценка дела' }, { to: 'cases', label: 'Дела' }, { to: 'faq', label: 'Вопросы' }, { to: 'consult', label: 'Контакты' }]

const areas = [
  ['Взыскание долгов', 'от 40 000 ₽', 'Претензия, иск, исполнительное производство. Возможна оплата процентом от взысканного.'],
  ['Арбитражные споры', 'от 80 000 ₽', 'Споры по договорам поставки, подряда, перевозки и оказания услуг.'],
  ['Договорная работа', 'от 15 000 ₽', 'Проверка и составление договоров, протоколы разногласий, сопровождение сделок.'],
  ['Налоговые споры', 'от 120 000 ₽', 'Сопровождение проверок, возражения на акты, обжалование решений ФНС.'],
  ['Трудовые споры', 'от 35 000 ₽', 'Для работодателей: увольнения, проверки ГИТ, иски сотрудников.'],
  ['Юрист на абонементе', 'от 30 000 ₽/мес', 'Договоры, претензии и консультации без лимита — дешевле штатного юриста.'],
]
const approach = [
  ['Честная оценка', 'Изучаю документы и говорю, какие шансы. Если шансов нет — так и скажу и не возьму деньги.'],
  ['Стратегия и смета', 'Предлагаю варианты: переговоры, претензия, суд. Называю сроки и бюджет каждого.'],
  ['Работа и отчёты', 'Еженедельный отчёт в мессенджер: что сделано, что дальше, какие риски.'],
  ['Исполнение решения', 'Не бросаю дело после суда — довожу до реального получения денег.'],
]
const cases = [
  ['14,6 млн ₽', 'взыскано', 'Неоплаченная поставка оборудования', 'Покупатель полтора года уклонялся от оплаты, ссылаясь на недостатки. Доказали, что претензии появились после истечения гарантийного срока. Решение в пользу клиента в двух инстанциях.', ['Арбитраж', 'Поставка', '11 месяцев']],
  ['0 ₽', 'вместо 9,3 млн ₽ претензии', 'Утрата груза при перевозке', 'Грузоотправитель требовал полную стоимость груза с экспедитора. Суд согласился, что ответственность ограничена условиями договора и заявленной ценностью.', ['Арбитраж', 'Перевозка', '8 месяцев']],
  ['3,2 млн ₽', 'сохранено', 'Доначисление НДС по контрагенту', 'Доказали реальность сделок и должную осмотрительность при выборе поставщика. Решение инспекции отменено управлением ФНС ещё до суда.', ['Налоги', 'Досудебно', '4 месяца']],
] as const
const faq = [
  ['Можно ли работать удалённо?', 'Да. Большинство клиентов из других городов: консультации по видеосвязи, документы через ЭДО, в суды выезжаю сам или участвую по ВКС.'],
  ['Работаете за процент от результата?', 'По делам о взыскании долгов — да: фиксированная часть плюс процент от реально полученных денег. Так наши интересы совпадают.'],
  ['Что нужно для первой консультации?', 'Договор, переписка с контрагентом и документы об исполнении (накладные, акты, платёжки). Если чего-то нет — разберёмся вместе.'],
  ['Сколько длится арбитражное дело?', 'Первая инстанция — 3–6 месяцев. С апелляцией — 6–10 месяцев. Простые долговые дела часто решаются в упрощённом порядке за 2–3 месяца.'],
]

const quiz = [
  { q: 'Есть письменный договор с контрагентом?', a: [['Да, подписан', 2], ['Только переписка', 1], ['Нет', 0]] },
  { q: 'Есть документы об исполнении — накладные, акты?', a: [['Да, подписаны обеими сторонами', 2], ['Частично', 1], ['Нет', 0]] },
  { q: 'Когда должник должен был заплатить?', a: [['Меньше года назад', 2], ['1–3 года назад', 1], ['Больше 3 лет', 0]] },
] as const

function CaseCheck() {
  const [step, setStep] = useState(0)
  const [score, setScore] = useState(0)
  const done = step >= quiz.length
  const verdict = score >= 5 ? ['Высокие шансы', 'Документов достаточно, чтобы рассчитывать на взыскание через суд. Начнём с претензии — часто должник платит уже на этом этапе.'] : score >= 3 ? ['Шансы есть', 'Позицию нужно укрепить: соберём недостающие доказательства из переписки и банковских выписок.'] : ['Нужна консультация', 'Ситуация сложная, но не безнадёжная. Разберём документы вместе — бесплатно, 30 минут.']
  return (
    <Reveal className="check">
      <div className="check-l">
        <h2 className="t">Экспресс-оценка дела о долге</h2>
        <p>Три вопроса — и вы узнаете, есть ли смысл идти в суд. Это предварительная оценка, она ни к чему не обязывает.</p>
        <div className="bar"><motion.i animate={{ width: `${(Math.min(step, quiz.length) / quiz.length) * 100}%` }} /></div>
      </div>
      <div className="check-r" aria-live="polite">
        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
              <small>Вопрос {step + 1} из {quiz.length}</small>
              <h3>{quiz[step].q}</h3>
              <div className="ans">{quiz[step].a.map(([t, s]) => <button key={t} type="button" onClick={() => { setScore(score + s); setStep(step + 1) }}>{t}</button>)}</div>
            </motion.div>
          ) : (
            <motion.div key="res" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <small>Результат</small>
              <h3>{verdict[0]}</h3>
              <p>{verdict[1]}</p>
              <div className="res-acts"><Jump to="consult" className="btn brass">Обсудить дело</Jump><button type="button" className="link" onClick={() => { setStep(0); setScore(0) }}>Пройти заново</button></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  )
}

export default function Page() {
  useSiteMeta({ title: 'Адвокат Сергей Соколов — споры бизнеса', color: '#1B2A41', letter: 'С', fonts: 'family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Source+Sans+3:wght@400;600' })
  const scrolled = useScrolled()
  const submit = useSubmit('Заявка получена. Я свяжусь с вами в течение рабочего дня.')
  return (
    <SiteShell slug="lawyer">
      <header className={scrolled ? 'is-scrolled' : ''}>
        <div className="wrap">
          <a href="#/sites/lawyer" className="name">Сергей Соколов<small>Адвокат · Адвокатская палата г. Москвы</small></a>
          <nav aria-label="Основное меню">{nav.map(l => <Jump key={l.to} to={l.to}>{l.label}</Jump>)}</nav>
          <a className="tel" href="tel:+79000000000">+7 900 000-00-00</a>
          <MobileMenu links={nav} extra={<a href="tel:+79000000000">+7 900 000-00-00</a>} />
        </div>
      </header>

      <section className="hero">
        <div className="wrap">
          <div>
            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1] }}>Решаю споры бизнеса — <i>в суде и до него</i></motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }}>Взыскание долгов, споры с поставщиками и перевозчиками, защита от необоснованных претензий. Говорю прямо, есть ли у вас шансы, ещё до заключения договора.</motion.p>
            <motion.div className="acts" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}><Jump to="consult" className="btn">Записаться на консультацию</Jump><Jump to="check" className="link">Оценить своё дело за минуту</Jump></motion.div>
          </div>
          <figure className="portrait">
            <motion.img src={u('1519085360753-af0119f7cbe7', 900)} alt="Адвокат Сергей Соколов" initial={{ clipPath: 'inset(100% 0 0 0)' }} animate={{ clipPath: 'inset(0% 0 0 0)' }} transition={{ duration: 1.2, ease: [0.7, 0, 0.2, 1] }} />
            <motion.figcaption initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }}><b>18 лет практики</b><span>МГУ им. Ломоносова. Веду дела лично, без передачи помощникам.</span></motion.figcaption>
          </figure>
        </div>
      </section>

      <div className="stats">
        <div className="wrap">
          <div><b><CountUp to={640} suffix="+" /></b><span>завершённых дел</span></div>
          <div><b><CountUp to={82} suffix="%" /></b><span>решений в пользу клиента</span></div>
          <div><b><CountUp to={1.2} decimals={1} suffix=" млрд ₽" /></b><span>взыскано для клиентов</span></div>
          <div><b><CountUp to={30} suffix=" мин" /></b><span>консультация бесплатно</span></div>
        </div>
      </div>

      <section id="areas">
        <div className="wrap">
          <Reveal><h2 className="t">Направления практики</h2><p className="s">Стоимость зависит от сложности дела. Точную цену называю после изучения документов — и фиксирую в соглашении.</p></Reveal>
          <div className="areas">{areas.map(([t, p, x], i) => <Reveal key={t} delay={(i % 2) * 0.1} className="area"><h3>{t}</h3><span className="pr">{p}</span><p>{x}</p></Reveal>)}</div>
        </div>
      </section>

      <section className="approach">
        <div className="wrap">
          <Reveal><img src={u('1505664194779-8beaceb93744', 900)} alt="Книги на полке в кабинете" loading="lazy" /></Reveal>
          <div>
            <Reveal><h2 className="t">Как я веду дело</h2></Reveal>
            <ol>{approach.map(([b, s], i) => <Reveal as="li" key={b} delay={i * 0.1}><div><b>{b}</b><span>{s}</span></div></Reveal>)}</ol>
          </div>
        </div>
      </section>

      <section id="check"><div className="wrap"><CaseCheck /></div></section>

      <section className="cases" id="cases">
        <div className="wrap">
          <Reveal><h2 className="t">Несколько завершённых дел</h2><p className="s">Имена клиентов не раскрываю — это условие адвокатской тайны. Номера дел — по запросу.</p></Reveal>
          {cases.map(([sum, sub, t, p, tags]) => (
            <Reveal key={t} className="case"><div className="sum">{sum}<small>{sub}</small></div><div><h3>{t}</h3><p>{p}</p><div className="tags">{tags.map(x => <span key={x}>{x}</span>)}</div></div></Reveal>
          ))}
        </div>
      </section>

      <section className="quote">
        <img src={u('1436450412740-6b988f486c6b', 1800)} alt="" loading="lazy" />
        <Reveal className="wrap"><blockquote>«Сергей Викторович сразу сказал, что половину требований мы не выиграем, и предложил мировое по второй половине. Сэкономили год и деньги на суды».</blockquote><cite>Руководитель транспортной компании, клиент с 2021 года</cite></Reveal>
      </section>

      <section id="faq"><div className="wrap"><Reveal><h2 className="t">Вопросы о работе</h2></Reveal><Reveal delay={0.1} className="faq"><Accordion items={faq} /></Reveal></div></section>

      <section className="consult" id="consult" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div>
            <Reveal><h2 className="t">Бесплатная консультация — 30 минут</h2><p className="s" style={{ marginBottom: 20 }}>Онлайн или в офисе на Тверской. За это время:</p></Reveal>
            <ul><li>изучу документы и оценю перспективы дела;</li><li>расскажу о вариантах решения и рисках каждого;</li><li>назову сроки и стоимость сопровождения.</li></ul>
            <div className="ways"><a href="tel:+79000000000">+7 900 000-00-00</a><a href="https://t.me/">Telegram</a><a href="mailto:sokolov@example.ru">sokolov@example.ru</a></div>
          </div>
          <Reveal delay={0.1}>
            <form onSubmit={submit}>
              <h3>Запись на консультацию</h3>
              <label>Имя<input required autoComplete="name" /></label>
              <label>Телефон<PhoneInput required /></label>
              <label>Тип вопроса<select><option>Взыскание долга</option><option>Спор по договору</option><option>Налоговая проверка</option><option>Трудовой спор</option><option>Другое</option></select></label>
              <label>Кратко о ситуации<textarea rows={4} placeholder="Например: поставщик не вернул аванс 1,2 млн ₽" /></label>
              <button className="btn" type="submit">Отправить заявку</button>
              <small>Информация защищена адвокатской тайной.</small>
            </form>
          </Reveal>
        </div>
      </section>

      <footer><div className="wrap"><span>© Адвокат С. В. Соколов, 2026 · Москва, ул. Тверская, 12, офис 405</span><span>Демо-сайт для портфолио. Лицо и дела вымышленные.</span></div></footer>
      <MobileCTA to="consult">Бесплатная консультация</MobileCTA>
    </SiteShell>
  )
}
