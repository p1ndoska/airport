export const getNewsImageUrl = (photo) => {
  if (!photo) return undefined
  return /^https?:\/\//.test(photo) || photo.startsWith('/') ? photo : `/${photo}`
}

export const getNewsExcerpt = (content, length = 150) => {
  if (!content) return ''
  const text = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return text.length > length ? `${text.slice(0, length).trim()}…` : text
}

export const formatNewsDate = (date) => new Date(date).toLocaleDateString('ru-RU')

export const formatNewsDateLong = (date) =>
  new Date(date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })

export async function fetchJson(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}
