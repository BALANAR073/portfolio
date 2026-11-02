import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperT } from 'swiper'
import { Autoplay, EffectFade, A11y, FreeMode, Keyboard } from 'swiper/modules'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/free-mode'
import { u } from './img'
import './sliders.css'

export type HeroSlide = { img: string; kicker?: string; title: ReactNode; text?: string; cta?: { label: string; to: string }; dark?: boolean }

/** Большой баннер-слайдер на первом экране: плавная смена, автопрокрутка, прогресс-полоски. */
export function HeroSlider({ slides, className = '', delay = 6000 }: { slides: HeroSlide[]; className?: string; delay?: number }) {
  const [sw, setSw] = useState<SwiperT | null>(null)
  const [i, setI] = useState(0)
  return (
    <section className={'slh ' + className}>
      <Swiper modules={[Autoplay, EffectFade, A11y, Keyboard]} effect="fade" fadeEffect={{ crossFade: true }} speed={900} loop autoplay={{ delay, disableOnInteraction: false, pauseOnMouseEnter: true }} keyboard onSwiper={setSw} onSlideChange={s => setI(s.realIndex)}>
        {slides.map((s, k) => (
          <SwiperSlide key={k}>
            <div className={'slh-slide' + (s.dark === false ? ' light' : '')}>
              <img src={u(s.img, 1900)} alt="" className={i === k ? 'on' : ''} loading={k ? 'lazy' : 'eager'} />
              <div className="slh-in">
                {i === k && (
                  <motion.div initial="h" animate="s" variants={{ s: { transition: { staggerChildren: 0.09 } } }}>
                    {s.kicker && <motion.p variants={fade} className="slh-kick">{s.kicker}</motion.p>}
                    <motion.h2 variants={fade}>{s.title}</motion.h2>
                    {s.text && <motion.p variants={fade} className="slh-text">{s.text}</motion.p>}
                    {s.cta && <motion.div variants={fade}><Link to={s.cta.to} className="slh-btn">{s.cta.label} <ArrowRight size={18} /></Link></motion.div>}
                  </motion.div>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="slh-ui">
        <div className="slh-bars">{slides.map((_, k) => <button key={k} type="button" aria-label={`Слайд ${k + 1}`} className={i === k ? 'on' : k < i ? 'done' : ''} onClick={() => sw?.slideToLoop(k)}><i style={{ animationDuration: `${delay}ms` }} /></button>)}</div>
        <div className="slh-arrows"><button type="button" aria-label="Назад" onClick={() => sw?.slidePrev()}><ChevronLeft /></button><button type="button" aria-label="Вперёд" onClick={() => sw?.slideNext()}><ChevronRight /></button></div>
      </div>
    </section>
  )
}
const fade = { h: { opacity: 0, y: 26 }, s: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] as const } } }

/** Горизонтальная карусель с заголовком и стрелками. На телефоне листается пальцем. */
export function Rail({ title, more, children, view = [1.25, 2.3, 4], gap = 18, className = '' }: { title?: ReactNode; more?: { label: string; to: string }; children: ReactNode[]; view?: [number, number, number]; gap?: number; className?: string }) {
  const [sw, setSw] = useState<SwiperT | null>(null)
  const [edge, setEdge] = useState<[boolean, boolean]>([true, false])
  const upd = (s: SwiperT) => setEdge([s.isBeginning, s.isEnd])
  return (
    <div className={'rail ' + className}>
      {(title || more) && (
        <div className="rail-head">
          {title && <h2 className="rail-title">{title}</h2>}
          <div className="rail-tools">
            {more && <Link to={more.to} className="rail-more">{more.label}</Link>}
            <button type="button" aria-label="Листать назад" disabled={edge[0]} onClick={() => sw?.slidePrev()}><ChevronLeft size={20} /></button>
            <button type="button" aria-label="Листать вперёд" disabled={edge[1]} onClick={() => sw?.slideNext()}><ChevronRight size={20} /></button>
          </div>
        </div>
      )}
      <Swiper modules={[FreeMode, A11y, Keyboard]} keyboard freeMode={{ enabled: true, sticky: true }} spaceBetween={gap} slidesPerView={view[0]} breakpoints={{ 640: { slidesPerView: view[1] }, 1024: { slidesPerView: view[2], freeMode: false } }} onSwiper={s => { setSw(s); upd(s) }} onSlideChange={upd} onResize={upd}>
        {children.map((c, k) => <SwiperSlide key={k}>{c}</SwiperSlide>)}
      </Swiper>
    </div>
  )
}
