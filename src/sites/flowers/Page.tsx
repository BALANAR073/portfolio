import { motion } from 'motion/react'
import { Link, Route, Routes } from 'react-router-dom'
import { Clock, Camera, Gift, Leaf } from 'lucide-react'
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

const base = '/sites/flowers'

function Home() {
  return (
    <>
      <section className="fl-hero">
        <div className="swrap fl-hero-in">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="fl-kicker">Цветочная мастерская в Казани</p>
            <h1>Цветы, которые <em>говорят</em> за вас</h1>
            <p className="fl-lead">Собираем букеты в день доставки из утренней поставки. Привезём за 2 часа и пришлём фото перед отправкой.</p>
            <div className="fl-acts"><Link to={`${base}/catalog`} className="sbtn">Выбрать букет</Link><Link to={`${base}/catalog?cat=${encodeURIComponent('В коробке')}`} className="sbtn ghost">Цветы в коробке</Link></div>
          </motion.div>
          <motion.div className="fl-hero-img" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
            <img src={u('1498814117408-e396f5507073', 1100)} alt="Нежный букет в пастельных тонах" />
            <motion.div className="fl-note" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}><b>4,9 ★</b> 2 400 отзывов<br /><small>Яндекс Карты</small></motion.div>
          </motion.div>
        </div>
      </section>

      <div className="fl-perks swrap">
        {[[Clock, 'Доставка за 2 часа', 'по всей Казани'], [Camera, 'Фото букета', 'до отправки курьеру'], [Gift, 'Открытка в подарок', 'с вашим текстом'], [Leaf, 'Свежесть 7 дней', 'или заменим бесплатно']].map(([I, t, s], i) => {
          const Ic = I as typeof Clock
          return <Reveal key={t as string} delay={i * 0.06} className="fl-perk"><Ic size={22} /><div><b>{t as string}</b><small>{s as string}</small></div></Reveal>
        })}
      </div>

      <section className="s-sec">
        <div className="swrap">
          <div className="s-head"><Reveal><h2 className="s-h2" style={{ margin: 0 }}>Выберите повод</h2></Reveal></div>
          <CatTiles base={base} tiles={[{ cat: 'Букеты', img: '1564070814872-a2e801dbf413', note: 'от 2 400 ₽' }, { cat: 'Розы', img: '1605477758687-973ba14c43b1', note: 'от 3 400 ₽' }, { cat: 'В коробке', img: '1558879787-4c4aea1fbb83', note: 'от 4 800 ₽' }, { cat: 'Свадебные', img: '1530488228536-37ae1dbb20a4', note: 'от 3 700 ₽' }]} />
        </div>
      </section>

      <Picks base={base} ids={['tender', 'red', 'box', 'spring']} title="Чаще всего дарят" />

      <section className="fl-band">
        <div className="swrap fl-band-in">
          <Reveal className="fl-band-img"><img src={u('1587317997367-3d47566f9528', 900)} alt="Флорист собирает букет" loading="lazy" /></Reveal>
          <Reveal delay={0.1}>
            <h2 className="s-h2">Подписка на цветы</h2>
            <p>Свежий букет каждую неделю или раз в две недели — для дома, офиса или чтобы радовать близких без напоминаний в календаре.</p>
            <ul><li>от 2 200 ₽ за букет</li><li>Пауза и отмена в любой момент</li><li>Каждый раз новый сезонный состав</li></ul>
            <Link to={`${base}/catalog`} className="sbtn light">Оформить подписку</Link>
          </Reveal>
        </div>
      </section>

      <section className="s-sec">
        <div className="swrap">
          <Reveal><h2 className="s-h2">Отзывы</h2></Reveal>
          <ShopReviews items={[{ name: 'Анастасия', item: 'букет «Нежность»', text: 'Заказала маме на юбилей в другой город — прислали фото до отправки, мама сказала, что букет ещё красивее, чем на картинке.' }, { name: 'Руслан', item: '51 красная роза', text: 'Привезли за полтора часа, хотя заказывал в пятницу вечером. Розы стояли почти две недели.' }, { name: 'Диляра', item: 'букет невесты', text: 'Собрали букет невесты точно по референсу и сделали бутоньерку в тон. Спасибо за наш день!' }]} />
        </div>
      </section>
    </>
  )
}

export default function Page() {
  useSiteMeta({ title: 'Пион — доставка цветов в Казани', color: '#9E2A4A', letter: 'П', fonts: 'family=Playfair+Display:ital,wght@0,500;0,600;1,500&family=Manrope:wght@400;500;600;700' })
  return (
    <SiteShell slug="flowers">
      <ShopProvider cfg={cfg}>
        <ShopLayout base={base} logo={<span className="fl-logo">Пион<i>•</i></span>} announce="Бесплатная доставка по Казани при заказе от 4 000 ₽ · Промокод ПЕРВЫЙ — скидка 10%" footerNote="Цветочная мастерская. Собираем букеты в день доставки, работаем каждый день с 8:00 до 22:00.">
          <Routes>
            <Route index element={<Home />} />
            <Route path="catalog" element={<Catalog base={base} title="Букеты и композиции" />} />
            <Route path="p/:id" element={<ProductPage base={base} />} />
            <Route path="checkout" element={<Checkout base={base} />} />
            <Route path="delivery" element={<DeliveryPage intro="Привозим цветы по Казани каждый день с 8:00 до 22:00. Перед отправкой присылаем фото букета в WhatsApp или Telegram." extra={[['Если получателя нет дома', 'Курьер подождёт 15 минут и созвонится с вами. Можно оставить букет у соседей или консьержа.'], ['Свежесть', 'Если букет простоял меньше 3 дней — заменим бесплатно. Пришлите фото.']]} />} />
          </Routes>
        </ShopLayout>
      </ShopProvider>
    </SiteShell>
  )
}
