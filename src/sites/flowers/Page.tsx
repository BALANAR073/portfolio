import { Link, Route, Routes } from 'react-router-dom'
import { Clock, Camera, Gift, Leaf } from 'lucide-react'
import { Marquee } from '../../shared/Marquee'
import { SiteShell } from '../../shared/SiteShell'
import { Reveal } from '../../shared/Reveal'
import { useSiteMeta } from '../../shared/hooks'
import { u } from '../../shared/img'
import { ShopProvider } from '../../shared/shop/cart'
import { ShopLayout } from '../../shared/shop/ShopLayout'
import { Catalog } from '../../shared/shop/Catalog'
import { ProductPage } from '../../shared/shop/ProductPage'
import { Checkout } from '../../shared/shop/Checkout'
import { ProductRail, QuickCats, PromoPair, DeliveryPage } from '../../shared/shop/blocks'
import { HeroSlider } from '../../shared/sliders'
import { cfg } from './data'
import './style.css'

const base = '/sites/flowers'

function Home() {
  return (
    <>
      <HeroSlider slides={[
        { img: '1523308458373-c6f61ae1fd21', kicker: 'Осенняя коллекция', title: <>Тёплые букеты <em>для холодных дней</em></>, text: 'Хризантемы, сухоцветы и розы оттенков терракоты — собираем из утренней поставки.', cta: { label: 'Смотреть букеты', to: `${base}/catalog?cat=${encodeURIComponent('Сезонные')}` } },
        { img: '1558879787-4c4aea1fbb83', kicker: '−15% до конца недели', title: <>Цветы в коробке</>, text: 'Не нужна ваза — достаточно подливать немного воды. Стоят до 10 дней.', cta: { label: 'Выбрать коробку', to: `${base}/catalog?cat=${encodeURIComponent('В коробке')}` } },
        { img: '1605477758687-973ba14c43b1', kicker: 'Доставка за 2 часа', title: <>Привезём сегодня, пришлём фото до отправки</>, text: 'По всей Казани с 8:00 до 22:00. Открытка с вашим текстом — бесплатно.', cta: { label: 'Заказать букет', to: `${base}/catalog` } },
      ]} />

      <QuickCats base={base} items={[{ cat: 'Букеты', img: '1564070814872-a2e801dbf413' }, { cat: 'Розы', img: '1605477758687-973ba14c43b1' }, { cat: 'Сезонные', img: '1604137488398-b1d691713d96' }, { cat: 'В коробке', img: '1558879787-4c4aea1fbb83' }, { cat: 'Свадебные', img: '1530488228536-37ae1dbb20a4' }]} />

      <Marquee className="fl-mq" items={['Доставка за 2 часа', 'Фото букета до отправки', 'Собираем в день заказа', 'Открытка в подарок', 'Свежесть 7 дней или замена']} />

      <ProductRail base={base} title="Хиты недели" ids={['tender', 'red', 'box', 'garden', 'pink', 'spring']} />

      <div className="fl-perks swrap">
        {[[Clock, 'Доставка за 2 часа', 'по всей Казани'], [Camera, 'Фото букета', 'до отправки курьеру'], [Gift, 'Открытка в подарок', 'с вашим текстом'], [Leaf, 'Свежесть 7 дней', 'или заменим бесплатно']].map(([I, t, s], i) => {
          const Ic = I as typeof Clock
          return <Reveal key={t as string} delay={i * 0.06} className="fl-perk"><Ic size={22} /><div><b>{t as string}</b><small>{s as string}</small></div></Reveal>
        })}
      </div>

      <ProductRail base={base} title="Недорогие букеты до 3 500 ₽" filter={p => p.price <= 3500} />

      <PromoPair items={[
        { img: '1530488228536-37ae1dbb20a4', title: 'Свадебная флористика', text: 'Букет невесты, бутоньерки и оформление банкета', to: `${base}/catalog?cat=${encodeURIComponent('Свадебные')}`, btn: 'Подробнее' },
        { img: '1457089328109-e5d9bd499191', title: 'Цветы для офиса', text: 'Еженедельная доставка композиций по договору', to: `${base}/catalog`, btn: 'Узнать условия' },
      ]} />

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

      <ProductRail base={base} title="Сезонная коллекция" ids={['spring', 'garden', 'meadow', 'boxwhite', 'table']} />
    </>
  )
}

export default function Page() {
  useSiteMeta({ title: 'Пион — доставка цветов в Казани', color: '#9E2A4A', letter: 'П', fonts: 'family=Playfair+Display:ital,wght@0,500;0,600;1,500&family=Manrope:wght@400;500;600;700' })
  return (
    <SiteShell slug="flowers">
      <ShopProvider cfg={cfg}>
        <ShopLayout base={base} overlay logo={<span className="fl-logo">Пион<i>•</i></span>} announce="Бесплатная доставка по Казани при заказе от 4 000 ₽ · Промокод ПЕРВЫЙ — скидка 10%" footerNote="Цветочная мастерская. Собираем букеты в день доставки, работаем каждый день с 8:00 до 22:00.">
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
