# BALANAR — портфолио веб-разработчика

Портфолио Дмитрия (Казань): 18 демо-сайтов в трёх разделах — 8 лендингов, 5 многостраничных сайтов-визиток и 5 интернет-магазинов, собранное на **React + TypeScript + Vite**.

**Сайт:** https://balanar073.github.io/portfolio/

## Стек

| Задача | Инструмент |
|---|---|
| Интерфейс | React 19, TypeScript |
| Сборка | Vite |
| Стили | Tailwind CSS (главная), CSS с вложенностью (сайты) |
| Анимации | Motion (Framer Motion) |
| Слайдеры | Swiper |
| Маска телефона | react-imask |
| Просмотр фото | yet-another-react-lightbox |
| Иконки | lucide-react |
| Маршруты | React Router (HashRouter — работает на любом хостинге) |

## Структура

```
src/
├─ home/                 главная: обо мне, работы (3 вкладки), прайс, FAQ, контакты
│  ├─ Home.tsx
│  ├─ contacts.ts        ← контакты (Telegram, GitHub)
│  └─ LivePreview.tsx    живые превью сайтов в карточках
├─ shared/               общие компоненты
│  ├─ shop/              набор для магазинов: корзина, каталог, товар, оформление
│  ├─ biz/               каркас многостраничной визитки: шапка, разделы, прайс, команда, галерея, форма
│  ├─ PhoneInput.tsx, Accordion.tsx, BeforeAfter.tsx, Reveal.tsx, …
└─ sites/
   ├─ registry.ts        список работ: type = landing | bizcard | shop
   ├─ лендинги:          auto, dental, lawyer, fitness, remont, beauty, photo, school
   ├─ визитки:           barber, clean, vet, kitchen, kids
   └─ магазины:          flowers, base, coffee, glow, clay (у каждого data.ts — товары и доставка)
```

Стили каждого сайта изолированы классом `.s-<папка>`, поэтому сайты не влияют друг на друга.

## Запуск на компьютере

Нужен [Node.js](https://nodejs.org) версии 20 или новее.

```bash
npm install      # один раз — скачать библиотеки
npm run dev      # запустить, откроется http://localhost:5173
```

На Windows можно просто дважды кликнуть `Запустить.bat`.

Сборка для хостинга: `npm run build` → готовые файлы в папке `dist/`.

## Публикация

В репозитории настроен GitHub Actions (`.github/workflows/deploy.yml`):
каждый push в ветку `main` собирает проект и публикует его на GitHub Pages.
В настройках репозитория: **Settings → Pages → Source: GitHub Actions**.

## Как добавить новый сайт

1. Скопируйте папку любого сайта в `src/sites/новое-имя`.
2. Поменяйте класс `.s-старое` → `.s-новое` в `style.css` и `slug` в `Page.tsx`.
3. Добавьте строку в `src/sites/registry.ts`.

---
Фото — [Unsplash](https://unsplash.com) (бесплатная лицензия). Все компании в работах вымышленные.
