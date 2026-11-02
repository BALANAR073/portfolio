import { motion } from 'motion/react'
import { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { Siren, Stethoscope, Syringe, Microscope, Scissors, HeartPulse, Cat, Dog, Rabbit, PawPrint } from 'lucide-react'
import { SiteShell } from '../../shared/SiteShell'
import { Reveal } from '../../shared/Reveal'
import { useSiteMeta } from '../../shared/hooks'
import { u } from '../../shared/img'
import { BizLayout, type BizInfo } from '../../shared/biz/BizLayout'
import { PageHead, Sec, Prices, Team, Faq, CtaBand, ContactBlock, PeopleRail, CardRail, MapReviews } from '../../shared/biz/blocks'
import './style.css'

const base = '/sites/vet'
const info: BizInfo = { phone: '+7 (843) 200-30-30', address: 'Казань, пр. Победы, 78', hours: 'Круглосуточно, без выходных', about: 'Ветеринарная клиника полного цикла: терапия, хирургия, диагностика и стационар. Работаем 24/7.' }
const doctors = [
  { name: 'Алсу Гарипова', role: 'Главврач, терапевт', img: '1594824476967-48c8b964273f', text: 'Стаж 14 лет. Сложные терапевтические случаи, эндокринология.' },
  { name: 'Андрей Крылов', role: 'Хирург', img: '1622253692010-333f2da6031d', text: 'Ортопедия и мягкие ткани. Более 3 000 операций.' },
  { name: 'Мария Лебедева', role: 'Кардиолог, УЗИ', img: '1781296134652-1f9ad66dd29a', text: 'ЭхоКГ, УЗИ брюшной полости, ведение сердечных пациентов.' },
  { name: 'Ринат Сафин', role: 'Экзотолог', img: '1612531385446-f7e6d131e1d0', text: 'Кролики, грызуны, птицы и рептилии.' },
]
const services = [
  { icon: Stethoscope, t: 'Терапия', d: 'Приём, осмотр, назначение лечения', p: 'от 1 200 ₽' },
  { icon: Syringe, t: 'Вакцинация', d: 'Комплексные прививки и паспорт', p: 'от 1 600 ₽' },
  { icon: Microscope, t: 'Диагностика', d: 'Анализы, УЗИ, рентген за 30 минут', p: 'от 900 ₽' },
  { icon: Scissors, t: 'Хирургия', d: 'Стерилизация, ортопедия, онкология', p: 'от 4 500 ₽' },
  { icon: HeartPulse, t: 'Стационар', d: 'Наблюдение 24/7 и видеосвязь с питомцем', p: 'от 2 000 ₽/сут' },
  { icon: Siren, t: 'Экстренная помощь', d: 'Принимаем без записи в любое время', p: 'от 1 800 ₽' },
]

function Pets() {
  const [p, setP] = useState<'cat' | 'dog' | 'small'>('cat')
  const data = {
    cat: { t: 'Кошки', tips: [['2 месяца', 'Первая вакцинация, обработка от паразитов'], ['3 месяца', 'Ревакцинация + бешенство'], ['6 месяцев', 'Стерилизация или кастрация'], ['Каждый год', 'Прививка и чекап с анализами']] },
    dog: { t: 'Собаки', tips: [['8 недель', 'Первая комплексная вакцинация'], ['12 недель', 'Ревакцинация + бешенство, можно гулять через 14 дней'], ['6–12 месяцев', 'Стерилизация по показаниям'], ['Каждый год', 'Прививка, анализы, чистка зубов']] },
    small: { t: 'Кролики и грызуны', tips: [['6–8 недель', 'Осмотр и вакцинация кроликов от ВГБК и миксоматоза'], ['4–6 месяцев', 'Кастрация кроликов'], ['Каждые 6 месяцев', 'Контроль зубов — у грызунов они растут всю жизнь'], ['Каждый год', 'Ревакцинация кроликов']] },
  }[p]
  return (
    <div className="vt-pets">
      <div className="vt-pet-tabs">{([['cat', Cat, 'Кошки'], ['dog', Dog, 'Собаки'], ['small', Rabbit, 'Грызуны']] as const).map(([k, I, l]) => <button key={k} type="button" aria-pressed={p === k} onClick={() => setP(k)}><I size={22} />{l}</button>)}</div>
      <div className="vt-plan">
        {data.tips.map(([w, d], i) => (
          <motion.div key={p + w} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }} className="vt-plan-i"><b>{w}</b><span>{d}</span></motion.div>
        ))}
      </div>
    </div>
  )
}

