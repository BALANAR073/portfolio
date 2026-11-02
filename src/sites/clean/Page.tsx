import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { ShieldCheck, Leaf, UserCheck, Sparkles, Check } from 'lucide-react'
import { SiteShell } from '../../shared/SiteShell'
import { Reveal } from '../../shared/Reveal'
import { BeforeAfter } from '../../shared/BeforeAfter'
import { useSiteMeta } from '../../shared/hooks'
import { u } from '../../shared/img'
import { BizLayout, type BizInfo } from '../../shared/biz/BizLayout'
import { PageHead, Sec, Prices, Gallery, Faq, CtaBand, ContactBlock, PeopleRail, MapReviews } from '../../shared/biz/blocks'
import './style.css'

const base = '/sites/clean'
const info: BizInfo = { phone: '+7 (843) 200-20-20', address: 'Казань, ул. Чистопольская, 11', hours: 'Ежедневно 8:00–21:00', about: 'Клининговая компания. Уборка квартир, домов и офисов в Казани с гарантией результата.' }
const types = [
  { id: 'support', name: 'Поддерживающая', per: 45, min: 2900, note: 'Пыль, полы, кухня, санузел' },
  { id: 'general', name: 'Генеральная', per: 110, min: 6900, note: 'Плюс шкафы, техника, двери, батареи' },
  { id: 'repair', name: 'После ремонта', per: 160, min: 9900, note: 'Строительная пыль, затирка, клей, краска' },
]
const extras = [['windows', 'Мытьё окон', 350, 'за створку'], ['fridge', 'Холодильник внутри', 900, ''], ['oven', 'Духовка внутри', 900, ''], ['balcony', 'Балкон', 1200, ''], ['iron', 'Глажка белья', 600, 'за час']] as const

function Calc() {
  const [t, setT] = useState('general')
  const [area, setArea] = useState(60)
  const [ex, setEx] = useState<string[]>(['windows'])
  const type = types.find(x => x.id === t)!
  const sum = Math.max(type.min, area * type.per) + extras.filter(e => ex.includes(e[0])).reduce((s, e) => s + (e[0] === 'windows' ? e[2] * 6 : e[2]), 0)
  const hours = Math.max(2, Math.round((area * type.per) / 1600))
  return (
    <div className="cl-calc">
      <div className="cl-calc-l">
        <p className="cl-calc-lbl">Тип уборки</p>
        <div className="cl-types">{types.map(x => <button key={x.id} type="button" aria-pressed={t === x.id} onClick={() => setT(x.id)}><b>{x.name}</b><small>{x.note}</small></button>)}</div>
        <p className="cl-calc-lbl">Площадь: <b>{area} м²</b></p>
        <input type="range" min={20} max={200} step={5} value={area} onChange={e => setArea(+e.target.value)} aria-label="Площадь квартиры" style={{ '--p': `${((area - 20) / 180) * 100}%` } as React.CSSProperties} />
        <p className="cl-calc-lbl">Дополнительно</p>
        <div className="cl-ex">{extras.map(([id, n, p, note]) => <label key={id} className={ex.includes(id) ? 'on' : ''}><input type="checkbox" checked={ex.includes(id)} onChange={() => setEx(ex.includes(id) ? ex.filter(x => x !== id) : [...ex, id])} /><Check size={14} /> {n} <small>{p} ₽{note && ` ${note}`}</small></label>)}</div>
      </div>
      <div className="cl-calc-r">
        <small>Стоимость уборки</small>
        <AnimatePresence mode="popLayout"><motion.b key={sum} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}>{sum.toLocaleString('ru-RU')} ₽</motion.b></AnimatePresence>
        <ul><li>Бригада из {area > 90 ? 3 : 2} клинеров</li><li>Около {hours} ч работы</li><li>Вся химия и инвентарь — наши</li></ul>
        <Link to={`${base}/contacts`} className="bbtn full big">Заказать уборку</Link>
        <p>Окончательную цену подтвердим по телефону. Мытьё окон рассчитано на 6 створок.</p>
      </div>
    </div>
  )
}

