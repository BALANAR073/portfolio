import { motion, AnimatePresence, MotionConfig } from 'motion/react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Send, FolderGit2 as Github, Smartphone, Zap, Search, MessageSquare, BarChart3, ShieldCheck, Check, GraduationCap, BookOpen, MapPin, MessagesSquare, Code2, LayoutTemplate, Store, ClipboardList, ShoppingBag, Megaphone, PenLine } from 'lucide-react'
import { sites, type SiteInfo } from '../sites/registry'
import { u } from '../shared/img'
import { Jump } from '../shared/Jump'
import { Reveal } from '../shared/Reveal'
import { Accordion } from '../shared/Accordion'
import { useScrolled } from '../shared/hooks'
import { contacts } from './contacts'
import { LivePreview } from './LivePreview'
import { WorksPreview, worksCount, type WorkKind } from './WorksPreview'
import './home.css'

type Kind = SiteInfo['type']
type Tab = Kind | WorkKind
const kinds: { id: Tab; label: string; short: string; icon: typeof Code2; intro: string }[] = [
  { id: 'landing', label: 'Лендинги', short: 'Лендинги', icon: Code2, intro: 'Одностраничные сайты под одну задачу: записаться, оставить заявку, рассчитать стоимость. Подходят для услуг, мастеров и небольших компаний.' },
  { id: 'bizcard', label: 'Сайты-визитки', short: 'Визитки', icon: LayoutTemplate, intro: 'Многостраничные сайты компаний: услуги и цены, команда, работы и контакты — каждое на своей странице. Внутри работает навигация по разделам.' },
  { id: 'shop', label: 'Интернет-магазины', short: 'Магазины', icon: Store, intro: 'Каталог с фильтрами, карточки товаров, избранное, корзина и оформление заказа с промокодом. Положите что-нибудь в корзину — всё работает.' },
  { id: 'cards', label: 'Карточки', short: 'Карточки', icon: ShoppingBag, intro: 'Инфографика для Wildberries и Ozon: обложка, которая выделяется в выдаче, и слайды с преимуществами, составом, размерами и инструкцией.' },
  { id: 'social', label: 'Соцсети', short: 'Соцсети', icon: Megaphone, intro: 'Посты, сторис, рекламные баннеры и обложки сообществ — в фирменном стиле бизнеса.' },
  { id: 'texts', label: 'Тексты', short: 'Тексты', icon: PenLine, intro: 'Описания товаров для маркетплейсов, тексты для сайтов, SEO-статьи, контент-планы, ответы на отзывы и рекламные объявления.' },
]
const prices = [
  { id: 'landing' as Kind, t: 'Лендинг', p: '8 000', d: 'от 3 дней', f: ['Одна страница под вашу задачу', 'Структура и тексты — с меня', 'Адаптив под телефоны', 'Форма заявки с отправкой в Telegram', 'Калькулятор, квиз или запись — по задаче'] },
  { id: 'bizcard' as Kind, t: 'Сайт-визитка', p: '20 000', d: 'от 1 недели', f: ['До 5–6 страниц', 'Услуги, цены, команда, галерея', 'Удобное меню на телефоне', 'Заявки в Telegram', 'Базовое SEO и Яндекс Метрика'], main: true },
  { id: 'shop' as Kind, t: 'Интернет-магазин', p: '50 000', d: 'от 3 недель', f: ['Каталог с фильтрами и поиском', 'Карточки товаров с вариантами', 'Корзина, избранное, промокоды', 'Оформление заказа и доставка', 'Заказы приходят в Telegram'] },
]
const quick: { id: WorkKind; t: string; items: [string, string][] }[] = [
  { id: 'cards', t: 'Карточки для маркетплейсов', items: [['Один слайд инфографики', 'от 500 ₽'], ['Набор из 5 слайдов', 'от 2 000 ₽'], ['Редизайн готовой карточки', 'от 400 ₽']] },
  { id: 'social', t: 'Соцсети и баннеры', items: [['Пост или сторис', 'от 400 ₽'], ['Баннер для сайта или рекламы', 'от 700 ₽'], ['Обложка сообщества ВК', 'от 1 000 ₽']] },
  { id: 'texts', t: 'Тексты', items: [['Описание товара для WB / Ozon', 'от 300 ₽'], ['SEO-статья до 4 000 знаков', 'от 1 500 ₽'], ['Контент-план на неделю с текстами', 'от 2 500 ₽'], ['Ответ на отзыв', 'от 100 ₽']] },
]
const extras = [
  ['Дополнительная страница', 'от 2 000 ₽'],
  ['Калькулятор или квиз', 'от 2 000 ₽'],
  ['Подключение онлайн-оплаты', 'от 4 000 ₽'],
  ['Помощь с доменом и хостингом', 'бесплатно'],
  ['Правки в первый месяц после запуска', 'бесплатно'],
  ['Поддержка и обновления', 'от 1 500 ₽/мес'],
]
const included = [
  [Smartphone, 'Адаптив', 'Сайт удобен на телефоне — оттуда приходит большая часть заявок.'],
  [Zap, 'Скорость', 'Загрузка за 1–2 секунды: оптимизирую код и изображения.'],
  [Search, 'SEO-основа', 'Мета-теги, разметка и карта сайта — чтобы находили в поиске.'],
  [MessageSquare, 'Заявки в Telegram', 'Каждая заявка с сайта сразу приходит вам в мессенджер.'],
  [BarChart3, 'Аналитика', 'Подключаю Яндекс Метрику — видно, откуда приходят клиенты.'],
  [ShieldCheck, 'Месяц правок', 'После запуска месяц бесплатно правлю тексты, цены и мелочи.'],
] as const
const steps = [
  ['Пишете в Telegram', 'Пара слов о бизнесе и о том, какой сайт нужен. Можно скинуть ссылки на сайты, которые нравятся.'],
  ['Бриф и цена', 'Пришлю короткий список вопросов прямо в чат. По ответам назову точную цену и срок.'],
  ['Дизайн и разработка', 'Через несколько дней присылаю ссылку на рабочую версию — смотрите с телефона и пишете правки.'],
  ['Запуск', 'Подключаю домен, формы и аналитику. Объясняю, как менять тексты и цены.'],
]
const faq = [
  ['Почему такие цены?', 'Это стартовые цены для первых клиентов: я собираю портфолио реальных проектов. Взамен прошу честный отзыв, если результат понравится. Качество при этом такое же, как в работах выше.'],
  ['Можно без созвонов?', 'Да, я работаю только в переписке в Telegram. Так удобнее обоим: все договорённости, правки и материалы остаются в чате, и ничего не теряется.'],
  ['Как проходит оплата?', 'Предоплата 50% после согласования брифа, остаток — когда сайт готов и вам нравится.'],
  ['Смогу сам менять тексты и цены?', 'Да. Сделаю так, чтобы основной контент правился в одном месте, и покажу, как это делать. Или правлю сам — первый месяц бесплатно.'],
  ['Работы в портфолио — реальные компании?', 'Это демо-проекты в популярных нишах, компании вымышленные. Зато все функции на них работают по-настоящему: калькуляторы, запись, фильтры, корзина.'],
  ['Чего вы не делаете?', 'Сложные веб-сервисы, мобильные приложения, 3D-визуализацию и интеграции с 1С сейчас не беру — сосредоточен на сайтах, карточках, дизайне для соцсетей и текстах.'],
  ['Можно заказать одну карточку или один пост?', 'Да. Небольшие задачи беру от 100–500 ₽ — цены в прайсе выше. Часто с них и начинаем, а потом клиенты возвращаются за сайтом.'],
]

