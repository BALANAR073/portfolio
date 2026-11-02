import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { SiteShell } from '../../shared/SiteShell'
import { Reveal } from '../../shared/Reveal'
import { useSiteMeta } from '../../shared/hooks'
import { u } from '../../shared/img'
import { ShopProvider } from '../../shared/shop/cart'
import { ShopLayout } from '../../shared/shop/ShopLayout'
import { Catalog } from '../../shared/shop/Catalog'
import { ProductPage } from '../../shared/shop/ProductPage'
import { Checkout } from '../../shared/shop/Checkout'
import { Picks, CatTiles, ShopReviews, DeliveryPage } from '../../shared/shop/blocks'
import { cfg } from './data'
import './style.css'

const base = '/sites/base'

function Home() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  return (
    <>
      <section className="bs-hero" ref={ref}>
        <motion.img style={{ y }} src={u('1558769132-cb1aea458c5e', 1800)} alt="Модели в одежде BASE" />
        <div className="swrap bs-hero-in">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="bs-drop">Дроп 07 · осень</motion.p>
          <h1>{['ОДЕЖДА', 'НА КАЖДЫЙ', 'ДЕНЬ'].map((w, i) => <motion.span key={w} initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.1, duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}>{w}</motion.span>)}</h1>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bs-hero-cta">
            <p>Плотный хлопок, честный крой, шьём в Казани. Без логотипов на всю спину.</p>
            <Link to={`${base}/catalog`} className="sbtn">Смотреть дроп</Link>
          </motion.div>
        </div>
      </section>

      <div className="bs-mq" aria-hidden><div>{Array.from({ length: 2 }).map((_, k) => <span key={k}>480 г/м² ✦ ШЬЁМ В КАЗАНИ ✦ ПРИМЕРКА ПРИ ПОЛУЧЕНИИ ✦ ВОЗВРАТ 30 ДНЕЙ ✦ БЕСПЛАТНАЯ ДОСТАВКА ОТ 5 000 ₽ ✦&nbsp;</span>)}</div></div>

      <section className="s-sec">
        <div className="swrap">
          <CatTiles base={base} tiles={[{ cat: 'Худи', img: '1677538537484-324385aff147', note: '5 490 ₽' }, { cat: 'Футболки', img: '1489987707025-afc232f7ea0f', note: 'от 1 990 ₽' }, { cat: 'Верхняя одежда', img: '1591047139829-d91aecb6caea', note: 'от 9 900 ₽' }, { cat: 'Брюки', img: '1766575696324-5b65330f23c2', note: 'от 3 990 ₽' }]} />
        </div>
      </section>

      <Picks base={base} ids={['hoodie-graphite', 'tee-white', 'jacket', 'cargo']} title="Бестселлеры" />

      <section className="bs-look">
        <div className="swrap">
          <Reveal><h2 className="s-h2">Лукбук</h2></Reveal>
          <div className="bs-look-grid">
            {[['1515886657613-9f3515b0c78f', 'Худи «Песок» + карго'], ['1483985988355-763728e1935b', 'Пальто Wool + Base Tee'], ['1441984904996-e0b6ba687e04', 'Шоурум на Пушкина, 26']].map(([img, t], i) => (
              <Reveal key={img} delay={i * 0.08} className={'bs-look-i i' + i}><img src={u(img, 900)} alt={t} loading="lazy" /><span>{t}</span></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="s-sec bs-facts">
        <div className="swrap">
          {[['480', 'г/м² — плотность нашего футера. У масс-маркета 280–320'], ['30', 'дней на обмен и возврат, даже если носили дома'], ['12K+', 'покупателей с 2021 года, 40% возвращаются снова']].map(([n, t], i) => (
            <Reveal key={n} delay={i * 0.08}><b>{n}</b><p>{t}</p></Reveal>
          ))}
        </div>
      </section>

      <section className="s-sec">
        <div className="swrap">
          <Reveal><h2 className="s-h2">Что говорят</h2></Reveal>
          <ShopReviews items={[{ name: 'Тимур', item: 'худи Heavy, L', text: 'Ношу второй год, стираю каждую неделю — не скаталось и не село. Взял ещё одно в песочном.' }, { name: 'Алина', item: 'карго «Утилити», S', text: 'Курьер дал примерить, размер подошёл с первого раза. Таблица размеров честная.' }, { name: 'Марат', item: 'футболка Base Tee', text: 'Наконец-то белая футболка, которая не просвечивает. Купил сразу три.' }]} />
        </div>
      </section>
    </>
  )
}

export default function Page() {
  useSiteMeta({ title: 'BASE — одежда на каждый день', color: '#FF5A1F', letter: 'B', fonts: 'family=Rubik+Mono+One&family=Inter:wght@400;500;600;700;800' })
  return (
    <SiteShell slug="base">
      <ShopProvider cfg={cfg}>
        <ShopLayout base={base} logo={<span className="bs-logo">BASE</span>} announce="−10% на первый заказ по промокоду ПЕРВЫЙ · Примерка при получении" footerNote="Базовая одежда из плотного хлопка. Шьём небольшими партиями в Казани с 2021 года.">
          <Routes>
            <Route index element={<Home />} />
            <Route path="catalog" element={<Catalog base={base} title="Каталог" />} />
            <Route path="p/:id" element={<ProductPage base={base} />} />
            <Route path="checkout" element={<Checkout base={base} />} />
            <Route path="delivery" element={<DeliveryPage intro="Доставляем по Казани курьером с примеркой, по России — через СДЭК. Можно забрать заказ в шоуруме в день оформления." extra={[['Примерка', 'Курьер ждёт 15 минут. Оплачиваете только то, что подошло.'], ['Обмен и возврат', '30 дней с момента покупки, если сохранены бирки. Деньги вернём в течение 3 дней.']]} />} />
          </Routes>
        </ShopLayout>
      </ShopProvider>
    </SiteShell>
  )
}
