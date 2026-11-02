import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { Scissors, Coffee, Clock, Award } from 'lucide-react'
import { SiteShell } from '../../shared/SiteShell'
import { Reveal } from '../../shared/Reveal'
import { CountUp } from '../../shared/CountUp'
import { useSiteMeta } from '../../shared/hooks'
import { u } from '../../shared/img'
import { BizLayout, type BizInfo } from '../../shared/biz/BizLayout'
import { PageHead, Sec, Prices, Team, Gallery, Faq, CtaBand, ContactBlock, PeopleRail, CardRail, MapReviews } from '../../shared/biz/blocks'
import './style.css'

const base = '/sites/barber'
const info: BizInfo = { phone: '+7 (843) 200-10-10', address: 'Казань, ул. Баумана, 44', hours: 'Ежедневно 10:00–22:00', about: 'Мужская парикмахерская в центре Казани. Стрижки, бритьё и уход за бородой без очередей.' }
const masters = [
  { name: 'Тимур', role: 'Топ-барбер · 9 лет', img: '1677543167033-af3c688aa4df', text: 'Классические стрижки и королевское бритьё опасной бритвой.' },
  { name: 'Артём', role: 'Барбер · 5 лет', img: '1599351431202-1e0f0137899a', text: 'Фейды любой сложности, текстурные стрижки.' },
  { name: 'Ильдар', role: 'Барбер · 4 года', img: '1503951914875-452162b0f3f1', text: 'Борода — его специализация. Моделирование и камуфляж седины.' },
  { name: 'Руслан', role: 'Барбер · 3 года', img: '1676989859871-150f3579862a', text: 'Детские стрижки и стрижки машинкой «как у папы».' },
]
const prices = [
  { title: 'Стрижки', items: [['Мужская стрижка', '1 500 ₽', 'Мытьё, укладка, горячее полотенце'], ['Стрижка машинкой', '900 ₽'], ['Фейд / скин-фейд', '1 700 ₽'], ['Детская стрижка', '1 000 ₽', 'До 12 лет']] as [string, string, string?][] },
  { title: 'Борода и бритьё', items: [['Моделирование бороды', '1 000 ₽'], ['Королевское бритьё', '1 400 ₽', 'Опасная бритва, распаривание'], ['Камуфляж седины', '900 ₽'], ['Бритьё головы', '1 100 ₽']] as [string, string, string?][] },
  { title: 'Комплексы', items: [['Стрижка + борода', '2 300 ₽', 'Экономия 200 ₽'], ['Отец + сын', '2 200 ₽'], ['Жених: стрижка, борода, уход', '3 500 ₽']] as [string, string, string?][] },
  { title: 'Уход', items: [['Чёрная маска', '500 ₽'], ['Воск: нос / уши', '300 ₽'], ['Укладка', '500 ₽']] as [string, string, string?][] },
]