function Browser({ s, className = '', live = false }: { s: SiteInfo; className?: string; live?: boolean }) {
  return (
    <div className={'bw ' + className}>
      <div className="bw-bar"><i /><i /><i /><span>{s.name.toLowerCase().replace(/\s+/g, '-')}.ru</span></div>
      {live ? <LivePreview slug={s.slug} cover={s.cover} name={s.name} /> : <img src={u(s.cover, 900)} alt="" loading="lazy" />}
    </div>
  )
}

function WorkCard({ s, i }: { s: SiteInfo; i: number }) {
  return (
    <motion.div layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, delay: Math.min(i, 3) * 0.06 }}>
      <Link to={`/sites/${s.slug}`} className="work group">
        <div className="work-img" style={{ ['--a' as string]: s.accent }}>
          <Browser s={s} live />
          <span className="work-go"><ArrowUpRight size={22} /></span>
        </div>
        <div className="flex items-start justify-between gap-4 p-6">
          <div className="min-w-0">
            <p className="text-[14px] font-semibold text-mute">{s.niche} · {s.style.toLowerCase()} стиль</p>
            <h3 className="mt-1 text-[26px] font-extrabold tracking-tight">{s.name}</h3>
            <p className="mt-2 text-[16px] leading-relaxed text-mute">{s.desc}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">{s.tags.map(t => <span key={t} className="rounded-full bg-paper px-3 py-1 text-[13px] text-mute">{t}</span>)}</div>
          </div>
          <span className="mt-1 h-4 w-4 flex-none rounded-full" style={{ background: s.accent }} />
        </div>
      </Link>
    </motion.div>
  )
}

