import type { ReactNode } from 'react'
import { Sun, Droplets, ShieldCheck, Sparkles, Leaf, Clock, Moon, Wind, Ruler, Scissors, Shirt, Flame, Coffee, Package, Truck, Microwave, Hand, Heart, Thermometer, Waves, Mountain } from 'lucide-react'
import { Frame, Ph } from './Frame'

export type CardSet = {
  id: string
  title: string
  niche: string
  market: 'WB' | 'Ozon' | 'WB и Ozon'
  task: string
  raw: string // исходное фото товара, «как было»
  rawPos?: string
  slides: ReactNode[]
}

const I = ({ c: C }: { c: typeof Sun }) => <C strokeWidth={2.2} />

/* ---------- 1. Сыворотка с витамином C ---------- */
const VC = '1713768704571-6aeb0d0e5105'
const serum: CardSet = {
  id: 'serum', title: 'Сыворотка с витамином C', niche: 'Косметика', market: 'WB и Ozon', raw: VC,
  task: 'Набор из 4 слайдов: обложка, действие, состав и способ применения. Яркий «цитрусовый» стиль, чтобы карточка выделялась в выдаче среди белых баночек.',
  slides: [
    <Frame key="1" className="mp mp-vc">
      <div className="vc-sun" />
      <Ph id={VC} pos="50% 55%" className="vc-ph" />
      <div className="vc-top"><b>SOLAR</b><span>lab</span></div>
      <div className="vc-body">
        <p className="vc-kick">Сыворотка для лица</p>
        <h3>Витамин C<br /><em>15%</em></h3>
        <div className="vc-chips"><span><I c={Sparkles} />Сияние кожи</span><span><I c={Sun} />Ровный тон</span><span><I c={Droplets} />30 мл</span></div>
      </div>
      <div className="vc-badge"><b>14</b><span>дней<br />до видимого<br />результата</span></div>
    </Frame>,
    <Frame key="2" className="mp mp-vc vc-2">
      <h3 className="vc-h">Что делает<br />сыворотка</h3>
      <div className="vc-grid">
        {[[Sparkles, 'Возвращает сияние', 'Тусклая кожа выглядит отдохнувшей'], [Sun, 'Выравнивает тон', 'Пятна постакне становятся бледнее'], [ShieldCheck, 'Защищает', 'Антиоксидант против городской среды'], [Droplets, 'Увлажняет', 'Гиалуроновая кислота в составе']].map(([C, t, d]) => (
          <div key={t as string} className="vc-tile"><span className="vc-ic"><I c={C as typeof Sun} /></span><b>{t as string}</b><p>{d as string}</p></div>
        ))}
      </div>
      <div className="vc-strip"><Ph id={VC} pos="50% 40%" /><p>Подходит для <b>всех типов кожи</b>, в том числе чувствительной</p></div>
    </Frame>,
    <Frame key="3" className="mp mp-vc vc-3">
      <p className="vc-kick">Состав</p>
      <h3 className="vc-h">3 активных<br />компонента</h3>
      <ol className="vc-ing">
        <li><b>15%</b><div><strong>Аскорбиновая кислота</strong><p>Чистая форма витамина C — работает с тоном и сиянием</p></div></li>
        <li><b>1%</b><div><strong>Феруловая кислота</strong><p>Стабилизирует витамин C и усиливает его действие</p></div></li>
        <li><b>0,5%</b><div><strong>Витамин E</strong><p>Смягчает и защищает от сухости</p></div></li>
      </ol>
      <div className="vc-free">{['Без отдушек', 'Без спирта', 'Без парабенов'].map(t => <span key={t}>{t}</span>)}</div>
    </Frame>,
    <Frame key="4" className="mp mp-vc vc-4">
      <Ph id={VC} pos="50% 60%" className="vc-ph4" />
      <div className="vc-steps">
        <h3 className="vc-h">Как применять</h3>
        {[['01', 'Очистите кожу', 'Утром, перед кремом'], ['02', '3–4 капли', 'Распределите по лицу и шее'], ['03', 'SPF обязательно', 'Витамин C усиливает защиту']].map(([n, t, d]) => (
          <div key={n} className="vc-step"><b>{n}</b><div><strong>{t}</strong><p>{d}</p></div></div>
        ))}
        <p className="vc-note"><I c={Clock} /> Флакона хватает на 2 месяца</p>
      </div>
    </Frame>,
  ],
}

