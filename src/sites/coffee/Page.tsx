import { motion } from 'motion/react'
import { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { SiteShell } from '../../shared/SiteShell'
import { Reveal } from '../../shared/Reveal'
import { useSiteMeta } from '../../shared/hooks'
import { u } from '../../shared/img'
import { ShopProvider, useShop } from '../../shared/shop/cart'
import { ShopLayout } from '../../shared/shop/ShopLayout'
import { Catalog } from '../../shared/shop/Catalog'
import { ProductPage } from '../../shared/shop/ProductPage'
import { Checkout } from '../../shared/shop/Checkout'
import { Picks, ShopReviews, DeliveryPage } from '../../shared/shop/blocks'
import { cfg } from './data'
import './style.css'

const base = '/sites/coffee'

/** Подбор кофе: 2 вопроса → рекомендация */
function Finder() {
  const [how, setHow] = useState<string | null>(null)
  const [taste, setTaste] = useState<string | null>(null)
  const { find } = useShop()
  const pick = how && taste ? (how === 'milk' ? (taste === 'bright' ? 'colombia' : 'brazil') : how === 'filter' ? (taste === 'bright' ? 'ethiopia' : 'colombia') : 'drip') : null
  const p = pick ? find(pick) : undefined
  const Q = ({ v, set, opts }: { v: string | null; set: (s: string) => void; opts: [string, string][] }) => <div className="cf-opts">{opts.map(([k, l]) => <button key={k} type="button" aria-pressed={v === k} onClick={() => set(k)}>{l}</button>)}</div>
  return (
    <section className="cf-finder">
      <div className="swrap cf-finder-in">
        <Reveal>
          <p className="cf-kick">Подбор за 10 секунд</p>
          <h2 className="s-h2">Не знаете, какой кофе взять?</h2>
          <p className="cf-q">1. Как вы обычно пьёте кофе?</p>
          <Q v={how} set={setHow} opts={[['milk', 'Капучино и латте'], ['filter', 'Воронка или френч-пресс'], ['none', 'Нет кофемашины']]} />
          <p className="cf-q">2. Какой вкус ближе?</p>
          <Q v={taste} set={setTaste} opts={[['choco', 'Шоколад и орехи'], ['bright', 'Ягоды и цитрус']]} />
        </Reveal>
        <div className="cf-result">
          {p ? (
            <motion.div key={p.id} initial={{ opacity: 0, y: 20, rotate: -2 }} animate={{ opacity: 1, y: 0, rotate: 0 }} className="cf-card">
              <img src={u(p.imgs[0], 600)} alt="" />
              <div><small>Вам подойдёт</small><h3>{p.name}</h3><p>{p.short}</p><Link to={`${base}/p/${p.id}`} className="sbtn">Смотреть · {p.price} ₽</Link></div>
            </motion.div>
          ) : <div className="cf-empty">Ответьте на два вопроса — и здесь появится ваш кофе</div>}
        </div>
      </div>
    </section>
  )
}

function Home() {
  return (
    <>
      <section className="cf-hero">
        <div className="swrap cf-hero-in">
          <div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="cf-kick">Обжарочная в Казани · с 2019</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>Свежая обжарка<br />к вам домой</motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="cf-lead">Обжариваем по вторникам и пятницам и отправляем в течение двух дней. Кофе, который пахнет так же, как в хорошей кофейне.</motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="cf-acts"><Link to={`${base}/catalog`} className="sbtn">Выбрать кофе</Link><a href="#finder" className="sbtn ghost" onClick={e => { e.preventDefault(); document.querySelector('.cf-finder')?.scrollIntoView({ behavior: 'smooth' }) }}>Помогите выбрать</a></motion.div>
          </div>
          <div className="cf-hero-img">
            <motion.img initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }} src={u('1511920170033-f8396924c348', 1000)} alt="Свежеобжаренные зёрна кофе" />
            <motion.div className="cf-stamp" initial={{ rotate: -40, opacity: 0 }} animate={{ rotate: -12, opacity: 1 }} transition={{ delay: 0.6, type: 'spring' }}>обжарено<b>48 ч</b>назад</motion.div>
          </div>
        </div>
      </section>

      <section className="cf-steps swrap">
        {[['Вт и Пт', 'Обжариваем небольшими партиями по 15 кг'], ['48 часов', 'Отправляем, пока кофе на пике аромата'], ['SCA 83+', 'Только спешелти-зерно с оценкой выше 83'], ['от 2 500 ₽', 'Доставка бесплатно по всей России']].map(([b, t], i) => <Reveal key={b} delay={i * 0.06}><b>{b}</b><p>{t}</p></Reveal>)}
      </section>

      <Picks base={base} ids={['brazil', 'ethiopia', 'blend', 'drip']} title="Сейчас в обжарке" />
      <Finder />

      <section className="s-sec">
        <div className="swrap">
          <Reveal><h2 className="s-h2">Отзывы</h2></Reveal>
          <ShopReviews items={[{ name: 'Артём', item: 'Эфиопия Иргачеффе', text: 'Заказываю каждый месяц уже год. Кофе всегда свежий — на пачке дата обжарки, и она всегда за 1–2 дня до получения.' }, { name: 'Лейсан', item: 'дрип-пакеты', text: 'Взяла на работу — коллеги теперь тоже заказывают. Вкусно даже без кофемашины.' }, { name: 'Игорь', item: 'Бразилия Серрадо', text: 'Идеальный кофе для капучино в рожковой. Никакой горечи, как у супермаркетного.' }]} />
        </div>
      </section>
    </>
  )
}

export default function Page() {
  useSiteMeta({ title: 'Зерно — обжарочная в Казани', color: '#2F5D3A', letter: 'З', fonts: 'family=Alegreya:ital,wght@0,500;0,700;1,500&family=Golos+Text:wght@400;500;600;700' })
  return (
    <SiteShell slug="coffee">
      <ShopProvider cfg={cfg}>
        <ShopLayout base={base} logo={<span className="cf-logo">Зерно<small>обжарочная</small></span>} announce="Бесплатная доставка от 2 500 ₽ · Обжарка по вторникам и пятницам" footerNote="Обжарочная спешелти-кофе. Обжариваем небольшими партиями и отправляем по всей России.">
          <Routes>
            <Route index element={<Home />} />
            <Route path="catalog" element={<Catalog base={base} title="Кофе и чай" />} />
            <Route path="p/:id" element={<ProductPage base={base} />} />
            <Route path="checkout" element={<Checkout base={base} />} />
            <Route path="delivery" element={<DeliveryPage intro="Обжариваем по вторникам и пятницам и отправляем на следующий день. Заказы, оформленные до обжарки, едут самыми свежими." extra={[['Свежесть', 'На каждой пачке указана дата обжарки. Кофе раскрывается через 3–5 дней и остаётся ярким 6 недель.'], ['Помол', 'Мелем под ваш способ приготовления прямо перед упаковкой. Если сомневаетесь — берите в зёрнах.']]} />} />
          </Routes>
        </ShopLayout>
      </ShopProvider>
    </SiteShell>
  )
}