export default function Home() {
  const scrolled = useScrolled()
  const [tab, setTab] = useState<Tab>('landing')
  const kind = kinds.find(k => k.id === tab)!
  const list = sites.filter(s => s.type === tab)
  const isSite = (k: Tab): k is Kind => k === 'landing' || k === 'bizcard' || k === 'shop'
  const count = (k: Tab) => isSite(k) ? sites.filter(s => s.type === k).length : worksCount[k]
  const showKind = (k: Tab) => { setTab(k); document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' }) }
  const fan = (['landing', 'bizcard', 'shop'] as Kind[]).map((k, i) => sites.filter(s => s.type === k)[[1, 3, 0][i]] || sites.find(s => s.type === k)!)

  return (
    <MotionConfig reducedMotion="user">
      <div className="home">
        <header className={'fixed inset-x-0 top-0 z-50 transition-all ' + (scrolled ? 'bg-white/85 shadow-[0_1px_0_#e5e7eb] backdrop-blur-md' : '')}>
          <div className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between gap-6 px-5">
            <a href="#/" className="flex items-center gap-2.5 text-[20px] font-black tracking-tight"><span className="grid h-9 w-9 place-items-center rounded-xl bg-ink text-accent">Д</span><span className="leading-none">Дмитрий<small className="block text-[12px] font-semibold tracking-normal text-mute">сайты и дизайн</small></span></a>
            <nav className="hidden gap-8 text-[15px] font-medium text-mute md:flex">
              <Jump to="about" className="hover:text-ink">Обо мне</Jump><Jump to="works" className="hover:text-ink">Работы</Jump><Jump to="prices" className="hover:text-ink">Цены</Jump><Jump to="process" className="hover:text-ink">Как работаю</Jump><Jump to="contact" className="hover:text-ink">Контакты</Jump>
            </nav>
            <a href={contacts.telegramUrl} target="_blank" rel="noopener" className="btn-dark !py-2.5 !px-4 text-[15px]"><Send size={16} /> <span className="hidden sm:inline">Написать</span></a>
          </div>
        </header>

        {/* Первый экран: кто я и что делаю */}
        <section className="relative overflow-hidden px-5 pt-[130px] pb-20">
          <div className="hero-glow" aria-hidden />
          <div className="relative mx-auto grid max-w-[1240px] items-center gap-14 lg:grid-cols-[1.05fr_.95fr]">
            <div className="min-w-0">
              <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3.5 py-1.5 text-[14px] font-medium text-mute"><span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,.2)]" /> Беру первых клиентов по стартовым ценам</motion.p>
              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.05 }} className="text-[clamp(42px,6vw,84px)] font-black leading-[0.98] tracking-[-0.035em]">
                Привет, я Дмитрий. Делаю <span className="text-accent">сайты и дизайн для бизнеса</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-7 max-w-[560px] text-[20px] leading-relaxed text-mute">
                Лендинги, сайты-визитки и интернет-магазины, а ещё карточки для маркетплейсов, посты, баннеры и тексты. Современно, быстро и удобно на телефоне, а общаемся мы только в переписке.
              </motion.p>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="mt-9 flex flex-wrap gap-3">
                <Jump to="works" className="btn-accent">Смотреть работы</Jump>
                <a href={contacts.telegramUrl} target="_blank" rel="noopener" className="btn-line"><Send size={18} /> Обсудить сайт</a>
              </motion.div>
              <motion.dl initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-12 grid max-w-[540px] grid-cols-3 gap-6 border-t border-neutral-200 pt-6">
                <div><dt className="text-[14px] text-mute">работ в портфолио</dt><dd className="text-[26px] sm:text-[34px] font-black whitespace-nowrap">{sites.length + worksCount.cards + worksCount.social + worksCount.texts}</dd></div>
                <div><dt className="text-[14px] text-mute">лендинг от</dt><dd className="text-[26px] sm:text-[34px] font-black whitespace-nowrap">8 000 ₽</dd></div>
                <div><dt className="text-[14px] text-mute">срок от</dt><dd className="text-[26px] sm:text-[34px] font-black whitespace-nowrap">3 дней</dd></div>
              </motion.dl>
            </div>
            <div className="fan" aria-hidden>
              {fan.map((s, i) => (
                <motion.div key={s.slug} className={'fan-i f' + i} initial={{ opacity: 0, y: 60, rotate: 0 }} animate={{ opacity: 1, y: 0, rotate: [-7, 4, -2][i] }} transition={{ delay: 0.25 + i * 0.15, type: 'spring', stiffness: 120, damping: 18 }}>
                  <Browser s={s} live />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="marquee" aria-hidden><div>{[0, 1].map(k => sites.map(s => <span key={k + s.slug}>{s.niche}</span>))}</div></div>

        {/* Обо мне */}
        <section id="about" className="px-5 py-24">
          <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[1fr_1.1fr]">
            <Reveal className="min-w-0">
              <p className="mb-3 text-[14px] font-bold uppercase tracking-[.14em] text-accent">Обо мне</p>
              <h2 className="h2">IT-образование и любовь к аккуратной вёрстке</h2>
              <div className="mt-6 space-y-4 text-[18px] leading-relaxed text-mute">
                <p>Я из Казани. Окончил колледж по специальности «Прикладная информатика», сейчас заканчиваю высшее образование по программной инженерии — пишу дипломную работу.</p>
                <p>Сайты начал делать ещё на чистом HTML и CSS, сегодня работаю на современном стеке — React и TypeScript. Это значит быстрые сайты без конструкторов и абонентской платы, которые легко развивать.</p>
                <p>Мне важно, чтобы сайт не просто красиво выглядел, а приводил клиентов: понятная структура, честные тексты и удобная форма заявки.</p>
              </div>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                [GraduationCap, 'Среднее профессиональное', '«Прикладная информатика»', 'Диплом колледжа по IT'],
                [BookOpen, 'Высшее образование', '«Программная инженерия»', 'Заканчиваю, пишу диплом'],
                [MapPin, 'Казань', 'Работаю удалённо', 'С клиентами из любого города'],
                [MessagesSquare, 'Только переписка', 'Telegram без созвонов', 'Все договорённости — в чате'],
              ].map(([I, k, t, d], i) => {
                const Ic = I as typeof MapPin
                return (
                  <Reveal key={k as string} delay={i * 0.07} className={'rounded-3xl p-7 ' + (i === 0 ? 'bg-ink text-white' : 'bg-paper')}>
                    <span className={'grid h-12 w-12 place-items-center rounded-2xl ' + (i === 0 ? 'bg-white/10 text-accent' : 'bg-white text-accent')}><Ic size={22} /></span>
                    <p className={'mt-6 text-[14px] font-semibold ' + (i === 0 ? 'text-white/60' : 'text-mute')}>{k as string}</p>
                    <h3 className="mt-1 text-[21px] font-extrabold leading-tight">{t as string}</h3>
                    <p className={'mt-1 text-[15px] ' + (i === 0 ? 'text-white/60' : 'text-mute')}>{d as string}</p>
                  </Reveal>
                )
              })}
            </div>
          </div>
          <Reveal className="mx-auto mt-16 flex max-w-[1240px] flex-wrap items-center justify-between gap-6 rounded-3xl border border-neutral-200 p-7 md:p-9">
            <p className="max-w-[720px] text-[20px] font-semibold leading-snug">Предлагаю посмотреть мои работы: {sites.length} сайтов в популярных нишах, которые открываются и работают по-настоящему, а также {worksCount.cards} карточек для маркетплейсов, {worksCount.social} макетов для соцсетей и {worksCount.texts} примеров текстов.</p>
            <Jump to="works" className="btn-accent">К работам <ArrowUpRight size={18} /></Jump>
          </Reveal>
        </section>

        {/* Работы в трёх разделах */}
        <section id="works" className="bg-paper px-5 py-24">
          <div className="mx-auto max-w-[1240px]">
            <Reveal><h2 className="h2">Работы</h2></Reveal>
            <div className="tabs mt-8" role="tablist" aria-label="Тип сайта">
              {kinds.map(k => (
                <button key={k.id} role="tab" type="button" aria-selected={tab === k.id} onClick={() => setTab(k.id)} className={'tab ' + (tab === k.id ? 'tab-on' : '')}>
                  
                  <k.icon size={18} /><span className="t-long">{k.label}</span><span className="t-short">{k.short}</span><em>{count(k.id)}</em>
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.p key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-6 max-w-[720px] text-[18px] leading-relaxed text-mute">{kind.intro}</motion.p>
            </AnimatePresence>
            {isSite(tab) ? (
              <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2">
                <AnimatePresence mode="popLayout">
                  {list.map((s, i) => <WorkCard key={s.slug} s={s} i={i} />)}
                </AnimatePresence>
              </motion.div>
            ) : <WorksPreview kind={tab} />}
          </div>
        </section>

        {/* Прайс */}
        <section id="prices" className="bg-ink px-5 py-24 text-white">
          <div className="mx-auto max-w-[1240px]">
            <Reveal>
              <p className="mb-3 inline-flex rounded-full bg-accent/15 px-3.5 py-1.5 text-[14px] font-bold text-accent">Стартовые цены для первых клиентов</p>
              <h2 className="h2">Прайс</h2>
              <p className="mt-3 max-w-[600px] text-[18px] text-white/60">Цену фиксирую в чате до начала работы и не меняю по ходу. Предоплата 50%, остаток — когда сайт готов и вам нравится.</p>
            </Reveal>
            <div className="mt-12 grid gap-4 lg:grid-cols-3">
              {prices.map((s, i) => (
                <Reveal key={s.t} delay={i * 0.08} className={'flex flex-col rounded-3xl p-8 ' + (s.main ? 'bg-accent text-white' : 'bg-white/[.06] ring-1 ring-white/10')}>
                  <div className="flex items-start justify-between gap-3"><h3 className="text-[24px] font-extrabold">{s.t}</h3><span className={'rounded-full px-3 py-1 text-[13px] font-semibold ' + (s.main ? 'bg-white/20' : 'bg-white/10 text-white/70')}>{s.d}</span></div>
                  <p className="mt-6 text-[15px] opacity-70">от</p>
                  <p className="text-[46px] font-black leading-none tracking-tight">{s.p} ₽</p>
                  <ul className="mt-7 flex-1 space-y-2.5">{s.f.map(x => <li key={x} className={'flex gap-2 text-[15px] ' + (s.main ? 'text-white/90' : 'text-white/70')}><Check size={18} className="mt-0.5 flex-none" />{x}</li>)}</ul>
                  <div className="mt-8 grid grid-cols-2 gap-2">
                    <a href={`#/brief?type=${s.id}`} className={'rounded-xl py-3.5 text-center font-bold transition ' + (s.main ? 'bg-white text-ink hover:bg-white/90' : 'bg-white text-ink hover:bg-white/90')}>Заказать</a>
                    <button type="button" onClick={() => showKind(s.id)} className={'rounded-xl py-3.5 text-center font-bold transition ' + (s.main ? 'bg-white/15 hover:bg-white/25' : 'bg-white/10 hover:bg-white/20')}>Примеры</button>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-6 rounded-3xl bg-white/[.06] p-8 ring-1 ring-white/10">
              <div className="flex flex-wrap items-baseline justify-between gap-3"><h3 className="text-[24px] font-extrabold">Быстрые задачи</h3><p className="text-[15px] text-white/60">Срок — от одного дня</p></div>
              <div className="mt-6 grid gap-8 md:grid-cols-3">
                {quick.map(q => (
                  <div key={q.id} className="flex flex-col">
                    <p className="font-bold text-accent">{q.t}</p>
                    <dl className="mt-2 flex-1">{q.items.map(([k, v]) => <div key={k} className="flex items-baseline justify-between gap-4 border-b border-white/10 py-3 last:border-0"><dt className="text-white/75">{k}</dt><dd className="whitespace-nowrap font-bold">{v}</dd></div>)}</dl>
                    <button type="button" onClick={() => showKind(q.id)} className="mt-4 self-start rounded-xl bg-white/10 px-4 py-2.5 text-[15px] font-bold transition hover:bg-white/20">Примеры</button>
                  </div>
                ))}
              </div>
            </Reveal>
            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
              <Reveal className="rounded-3xl bg-white/[.06] p-8 ring-1 ring-white/10">
                <h3 className="text-[22px] font-extrabold">Дополнительно</h3>
                <dl className="mt-4">{extras.map(([k, v]) => <div key={k} className="flex items-baseline justify-between gap-4 border-b border-white/10 py-3 last:border-0"><dt className="text-white/75">{k}</dt><dd className="whitespace-nowrap font-bold">{v}</dd></div>)}</dl>
              </Reveal>
              <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
                {included.map(([I, t, d], i) => (
                  <Reveal key={t} delay={(i % 2) * 0.08} className="flex gap-4">
                    <span className="grid h-12 w-12 flex-none place-items-center rounded-2xl bg-white/[.07] text-accent"><I size={22} /></span>
                    <div><h3 className="text-[18px] font-bold">{t}</h3><p className="mt-1 text-[15px] leading-relaxed text-white/60">{d}</p></div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Процесс */}
        <section id="process" className="px-5 py-24">
          <div className="mx-auto max-w-[1240px]">
            <Reveal><h2 className="h2">Как работаю</h2><p className="mt-3 max-w-[560px] text-[18px] text-mute">Всё общение — в Telegram, без звонков и встреч. Пишете, когда удобно, отвечаю в течение пары часов.</p></Reveal>
            <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {steps.map(([t, d], i) => (
                <Reveal as="li" key={t} delay={i * 0.08} className="rounded-3xl bg-paper p-7">
                  <span className="text-[56px] font-black leading-none text-accent">{i + 1}</span>
                  <h3 className="mt-5 text-[21px] font-extrabold">{t}</h3>
                  <p className="mt-2 text-[16px] leading-relaxed text-mute">{d}</p>
                </Reveal>
              ))}
            </ol>
            <Reveal className="mt-16 flex flex-wrap items-center gap-3 rounded-3xl border border-neutral-200 p-6">
              <span className="mr-2 text-[15px] font-semibold text-mute">Делаю на:</span>
              {['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Motion', 'React Router', 'Figma'].map(t => <span key={t} className="rounded-full bg-paper px-4 py-2 text-[15px] font-semibold">{t}</span>)}
            </Reveal>
          </div>
        </section>

        <section className="bg-paper px-5 py-24">
          <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <Reveal><h2 className="h2">Вопросы</h2><p className="mt-3 text-[18px] text-mute">Не нашли ответ — напишите в Telegram.</p></Reveal>
            <Reveal delay={0.1} className="home-acc"><Accordion items={faq} /></Reveal>
          </div>
        </section>

        <section id="contact" className="px-5 py-24">
          <Reveal className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[36px] bg-ink px-6 py-14 text-white sm:px-8 md:px-16">
            <div className="hero-glow !opacity-60" aria-hidden />
            <div className="relative grid items-end gap-10 lg:grid-cols-[1.2fr_.8fr]">
              <div>
                <h2 className="text-[clamp(36px,5vw,64px)] font-black leading-[1] tracking-[-0.03em]">Нужен сайт? Напишите мне</h2>
                <p className="mt-5 max-w-[520px] text-[19px] text-white/65">Расскажите в паре сообщений о бизнесе или заполните короткий бриф — отвечу, сколько это будет стоить и сколько займёт. Ни к чему не обязывает.</p>
              </div>
              <div className="grid gap-3">
                <a href="#/brief" className="contact-l bg-white text-ink hover:bg-white/90"><span className="flex items-center gap-3"><ClipboardList size={20} /> Заполнить бриф</span><span className="text-mute">5 минут</span></a>
                <a href={contacts.telegramUrl} target="_blank" rel="noopener" className="contact-l bg-accent hover:brightness-110"><span className="flex items-center gap-3"><Send size={20} /> Telegram</span><span className="text-white/80">{contacts.telegram}</span></a>
                <a href={contacts.githubUrl} target="_blank" rel="noopener" className="contact-l bg-white/[.08] hover:bg-white/[.14]"><span className="flex items-center gap-3"><Github size={20} /> GitHub</span><span className="text-white/60">{contacts.github}</span></a>
              </div>
            </div>
          </Reveal>
        </section>

        <footer className="px-5 pb-10 text-[14px] text-mute">
          <div className="mx-auto flex max-w-[1240px] flex-wrap justify-between gap-3 border-t border-neutral-200 pt-6">
            <span>© {new Date().getFullYear()} Дмитрий · разработка сайтов · Казань</span>
            <span>Работы в портфолио — демо-проекты, компании вымышленные. Фото: Unsplash.</span>
          </div>
        </footer>
      </div>
    </MotionConfig>
  )
}