/* ---------- 2. Худи Heavy ---------- */
const HD = '1677538537484-324385aff147'
const hoodie: CardSet = {
  id: 'hoodie', title: 'Худи Heavy «Графит»', niche: 'Одежда', market: 'WB', raw: HD,
  task: 'Карточки для стритвир-бренда: тяжёлая обложка с крупной типографикой, ткань, размерная сетка и детали. Задача — показать, за что платят больше, чем за обычное худи.',
  slides: [
    <Frame key="1" className="mp mp-hd">
      <Ph id={HD} pos="50% 35%" className="hd-ph" />
      <div className="hd-shade" />
      <div className="hd-tag">BASE / KZN</div>
      <div className="hd-big"><span>HEAVY</span><span>HOODIE</span></div>
      <div className="hd-row"><b>480</b><span>г/м²<br />футер</span><i /> <b>OVER</b><span>size<br />крой</span></div>
    </Frame>,
    <Frame key="2" className="mp mp-hd hd-2">
      <p className="hd-k">01 — ткань</p>
      <h3>Держит форму<br />после 50 стирок</h3>
      <div className="hd-fab"><Ph id={HD} pos="60% 70%" w={700} /><Ph id={HD} pos="30% 40%" w={700} /></div>
      <ul className="hd-list">
        <li><b>80%</b> хлопок · <b>20%</b> полиэстер</li>
        <li>Трёхнитка с начёсом — тёплая, но дышит</li>
        <li>Не скатывается и не садится</li>
      </ul>
    </Frame>,
    <Frame key="3" className="mp mp-hd hd-3">
      <p className="hd-k">02 — размер</p>
      <h3>Размерная сетка</h3>
      <table className="hd-tab">
        <thead><tr><th>Размер</th><th>Рост</th><th>Грудь</th><th>Длина</th><th>Рукав</th></tr></thead>
        <tbody>{[['S', '165–172', '118', '70', '58'], ['M', '172–180', '124', '72', '60'], ['L', '180–186', '130', '74', '62'], ['XL', '186–192', '136', '76', '64']].map(r => <tr key={r[0]}>{r.map((c, i) => <td key={i}>{c}</td>)}</tr>)}</tbody>
      </table>
      <p className="hd-tip"><I c={Ruler} /> Крой oversize. Для посадки по фигуре берите на размер меньше</p>
      <p className="hd-model">Модель: рост 183 см, размер L</p>
    </Frame>,
    <Frame key="4" className="mp mp-hd hd-4">
      <p className="hd-k">03 — детали</p>
      <div className="hd-det">
        {[['72% 22%', 'Двойной капюшон', Shirt], ['50% 75%', 'Карман-кенгуру', Hand], ['20% 60%', 'Плотные манжеты', Scissors], ['55% 45%', 'Вышивка, не принт', Sparkles]].map(([p, t, C]) => (
          <figure key={t as string}><Ph id={HD} pos={p as string} w={600} /><figcaption><I c={C as typeof Sun} />{t as string}</figcaption></figure>
        ))}
      </div>
    </Frame>,
  ],
}

/* ---------- 3. Кофе в зёрнах ---------- */
const CF = '1651761483492-7d2e26dd3455'
const coffee: CardSet = {
  id: 'coffee', title: 'Кофе Эфиопия Иргачеффе', niche: 'Продукты', market: 'Ozon', raw: CF,
  task: 'Крафтовые карточки для обжарочной: профиль вкуса вместо скучного списка, способы заваривания и честные «свежая обжарка» и сорт.',
  slides: [
    <Frame key="1" className="mp mp-cf">
      <div className="cf-paper" />
      <Ph id={CF} pos="50% 50%" className="cf-ph" />
      <div className="cf-stamp">свежая<br /><b>обжарка</b><br />вт и пт</div>
      <div className="cf-txt">
        <p>Эфиопия · Иргачеффе</p>
        <h3>Цветочный<br /><em>и сладкий</em></h3>
        <div className="cf-notes">{['бергамот', 'жасмин', 'лимон'].map(t => <span key={t}>{t}</span>)}</div>
      </div>
      <div className="cf-foot"><span>100% арабика</span><span>250 г · в зёрнах</span></div>
    </Frame>,
    <Frame key="2" className="mp mp-cf cf-2">
      <div className="cf-paper" />
      <h3 className="cf-h">Профиль вкуса</h3>
      <div className="cf-bars">
        {[['Кислотность', 4], ['Сладость', 4], ['Тело', 2], ['Горечь', 1]].map(([t, v]) => (
          <div key={t as string}><span>{t as string}</span><i>{[1, 2, 3, 4, 5].map(k => <b key={k} className={k <= (v as number) ? 'on' : ''} />)}</i></div>
        ))}
      </div>
      <div className="cf-cards">
        <div><b>1900 м</b><span>высота</span></div><div><b>мытая</b><span>обработка</span></div><div><b>светлая</b><span>обжарка</span></div>
      </div>
      <p className="cf-quote">«Как чай с цветами и фруктами — попробуйте без сахара»</p>
    </Frame>,
    <Frame key="3" className="mp mp-cf cf-3">
      <div className="cf-paper" />
      <h3 className="cf-h">Как заваривать</h3>
      <div className="cf-ways">
        {[[Coffee, 'Воронка V60', '15 г на 250 мл, 93 °C', '★★★'], [Flame, 'Турка', 'Средний помол, без кипения', '★★'], [Thermometer, 'Френч-пресс', 'Крупный помол, 4 минуты', '★★'], [Waves, 'Эспрессо', 'Лучше в молочные напитки', '★']].map(([C, t, d, s]) => (
          <div key={t as string}><span className="cf-ic"><I c={C as typeof Sun} /></span><div><b>{t as string}</b><p>{d as string}</p></div><em>{s as string}</em></div>
        ))}
      </div>
      <p className="cf-hint">★ — насколько хорошо раскрывается вкус</p>
    </Frame>,
    <Frame key="4" className="mp mp-cf cf-4">
      <Ph id={CF} pos="50% 60%" className="cf-ph4" />
      <div className="cf-box">
        <h3>Почему он свежий</h3>
        {[[Flame, 'Обжариваем по вторникам и пятницам — не храним месяцами'], [Package, 'Пакет с клапаном держит аромат 2 месяца'], [Truck, 'Отправляем в день обжарки']].map(([C, t]) => <p key={t as string}><I c={C as typeof Sun} />{t as string}</p>)}
        <div className="cf-date">дата обжарки — на каждой пачке</div>
      </div>
    </Frame>,
  ],
}

