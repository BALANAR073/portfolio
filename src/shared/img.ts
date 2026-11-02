/** Фото с Unsplash (бесплатная лицензия). w — ширина в пикселях. */
export const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`
