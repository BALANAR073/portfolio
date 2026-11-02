export type Review = { name: string; text: string; rating?: number; date?: string; opt?: string }

export type Product = {
  id: string
  name: string
  price: number
  old?: number            // старая цена — показываем скидку
  cat: string             // категория для фильтра
  imgs: string[]          // id фото Unsplash, первое — главное
  badge?: string          // «Хит», «Новинка»
  short: string           // строка под названием
  desc: string            // описание на странице товара
  options?: { label: string; values: string[] } // размер, объём, помол...
  specs?: [string, string][]
  rating?: number
  reviews?: number
  feedback?: Review[]     // отзывы именно об этом товаре (показываются первыми)
}

export type ShopConfig = {
  slug: string
  brand: string
  currency?: string
  products: Product[]
  cats: string[]
  delivery: { id: string; label: string; price: number; note: string }[]
  freeFrom: number        // бесплатная доставка от суммы
  nav: { to: string; label: string }[]  // дополнительные пункты меню (страницы магазина)
  phone: string
  city: string
  address?: string
  hours?: string
  guarantee?: string
  reviewPool?: Review[]   // общие отзывы покупателей магазина, добираются к товару до 3 штук      // вторая строка преимуществ на странице товара
}