function Home() {
  return (
    <>
      <section className="vt-hero">
        <div className="bwrap vt-hero-in">
          <div>
            <motion.p className="vt-247" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><i /> Открыто круглосуточно</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>Лечим так, будто <em>это наш</em> питомец</motion.h1>
            <motion.p className="vt-lead" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>Ветклиника на Победы: 12 врачей, своя лаборатория и стационар. Анализы — за 30 минут, а не за три дня.</motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="vt-acts"><Link to={`${base}/contacts`} className="bbtn big">Записаться на приём</Link><a href={`tel:${info.phone.replace(/[^\d+]/g, '')}`} className="bbtn ghost big vt-sos"><Siren size={18} /> Срочный вызов</a></motion.div>
          </div>
          <motion.div className="vt-hero-img" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
            <img src={u('1553688738-a278b9f063e0', 1000)} alt="Ветеринар осматривает собаку" />
            <motion.div className="vt-bubble" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}><b>12 000+</b><span>хвостов вылечили</span></motion.div>
          </motion.div>
        </div>
      </section>

      <Sec kicker="Услуги" title="Всё для здоровья питомца" more={<Link to={`${base}/services`}>Цены →</Link>}>
        <div className="vt-srv">
          {services.map((s, i) => <Reveal key={s.t} delay={(i % 3) * 0.06} className="vt-srv-i"><s.icon /><h3>{s.t}</h3><p>{s.d}</p><b>{s.p}</b></Reveal>)}
        </div>
      </Sec>

      <Sec kicker="Памятка" title="План прививок и процедур" className="vt-soft"><Pets /></Sec>

      <Sec>
        <CardRail title="Истории наших пациентов" view={[1.2, 2.2, 3.3]} items={[
          { img: '1558788353-f76d92427f16', title: 'Ричи, 7 лет', text: 'Удалили инородное тело из желудка без полостной операции — эндоскопом. Домой ушёл на следующий день.', meta: ['Хирургия', 'Андрей Крылов'] },
          { img: '1536589961747-e239b2abbec2', title: 'Муся, 12 лет', text: 'Подобрали диету и терапию при болезни почек. Анализы в норме уже полтора года.', meta: ['Терапия', 'Алсу Гарипова'] },
          { img: '1529040181623-e04ebc611e25', title: 'Кролик Боня, 3 года', text: 'Подпилили зубы, которые мешали есть. Теперь проверяемся раз в полгода.', meta: ['Экзотология', 'Ринат Сафин'] },
          { img: '1772606270537-6eb199b55aed', title: 'Корги Бакс, 5 лет', text: 'Нашли шумы в сердце на плановом чекапе. Вовремя начали лечение — бегает, как щенок.', meta: ['Кардиология', 'Мария Лебедева'] },
          { img: '1498100152307-ce63fd6c5424', title: 'Оскар, 2 года', text: 'Привезли ночью после падения с балкона. Срастили лапу, через месяц снова лазил по шкафам.', meta: ['Экстренная помощь'] },
        ]} />
      </Sec>

      <Sec className="vt-soft">
        <PeopleRail title="Наши врачи" more={{ label: 'Все врачи', to: `${base}/doctors` }} people={doctors.map((d, i) => ({ ...d, meta: ['Стаж 14 лет', 'Стаж 11 лет', 'Стаж 8 лет', 'Стаж 6 лет'][i] }))} />
      </Sec>

      <Sec kicker="Отзывы" title="Что пишут владельцы">
        <MapReviews rating="4,8" count="960" src="2ГИС" items={[
          { name: 'Екатерина', date: '14 октября', text: 'Приехали в три ночи с котом, приняли сразу. Врач всё объяснил, показал снимки и не навязывал лишних анализов.', tag: 'Экстренный приём' },
          { name: 'Артур', date: '6 октября', text: 'Делали стерилизацию собаке. Прислали фото после операции, через неделю сняли швы бесплатно.', tag: 'Хирургия' },
          { name: 'Ирина', date: '29 сентября', text: 'Единственная клиника, где нормально лечат кроликов. Ринат Ильдарович — спасибо за Боню!', tag: 'Экзотолог' },
          { name: 'Павел', date: '17 сентября', text: 'Анализы правда готовы за полчаса, не пришлось приезжать второй раз.', tag: 'Диагностика' },
        ]} />
      </Sec>

      <CtaBand title="Первичный осмотр — бесплатно" text="Для котят и щенков до 4 месяцев. Расскажем про питание, прививки и уход." to={`${base}/contacts`} btn="Записаться" />
    </>
  )
}

