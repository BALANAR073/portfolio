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
import { Picks, DeliveryPage } from '../../shared/shop/blocks'
import { cfg } from './data'
import './style.css'

const base = '/sites/clay'

function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] })
  const h = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const steps = [['Замес', 'Готовим каменную массу и даём ей отлежаться неделю', '1422246358533-95dcd3d48961'], ['Круг', 'Каждое изделие вытягиваем руками на гончарном круге', '1589051088132-06f36a22012a'], ['Обжиг', 'Два обжига: утильный и глазурный при 1240°', '1532570204726-145c7199f10e'], ['К вам', 'Упаковываем в три слоя и отправляем', '1685270066088-27bb10a18088']]
  return (
    <section className="cl-proc">
      <div className="swrap">
        <Reveal><h2 className="s-h2">Три недели до вашей кружки</h2></Reveal>
        <div className="cl-proc-list" ref={ref}>
          <div className="cl-line"><motion.i style={{ height: h }} /></div>
          {steps.map(([t, d, img], i) => (
            <Reveal key={t} className="cl-proc-i" delay={0.05}>
              <span>0{i + 1}</span>
              <div><h3>{t}</h3><p>{d}</p></div>
              <img src={u(img, 500)} alt="" loading="lazy" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Home() {
  return (
    <>
      <section className="cl-hero">
        <div className="swrap">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="cl-kick">Керамическая мастерская · Казань</motion.p>
          <h1>{['Посуда,', 'сделанная', 'руками'].map((w, i) => <span key={w}><motion.span initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ delay: i * 0.12, duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}>{w}</motion.span></span>)}</h1>
          <div className="cl-hero-row">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>Небольшие партии, живая глина и глазури, которые мы варим сами. Каждый предмет немного отличается — в этом и смысл.</motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}><Link to={`${base}/catalog`} className="sbtn">Смотреть посуду</Link></motion.div>
          </div>
        </div>
        <motion.div className="cl-hero-img" initial={{ clipPath: 'inset(20% 10% 0 10%)' }} animate={{ clipPath: 'inset(0% 0% 0 0%)' }} transition={{ duration: 1.3, ease: [0.2, 0.7, 0.2, 1] }}>
          <img src={u('1699391197173-511a372040ed', 1800)} alt="Керамические кружки на деревянном столе" />
        </motion.div>
      </section>

      <Picks base={base} ids={['mug', 'plate', 'vase', 'set']} title="Из последнего обжига" />
      <Process />

      <section className="s-sec cl-class">
        <div className="swrap cl-class-in">
          <Reveal className="cl-class-img"><img src={u('1508269151431-a34449ca161d', 900)} alt="Мастер-класс на гончарном круге" loading="lazy" /></Reveal>
          <Reveal delay={0.1}>
            <p className="cl-kick">Мастер-классы</p>
            <h2 className="s-h2">Попробуйте сами</h2>
            <p>2,5 часа за гончарным кругом, чай и мастер, который поможет на каждом шаге. Опыт не нужен — уйдёте с 2–3 своими изделиями.</p>
            <div className="cl-class-meta"><div><b>3 500 ₽</b><small>за человека</small></div><div><b>до 6</b><small>человек в группе</small></div><div><b>Сб, Вс</b><small>12:00 и 16:00</small></div></div>
            <Link to={`${base}/p/class`} className="sbtn">Записаться</Link>
          </Reveal>
        </div>
      </section>

      <Picks base={base} ids={['class', 'cert', 'vase-s', 'cup']} title="Для подарка" />
    </>
  )
}

export default function Page() {
  useSiteMeta({ title: 'Глина — керамическая мастерская', color: '#5F6B3A', letter: 'Г', fonts: 'family=Spectral:ital,wght@0,400;0,500;1,400&family=Jost:wght@400;500;600' })
  return (
    <SiteShell slug="clay">
      <ShopProvider cfg={cfg}>
        <ShopLayout base={base} logo={<span className="cl-logo">глина</span>} announce="Каждый предмет сделан вручную · Бесплатная доставка от 6 000 ₽" footerNote="Керамическая мастерская. Делаем посуду небольшими партиями и проводим мастер-классы по выходным.">
          <Routes>
            <Route index element={<Home />} />
            <Route path="catalog" element={<Catalog base={base} title="Посуда и мастер-классы" />} />
            <Route path="p/:id" element={<ProductPage base={base} />} />
            <Route path="checkout" element={<Checkout base={base} />} />
            <Route path="delivery" element={<DeliveryPage intro="Керамика — хрупкая, поэтому упаковываем каждый предмет в бумагу, пузырчатую плёнку и жёсткую коробку." extra={[['Если разбилось', 'Пришлите фото в течение суток после получения — сделаем новое изделие бесплатно.'], ['Уход', 'Посуду можно мыть в посудомойке и греть в микроволновке. Не ставьте пустую посуду на огонь.']]} />} />
          </Routes>
        </ShopLayout>
      </ShopProvider>
    </SiteShell>
  )
}