function Home() {
  return (
    <>
      <section className="cl-hero">
        <div className="bwrap cl-hero-in">
          <div>
            <motion.span className="cl-badge" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}><Sparkles size={16} /> Уборка от 2 900 ₽</motion.span>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>Чистота<br />без ваших<br /><span>выходных</span></motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>Приедем завтра с утра, уберём за 3–4 часа и сделаем фотоотчёт. Если что-то пропустим — вернёмся бесплатно.</motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="cl-acts"><a href="#calc" className="bbtn big" onClick={e => { e.preventDefault(); document.getElementById('calc')?.scrollIntoView({ behavior: 'smooth' }) }}>Рассчитать стоимость</a><Link to={`${base}/services`} className="bbtn ghost big">Цены</Link></motion.div>
          </div>
          <motion.div className="cl-hero-img" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }}>
            <img src={u('1581578731548-c64695cc6952', 1000)} alt="Клинер протирает поверхность" />
            <motion.div className="cl-float f1" animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}><b>4,9 ★</b><small>1 800 отзывов</small></motion.div>
            <motion.div className="cl-float f2" animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity }}><ShieldCheck size={20} /><span>Застрахуем ваше имущество на 1 млн ₽</span></motion.div>
          </motion.div>
        </div>
      </section>

      <Sec kicker="Калькулятор" title="Сколько стоит уборка" className="cl-calc-sec"><div id="calc" /><Calc /></Sec>

      <Sec kicker="Почему нам доверяют" title="Убираем как для себя">
        <div className="cl-why">
          {[[UserCheck, 'Проверенные клинеры', 'Проверяем документы и рекомендации, обучаем 2 недели'], [Leaf, 'Безопасная химия', 'Гипоаллергенные средства, безопасные для детей и животных'], [ShieldCheck, 'Страховка 1 млн ₽', 'Если что-то повредим — возместим полностью'], [Sparkles, 'Фотоотчёт', 'Присылаем фото до и после, принимаете уборку по чек-листу']].map(([I, t, d], i) => {
            const Ic = I as typeof Leaf
            return <Reveal key={t as string} delay={i * 0.06} className="cl-why-i"><span><Ic /></span><h3>{t as string}</h3><p>{d as string}</p></Reveal>
          })}
        </div>
      </Sec>

      <Sec kicker="До и после" title="Результат говорит сам" more={<Link to={`${base}/works`}>Все работы →</Link>}>
        <Reveal className="cl-ba"><BeforeAfter before={u('1776535240825-ea0ad5dd10b9', 1400)} after={u('1556912173-3bb406ef7e77', 1400)} /></Reveal>
      </Sec>

      <Sec className="cl-soft">
        <PeopleRail title="Наши клинеры" people={[
          { name: 'Гульнара', role: 'Старший клинер · 5 лет с нами', img: '1758273238795-c284e5ae09b6', meta: '★ 4,98 · 1 320 уборок' },
          { name: 'Светлана', role: 'Генеральные уборки', img: '1758273238738-9410f7e9d53c', meta: '★ 4,95 · 870 уборок' },
          { name: 'Алина', role: 'Уборка после ремонта', img: '1758273238698-c98a45a8df9a', meta: '★ 4,97 · 640 уборок' },
          { name: 'Наталья', role: 'Поддерживающие уборки', img: '1680728334131-220313e30370', meta: '★ 4,96 · 1 050 уборок' },
          { name: 'Эльвира', role: 'Мытьё окон и химчистка', img: '1758273705627-937374bfa978', meta: '★ 4,94 · 520 уборок' },
        ]} />
      </Sec>

      <Sec kicker="Отзывы" title="Нам доверяют ключи">
        <MapReviews rating="4,9" count="1 812" src="Яндекс Картах" items={[
          { name: 'Мария', date: '15 октября', text: 'Заказывала генеральную перед приездом родителей. Отмыли даже вытяжку и швы в ванной — я думала, они уже не отмоются.', tag: 'Генеральная уборка, 2-комнатная' },
          { name: 'Андрей', date: '8 октября', text: 'После ремонта было по колено пыли. Бригада из трёх человек справилась за день, вывезли мусор. Цена совпала с калькулятором.', tag: 'После ремонта, 74 м²' },
          { name: 'Лилия', date: '1 октября', text: 'Беру поддерживающую раз в две недели, всегда приходит Гульнара. Оставляю ключи консьержу и получаю фотоотчёт.', tag: 'Поддерживающая уборка' },
          { name: 'Тимур', date: '22 сентября', text: 'Помыли окна в квартире и на балконе. Аккуратно, без разводов, подоконники тоже протёрли.', tag: 'Мытьё окон, 9 створок' },
        ]} />
      </Sec>

      <CtaBand title="Первая уборка −15%" text="Скидка для новых клиентов по промокоду ЧИСТО. Действует на любой тип уборки." to={`${base}/contacts`} btn="Заказать со скидкой" />
    </>
  )
}