function Home() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const op = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  return (
    <>
      <section className="bb-hero" ref={ref}>
        <motion.img style={{ y }} src={u('1647140655214-e4a2d914971f', 1900)} alt="Интерьер барбершопа" />
        <motion.div className="bwrap bb-hero-in" style={{ opacity: op }}>
          <motion.p className="bb-est" initial={{ opacity: 0, letterSpacing: '.6em' }} animate={{ opacity: 1, letterSpacing: '.3em' }} transition={{ duration: 1 }}>EST. 2018 · КАЗАНЬ</motion.p>
          <h1>{['Стрижка', 'не терпит', 'суеты'].map((w, i) => <span key={w}><motion.span initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ delay: 0.2 + i * 0.12, duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}>{w}</motion.span></span>)}</h1>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="bb-hero-row">
            <p>Мужская парикмахерская на Баумана. 45 минут на стрижку, кофе или виски — и никакой очереди.</p>
            <Link to={`${base}/contacts`} className="bbtn big">Записаться</Link>
          </motion.div>
        </motion.div>
      </section>

      <section className="bb-stats">
        <div className="bwrap">
          {[[8, '', 'лет на Баумана'], [27, 'K', 'стрижек сделано'], [4.9, '', 'рейтинг на картах'], [45, ' мин', 'на одну стрижку']].map(([n, s, t], i) => (
            <Reveal key={t as string} delay={i * 0.06}><b><CountUp to={n as number} decimals={n === 4.9 ? 1 : 0} />{s as string}</b><span>{t as string}</span></Reveal>
          ))}
        </div>
      </section>

      <Sec kicker="Почему к нам" title="Не просто стрижка">
        <div className="bb-why">
          {[[Scissors, 'Мастера с опытом от 3 лет', 'Каждый проходит у нас стажировку 2 месяца, прежде чем стричь гостей.'], [Clock, 'Без ожидания', 'Онлайн-запись на точное время. Опоздал мастер — стрижка за наш счёт.'], [Coffee, 'Бар для гостей', 'Кофе, чай, лимонад или 50 граммов виски — входит в стоимость.'], [Award, 'Гарантия 7 дней', 'Что-то не так — исправим бесплатно в течение недели.']].map(([I, t, d], i) => {
            const Ic = I as typeof Scissors
            return <Reveal key={t as string} delay={i * 0.06} className="bb-why-i"><Ic /><h3>{t as string}</h3><p>{d as string}</p></Reveal>
          })}
        </div>
      </Sec>

      <Sec kicker="Прайс" title="Популярные услуги" className="bb-dark" more={<Link to={`${base}/services`}>Весь прайс →</Link>}>
        <Prices groups={prices.slice(0, 2)} />
      </Sec>

      <Sec>
        <PeopleRail title="Наши мастера" more={{ label: 'Все мастера', to: `${base}/masters` }} people={masters.map((m, i) => ({ ...m, meta: ['★ 5,0 · 1 840 стрижек', '★ 4,9 · 960 стрижек', '★ 4,9 · 720 стрижек', '★ 5,0 · 410 стрижек'][i] }))} />
      </Sec>

      <Sec className="bb-dark">
        <CardRail title="Свежие работы" more={{ label: 'Вся галерея', to: `${base}/works` }} view={[1.15, 2.2, 3.2]} items={[
          { img: '1781455793310-8427c96454c7', title: 'Кроп с текстурой', meta: ['Артём', '1 500 ₽'] },
          { img: '1759134198561-e2041049419c', title: 'Борода + контур', meta: ['Ильдар', '1 000 ₽'] },
          { img: '1783908688260-0c47404926f3', title: 'Скин-фейд', meta: ['Артём', '1 700 ₽'] },
          { img: '1657105052497-f996284ffff8', title: 'Королевское бритьё', meta: ['Тимур', '1 400 ₽'] },
          { img: '1773904215697-e6c21fc27ac2', title: 'Классика с пробором', meta: ['Тимур', '1 500 ₽'] },
        ]} />
      </Sec>

      <Sec kicker="Отзывы" title="Что говорят гости">
        <MapReviews rating="4,9" count="1 240" items={[
          { name: 'Алексей К.', date: '12 октября', text: 'Хожу к Тимуру третий год. Ни разу не ждал дольше пяти минут, стрижка держит форму до следующего визита.', tag: 'Мастер: Тимур' },
          { name: 'Ринат', date: '3 октября', text: 'Первый раз доверил бороду — Ильдар подобрал форму под лицо, жена оценила. Кофе вкусный, атмосфера спокойная.', tag: 'Мастер: Ильдар' },
          { name: 'Дмитрий С.', date: '28 сентября', text: 'Сделали скин-фейд ровно как на фото из Pinterest. Записался онлайн на 9 вечера — удобно после работы.', tag: 'Мастер: Артём' },
          { name: 'Олег', date: '19 сентября', text: 'Привёл сына на первую стрижку. Руслан нашёл подход, сын не плакал и попросил прийти снова.', tag: 'Мастер: Руслан' },
        ]} />
      </Sec>

      <CtaBand title="Первая стрижка — со скидкой 20%" text="Назовите кодовое слово «Борода» при записи. Действует для новых гостей." to={`${base}/contacts`} btn="Записаться" />
    </>
  )
}

