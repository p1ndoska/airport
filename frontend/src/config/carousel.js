// Все фото из frontend/src/carousel/ попадают в карусель в порядке имён файлов
const images = import.meta.glob('../carousel/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  query: '?url',
  import: 'default',
})

export const CAROUSEL_SLIDES = Object.keys(images)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map((path, i) => ({ src: images[path], alt: `Фото ${i + 1}` }))

export const CAROUSEL_INTERVAL_MS = 5000