function Services() {
  return (
    <>
      <PageHead kicker="Услуги" title="Цены на уборку" text="Фиксированная цена за метр — без «доплат на месте». Химия, инвентарь и выезд по Казани включены." />
      <Sec>
        <Prices groups={[
          { title: 'Квартиры', items: [['Поддерживающая', 'от 2 900 ₽', '45 ₽/м²'], ['Генеральная', 'от 6 900 ₽', '110 ₽/м²'], ['После ремонта', 'от 9 900 ₽', '160 ₽/м²'], ['Перед заездом / выездом', 'от 5 900 ₽']] },
          { title: 'Дома и офисы', items: [['Уборка коттеджа', 'от 12 000 ₽'], ['Офис, разовая', 'от 40 ₽/м²'], ['Офис, по договору', 'от 25 000 ₽/мес'], ['Уборка после мероприятия', 'от 8 000 ₽']] },
          { title: 'Окна', items: [['Створка окна', '350 ₽'], ['Балконное остекление', 'от 1 200 ₽'], ['Мытьё фасадного окна', 'от 900 ₽']] },
          { title: 'Химчистка', items: [['Диван 3-местный', 'от 2 500 ₽'], ['Матрас', 'от 1 800 ₽'], ['Ковёр', '250 ₽/м²'], ['Кресло', 'от 900 ₽']] },
        ]} />
      </Sec>
      <Sec title="Что входит в генеральную уборку" className="cl-soft">
        <div className="cl-check">
          {[['Кухня', ['Фасады и столешницы', 'Плита, вытяжка, СВЧ снаружи', 'Мойка и смеситель', 'Фартук от жира']], ['Комнаты', ['Пыль на всех поверхностях', 'Зеркала и стёкла', 'Двери и выключатели', 'Пылесос и мытьё полов']], ['Санузел', ['Сантехника от налёта', 'Плитка и швы', 'Душевая кабина', 'Дезинфекция']]].map(([t, l]) => (
            <Reveal key={t as string} className="cl-check-i"><h3>{t as string}</h3><ul>{(l as string[]).map(x => <li key={x}><Check size={16} />{x}</li>)}</ul></Reveal>
          ))}
        </div>
      </Sec>
    </>
  )
}

function About() {
  return (
    <>
      <PageHead kicker="О компании" title="Как мы работаем" text="С 2019 года сделали больше 14 000 уборок. В команде 40 клинеров, у каждого — медкнижка и обучение." />
      <Sec>
        <div className="cl-steps">
          {[['Заявка', 'Рассчитайте цену на сайте или позвоните — подтвердим за 10 минут'], ['Выезд', 'Бригада приезжает в согласованное время со всем инвентарём'], ['Уборка', 'Работаем по чек-листу из 120 пунктов, вы можете уйти по делам'], ['Приёмка', 'Проверяете результат, оплачиваете после уборки']].map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.08} className="cl-step"><span>{i + 1}</span><h3>{t}</h3><p>{d}</p></Reveal>
          ))}
        </div>
      </Sec>
      <Sec title="Вопросы" className="cl-soft">
        <Faq items={[['Нужно ли быть дома во время уборки?', 'Нет. Можно оставить ключи консьержу или встретить бригаду и уйти. В конце пришлём фотоотчёт.'], ['Со своей химией или с вашей?', 'Привозим всё своё: профессиональные средства, пылесос, парогенератор, стремянку.'], ['Что если результат не понравится?', 'Сообщите в течение 24 часов — бесплатно приедем и переделаем.'], ['Как оплатить?', 'Картой, по СБП или наличными после уборки. Для юрлиц — по счёту.']]} />
      </Sec>
    </>
  )
}

function Works() {
  const items = [['1740657254989-42fe9c3b8cce', 'Квартиры'], ['1646980241033-cd7abda2ee88', 'Квартиры'], ['1713110824336-f78c320dcf8e', 'Кухни'], ['1742483359033-13315b247c74', 'Окна'], ['1581578949510-fa7315c4c350', 'Офисы'], ['1647381518264-97ff1835026f', 'Кухни'], ['1774578341952-98cbacf88010', 'Квартиры'], ['1758273705627-937374bfa978', 'После ремонта'], ['1758273238415-01ec03d9ef27', 'После ремонта']].map(([img, cat]) => ({ img, cat }))
  return (
    <>
      <PageHead kicker="Наши работы" title="Фото с объектов" text="Реальные фото из отчётов клинеров. Публикуем с разрешения клиентов." />
      <Sec><Gallery items={items} /></Sec>
    </>
  )
}

function Contacts() {
  return (
    <>
      <PageHead kicker="Контакты" title="Заказать уборку" text="Оставьте заявку — менеджер перезвонит, уточнит детали и назовёт точную цену." />
      <Sec><ContactBlock info={info} title="Заявка на уборку" note="Перезвоним в течение 10 минут." options={{ label: 'Тип уборки', values: types.map(t => t.name).concat('Химчистка мебели', 'Мытьё окон') }} /></Sec>
    </>
  )
}

export default function Page() {
  useSiteMeta({ title: 'Чисто — клининг в Казани', color: '#1E7BF2', letter: 'Ч', fonts: 'family=Unbounded:wght@500;600;700&family=Manrope:wght@400;500;600;700' })
  return (
    <SiteShell slug="clean">
      <BizLayout base={base} logo={<span className="cl-logo"><i />чисто</span>} links={[{ to: 'services', label: 'Цены' }, { to: 'about', label: 'Как работаем' }, { to: 'works', label: 'Работы' }, { to: 'contacts', label: 'Контакты' }]} cta={{ label: 'Заказать уборку', to: 'contacts' }} info={info}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="about" element={<About />} />
          <Route path="works" element={<Works />} />
          <Route path="contacts" element={<Contacts />} />
        </Routes>
      </BizLayout>
    </SiteShell>
  )
}