/* ---------- 4. Кружка ручной работы ---------- */
const MG = '1517430536-ef20313aea20'
const mug: CardSet = {
  id: 'mug', title: 'Кружка ручной работы', niche: 'Посуда', market: 'WB и Ozon', raw: MG,
  task: 'Спокойные «эдиториал» карточки для мастерской керамики: размеры прямо на фото, ручная работа как преимущество, уход за посудой.',
  slides: [
    <Frame key="1" className="mp mp-mg">
      <Ph id={MG} pos="50% 50%" className="mg-ph" />
      <div className="mg-card">
        <p>керамика ручной работы</p>
        <h3>Кружка<br /><em>«Утренняя»</em></h3>
        <span>350 мл · глазурь «олива»</span>
      </div>
      <div className="mg-sign">сделано в Казани</div>
    </Frame>,
    <Frame key="2" className="mp mp-mg mg-2">
      <h3 className="mg-h">Размеры</h3>
      <div className="mg-dim">
        <Ph id={MG} pos="50% 50%" className="mg-ph2" />
        <div className="mg-v"><i /><span>9,5 см</span></div>
        <div className="mg-hz"><i /><span>8 см</span></div>
      </div>
      <div className="mg-facts"><div><b>350</b><span>мл</span></div><div><b>320</b><span>грамм</span></div><div><b>12</b><span>см с ручкой</span></div></div>
    </Frame>,
    <Frame key="3" className="mp mp-mg mg-3">
      <div className="mg-quote">
        <p className="mg-k">почему она особенная</p>
        <h3>Каждая кружка — <em>в единственном</em> экземпляре</h3>
        <p className="mg-txt">Мы формуем и глазуруем вручную, поэтому оттенок и рисунок глазури немного отличаются. Это не брак, а след руки мастера.</p>
      </div>
      <div className="mg-trio"><Ph id={MG} pos="30% 50%" w={500} /><Ph id={MG} pos="60% 40%" w={500} /><Ph id={MG} pos="50% 70%" w={500} /></div>
    </Frame>,
    <Frame key="4" className="mp mp-mg mg-4">
      <h3 className="mg-h">Уход</h3>
      <div className="mg-care">
        {[[Waves, 'Посудомойка', 'можно'], [Microwave, 'Микроволновка', 'можно'], [Thermometer, 'Духовка', 'до 200 °C'], [Hand, 'Абразивы', 'лучше не надо']].map(([C, t, v], i) => (
          <div key={t as string} className={i === 3 ? 'no' : ''}><I c={C as typeof Sun} /><b>{t as string}</b><span>{v as string}</span></div>
        ))}
      </div>
      <p className="mg-pack"><I c={Package} />Упакуем в коробку с крафт-бумагой — можно сразу дарить</p>
    </Frame>,
  ],
}

