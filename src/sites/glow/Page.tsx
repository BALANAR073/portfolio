import { motion } from 'motion/react'
import { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { Sparkles, Droplets, Sun, Leaf } from 'lucide-react'
import { SiteShell } from '../../shared/SiteShell'
import { Reveal } from '../../shared/Reveal'
import { useSiteMeta } from '../../shared/hooks'
import { u } from '../../shared/img'
import { ShopProvider } from '../../shared/shop/cart'
import { ShopLayout } from '../../shared/shop/ShopLayout'
import { Catalog } from '../../shared/shop/Catalog'
import { ProductPage } from '../../shared/shop/ProductPage'
import { Checkout } from '../../shared/shop/Checkout'
import { Picks, CatTiles, DeliveryPage } from '../../shared/shop/blocks'
import { cfg } from './data'
import './style.css'

const base = '/sites/glow'

const routine = {
  'Утро': [['Пенка', 'Мягко очищаем кожу после ночи', 'foam'], ['Витамин C', 'Сияние и защита от свободных радикалов', 'serum-c'], ['SPF 50', 'Главный антивозрастной шаг', 'spf']],
  'Вечер': [['Масло', 'Снимаем макияж и SPF', 'oil'], ['Гиалурон', 'Увлажняем после очищения', 'serum-ha'], ['Крем-барьер', 'Восстанавливаем кожу за ночь', 'cream']],
} as const

function Routine() {
  const [t, setT] = useState<keyof typeof routine>('Утро')
  return (
    <section className="gl-routine">
      <div className="swrap">
        <Reveal className="gl-r-head"><h2 className="s-h2">Ритуал в три шага</h2><div className="gl-tabs">{(Object.keys(routine) as (keyof typeof routine)[]).map(k => <button key={k} type="button" aria-pressed={t === k} onClick={() => setT(k)}>{k === 'Утро' ? <Sun size={16} /> : <Sparkles size={16} />}{k}{t === k && <motion.i layoutId="gl-tab" />}</button>)}</div></Reveal>
        <div className="gl-steps">
          {routine[t].map(([n, d, id], i) => (
            <motion.div key={t + id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Link to={`${base}/p/${id}`} className="gl-step"><span>0{i + 1}</span><b>{n}</b><p>{d}</p><em>Подробнее →</em></Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Home() {
  return (
    <>
      <section className="gl-hero">
        <div className="swrap gl-hero-in">
          <div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>Уход, который<br /><em>понимает</em> вашу кожу</motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="gl-lead">Корейские формулы и честные составы. Подберём средства под ваш тип кожи — бесплатно, в чате с косметологом.</motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="gl-acts"><Link to={`${base}/catalog`} className="sbtn">В каталог</Link><Link to={`${base}/p/set`} className="sbtn ghost">Набор для старта</Link></motion.div>
          </div>
          <div className="gl-hero-art">
            <motion.img initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} src={u('1596462502278-27bfdc403348', 1000)} alt="Баночки и флаконы уходовой косметики" />
            <motion.span className="gl-blob" animate={{ borderRadius: ['60% 40% 55% 45%', '45% 55% 40% 60%', '60% 40% 55% 45%'] }} transition={{ duration: 8, repeat: Infinity }} />
            <motion.div className="gl-chip c1" animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity }}><Droplets size={16} /> 0% отдушек</motion.div>
            <motion.div className="gl-chip c2" animate={{ y: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity }}><Leaf size={16} /> Веган, без тестов на животных</motion.div>
          </div>
        </div>
      </section>

      <section className="s-sec">
        <div className="swrap"><CatTiles base={base} tiles={[{ cat: 'Очищение', img: '1598528738936-c50861cc75a9' }, { cat: 'Сыворотки', img: '1580870069867-74c57ee1bb07' }, { cat: 'Кремы', img: '1764694187688-454d172e5ca0' }, { cat: 'Наборы', img: '1761864293811-d6e937225df4' }]} /></div>
      </section>
      <Routine />
      <Picks base={base} ids={['serum-c', 'cream', 'foam', 'set']} title="Любимое покупательниц" />
      <section className="gl-consult">
        <div className="swrap"><div className="gl-consult-in">
          <Reveal><h2 className="s-h2">Не знаете, что подойдёт?</h2><p>Напишите в чат — косметолог бесплатно подберёт уход под ваш тип кожи и бюджет. Обычно отвечаем за 10 минут.</p></Reveal>
          <Reveal delay={0.1} className="gl-consult-steps">{['Опишите кожу и что беспокоит', 'Получите подборку из 2–4 средств', 'Закажите с пробниками в подарок'].map((t, i) => <div key={t}><span>{i + 1}</span>{t}</div>)}</Reveal>
        </div></div>
      </section>
    </>
  )
}

export default function Page() {
  useSiteMeta({ title: 'Glow — уходовая косметика', color: '#8E5C74', letter: 'G', fonts: 'family=Lora:ital,wght@0,500;0,600;1,500&family=Nunito+Sans:wght@400;600;700;800' })
  return (
    <SiteShell slug="glow">
      <ShopProvider cfg={cfg}>
        <ShopLayout base={base} logo={<span className="gl-logo">glow<i>.</i></span>} announce="Пробник в каждом заказе · Бесплатная доставка от 3 000 ₽" footerNote="Уходовая косметика с честными составами. Бесплатно подберём уход в чате с косметологом.">
          <Routes>
            <Route index element={<Home />} />
            <Route path="catalog" element={<Catalog base={base} title="Уход за кожей" />} />
            <Route path="p/:id" element={<ProductPage base={base} />} />
            <Route path="checkout" element={<Checkout base={base} />} />
            <Route path="delivery" element={<DeliveryPage intro="Отправляем заказы каждый день. По Казани привезём сегодня, если оформить до 14:00." extra={[['Подбор ухода', 'Напишите в чат — косметолог бесплатно подберёт средства под ваш тип кожи.'], ['Возврат', 'Если средство не подошло, вернём деньги в течение 14 дней даже за вскрытую упаковку.']]} />} />
          </Routes>
        </ShopLayout>
      </ShopProvider>
    </SiteShell>
  )
}
