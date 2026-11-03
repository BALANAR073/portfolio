import { motion } from 'motion/react'
import { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { Sparkles, Sun } from 'lucide-react'
import { Marquee } from '../../shared/Marquee'
import { SiteShell } from '../../shared/SiteShell'
import { Reveal } from '../../shared/Reveal'
import { useSiteMeta } from '../../shared/hooks'
import { ShopProvider } from '../../shared/shop/cart'
import { ShopLayout } from '../../shared/shop/ShopLayout'
import { Catalog } from '../../shared/shop/Catalog'
import { ProductPage } from '../../shared/shop/ProductPage'
import { Checkout } from '../../shared/shop/Checkout'
import { ProductRail, QuickCats, DeliveryPage } from '../../shared/shop/blocks'
import { HeroSlider } from '../../shared/sliders'
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
        <Reveal className="gl-r-head"><h2 className="s-h2">Ритуал в три шага</h2><div className="gl-tabs">{(Object.keys(routine) as (keyof typeof routine)[]).map(k => <button key={k} type="button" aria-pressed={t === k} onClick={() => setT(k)}>{k === 'Утро' ? <Sun size={16} /> : <Sparkles size={16} />}{k}</button>)}</div></Reveal>
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
      <HeroSlider className="gl-slider" slides={[
        { img: '1763503839418-2b45c3d7a3c3', dark: false, kicker: 'Новинка', title: <>Уход, который <em>понимает</em> вашу кожу</>, text: 'Корейские формулы и честные составы. Подберём средства под ваш тип кожи — бесплатно, в чате с косметологом.', cta: { label: 'В каталог', to: `${base}/catalog` } },
        { img: '1713768704571-6aeb0d0e5105', dark: false, kicker: 'Хит продаж', title: <>Сыворотка с витамином C</>, text: 'Ровный тон и сияние за 4 недели. Стабильная форма, не окисляется.', cta: { label: 'Подробнее', to: `${base}/p/serum-c` } },
        { img: '1613803745799-ba6c10aace85', dark: false, kicker: '−19% на наборы', title: <>Базовый уход в одной коробке</>, text: 'Пенка, сыворотка и крем — хороший подарок, даже если не знаете тип кожи.', cta: { label: 'Выбрать набор', to: `${base}/catalog?cat=${encodeURIComponent('Наборы')}` } },
      ]} />

      <QuickCats base={base} items={[{ cat: 'Очищение', img: '1597931752949-98c74b5b159f' }, { cat: 'Сыворотки', img: '1710410815589-dd83514104d0' }, { cat: 'Кремы', img: '1763503839418-2b45c3d7a3c3' }, { cat: 'Маски', img: '1603777953081-624bff44a0a5' }, { cat: 'Наборы', img: '1613803745799-ba6c10aace85' }]} />

      <Marquee className="gl-mq" items={['0% отдушек', 'Веган и cruelty free', 'Корейские формулы', 'Пробник в каждом заказе', 'Подбор ухода у косметолога']} />

      <ProductRail base={base} title="Любимое покупательниц" ids={['serum-c', 'cream', 'foam', 'spf', 'serum-ha', 'set']} />
      <Routine />
      <ProductRail base={base} title="Наборы и travel-версии" filter={p => p.cat === 'Наборы' || p.cat === 'Маски'} moreTo={`${base}/catalog?cat=${encodeURIComponent('Наборы')}`} />
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