/* ---------- 5. Флюид SPF 50 ---------- */
const SP = '1710410815589-dd83514104d0'
const spf: CardSet = {
  id: 'spf', title: 'Флюид SPF 50', niche: 'Косметика', market: 'WB', raw: SP,
  task: 'Нежные карточки для солнцезащитного флюида: главное — снять возражения «белые следы» и «жирная плёнка», показать уровень защиты.',
  slides: [
    <Frame key="1" className="mp mp-sp">
      <div className="sp-bg" />
      <Ph id={SP} pos="50% 50%" className="sp-ph" />
      <div className="sp-ring"><b>SPF</b><strong>50</strong><span>PA++++</span></div>
      <div className="sp-txt">
        <h3>Лёгкий флюид<br />для лица</h3>
        <ul>{['Без белых следов', 'Не забивает поры', 'Под макияж'].map(t => <li key={t}>{t}</li>)}</ul>
      </div>
    </Frame>,
    <Frame key="2" className="mp mp-sp sp-2">
      <div className="sp-bg" />
      <h3 className="sp-h">Защищает от двух<br />видов излучения</h3>
      <div className="sp-rays">
        <div><span>UVB</span><b>98%</b><p>вызывает ожоги и покраснение</p></div>
        <div><span>UVA</span><b>PA++++</b><p>вызывает пигментацию и фотостарение</p></div>
      </div>
      <p className="sp-city"><I c={Sun} />Для города, отпуска и катка — солнце есть и зимой</p>
    </Frame>,
    <Frame key="3" className="mp mp-sp sp-3">
      <div className="sp-bg" />
      <h3 className="sp-h">Текстура</h3>
      <div className="sp-tex">
        <div className="sp-drop" />
        <div className="sp-vs">
          <div className="yes"><b>Наш флюид</b>{['впитывается за 30 секунд', 'матовый финиш', 'не скатывается под тоном'].map(t => <p key={t}>{t}</p>)}</div>
          <div className="no"><b>Обычный крем SPF</b>{['белый слой', 'жирный блеск', 'щиплет глаза'].map(t => <p key={t}>{t}</p>)}</div>
        </div>
      </div>
    </Frame>,
  ],
}

/* ---------- 6. Дрип-пакеты ---------- */
const DR = '1643427517196-7822b972517f'
const drip: CardSet = {
  id: 'drip', title: 'Дрип-кофе, набор 10 шт', niche: 'Продукты', market: 'Ozon', raw: DR,
  task: 'Простой и яркий набор для покупателей, которые не знают, что такое дрип: обложка с пользой и инструкция в 4 шага.',
  slides: [
    <Frame key="1" className="mp mp-dr">
      <Ph id={DR} pos="50% 50%" className="dr-ph" />
      <div className="dr-panel">
        <h3>10 чашек<br />свежего кофе</h3>
        <p>без кофемашины — нужна только кружка и кипяток</p>
      </div>
      <div className="dr-tags"><span>☕ 3 сорта</span><span>⏱ 3 минуты</span><span>🎁 в подарок</span></div>
    </Frame>,
    <Frame key="2" className="mp mp-dr dr-2">
      <h3 className="dr-h">Как заварить</h3>
      <div className="dr-steps">
        {[['1', 'Надорвите', 'по линии сверху'], ['2', 'Раскройте', 'держатели на края кружки'], ['3', 'Налейте', '180 мл воды, 90 °C, в 3 подхода'], ['4', 'Готово', 'выньте пакет через 3 минуты']].map(([n, t, d]) => (
          <div key={n}><b>{n}</b><strong>{t}</strong><p>{d}</p></div>
        ))}
      </div>
      <p className="dr-note">Подходит для работы, поездок и дачи</p>
    </Frame>,
  ],
}

/* ---------- 7. Кепка ---------- */
const CP = '1521369909029-2afed882baee'
const cap: CardSet = {
  id: 'cap', title: 'Кепка Base Cap', niche: 'Аксессуары', market: 'WB', raw: CP,
  task: 'Минималистичная обложка и слайд с размером для аксессуара: главное — регулировка и материал.',
  slides: [
    <Frame key="1" className="mp mp-cp">
      <Ph id={CP} pos="50% 45%" className="cp-ph" />
      <div className="cp-title"><span>BASE</span><b>CAP</b></div>
      <div className="cp-chips"><span><I c={Leaf} />100% хлопок</span><span><I c={Wind} />Дышит</span><span><I c={Ruler} />55–61 см</span></div>
    </Frame>,
    <Frame key="2" className="mp mp-cp cp-2">
      <h3>Один размер —<br />подходит всем</h3>
      <div className="cp-circle"><Ph id={CP} pos="50% 50%" w={700} /><span>55</span><span>61</span></div>
      <p>Металлическая пряжка сзади: обхват головы от 55 до 61 см</p>
      <div className="cp-row">{[[Mountain, 'Плотный козырёк'], [Heart, 'Мягкая подкладка'], [Moon, 'Не выгорает']].map(([C, t]) => <span key={t as string}><I c={C as typeof Sun} />{t as string}</span>)}</div>
    </Frame>,
  ],
}

export const cardSets: CardSet[] = [serum, hoodie, coffee, mug, spf, drip, cap]
export const cardCount = cardSets.reduce((n, s) => n + s.slides.length, 0)
