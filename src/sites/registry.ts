import { lazy, type ComponentType, type LazyExoticComponent } from 'react'

export type SiteInfo = {
  slug: string
  type: 'landing' | 'bizcard' | 'shop'
  niche: string
  name: string
  desc: string
  tags: string[]
  style: string
  cover: string // id фото Unsplash
  accent: string
  page: LazyExoticComponent<ComponentType>
}

/** Список работ портфолио. Чтобы добавить новый сайт — создайте папку в src/sites и строку здесь. */
export const sites: SiteInfo[] = [
  { type: 'landing', slug: 'auto', niche: 'Автосервис', name: 'Гараж на Северной', desc: 'Сайт СТО: расчёт стоимости ТО по марке и пробегу, прайс, онлайн-запись со свободными окнами.', tags: ['расчёт ТО', 'онлайн-запись', 'карта'], style: 'Технический', cover: '1727893119356-1702fe921cf9', accent: '#FF7A1A', page: lazy(() => import('./auto/Page')) },
  { type: 'landing', slug: 'dental', niche: 'Стоматология', name: 'Белая линия', desc: 'Клиника: калькулятор рассрочки, прайс с поиском и фильтрами, врачи, отзывы, запись.', tags: ['рассрочка', 'поиск по прайсу', 'медицина'], style: 'Чистый медицинский', cover: '1629909613654-28e377c37b09', accent: '#2BB5A0', page: lazy(() => import('./dental/Page')) },
  { type: 'landing', slug: 'lawyer', niche: 'Юрист', name: 'Адвокат Соколов', desc: 'Личный бренд адвоката: практика, подход, кейсы с суммами и запись на консультацию.', tags: ['личный бренд', 'кейсы', 'премиум'], style: 'Классический', cover: '1505664194779-8beaceb93744', accent: '#B08D57', page: lazy(() => import('./lawyer/Page')) },
  { type: 'landing', slug: 'fitness', niche: 'Фитнес-клуб', name: 'Пульс', desc: 'Яркий сайт клуба: расписание с фильтрами и записью, абонементы, тренеры, результаты.', tags: ['расписание', 'тарифы', 'анимации'], style: 'Дерзкий', cover: '1517130038641-a774d04afb3c', accent: '#C6FF3D', page: lazy(() => import('./fitness/Page')) },
  { type: 'landing', slug: 'remont', niche: 'Ремонт квартир', name: 'Квадрат', desc: 'Ремонтная компания в стиле чертежа: калькулятор сметы, слайдер «до/после», объекты.', tags: ['смета онлайн', 'до/после', 'стройка'], style: 'Чертёж', cover: '1583847268964-b28dc8f51f92', accent: '#E5533D', page: lazy(() => import('./remont/Page')) },
  { type: 'landing', slug: 'beauty', niche: 'Салон красоты', name: 'Сирень', desc: 'Изящный сайт студии: прайс, мастера и онлайн-запись в несколько шагов.', tags: ['запись по шагам', 'прайс', 'beauty'], style: 'Элегантный', cover: '1637777277435-3c44f82fd0c9', accent: '#C9A27E', page: lazy(() => import('./beauty/Page')) },
  { type: 'landing', slug: 'photo', niche: 'Фотограф', name: 'Анна Ветрова', desc: 'Минималистичное портфолио фотографа: галерея с просмотром, пакеты съёмки, заявка.', tags: ['галерея', 'лайтбокс', 'минимализм'], style: 'Минимализм', cover: '1517462964-21fdcec3f25b', accent: '#161616', page: lazy(() => import('./photo/Page')) },
  { type: 'landing', slug: 'school', niche: 'Онлайн-школа', name: 'Говорим', desc: 'Школа английского: тест уровня, программа, тарифы, преподаватели и пробный урок.', tags: ['тест уровня', 'тарифы', 'EdTech'], style: 'Дружелюбный', cover: '1616587894289-86480e533129', accent: '#3355FF', page: lazy(() => import('./school/Page')) },
  { type: 'shop', slug: 'flowers', niche: 'Доставка цветов', name: 'Пион', desc: 'Магазин цветочной мастерской: каталог с фильтрами, букеты с размерами, корзина и оформление заказа.', tags: ['каталог', 'корзина', 'оформление'], style: 'Нежный', cover: '1498814117408-e396f5507073', accent: '#9E2A4A', page: lazy(() => import('./flowers/Page')) },
  { type: 'shop', slug: 'base', niche: 'Магазин одежды', name: 'BASE', desc: 'Стритвир-бренд: лукбук, каталог с размерами, избранное, корзина и оформление с примеркой.', tags: ['каталог', 'размеры', 'избранное'], style: 'Стритвир', cover: '1558769132-cb1aea458c5e', accent: '#FF5A1F', page: lazy(() => import('./base/Page')) },
  { type: 'shop', slug: 'coffee', niche: 'Обжарка кофе', name: 'Зерно', desc: 'Магазин обжарочной: подбор кофе в два клика, выбор помола, корзина и доставка по России.', tags: ['подбор товара', 'помол', 'корзина'], style: 'Крафтовый', cover: '1511920170033-f8396924c348', accent: '#2F5D3A', page: lazy(() => import('./coffee/Page')) },
  { type: 'shop', slug: 'glow', niche: 'Косметика', name: 'Glow', desc: 'Уходовая косметика: ритуал ухода по шагам, наборы, промокод и бережное оформление заказа.', tags: ['ритуал ухода', 'наборы', 'промокод'], style: 'Мягкий', cover: '1596462502278-27bfdc403348', accent: '#8E5C74', page: lazy(() => import('./glow/Page')) },
  { type: 'shop', slug: 'clay', niche: 'Керамика ручной работы', name: 'Глина', desc: 'Мастерская керамики: посуда с выбором глазури, процесс изготовления и запись на мастер-класс.', tags: ['выбор глазури', 'мастер-классы', 'handmade'], style: 'Эдиториал', cover: '1677761640321-b80251be00ca', accent: '#5F6B3A', page: lazy(() => import('./clay/Page')) },
  { type: 'bizcard', slug: 'barber', niche: 'Барбершоп', name: 'Борода', desc: 'Многостраничный сайт барбершопа: услуги и прайс, мастера, галерея работ, запись к мастеру.', tags: ['5 страниц', 'прайс', 'запись'], style: 'Брутальный', cover: '1647140655214-e4a2d914971f', accent: '#C8A165', page: lazy(() => import('./barber/Page')) },
  { type: 'bizcard', slug: 'clean', niche: 'Клининг', name: 'Чисто', desc: 'Клининговая компания: калькулятор уборки, цены, чек-листы, фото «до/после», заявка.', tags: ['калькулятор', 'до/после', '5 страниц'], style: 'Свежий', cover: '1581578731548-c64695cc6952', accent: '#1E7BF2', page: lazy(() => import('./clean/Page')) },
  { type: 'bizcard', slug: 'vet', niche: 'Ветклиника', name: 'Лапа', desc: 'Ветклиника 24/7: услуги и прайс, врачи, план прививок по виду питомца, памятка владельцам.', tags: ['5 страниц', 'памятка', 'запись'], style: 'Тёплый', cover: '1553688738-a278b9f063e0', accent: '#0E7C7B', page: lazy(() => import('./vet/Page')) },
  { type: 'bizcard', slug: 'kitchen', niche: 'Кухни на заказ', name: 'Модуль', desc: 'Мебельное производство: проекты с фильтром, расчёт стоимости кухни, этапы работы, замер.', tags: ['расчёт цены', 'портфолио', '5 страниц'], style: 'Архитектурный', cover: '1759691337936-ef702afd0714', accent: '#A8743E', page: lazy(() => import('./kitchen/Page')) },
  { type: 'bizcard', slug: 'kids', niche: 'Детский центр', name: 'Солнышко', desc: 'Развивающий центр: подбор занятий по возрасту, педагоги, расписание, запись на пробное.', tags: ['подбор по возрасту', 'расписание', '5 страниц'], style: 'Игривый', cover: '1578349035260-9f3d4042f1f7', accent: '#FF7A59', page: lazy(() => import('./kids/Page')) },
]
