import { motion } from 'motion/react'
import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { u } from '../img'
import { useShop, rub } from './cart'
import { PhoneInput } from '../PhoneInput'

/** Оформление заказа: контакты, доставка, оплата, итог. В демо заказ никуда не отправляется. */
export function Checkout({ base }: { base: string }) {
  const { lines, find, total, cfg, clear } = useShop()
  const [del, setDel] = useState(cfg.delivery[0].id)
  const [pay, setPay] = useState('card')
  const [promo, setPromo] = useState('')
  const [promoOk, setPromoOk] = useState(false)
  const [done, setDone] = useState<string | null>(null)
  const d = cfg.delivery.find(x => x.id === del)!
  const dPrice = total >= cfg.freeFrom ? 0 : d.price
  const disc = promoOk ? Math.round(total * 0.1) : 0
  const sum = total + dPrice - disc
  const submit = (e: FormEvent) => { e.preventDefault(); setDone(String(Math.floor(10000 + Math.random() * 89999))); clear(); window.scrollTo(0, 0) }
  if (done) return (
    <section className="swrap co-done">
      <motion.span className="co-ok" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 16 }}><Check size={40} /></motion.span>
      <h1>Заказ № {done} оформлен</h1>
      <p>Мы отправили подтверждение в SMS. Менеджер свяжется с вами в течение 15 минут, чтобы уточнить время доставки.</p>
      <Link to={`${base}/catalog`} className="sbtn">Вернуться в каталог</Link>
    </section>
  )
  if (!lines.length) return <section className="swrap co-done"><h1>Корзина пуста</h1><p>Добавьте товары, чтобы оформить заказ.</p><Link to={`${base}/catalog`} className="sbtn">В каталог</Link></section>
  return (
    <section className="co">
      <div className="swrap">
        <h1>Оформление заказа</h1>
        <form className="co-grid" onSubmit={submit}>
          <div className="co-form">
            <fieldset><legend>1. Контакты</legend>
              <div className="co-row"><label>Имя<input required autoComplete="name" /></label><label>Телефон<PhoneInput required /></label></div>
              <label>E-mail для чека<input type="email" autoComplete="email" placeholder="необязательно" /></label>
            </fieldset>
            <fieldset><legend>2. Доставка</legend>
              <div className="co-opts">{cfg.delivery.map(x => <label key={x.id} className={'co-opt' + (del === x.id ? ' on' : '')}><input type="radio" name="del" checked={del === x.id} onChange={() => setDel(x.id)} /><span><b>{x.label}</b><small>{x.note}</small></span><em>{total >= cfg.freeFrom || !x.price ? 'бесплатно' : rub(x.price)}</em></label>)}</div>
              {del !== 'pickup' && <div className="co-row"><label className="grow">Адрес<input required placeholder="Улица, дом, квартира" autoComplete="street-address" /></label><label>Дата<input type="date" min={new Date().toISOString().slice(0, 10)} required /></label></div>}
              <label>Комментарий<textarea rows={2} placeholder="Код домофона, пожелания" /></label>
            </fieldset>
            <fieldset><legend>3. Оплата</legend>
              <div className="co-opts two">{[['card', 'Картой онлайн', 'Visa, Mastercard, Мир'], ['sbp', 'СБП', 'По QR-коду'], ['cash', 'При получении', 'Картой или наличными']].map(([k, l, n]) => <label key={k} className={'co-opt' + (pay === k ? ' on' : '')}><input type="radio" name="pay" checked={pay === k} onChange={() => setPay(k)} /><span><b>{l}</b><small>{n}</small></span></label>)}</div>
            </fieldset>
          </div>
          <aside className="co-sum">
            <h3>Ваш заказ</h3>
            {lines.map(l => { const p = find(l.id)!; return <div key={l.id + (l.opt || '')} className="co-line"><img src={u(p.imgs[0], 120)} alt="" /><span>{p.name}{l.opt && <small>{l.opt}</small>}<small>{l.qty} шт.</small></span><b>{rub(p.price * l.qty)}</b></div> })}
            <div className="co-promo"><input placeholder="Промокод" value={promo} onChange={e => setPromo(e.target.value)} aria-label="Промокод" /><button type="button" onClick={() => setPromoOk(promo.trim().toUpperCase() === 'ПЕРВЫЙ')}>Применить</button></div>
            <p className="co-hint">{promoOk ? 'Промокод ПЕРВЫЙ: −10%' : 'Попробуйте промокод ПЕРВЫЙ'}</p>
            <dl><div><dt>Товары</dt><dd>{rub(total)}</dd></div><div><dt>Доставка</dt><dd>{dPrice ? rub(dPrice) : 'бесплатно'}</dd></div>{disc > 0 && <div><dt>Скидка</dt><dd>−{rub(disc)}</dd></div>}<div className="tot"><dt>Итого</dt><dd>{rub(sum)}</dd></div></dl>
            <button className="sbtn full" type="submit">Подтвердить заказ</button>
            <p className="co-hint">Демо-магазин: заказ никуда не отправляется.</p>
          </aside>
        </form>
      </div>
    </section>
  )
}