function Services() {
  return (
    <>
      <PageHead kicker="Услуги и цены" title="Прайс клиники" text="Цены указаны за процедуру без стоимости препаратов. Точную сумму врач назовёт после осмотра." />
      <Sec>
        <Prices groups={[
          { title: 'Приём', items: [['Первичный приём терапевта', '1 200 ₽'], ['Повторный приём', '800 ₽'], ['Приём узкого специалиста', '1 800 ₽'], ['Ночной приём (22:00–8:00)', '1 800 ₽']] },
          { title: 'Вакцинация', items: [['Комплексная вакцина кошке', '1 600 ₽'], ['Комплексная вакцина собаке', '1 900 ₽'], ['Бешенство', '700 ₽'], ['Чипирование + регистрация', '1 500 ₽']] },
          { title: 'Диагностика', items: [['Общий анализ крови', '900 ₽', 'результат за 30 минут'], ['Биохимия, 12 показателей', '2 100 ₽'], ['УЗИ брюшной полости', '2 200 ₽'], ['Рентген, 1 проекция', '1 400 ₽']] },
          { title: 'Хирургия', items: [['Кастрация кота', '4 500 ₽'], ['Стерилизация кошки', '7 500 ₽'], ['Стерилизация собаки', 'от 11 000 ₽'], ['Санация ротовой полости', 'от 6 000 ₽']] },
        ]} />
      </Sec>
    </>
  )
}

function Doctors() {
  return (
    <>
      <PageHead kicker="Команда" title="Наши врачи" text="Каждый врач проходит обучение минимум раз в год. Узкие специалисты принимают по записи." img="1700665537604-412e89a285c3" />
      <Sec><Team people={doctors} /></Sec>
    </>
  )
}

function Owners() {
  return (
    <>
      <PageHead kicker="Владельцам" title="Как подготовиться к визиту" text="Ответы на частые вопросы. Не нашли ответ — позвоните, проконсультируем бесплатно." />
      <Sec>
        <div className="vt-prep">
          {[['Возьмите с собой', 'Ветпаспорт, результаты прошлых анализов и список лекарств, которые давали питомцу.'], ['Перед анализами', 'Не кормите питомца 8–12 часов. Воду давать можно.'], ['Переноска', 'Кошек и мелких животных — только в переноске. Собак — на поводке и в наморднике, если питомец нервничает.']].map(([t, d], i) => <Reveal key={t} delay={i * 0.07} className="vt-prep-i"><span>0{i + 1}</span><h3>{t}</h3><p>{d}</p></Reveal>)}
        </div>
      </Sec>
      <Sec title="Частые вопросы" className="vt-soft">
        <Faq items={[['Можно ли приехать ночью без записи?', 'Да. Дежурный врач работает круглосуточно. Если ситуация экстренная — позвоните в дороге, подготовим кабинет.'], ['Можно ли присутствовать при осмотре?', 'Конечно. Во время операций — нет, но мы пришлём фото и позвоним сразу после.'], ['Есть ли выезд на дом?', 'Да, по Казани: приём, вакцинация, забор анализов. Стоимость выезда — от 1 500 ₽.'], ['Как навестить питомца в стационаре?', 'Посещения с 11:00 до 20:00. Также можно в любой момент посмотреть на питомца по видеосвязи.']]} />
      </Sec>
    </>
  )
}

function Contacts() {
  return (
    <>
      <PageHead kicker="Контакты" title="Запись на приём" text="Если питомцу плохо прямо сейчас — не ждите звонка, приезжайте: мы работаем круглосуточно." />
      <Sec><ContactBlock info={info} title="Записаться к врачу" note="Администратор перезвонит в течение 10 минут." options={{ label: 'Кто ваш питомец', values: ['Кошка', 'Собака', 'Кролик / грызун', 'Птица', 'Другое'] }} /></Sec>
    </>
  )
}

export default function Page() {
  useSiteMeta({ title: 'Лапа — ветклиника 24/7 в Казани', color: '#0E7C7B', letter: 'Л', fonts: 'family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500&family=Manrope:wght@400;500;600;700' })
  return (
    <SiteShell slug="vet">
      <BizLayout base={base} brand="Лапа" logo={<span className="vt-logo"><span><PawPrint size={20} color="#fff" /></span>Лапа</span>} links={[{ to: 'services', label: 'Услуги' }, { to: 'doctors', label: 'Врачи' }, { to: 'owners', label: 'Владельцам' }, { to: 'contacts', label: 'Контакты' }]} cta={{ label: 'Записаться', to: 'contacts' }} info={info}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="owners" element={<Owners />} />
          <Route path="contacts" element={<Contacts />} />
        </Routes>
      </BizLayout>
    </SiteShell>
  )
}
