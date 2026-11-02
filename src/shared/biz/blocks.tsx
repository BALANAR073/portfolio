import { motion } from 'motion/react'
import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { Phone, MapPin, Clock, Send } from 'lucide-react'
import { Reveal } from '../Reveal'
import { u } from '../img'
import { PhoneInput } from '../PhoneInput'
import { useSubmit } from '../useForm'
import { Accordion } from '../Accordion'
import type { BizInfo } from './BizLayout'

/** Шапка внутренней страницы */
export function PageHead({ kicker, title, text, img }: { kicker: string; title: ReactNode; text?: string; img?: string }) {
  return (
    <section className={'ph' + (img ? ' has-img' : '')}>
      {img && <motion.img initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.4 }} src={u(img, 1800)} alt="" />}
      <div className="bwrap ph-in">
        <motion.p className="ph-kick" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>{kicker}</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.7 }}>{title}</motion.h1>
        {text && <motion.p className="ph-text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>{text}</motion.p>}
      </div>
    </section>
  )
}

/** Секция с заголовком */
export function Sec({ title, kicker, children, className = '', more }: { title?: ReactNode; kicker?: string; children: ReactNode; className?: string; more?: ReactNode }) {
  return (
    <section className={'bsec ' + className}>
      <div className="bwrap">
        {title && <Reveal className="bsec-head"><div>{kicker && <p className="bsec-kick">{kicker}</p>}<h2 className="bh2">{title}</h2></div>{more}</Reveal>}
        {children}
      </div>
    </section>
  )
}

/** Прайс по группам */
export function Prices({ groups }: { groups: { title: string; items: [string, string, string?][] }[] }) {
  return (
    <div className="pr">
      {groups.map((g, gi) => (
        <Reveal key={g.title} delay={gi * 0.05} className="pr-g">
          <h3>{g.title}</h3>
          {g.items.map(([n, p, note]) => <div key={n} className="pr-row"><span>{n}{note && <small>{note}</small>}</span><i /><b>{p}</b></div>)}
        </Reveal>
      ))}
    </div>
  )
}

/** Команда */
export function Team({ people }: { people: { name: string; role: string; img: string; text?: string }[] }) {
  return (
    <div className="tm">
      {people.map((p, i) => (
        <Reveal key={p.name} delay={i * 0.07} className="tm-i">
          <div className="tm-img"><img src={u(p.img, 700)} alt={p.name} loading="lazy" /></div>
          <h3>{p.name}</h3><p className="tm-role">{p.role}</p>{p.text && <p className="tm-text">{p.text}</p>}
        </Reveal>
      ))}
    </div>
  )
}

/** Галерея с фильтром и просмотром */
export function Gallery({ items }: { items: { img: string; cat: string; title?: string }[] }) {
  const cats = ['Все', ...Array.from(new Set(items.map(i => i.cat)))]
  const [c, setC] = useState('Все')
  const [lb, setLb] = useState(-1)
  const list = items.filter(i => c === 'Все' || i.cat === c)
  return (
    <>
      {cats.length > 2 && <div className="gl-chips">{cats.map(x => <button key={x} type="button" aria-pressed={c === x} onClick={() => setC(x)}>{x}</button>)}</div>}
      <motion.div layout className="gal">
        {list.map((it, i) => (
          <motion.button layout key={it.img + it.cat} type="button" className="gal-i" onClick={() => setLb(i)} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35 }}>
            <img src={u(it.img, 800)} alt={it.title || it.cat} loading="lazy" />
            {it.title && <span>{it.title}</span>}
          </motion.button>
        ))}
      </motion.div>
      <Lightbox open={lb >= 0} index={lb} close={() => setLb(-1)} slides={list.map(it => ({ src: u(it.img, 2000) }))} />
    </>
  )
}

/** Вопросы и ответы */
export function Faq({ items }: { items: string[][] }) {
  return <div className="bfaq"><Accordion items={items} /></div>
}

/** Полоса с призывом */
export function CtaBand({ title, text, to, btn }: { title: ReactNode; text: string; to: string; btn: string }) {
  return (
    <section className="cta-band">
      <div className="bwrap cta-in">
        <Reveal><h2 className="bh2">{title}</h2><p>{text}</p></Reveal>
        <Reveal delay={0.1}><Link to={to} className="bbtn big">{btn}</Link></Reveal>
      </div>
    </section>
  )
}

/** Форма заявки + контакты + схема проезда */
export function ContactBlock({ info, title = 'Оставьте заявку', note, options, children }: { info: BizInfo; title?: string; note: string; options?: { label: string; values: string[] }; children?: ReactNode }) {
  const submit = useSubmit('Заявка отправлена! Перезвоним в течение 15 минут')
  return (
    <div className="cb">
      <Reveal className="cb-form">
        <form onSubmit={submit}>
          <h3>{title}</h3><p>{note}</p>
          <label>Имя<input required autoComplete="name" placeholder="Как к вам обращаться" /></label>
          <label>Телефон<PhoneInput required /></label>
          {options && <label>{options.label}<select>{options.values.map(v => <option key={v}>{v}</option>)}</select></label>}
          <label>Комментарий<textarea rows={3} placeholder="Необязательно" /></label>
          <button className="bbtn full" type="submit"><Send size={18} /> Отправить</button>
          <small>Нажимая кнопку, вы соглашаетесь на обработку персональных данных</small>
        </form>
      </Reveal>
      <Reveal delay={0.1} className="cb-info">
        <div className="cb-row"><Phone /><div><small>Телефон</small><b>{info.phone}</b></div></div>
        <div className="cb-row"><MapPin /><div><small>Адрес</small><b>{info.address}</b></div></div>
        <div className="cb-row"><Clock /><div><small>Режим работы</small><b>{info.hours}</b></div></div>
        <div className="cb-map" aria-label="Схема проезда"><span className="cb-pin"><MapPin /></span><i className="r1" /><i className="r2" /><i className="r3" /><i className="r4" /></div>
        {children}
      </Reveal>
    </div>
  )
}
