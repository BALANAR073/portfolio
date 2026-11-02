import { Route, Routes } from 'react-router-dom'
import { SiteShell } from '../../shared/SiteShell'
import { Reveal } from '../../shared/Reveal'
import { useSiteMeta } from '../../shared/hooks'
import { u } from '../../shared/img'
import { ShopProvider } from '../../shared/shop/cart'
import { ShopLayout } from '../../shared/shop/ShopLayout'
import { Catalog } from '../../shared/shop/Catalog'
import { ProductPage } from '../../shared/shop/ProductPage'
import { Checkout } from '../../shared/shop/Checkout'
import { ProductRail, CatTiles, DeliveryPage } from '../../shared/shop/blocks'
import { HeroSlider } from '../../shared/sliders'
import { cfg } from './data'
import './style.css'

const base = '/sites/base'

function Home() {
  return (
    <>
      <HeroSlider className="bs-slider" slides={[
        { img: '1558769132-cb1aea458c5e', kicker: 'Дроп 07 · осень', title: <>Одежда<br />на каждый день</>, text: 'Плотный хлопок, честный крой, шьём в Казани. Без логотипов на всю спину.', cta: { label: 'Смотреть дроп', to: `${base}/catalog` } },
        { img: '1677538537484-324385aff147', kicker: 'Худи Heavy', title: <>480 г/м²<br />держит форму</>, text: 'Трёхнитка с начёсом, двойной капюшон, усиленные швы. После 50 стирок — как новое.', cta: { label: 'Выбрать цвет', to: `${base}/p/hoodie-graphite` } },
        { img: '1591047139829-d91aecb6caea', kicker: '−20% на верхнюю одежду', title: <>Бомберы<br />и пальто</>, text: 'Межсезонье до −10°. Примерка при получении, возврат 30 дней.', cta: { label: 'В каталог', to: `${base}/catalog?cat=${encodeURIComponent('Верхняя одежда')}` } },
      ]} />

      <div className="bs-mq" aria-hidden><div>{Array.from({ length: 2 }).map((_, k) => <span key={k}>480 г/м² ✦ ШЬЁМ В КАЗАНИ ✦ ПРИМЕРКА ПРИ ПОЛУЧЕНИИ ✦ ВОЗВРАТ 30 ДНЕЙ ✦ БЕСПЛАТНАЯ ДОСТАВКА ОТ 5 000 ₽ ✦&nbsp;</span>)}</div></div>

      <section className="s-sec">
        <div className="swrap">
          <CatTiles base={base} tiles={[{ cat: 'Худи', img: '1677538537484-324385aff147', note: '5 490 ₽' }, { cat: 'Футболки', img: '1489987707025-afc232f7ea0f', note: 'от 1 990 ₽' }, { cat: 'Верхняя одежда', img: '1591047139829-d91aecb6caea', note: 'от 9 900 ₽' }, { cat: 'Брюки', img: '1766575696324-5b65330f23c2', note: 'от 3 990 ₽' }]} />
        </div>
      </section>

      <ProductRail base={base} title="Бестселлеры" ids={['hoodie-graphite', 'tee-white', 'cargo', 'jacket', 'hoodie-sand', 'joggers']} />

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

      <ProductRail base={base} title="Новинки" ids={['coat', 'tee-print', 'bag', 'cap', 'jacket']} />
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