function Services() {
  return (
    <>
      <PageHead kicker="Услуги и цены" title="Прайс" text="Цены одинаковые у всех мастеров. Время указано с учётом мытья головы и укладки." img="1605497788044-5a32c7078486" />
      <Sec><Prices groups={prices} /></Sec>
      <Sec title="Частые вопросы" className="bb-dark">
        <Faq items={[['Нужно ли записываться заранее?', 'Лучше да — в вечернее время и по выходным мастера заняты на 2–3 дня вперёд. Но если есть свободное окно, примем и без записи.'], ['Можно ли прийти с ребёнком?', 'Конечно. Детей от 4 лет стрижёт Руслан, у нас есть детское кресло и мультики на планшете.'], ['Как оплатить?', 'Картой, наличными или по СБП. Можно купить подарочный сертификат на любую сумму.'], ['Что если стрижка не понравится?', 'Приходите в течение 7 дней — бесплатно исправим.']]} />
      </Sec>
    </>
  )
}

function Masters() {
  return (
    <>
      <PageHead kicker="Команда" title="Мастера" text="Четыре барбера, у каждого своя специализация. Выберите мастера при записи или доверьтесь администратору." />
      <Sec><Team people={masters} /></Sec>
      <CtaBand title="Хотите работать с нами?" text="Ищем барберов с опытом от 2 лет. Обучение, стабильный поток гостей, 50% с услуги." to={`${base}/contacts`} btn="Написать нам" />
    </>
  )
}

function Works() {
  const items = [['1781455793310-8427c96454c7', 'Стрижки'], ['1759134198561-e2041049419c', 'Борода'], ['1783908688260-0c47404926f3', 'Стрижки'], ['1773904215697-e6c21fc27ac2', 'Интерьер'], ['1657105052497-f996284ffff8', 'Борода'], ['1647140655214-e4a2d914971f', 'Интерьер'], ['1621605815971-fbc98d665033', 'Стрижки'], ['1605497788044-5a32c7078486', 'Интерьер'], ['1599351431202-1e0f0137899a', 'Борода']].map(([img, cat]) => ({ img, cat }))
  return (
    <>
      <PageHead kicker="Галерея" title="Работы мастеров" text="Свежие стрижки наших гостей и немного атмосферы." />
      <Sec><Gallery items={items} /></Sec>
    </>
  )
}

function Contacts() {
  return (
    <>
      <PageHead kicker="Контакты" title="Запись и адрес" text="Оставьте заявку — администратор перезвонит и подберёт удобное время." />
      <Sec>
        <ContactBlock info={info} title="Записаться на стрижку" note="Ответим в течение 15 минут в рабочее время." options={{ label: 'Мастер', values: ['Любой мастер', ...masters.map(x => x.name)] }} />
      </Sec>
    </>
  )
}

export default function Page() {
  useSiteMeta({ title: 'Борода — барбершоп в Казани', color: '#C8A165', letter: 'Б', fonts: 'family=Oswald:wght@400;500;600;700&family=Inter:wght@400;500;600;700' })
  return (
    <SiteShell slug="barber">
      <BizLayout base={base} logo={<span className="bb-logo">БОРОДА<small>barbershop</small></span>} links={[{ to: 'services', label: 'Услуги' }, { to: 'masters', label: 'Мастера' }, { to: 'works', label: 'Галерея' }, { to: 'contacts', label: 'Контакты' }]} cta={{ label: 'Записаться', to: 'contacts' }} info={info}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="masters" element={<Masters />} />
          <Route path="works" element={<Works />} />
          <Route path="contacts" element={<Contacts />} />
        </Routes>
      </BizLayout>
    </SiteShell>
  )
}
