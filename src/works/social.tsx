import type { ReactNode } from 'react'
import { ArrowRight, MapPin, Clock, Check, Sparkles, Phone, Star, CalendarDays, Gift } from 'lucide-react'
import { Frame, Ph } from './Frame'

export type Social = { id: string; kind: 'post' | 'story' | 'banner' | 'cover'; title: string; niche: string; note: string; ar: number; node: ReactNode }

const P = (r: string) => r
const post = (id: string, title: string, niche: string, note: string, node: ReactNode): Social => ({ id, kind: 'post', title, niche, note, ar: 0.8, node })
const story = (id: string, title: string, niche: string, note: string, node: ReactNode): Social => ({ id, kind: 'story', title, niche, note, ar: 9 / 16, node })
const banner = (id: string, title: string, niche: string, note: string, node: ReactNode): Social => ({ id, kind: 'banner', title, niche, note, ar: 16 / 9, node })

export const social: Social[] = [
  post('barber', 'Скидка новым клиентам', 'Барбершоп', 'Пост 4:5 для ВК и Telegram. Акция крупно, условия — мелко, но читаемо.',
    <Frame ratio={P('4 / 5')} className="so so-br">
      <Ph id="1647140655214-e4a2d914971f" pos="50% 40%" />
      <div className="br-shade" />
      <p className="br-logo">БОРОДА<span>барбершоп</span></p>
      <div className="br-off"><b>−20%</b><span>на первую стрижку</span></div>
      <div className="br-foot"><p>Для новых клиентов</p><p><MapPin />ул. Баумана, 44</p></div>
    </Frame>),
  post('fitness', 'Первая тренировка', 'Фитнес-клуб', 'Яркий пост в фирменном неоне клуба: оффер, три причины и призыв.',
    <Frame ratio="4 / 5" className="so so-ft">
      <Ph id="1517130038641-a774d04afb3c" pos="50% 30%" className="ft-ph" />
      <div className="ft-txt">
        <p className="ft-k">ПУЛЬС · фитнес-клуб</p>
        <h3>Первая<br />тренировка<br /><em>бесплатно</em></h3>
        <ul>{['Знакомство с тренером', 'Разбор техники', 'Подбор абонемента'].map(t => <li key={t}><Check />{t}</li>)}</ul>
      </div>
      <span className="ft-btn">Записаться <ArrowRight /></span>
    </Frame>),
  post('coffee', 'Новый лот', 'Кофейня', 'Анонс нового кофе: вкус словами, без пафоса. Крафтовая подача в стиле обжарочной.',
    <Frame ratio="4 / 5" className="so so-cl">
      <div className="cl-ph"><Ph id="1606791405792-1004f1718d0c" /></div>
      <p className="cl-new">новый лот</p>
      <h3>Кения<br /><em>Ньери</em></h3>
      <p className="cl-notes">чёрная смородина · грейпфрут · тростниковый сахар</p>
      <div className="cl-foot"><span>Зерно · обжарочная</span><span>1 290 ₽ · 250 г</span></div>
    </Frame>),
  post('beauty', 'Свободные окна', 'Салон красоты', 'Пост для быстрого заполнения записи: окна на неделю — конкретные даты и время.',
    <Frame ratio="4 / 5" className="so so-bt">
      <Ph id="1637777277435-3c44f82fd0c9" pos="50% 40%" className="bt-ph" />
      <div className="bt-card">
        <p className="bt-k">Сирень · студия красоты</p>
        <h3>Свободные окна<br />на этой неделе</h3>
        <div className="bt-slots">{[['Ср', '12:00', 'маникюр'], ['Чт', '15:30', 'брови'], ['Пт', '18:00', 'маникюр'], ['Сб', '11:00', 'окрашивание']].map(([d, t, s]) => <div key={d}><b>{d}</b><span>{t}</span><em>{s}</em></div>)}</div>
        <p className="bt-cta">Записаться — в сообщения группы</p>
      </div>
    </Frame>),
  post('clean', 'Обложка карусели', 'Клининг', 'Первый слайд полезной карусели: цепляющий заголовок с цифрой, чтобы листали дальше.',
    <Frame ratio="4 / 5" className="so so-cn">
      <div className="cn-num">5</div>
      <h3>мест, которые<br />забывают<br />при уборке</h3>
      <div className="cn-ph"><Ph id="1581578731548-c64695cc6952" /></div>
      <p className="cn-swipe">листайте <ArrowRight /></p>
      <p className="cn-logo">Чисто · клининг</p>
    </Frame>),
  post('kids', 'Набор в группы', 'Детский центр', 'Игривый пост для родителей: возраст, расписание и пробное занятие.',
    <Frame ratio="4 / 5" className="so so-kd">
      <div className="kd-blob kd-b1" /><div className="kd-blob kd-b2" />
      <div className="kd-ph"><Ph id="1578349035260-9f3d4042f1f7" /></div>
      <h3>Набор<br />в группы!</h3>
      <div className="kd-ages">{[['1,5–3', 'года'], ['3–5', 'лет'], ['5–7', 'лет']].map(([a, b]) => <span key={a}><b>{a}</b>{b}</span>)}</div>
      <p className="kd-free"><Gift />Пробное занятие бесплатно</p>
    </Frame>),
  post('dental', 'Экспертный пост', 'Стоматология', 'Карусель «миф или правда» — формат, который сохраняют и пересылают.',
    <Frame ratio="4 / 5" className="so so-dn">
      <p className="dn-k">Белая линия · миф или правда</p>
      <h3>«Если зуб не болит — к стоматологу не нужно»</h3>
      <div className="dn-verdict"><b>Миф</b><p>Кариес до глубоких слоёв часто развивается без боли. Профилактический осмотр раз в полгода находит его на этапе, когда лечение быстрое и недорогое.</p></div>
      <p className="dn-who"><span className="dn-ph"><Ph id="1629909613654-28e377c37b09" w={300} /></span>Отвечает врач-терапевт<br />клиники «Белая линия»</p>
    </Frame>),
  post('remont', 'Оффер ремонта', 'Ремонт квартир', 'Пост в фирменном стиле «чертёж»: одно сильное обещание и цифры.',
    <Frame ratio="4 / 5" className="so so-rm">
      <div className="rm-grid" />
      <Ph id="1583847268964-b28dc8f51f92" className="rm-ph" />
      <div className="rm-box">
        <p className="rm-k">КВАДРАТ / ремонт квартир</p>
        <h3>Смета за 2 дня.<br />Цена не растёт.</h3>
        <div className="rm-nums"><div><b>0 ₽</b><span>замер</span></div><div><b>2 дня</b><span>до сметы</span></div><div><b>87</b><span>объектов в 2025</span></div></div>
      </div>
    </Frame>),
  story('flowers', 'Предзаказ к Новому году', 'Доставка цветов', 'Сторис 9:16: всё важное — в центре, чтобы не закрывали кнопки Instagram и ВК.',
    <Frame ratio="9 / 16" className="so so-fl">
      <Ph id="1498814117408-e396f5507073" pos="50% 50%" />
      <div className="fl-shade" />
      <p className="fl-logo">Пион</p>
      <div className="fl-mid"><p>новогодние<br />букеты</p><h3>Предзаказ<br />открыт</h3><span>до 25 декабря — скидка 10%</span></div>
      <span className="fl-btn">Выбрать букет</span>
    </Frame>),
  story('clay', 'Мастер-класс', 'Мастерская керамики', 'Сторис-анонс с датой, ценой и тем, что гость заберёт с собой.',
    <Frame ratio="9 / 16" className="so so-cy">
      <Ph id="1508269151431-a34449ca161d" pos="50% 40%" className="cy-ph" />
      <div className="cy-card">
        <p>мастер-класс</p>
        <h3>Гончарный<br /><em>круг</em></h3>
        <div className="cy-info"><span><CalendarDays />суббота, 14:00</span><span><Clock />2,5 часа</span><span><Sparkles />2–3 изделия ваши</span></div>
        <b>3 500 ₽</b>
      </div>
    </Frame>),
  story('gym', 'Расписание дня', 'Фитнес-клуб', 'Ежедневная сторис с расписанием — шаблон, который клуб заполняет сам.',
    <Frame ratio="9 / 16" className="so so-sc">
      <p className="sc-day">СЕГОДНЯ<br /><b>ЧТ</b></p>
      <div className="sc-list">{[['07:30', 'Функционал', 'Артём'], ['10:00', 'Пилатес', 'Юлия'], ['18:30', 'Кроссфит', 'Максим'], ['19:30', 'Растяжка', 'Ксения'], ['20:30', 'Бокс', 'Илья']].map(([t, n, c]) => <div key={t}><b>{t}</b><span>{n}</span><em>{c}</em></div>)}</div>
      <p className="sc-foot">ПУЛЬС · запись в приложении</p>
    </Frame>),
  banner('auto', 'Баннер на сайт', 'Автосервис', 'Баннер 16:9 для первого экрана сайта и Яндекс Бизнеса: услуга, цена и телефон.',
    <Frame ratio="16 / 9" className="so so-au">
      <Ph id="1727893119356-1702fe921cf9" pos="50% 50%" className="au-ph" />
      <div className="au-txt">
        <p className="au-k">ГАРАЖ НА СЕВЕРНОЙ</p>
        <h3>ТО-1<br /><em>от 3 200 ₽</em></h3>
        <p className="au-s">масло, фильтры, проверка 30 узлов · 1,5 часа</p>
        <span className="au-ph2"><Phone />+7 900 000-00-00</span>
      </div>
    </Frame>),
  banner('school', 'Рекламный баннер', 'Онлайн-школа', 'Баннер для рекламы во ВКонтакте: понятный оффер и кнопка.',
    <Frame ratio="16 / 9" className="so so-sh">
      <div className="sh-txt">
        <p className="sh-k">Говорим · онлайн-школа английского</p>
        <h3>Заговорите<br />за 3 месяца</h3>
        <span className="sh-btn">Пройти тест уровня</span>
      </div>
      <div className="sh-ph"><Ph id="1616587894289-86480e533129" /></div>
      <div className="sh-rate"><Star /><b>Тест уровня</b><span>за 5 минут</span></div>
    </Frame>),
  { id: 'vk', kind: 'cover', title: 'Обложка сообщества ВК', niche: 'Кухни на заказ', note: 'Широкая обложка 3:1: название, оффер и контакты читаются и на телефоне.', ar: 3,
    node: (
      <Frame ratio="3 / 1" className="so so-vk">
        <Ph id="1759691337936-ef702afd0714" pos="50% 60%" className="vk-ph" />
        <div className="vk-txt"><p>МОДУЛЬ</p><h3>Кухни на заказ<br />за 30 дней</h3><span>Бесплатный замер и 3D-проект</span></div>
      </Frame>
    ) },
]
